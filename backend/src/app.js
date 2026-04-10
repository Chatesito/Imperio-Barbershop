import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

// Routes imports
import authRoutes from "./routes/auth.routes.js";
// ... (omitted imports for brevity in target search, but I'll replace the block)
import reservationRoutes from "./routes/reservation.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

// Middlewares de Seguridad
app.use(helmet());
app.use(mongoSanitize());

// Rate Limiting (100 peticiones cada 15 min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Demasiadas peticiones desde esta IP, por favor intenta de nuevo en 15 minutos." }
});
app.use("/api/", limiter);

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Main Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/categories", categoryRoutes);

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
