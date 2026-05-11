import Staff from "../models/Staff.js";
import User from "../models/User.js";



export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find()
      .populate("branches")
      .populate("services")
      .sort({ createdAt: 1 });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el personal", error: error.message });
  }
};

export const updateStaffMember = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json({ message: "Perfil profesional actualizado", member: updated });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando perfil", error: error.message });
  }
};

export const deleteStaffMember = async (req, res) => {
  try {
    const member = await Staff.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Personal no encontrado" });

    // Si se borra desde aquí, cambiamos el rol del usuario a 'user'
    if (member.userId) {
        await User.findByIdAndUpdate(member.userId, { role: 'user' });
    }

    res.status(200).json({ message: "Miembro eliminado y rol revocado" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando miembro", error: error.message });
  }
};
