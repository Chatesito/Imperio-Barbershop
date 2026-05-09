import Staff from "../models/Staff.js";
import User from "../models/User.js";

const seedStaff = [
    {
        name: "Carlos Mendoza",
        role: "Gerencia",
        bio: "Dirección y visión integral del servicio, asegurando calidad consistente.",
        imageUrl: "/images/staff/barber_1.png"
    },
    {
        name: "David 'El Rápido' Silva",
        role: "Estilista Maestro",
        bio: "Creatividad en estilismo y adaptación a tendencias actuales de grooming.",
        imageUrl: "/images/staff/barber_2.png"
    },
    {
        name: "Mateo Herrera",
        role: "Colorista & Estilista",
        bio: "Atención minuciosa a simetría, transición y armonía del estilo completo.",
        imageUrl: "/images/staff/barber_3.png"
    },
    {
        name: "Valeria Reyes",
        role: "Especialista en Estilismo Femenino y Barbería",
        bio: "Optimización de textura y forma para looks versátiles y modernos.",
        imageUrl: "/images/staff/barber_4.png"
    },
    {
        name: "Julián 'Navaja' Ortiz",
        role: "Especialista en Afeitado",
        bio: "Enfoque en cortes clásicos y afeitado preciso con técnicas modernas.",
        imageUrl: "/images/staff/barber_5.png"
    },
    {
        name: "Andrés Montes",
        role: "Especialista Fades",
        bio: "Especialización en fades y detalles limpios orientados a acabado profesional.",
        imageUrl: "/images/staff/barber_6.png"
    }
];

export const getStaff = async (req, res) => {
  try {
    // Si la db está vacía, hacemos un auto-seed
    let staffCount = await Staff.countDocuments();
    if (staffCount === 0) {
      await Staff.insertMany(seedStaff);
    }
    
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
