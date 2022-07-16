const cors = require("cors")
require("dotenv").config();
require("express-async-errors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

//connect database
const connectDB = require("./db/connect");

// routers
const customerRouter = require("./routes/customers");

// middleware
const {notFound, errorHandler} = require("./middleware/errorMiddleware")

// application using json 
app.use(cors({
  origin: "*"
}))
app.set("trust proxy", 1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use("/uploads", express.static("uploads"))

//routes
app.use("/customer", customerRouter);

app.get("/", (req, res) => {
  res.send("Customer API!")
})

//error handler
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`::: Server is listening on port ${port} :::`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();