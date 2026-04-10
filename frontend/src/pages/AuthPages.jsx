import { useState, useEffect } from "react";
import { User, Mail, Lock, LogIn, Loader2, ArrowLeft, Scissors } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AuthPage() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Si el usuario ya está logueado, lo mandamos al home o dashboard
    useEffect(() => {
        if (user) {
            navigate("/Dashboard");
        }
        // Verificar si viene de una redirección con estado
        if (location.state?.isRegister) {
            setIsLogin(false);
        }
    }, [user, navigate, location]);

    const handleAuth = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            await login(data, isLogin);
            toast.success(isLogin ? "¡Bienvenido de vuelta!" : "¡Cuenta creada exitosamente!");
            // Redirigir a donde venía o al dashboard
            const from = location.state?.from || "/Dashboard";
            navigate(from);
        } catch (error) {
            toast.error(error.response?.data?.message || "Ocurrió un error.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-1/4 h-3/4 bg-brand-gold/5 blur-[100px] -z-10" />
            
            <div className="w-full max-w-md animate-fade-in-up">
                <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-gold transition-colors mb-8 group">
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Volver al inicio</span>
                </Link>

                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <Scissors className="size-40 text-brand-gold rotate-12" />
                    </div>

                    <div className="mb-10 text-center relative">
                        <h1 className="text-4xl font-extrabold font-karantina text-white tracking-widest uppercase">
                            {isLogin ? "INICIAR SESIÓN" : "UNIRSE AL IMPERIO"}
                        </h1>
                        <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">
                            {isLogin ? "Accede a tu ritual" : "Empieza tu legado"}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleAuth}>
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-600 group-focus-within:text-brand-gold transition-colors" />
                                    <input 
                                        type="text"
                                        name="name"
                                        required={!isLogin}
                                        minLength={3}
                                        pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                                        title="El nombre debe tener al menos 3 caracteres y no contener números"
                                        className="w-full pl-12 pr-4 py-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-white placeholder-neutral-700 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 transition-all"
                                        placeholder="Ej: Mateo Herrera"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Correo Electrónico</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-600 group-focus-within:text-brand-gold transition-colors" />
                                <input 
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-white placeholder-neutral-700 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 transition-all"
                                    placeholder="tu@correo.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-600 group-focus-within:text-brand-gold transition-colors" />
                                <input 
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-white placeholder-neutral-700 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 px-4 py-5 rounded-2xl bg-brand-gold text-neutral-950 font-bold text-sm tracking-[0.2em] hover:bg-white transition-all shadow-xl hover:shadow-brand-gold/10 disabled:opacity-75 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? <Loader2 className="size-5 animate-spin" /> : <LogIn className="size-5 group-hover:translate-x-1 transition-transform" />}
                            <span>{isLoading ? "PROCESANDO..." : (isLogin ? "ENTRAR" : "CONFIRMAR")}</span>
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-neutral-800 text-center">
                        <p className="text-neutral-500 text-xs font-semibold">
                            {isLogin ? "¿Aún no eres parte?" : "¿Ya tienes un lugar?"}{" "}
                            <button 
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-brand-gold hover:text-white transition-colors ml-1 uppercase"
                            >
                                {isLogin ? "Crea tu cuenta" : "Inicia sesión"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
