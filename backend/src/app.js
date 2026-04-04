import express from "express";
import cors from "cors";

// Routes imports
import authRoutes from "./routes/auth.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Main Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);

// General Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    success: false,
    message: err.message || "Algo salió mal en el servidor.",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined 
  });
});

export default app;
