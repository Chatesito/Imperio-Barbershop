import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

// Routes imports
import authRoutes from "./routes/auth.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

// 1. Middlewares de base (CORS y Parsing)
const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174",
  "https://imperiobarbershop.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean); // Elimina valores undefined

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como apps móviles o curl) o si está en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// 2. Middlewares de Seguridad
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } // Permitir imágenes/recursos cruzados
}));
app.use(mongoSanitize());

// 3. Rate Limiting (100 peticiones cada 15 min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Aumentado para evitar bloqueos en pruebas
  message: { message: "Demasiadas peticiones desde esta IP." }
});
app.use("/api", limiter);

// 4. Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// 5. Main Routes
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
  console.error("🔴 Server Error:", err.message);
  
  const status = err.status || 500;
  const message = err.message || "Algo salió mal en el servidor.";

  // Asegurarnos de que las cabeceras de CORS estén presentes en el error
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.status(status).json({ 
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined 
  });
});

// Catch-all route to debug 404s
app.use((req, res) => {
  res.status(404).json({ 
    message: `Ruta no encontrada: ${req.originalUrl}`,
    hint: "Verifica los prefijos en app.js y las rutas en src/routes/" 
  });
});

export default app;
