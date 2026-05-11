import Branch from "../models/Branch.js";

const seedBranches = [
    {
      name: "Sede Ipanema",
      address: "Calle 29, Neiva, Huila",
      image: "/images/branches/sede-uno.png",
      mapUrl: "https://maps.app.goo.gl/qHXLv8SrMyg2Nayq5",
    },
    {
      name: "Sede Candido",
      address: "Cl. 37 #1 26, Neiva, Huila",
      image: "/images/branches/sede-dos.png",
      mapUrl: "https://maps.app.goo.gl/i7D5SCKU4SS2ihuD8",
    },
    {
      name: "Sede Neiva La Nueva",
      address: "Cra. 20 #26-385, Neiva, Huila",
      image: "/images/branches/sede-tres.png",
      mapUrl: "https://maps.app.goo.gl/AQykuFbBc8nwNPVt9",
    },
    {
      name: "Sede Principal",
      address: "Cll 14a # 34-20, Neiva, Huila",
      image: "/images/storefront.png",
      mapUrl: "https://maps.app.goo.gl/inURPkNs6dtSnrTW7",
    }
];

export const getBranches = async (req, res) => {
  try {
    const count = await Branch.countDocuments();
    if (count === 0) {
      await Branch.insertMany(seedBranches);
    }
    const docs = await Branch.find().sort({ createdAt: 1 });
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Error fetch", error: error.message });
  }
};

export const createBranch = async (req, res) => {
  try {
    const newDoc = await Branch.create(req.body);
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(500).json({ message: "Error create", error: error.message });
  }
};

export const deleteBranch = async (req, res) => {
  try {
    await Branch.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error delete", error: error.message });
  }
};
