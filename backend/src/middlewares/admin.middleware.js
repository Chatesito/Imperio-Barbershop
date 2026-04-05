export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Prohibido. Requiere privilegios de administrador." });
    }
  };

export const staffRoute = (req, res, next) => {
    if (req.user && (req.user.role === "admin" || req.user.role === "barber")) {
      next();
    } else {
      res.status(403).json({ message: "Prohibido. Requiere privilegios de personal (Admin o Barbero)." });
    }
  };
