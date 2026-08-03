import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Recibimos setIsLoggedIn como prop destructurado
function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.mensaje || "Error de login");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.user));

      // ✅ CAMBIO INMEDIATO DEL NAVBAR A ROJO / LOG OUT
      if (setIsLoggedIn) {
        setIsLoggedIn(true);
      }

      navigate("/administracion", { replace: true });

    } catch (err) {
      setError("Error de servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col justify-center items-center antialiased font-sans p-4">
      
      {/* Contenedor Principal del Login */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-sm shadow-xs p-8 sm:p-10 space-y-8">
        
        {/* Cabecera / Identidad de Gestionados */}
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#2652be]">
            Gestionados <br className="hidden sm:block" />
            <span className="text-slate-800">Plataforma.</span>
          </h2>
          <p className="text-xs text-slate-400 font-light">
            Introduzca sus credenciales autorizadas para acceder al sistema interno de gestión corporativa.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Campo: Usuario */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Identificador de Usuario
            </label>
            <input
              name="usuario"
              type="text"
              required
              placeholder="******"
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2652be] focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Campo: Contraseña */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2652be] focus:bg-white transition-all duration-200 tracking-wide"
            />
          </div>

          {/* Manejo de Alertas de Error */}
          {error && (
            <div className="bg-red-50 border-l-2 border-red-500 p-3 rounded-xs">
              <p className="text-red-600 font-mono text-[11px] font-bold uppercase tracking-tight">
                ⚠️ Error: {error}
              </p>
            </div>
          )}

          {/* Botón de Envío */}
          <div className="pt-2">
            <button 
              disabled={loading} 
              className="w-full bg-[#2652be] hover:bg-blue-700 disabled:bg-blue-400 text-white p-3.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Autenticando...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Footer minimalista de la empresa */}
      <div className="mt-8 text-center space-y-1">
        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} Gestionados / Sistema de Administración
        </p>
      </div>

    </div>
  );
}

export default Login;