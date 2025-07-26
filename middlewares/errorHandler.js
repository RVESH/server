// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("❌", err.stack || err);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
    // Use optional chaining to safely check for NODE_ENV
    stack: process?.env?.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
