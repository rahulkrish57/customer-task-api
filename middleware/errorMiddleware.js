const {StatusCodes} = require("http-status-codes")


const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  
  const errorHandler = (err, req, res, next) => {
    const defaultError = {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: "Something went wrong, try again later"
    }
    res.status(defaultError.statusCode).json({error: err.message})
  }
  
  module.exports =  { notFound, errorHandler };

  // const errorHandler = (err, req, res, next) => {
  //   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  //   res.status(statusCode);
  //   res.json({
  //     message: err.message,
  //     stack: process.env.NODE_ENV === "production" ? null : err.stack,
  //   });
  // };