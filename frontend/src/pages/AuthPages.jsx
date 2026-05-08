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

    const [showPassword, setShowPassword] = useState(false);

    // Si el usuario ya está logueado, lo mandamos al home o dashboard
    useEffect(() => {
        if (user) {
            navigate("/Dashboard");
        }
        if (location.state?.isRegister) {
            setIsLogin(false);
        }
    }, [user, navigate, location]);

    const handleAuth = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Frontend validation for Name
        if (!isLogin && (!data.name || data.name.length < 3)) {
            toast.error("El nombre debe tener al menos 3 caracteres.");
            setIsLoading(false);
            return;
        }

        try {
            await login(data, isLogin);
            toast.success(isLogin ? "¡Bienvenido de vuelta, Guerrero!" : "¡Bienvenido al Imperio!");
            const from = location.state?.from || "/Dashboard";
            navigate(from);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error de autenticación. Verifica tus datos.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-1/4 h-3/4 bg-brand-gold/5 blur-[100px] -z-10" />
            
            <div className="w-full max-w-md animate-fade-in-up">
                <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-gold transition-colors mb-8 group">
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Volver a la Base</span>
                </Link>

                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <Scissors className="size-40 text-brand-gold rotate-12" />
                    </div>

                    <div className="mb-10 text-center relative">
                        <h1 className="text-4xl font-extrabold font-karantina text-white tracking-widest uppercase">
                            {isLogin ? "IDENTIFICACIÓN" : "NUEVO RECLUTA"}
                        </h1>
                        <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
                            {isLogin ? "Ingresa tus credenciales reales" : "Únete a la legión del Imperio"}
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
                                        className="w-full pl-12 pr-4 py-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-white placeholder-neutral-700 focus:outline-none focus:border-brand-gold/50 transition-all text-sm"
                                        placeholder="Tu nombre y apellido"
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
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-white placeholder-neutral-700 focus:outline-none focus:border-brand-gold/50 transition-all text-sm"
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Contraseña</label>
                                {isLogin && (
                                    <button type="button" className="text-[10px] text-brand-gold font-bold uppercase hover:text-white transition-colors">¿La olvidaste?</button>
                                )}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-600 group-focus-within:text-brand-gold transition-colors" />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    className="w-full pl-12 pr-12 py-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-white placeholder-neutral-700 focus:outline-none focus:border-brand-gold/50 transition-all text-sm"
                                    placeholder="••••••••"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-brand-gold transition-colors p-1"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.299 8.82 7.242 4.5 12 4.5c4.757 0 8.701 4.32 9.964 7.178.07.158.07.332 0 .491C20.701 15.18 16.757 19.5 12 19.5c-4.758 0-8.701-4.32-9.964-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
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
