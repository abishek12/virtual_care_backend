import jwt from "jsonwebtoken";
import ac from "../lib/constants/access.control.js";

export const authenticate = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    // Verify token with access secret
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Attach user payload (id, email, role) to request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};


export const authorize = (action, resource) => {
  return (req, res, next) => {
    try {
      const role = req.user.role;
      const permission = ac.can(role)[action](resource);

      if (!permission.granted) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: "Authorization failed" });
    }
  };
};
