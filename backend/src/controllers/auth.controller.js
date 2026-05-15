import User from "../models/User.js";
import Staff from "../models/Staff.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role, name: user.name },
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

    // Sync with Staff if barber
    if (role === "barber") {
      await Staff.create({
        name: newUser.name,
        role: "Nuevo Barbero",
        userId: newUser._id
      });
    }

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

export const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.id;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando contraseña" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    if (name && name.trim().length < 3) {
      return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { name, email }, 
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (updatedUser.role === "barber") {
      await Staff.findOneAndUpdate({ userId }, { name });
    }

    res.status(200).json({ message: "Perfil actualizado exitosamente", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando perfil", error: error.message });
  }
};

export const createAdminUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!name || name.trim().length < 3) {
      return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      role: role || "user"
    });

    if (newUser.role === "barber") {
      await Staff.create({
        name: newUser.name,
        role: "Nuevo Barbero",
        userId: newUser._id
      });
    }

    res.status(201).json({ message: "Usuario creado exitosamente", user: { id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    
    const oldUser = await User.findById(userId);
    if (!oldUser) return res.status(404).json({ message: "Usuario no encontrado" });

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    // Sync Staff
    if (role === "barber" && oldUser.role !== "barber") {
      const exists = await Staff.findOne({ userId });
      if (!exists) {
        await Staff.create({
          name: user.name,
          role: "Nuevo Barbero",
          userId: user._id
        });
      }
    } else if (role !== "barber" && oldUser.role === "barber") {
      await Staff.findOneAndDelete({ userId });
    }

    res.status(200).json({ message: "Rol actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando rol" });
  }
};
