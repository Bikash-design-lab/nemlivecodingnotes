const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://ABVenu:venu1234@cluster0.k4z7cpn.mongodb.net/empher').then(()=>console.log("connected to db")).catch((err)=> console.log("err in connecting db"));

// Create a simple MongoDB schema
const TodoSchema = new mongoose.Schema({ userId: String, task: String, completed: Boolean });
const Todo = mongoose.model('Todo', TodoSchema);

// Set up Redis
// Create Redis client
const redisClient = redis.createClient({
    socket: {
      //host: '127.0.0.1',
      host:'redis-10226.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:10226', // Redis server's address
      port: 6379,        // Redis server's port
    },
  });
  
  // Handle connection errors
  redisClient.on('error', (err) => console.error('Redis Error:', err));
  
  // Connect to Redis
  (async () => {
    await redisClient.connect();
    console.log('Connected to Redis!');
  })();
  

// Middleware to parse JSON
app.use(express.json());

// Get To-Do List (with Redis Caching)
app.get('/todos/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Check Redis cache for the user's to-dos
  // const cachedTodos = await redisClient.get(userId);
  const cachedTodos = await redisClient.hGet(userId, 'todos');
  if (cachedTodos) {
    return res.json({ source: 'cache', todos: JSON.parse(cachedTodos) });
  }

  // If not in cache, fetch from MongoDB
  const todos = await Todo.find({ userId });
  // todos is array
  if (todos.length > 0) {
    // Store the result in Redis for future requests (expires in 60 seconds)
    // await redisClient.setEx(userId, 60, JSON.stringify(todos));

    await redisClient.hSet(userId, 'todos', JSON.stringify(todos));
    await redisClient.expire(userId, 60); // Set expiration for the entire hash
  }

  res.json({ source: 'database', todos });
});

// Add a New To-Do
app.post('/todos', async (req, res) => {
  const { userId, task } = req.body;

  const newTodo = new Todo({ userId, task, completed: false });
  await newTodo.save();

  // Invalidate the cache for this user's to-dos
  //await redisClient.del(userId);
  
   // Invalidate only the 'todos' field in the Redis hash for this user
   await redisClient.hDel(userId, 'todos');

  res.status(201).json(newTodo);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
