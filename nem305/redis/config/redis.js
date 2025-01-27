const redis = require("redis");

const redisClient = redis.createClient({
    socket:{
        host: "localhost",
        port: 6379,
      }
})

const connectToRedis = async ()=>{
   try{
    await redisClient.connect();
    console.log("connected to redis")
   }catch(err){
    console.log("Failed to connect to Redis")
   }
}

connectToRedis()

module.exports = redisClient;
