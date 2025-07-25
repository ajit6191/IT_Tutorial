const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Make user info available in req
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
