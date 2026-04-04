import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No autorizado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: "..." }
    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado. Token inválido o expirado." });
  }
};
