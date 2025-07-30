const jwt = require('jsonwebtoken');
const JWT_SECRET = "somethw904ngag3@$@ortandouuy";

const fetchuser = (req, res, next) => {
  // Get token from header
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // Store the full user object in req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = fetchuser;
