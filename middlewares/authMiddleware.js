// /middlewares/authMiddleware.js

import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ success: false, message: "No token, unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default protect;
