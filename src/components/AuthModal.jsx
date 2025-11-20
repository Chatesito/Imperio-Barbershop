import { X, Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";

export default function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-neutral-900 rounded-lg shadow-2xl w-full max-w-md border border-neutral-700 overflow-hidden">
                
                {/* Header */}
                <div className="bg-neutral-950 px-6 py-4 flex items-center justify-between border-b border-neutral-700">
                    <h2 className="text-xl font-bold text-white tracking-wide">
                        {isLogin ? "INICIAR SESIÓN" : "CREAR CUENTA"}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors"
                    >
                        <X className="size-6" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6">
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-300 mb-2 tracking-wide">
                                CORREO ELECTRÓNICO
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-500" />
                                <input 
                                    type="email"
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-300 mb-2 tracking-wide">
                                CONTRASEÑA
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-500" />
                                <input 
                                    type="password"
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Forgot password */}
                        {isLogin && (
                            <div className="text-right">
                                <button className="text-sm text-brand-gold hover:text-yellow-500 transition-colors font-semibold">
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                        )}

                        {/* Action button */}
                        <button 
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-brand-gold text-black font-bold text-sm tracking-wide hover:bg-yellow-500 transition-colors shadow-lg"
                        >
                            <LogIn className="size-5" />
                            <span>{isLogin ? "ENTRAR" : "CREAR CUENTA"}</span>
                        </button>
                    </form>

                    {/* Switch between login / register */}
                    <div className="mt-6 text-center">
                        <p className="text-neutral-400 text-sm">
                            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                            <button 
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-brand-gold hover:text-yellow-500 font-semibold transition-colors"
                            >
                                {isLogin ? "Regístrate aquí" : "Inicia sesión"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
