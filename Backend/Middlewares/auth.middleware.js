import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];


  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.userId = decoded.id; // Attach user ID to request for easy access
    next();
  } catch (err) {
    console.error(" JWT Verification Error:", err.message);
    return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

// ✅ Role-Based Access Checker
export const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};
