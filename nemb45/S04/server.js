const express = require("express");
const TodoRouter = require("./routes/todo.routes");
const BlogRouter = require("./routes/blog.routes");
const { loogerMiddleware } = require("./middleware/looger.middleware");
const {rateLimit} = require("express-rate-limit");
const app = express();

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

/// Important fn
app.use(express.json()); // This is an inbuilt middlewares which tells express to sense json body coming from req
app.use(limiter); /// only 5 requests are allowed in 1 minute
app.use(loogerMiddleware);

//// First Route

app.get("/home", (req, res) => {
  res.json({ message: "This is home page" });
});

/// Todo Routes
app.use("/todos", TodoRouter);

///Blog Routes

app.use("/blogs", BlogRouter);

app.listen(8000, () => {
  console.log("Server Started");
});
