import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validaciones de nombre
    if (!name || name.trim().length < 3) {
      return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres" });
    }
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: "El nombre no puede contener números ni símbolos" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // El primer usuario registrado siempre será ADMIN total
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    const newUser = await User.create({ 
      email, 
      password: hashedPassword, 
      name: name || "Nuevo Usuario",
      role 
    });

    const { accessToken, refreshToken } = generateTokens(newUser);
    newUser.refreshToken = refreshToken;
    await newUser.save();
    
    res.status(201).json({ 
      user: { id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role }, 
      token: accessToken,
      refreshToken 
    });
  } catch (error) {
    res.status(500).json({ message: "Error registrando usuario", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Credenciales inválidas" });

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ 
      user: { id: user._id, email: user.email, name: user.name, role: user.role }, 
      token: accessToken,
      refreshToken 
    });
  } catch (error) {
    res.status(500).json({ message: "Error iniciando sesión", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "Refresh Token requerido" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh Token inválido o expirado" });
    }

    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.status(200).json({ token: tokens.accessToken, refreshToken: tokens.refreshToken });
  } catch (error) {
    res.status(403).json({ message: "Token inválido", error: error.message });
  }
};

// --- Admin Management ---

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -refreshToken").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error cargando usuarios" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    
    // Impedir que se quite el rol de admin a sí mismo si solo hay uno (opcional pero seguro)
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    res.status(200).json({ message: "Rol actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando rol" });
  }
};
