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
  
  let status = err.status || 500;
  let message = err.message || "Algo salió mal en el servidor.";

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((val) => val.message).join(", ");
  }
  
  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    status = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `El ${field} ingresado ya está en uso.`;
  }

  res.status(status).json({ 
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined 
  });
});

export default app;
