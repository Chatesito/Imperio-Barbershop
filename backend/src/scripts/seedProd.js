import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Category from '../models/Category.js';
import Service from '../models/Service.js';
import Staff from '../models/Staff.js';
import Branch from '../models/Branch.js';
import Review from '../models/Review.js';
import Gallery from '../models/Gallery.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedDatabase = async () => {
    try {
        console.log("Conectando a MongoDB: ", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Conectado.');

        console.log('Limpiando base de datos (excepto Usuarios)...');
        await Category.deleteMany({});
        await Service.deleteMany({});
        await Staff.deleteMany({});
        await Branch.deleteMany({});
        await Review.deleteMany({});
        await Gallery.deleteMany({});

        console.log('Creando Sedes...');
        const branches = await Branch.insertMany([
            {
                name: "Sede Principal Centro",
                address: "Calle 10 # 4-25, Neiva, Huila",
                mapUrl: "https://maps.google.com/?q=Neiva",
                image: "/images/storefront.png"
            },
            {
                name: "Sede VIP Norte",
                address: "Av. 26 # 8-15, Local 2, Neiva",
                mapUrl: "https://maps.google.com/?q=Neiva",
                image: "/images/interior.jpg"
            }
        ]);

        console.log('Creando Categorías y Servicios...');
        const catCortes = await Category.create({ name: "Cortes Premium" });
        const catBarba = await Category.create({ name: "Afeitado y Barba" });
        const catFacial = await Category.create({ name: "Cuidado Facial" });
        const catVip = await Category.create({ name: "Experiencia VIP" });

        const services = await Service.insertMany([
            { category: catCortes._id, name: "Corte Clásico Imperio", price: 35000, description: "Corte a tijera o máquina, lavado, secado y peinado." },
            { category: catCortes._id, name: "Fade de Alta Precisión", price: 40000, description: "Degradado perfecto, perfilado con navaja y acabado con productos premium." },
            { category: catCortes._id, name: "Corte + Diseño (Tribal)", price: 45000, description: "Diseño personalizado en laterales o nuca." },
            
            { category: catBarba._id, name: "Afeitado Tradicional con Toalla Caliente", price: 25000, description: "Ritual clásico, espuma caliente, navaja libre y aftershave hidratante." },
            { category: catBarba._id, name: "Perfilado y Mantenimiento de Barba", price: 20000, description: "Diseño de líneas, rebaje de volumen y aplicación de aceites esenciales." },
            { category: catBarba._id, name: "Ritual Completo de Barba", price: 35000, description: "Afeitado, exfoliación de la zona de la barba y mascarilla hidratante." },
            
            { category: catFacial._id, name: "Limpieza Facial Express", price: 30000, description: "Exfoliación suave, mascarilla de arcilla y crema hidratante." },
            { category: catFacial._id, name: "Limpieza Profunda Puntos Negros", price: 50000, description: "Vapor de ozono, extracción, mascarilla peel-off y sellado de poros." },
            
            { category: catVip._id, name: "El Emperador (Corte + Barba + Facial)", price: 90000, description: "Servicio completo que incluye corte premium, afeitado tradicional y limpieza facial profunda." },
            { category: catVip._id, name: "Día del Novio (Grooming Completo)", price: 150000, description: "Preparación estética total para tu gran día, incluye bebida de cortesía y masaje craneal." }
        ]);

        console.log('Creando Staff (Profesionales)...');
        await Staff.insertMany([
            {
                name: "Carlos Mendoza",
                role: "Director Creativo & Fundador",
                bio: "Maestro barbero con más de 15 años de experiencia. Especialista en visagismo y técnicas clásicas.",
                imageUrl: "/images/staff/barber_1.png",
                branches: [branches[0]._id, branches[1]._id],
                services: services.map(s => s._id)
            },
            {
                name: "David 'El Rápido' Silva",
                role: "Especialista en Fades",
                bio: "Ganador de múltiples batallas de barberos. La precisión y la velocidad son sus mejores armas.",
                imageUrl: "/images/staff/barber_2.png",
                branches: [branches[0]._id],
                services: services.filter(s => s.category.toString() === catCortes._id.toString())
            },
            {
                name: "Mateo Herrera",
                role: "Colorista y Barbero Estilista",
                bio: "Experto en cambios extremos, platinados y texturas.",
                imageUrl: "/images/staff/barber_3.png",
                branches: [branches[1]._id],
                services: services.filter(s => s.category.toString() === catCortes._id.toString())
            },
            {
                name: "Valeria Reyes",
                role: "Master en Cuidado Facial",
                bio: "Especialista en dermocosmética masculina y rituales de relajación.",
                imageUrl: "/images/staff/barber_4.png",
                branches: [branches[0]._id, branches[1]._id],
                services: services.filter(s => s.category.toString() === catFacial._id.toString() || s.category.toString() === catVip._id.toString())
            },
            {
                name: "Julián 'Navaja' Ortiz",
                role: "Especialista en Barboterapia",
                bio: "Domina el arte del afeitado clásico con navaja libre y rituales de toalla caliente.",
                imageUrl: "/images/staff/barber_5.png",
                branches: [branches[0]._id],
                services: services.filter(s => s.category.toString() === catBarba._id.toString())
            },
            {
                name: "Andrés Montes",
                role: "Barbero Senior",
                bio: "Excelencia en cortes tradicionales y atención al detalle. Un caballero atendiendo a caballeros.",
                imageUrl: "/images/staff/barber_6.png",
                branches: [branches[1]._id],
                services: services.map(s => s._id)
            }
        ]);

        console.log('Creando Reseñas...');
        await Review.insertMany([
            { name: "Juan Pablo S.", rating: 5, date: "Hace 2 días", comment: "Excelente servicio de Carlos, el mejor fade que me han hecho. El lugar es muy elegante y la atención impecable.", img: "/images/reviews/review1.png" },
            { name: "Felipe G.", rating: 5, date: "Hace 1 semana", comment: "Me hice el ritual de barba con Julián. Totalmente relajante, la toalla caliente es un detalle espectacular.", img: "/images/reviews/review2.png" },
            { name: "Andrés M.", rating: 4, date: "Hace 2 semanas", comment: "Muy buena atención, aunque tuve que esperar un poco porque llegué tarde. El corte con David estuvo genial.", img: "/images/reviews/review3.png" },
            { name: "Luis F.", rating: 5, date: "Hace 1 mes", comment: "El paquete del Emperador vale cada centavo. Salí sintiéndome renovado. Valeria es muy profesional con el facial.", img: "/images/reviews/review4.png" },
            { name: "Miguel A.", rating: 5, date: "Hace 2 meses", comment: "Llevo viniendo 6 meses seguidos. No cambio de barbería por nada, el ambiente es único.", img: "/images/reviews/review5.png" },
            { name: "Sebastián R.", rating: 5, date: "Hace 2 meses", comment: "Excelente para ir el fin de semana, te ofrecen algo de tomar mientras esperas. Muy recomendado.", img: "/images/reviews/review6.png" }
        ]);

        console.log('Creando Galería...');
        await Gallery.insertMany([
            { url: "/images/gallery-01.jpg", type: "work" },
            { url: "/images/gallery-02.jpg", type: "work" },
            { url: "/images/gallery-03.jpg", type: "work" },
            { url: "/images/gallery-04.jpg", type: "interior" },
            { url: "/images/gallery-05.jpg", type: "interior" },
            { url: "/images/gallery-06.jpg", type: "team" },
            { url: "/images/gallery-07.jpg", type: "work" },
            { url: "/images/gallery-08.jpg", type: "work" },
            { url: "/images/gallery-09.jpg", type: "work" }
        ]);

        console.log('✅ Base de datos poblada con éxito con datos de Producción!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al poblar BD:', error);
        process.exit(1);
    }
};

seedDatabase();
