import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("⚠️ MONGODB_URI no está definido en el archivo .env. Por favor, configúralo para habilitar la base de datos.");
      return;
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    // No salimos del proceso para permitir que el frontend cargue aunque el backend tenga errores de DB
  }
};
