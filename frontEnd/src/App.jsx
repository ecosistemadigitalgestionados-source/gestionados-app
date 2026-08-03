import { useState, useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import politicas from './assets/Politicas.pdf'
import Home from "./componentes/Home.jsx";
import Servicios from "./componentes/Servicios.jsx";
import Limpieza from "./componentes/Limpieza.jsx";
import Portafolio from "./componentes/Portafolio.jsx";
import Login from "./componentes/Login.jsx";
import Administracion from "./componentes/Administracion.jsx";
import Nosotros from "./componentes/Nosotros.jsx";
import fotoUbi from "./assets/fotoUbi.jpg";
import logo from "./assets/logo.png";
import logo2 from "./assets/logo2.png";
import Test from "./componentes/Test.jsx";

// =========================================================================
// CONFIGURACIÓN DE GSAP & PLUGINS
// =========================================================================
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// COMPONENTE PARA FORZAR EL SCROLL AL INICIO AL CAMBIAR DE PÁGINA
// =========================================================================
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const appRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ ESTADO DE AUTENTICACIÓN CENTRALIZADO
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar si hay token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Función para cerrar sesión desde el Navbar
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirige al Home al salir
  };

  // =======================
  // FORM STATE
  // =======================
  const [form, setForm] = useState({
    nombre_cliente: "",
    contacto_cliente: "",
    correo_cliente: "",
    comentario_cliente: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://gestionados-app.onrender.com/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      setForm({
        nombre_cliente: "",
        contacto_cliente: "",
        correo_cliente: "",
        comentario_cliente: "",
      });
    } catch (error) {
      console.error("Error enviando formulario:", error);
    }
  };

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [subMenuServicios, setSubMenuServicios] = useState(false);

  // REFERENCIAS PARA LAS ANIMACIONES
  const contactoSectionRef = useRef(null);
  const contactoLeftRef = useRef(null);
  const contactoRightRef = useRef(null);

  // ANIMACIONES GSAP (Solo se ejecutan si estamos en el Home)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".modalidad-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#modalidad-trabajo",
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      if (contactoSectionRef.current) {
        gsap.fromTo(
          contactoLeftRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactoSectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );

        gsap.fromTo(
          contactoRightRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactoSectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
    }, appRef);

    return () => ctx.revert();
  }, [location.pathname]);

  const abrirMenu = () => {
    setMenuAbierto(!menuAbierto);
    if (menuAbierto) setSubMenuServicios(false);
  };

  const manejarCorreo = (e) => {
    e.preventDefault();
    const email = "info@gestionadosec.com";
    const esMovil = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (esMovil) {
      window.location.href = `https://mail.google.com/mail/mu/mp/?view=cm&fs=1&to=${email}`;
      setTimeout(() => {
        window.location.href = `mailto:${email}`;
      }, 400);
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        "_blank",
      );
    }
  };

  // ✅ CONTROL VISUAL: ¿Estamos en Login o Administración?
  const ocultarSeccionesComunes =
    location.pathname === "/login" || location.pathname === "/administracion";

  return (
    <div ref={appRef}>
      <ScrollToTop />

      {/* ========================================================================= */}
      {/* NAVBAR                                                                    */}
      {/* ========================================================================= */}
      <nav className="w-full bg-white/85 text-slate-900 sticky top-0 z-50 px-5 sm:px-10 py-4 border-b border-slate-100 backdrop-blur-xl shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2.5 shrink-0">
            <img
              src={logo}
              alt="Gestionados"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Enlaces Desktop */}
          <div className="hidden lg:flex items-center gap-1 text-[13px] font-bold  tracking-[0.18em] text-slate-500 ">
            <Link
              to="/"
              className="relative px-5 py-2.5 rounded-full transition-all duration-300 hover:text-[#2652be]"
            >
              <span>INICIO</span>
            </Link>
            <Link
              to="/nosotros"
              className="relative px-5 py-2.5 rounded-full transition-all duration-300 hover:text-[#2652be]"
            >
              <span>SOBRE NOSOTROS</span>
            </Link>

            <div
              className="relative group/services"
              onMouseEnter={() => setSubMenuServicios(true)}
              onMouseLeave={() => setSubMenuServicios(false)}
            >
              <button className="relative px-5 py-2.5 rounded-full transition-all duration-300 hover:text-[#2652be] flex items-center gap-1 cursor-pointer">
                <span>NUESTROS SERVICIOS</span>
              </button>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-64 pt-3 transition-all duration-300 ${subMenuServicios ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
              >
                <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-2.5 flex flex-col gap-1">
                  <Link
                    to="/servicios"
                    className="px-4 py-3 text-left rounded-xl hover:bg-slate-50 hover:text-[#2652be] text-[12px] font-bold tracking-wider"
                  >
                    • ADMINISTRACIÓN DE CONDOMINIOS
                  </Link>
                  <Link
                    to="/limpieza"
                    className="px-4 py-3 text-left rounded-xl hover:bg-slate-50 hover:text-[#2652be] text-[12px] font-bold tracking-wider"
                  >
                    • LIMPIEZA DE ÁREAS COMUNES
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/portafolio"
              className="relative px-5 py-2.5 rounded-full transition-all duration-300 hover:text-[#2652be]"
            >
              <span>CASOS DE ÉXITO</span>
            </Link>
          </div>

          {/* Bloque de Accesos y Botón Dinámico de Login/Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={manejarCorreo}
              className="hidden xl:flex items-center gap-2 bg-slate-50 hover:bg-[#2652be] border border-slate-100 px-4 py-2.5 rounded-full text-slate-600 hover:text-white transition-all text-[11px]  font-bold"
            >
              <span>info@gestionadosec.com</span>
            </button>

            {/* ✅ BOTÓN DINÁMICO: LOGIN (Azul) / LOG OUT (Rojo) */}
            {isLoggedIn ? (
              <button
                onClick={handleLogOut}
                className="hidden lg:inline-block px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold uppercase tracking-widest  rounded-full transition-all duration-300 active:scale-95 cursor-pointer"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden lg:inline-block px-5 py-2.5 bg-[#2652be] hover:bg-[#1e42a0] text-white text-[11px] font-bold uppercase tracking-widest  rounded-full transition-all duration-300 active:scale-95"
              >
                Log In
              </Link>
            )}

            <button
              onClick={abrirMenu}
              className="flex lg:hidden p-2.5 rounded-full bg-slate-50 text-slate-700 hover:text-[#2652be] border border-slate-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                {menuAbierto ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${menuAbierto ? "max-h-[400px] opacity-100 mt-4 p-5 bg-slate-50" : "max-h-0 opacity-0 pointer-events-none"}`}
        >
          <div className="flex flex-col gap-3 text-xs font-bold tracking-widest text-slate-700 ">
            <Link
              to="/"
              onClick={abrirMenu}
              className="hover:text-[#2652be] py-2.5 px-3 rounded-xl hover:bg-white"
            >
              INICIO
            </Link>

            <Link
              to="/nosotros"
              onClick={abrirMenu}
              className="hover:text-[#2652be] py-2.5 px-3 rounded-xl hover:bg-white"
            >
              SOBRE NOSOTROS
            </Link>
            <button
              onClick={() => setSubMenuServicios(!subMenuServicios)}
              className="hover:text-[#2652be] py-2.5 px-3 rounded-xl hover:bg-white text-left flex items-center justify-between"
            >
              <span>NUESTROS SERVICIOS</span>
            </button>
            {subMenuServicios && (
              <div className="flex flex-col pl-4 gap-1">
                <Link
                  to="/servicios"
                  onClick={abrirMenu}
                  className="hover:text-[#2652be] py-2 px-3 text-[11px]"
                >
                  • ADMINISTRACIÓN DE CONDOMINIOS
                </Link>
                <Link
                  to="/limpieza"
                  onClick={abrirMenu}
                  className="hover:text-[#2652be] py-2 px-3 text-[11px]"
                >
                  • LIMPIEZA DE ÁREAS COMUNES
                </Link>
              </div>
            )}
            <Link
              to="/portafolio"
              onClick={abrirMenu}
              className="hover:text-[#2652be] py-2.5 px-3 rounded-xl hover:bg-white"
            >
              CASOS DE ÉXITO
            </Link>

            <div className="h-px bg-slate-200 my-1"></div>

            {/* Login/Logout Móvil */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogOut();
                  abrirMenu();
                }}
                className="w-full text-center py-3 bg-red-600 text-white rounded-full font-bold"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={abrirMenu}
                className="w-full text-center py-3 bg-[#2652be] text-white rounded-full font-bold"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* VISTAS DE LAS RUTAS */}
      <div className="bg-gradient-to-b from-slate-50 to-white min-h-[60vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/limpieza" element={<Limpieza />} />
          <Route path="/portafolio" element={<Portafolio />} />
          {/* ✅ Pasamos setIsLoggedIn para que cuando el login sea exitoso, cambie el estado en el navbar */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>

  {/* SECCIÓN CONTACTO FORMULARIO */}
<section
  ref={contactoSectionRef}
  className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eeeeee] overflow-x-hidden"
>
  <div className="max-w-6xl mx-auto bg-white border border-slate-200/60 rounded-xl sm:rounded-sm p-6 sm:p-12 lg:p-16 shadow-sm">
    <div className="flex flex-col lg:flex-row gap-8 sm:gap-16 items-stretch">
      
      {/* LADO IZQUIERDO DEL FORMULARIO */}
      <div
        ref={contactoLeftRef}
        className="flex-1 flex flex-col justify-center text-left"
      >
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-slate-950 mb-3 sm:mb-4 tracking-tight leading-tight sm:leading-[1.1] text-balance">
          ¿Hablamos de{" "}
          <span className="font-bold text-[#2652be] block sm:inline">
            su condominio?
          </span>
        </h2>
        <p className="text-slate-500 text-sm sm:text-base font-normal mt-1 sm:mt-2 leading-relaxed text-left text-pretty max-w-lg">
          Gestionados: Protegemos su inversión y garantizamos su tranquilidad.
        </p>
      </div>

      {/* FORMULARIO */}
      <form
        ref={contactoRightRef}
        className="flex-1 space-y-6 sm:space-y-8 flex flex-col justify-center mt-2 sm:mt-0"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <input
            type="text"
            name="nombre_cliente"
            value={form.nombre_cliente}
            onChange={handleChange}
            placeholder="Nombre Completo"
            className="w-full text-sm sm:text-base border-b border-slate-200 outline-none py-2 bg-transparent focus:border-[#2652be] text-slate-800 placeholder-slate-400 font-sans transition-colors"
            required
          />
        </div>

        {/* DOS COLUMNAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <input
            type="tel"
            name="contacto_cliente"
            value={form.contacto_cliente}
            onChange={handleChange}
            placeholder="Teléfono"
            className="w-full text-sm sm:text-base border-b border-slate-200 outline-none py-2 bg-transparent focus:border-[#2652be] text-slate-800 placeholder-slate-400 font-sans transition-colors"
            required
          />
          <input
            type="email"
            name="correo_cliente"
            value={form.correo_cliente}
            onChange={handleChange}
            placeholder="Email"
            className="w-full text-sm sm:text-base border-b border-slate-200 outline-none py-2 bg-transparent focus:border-[#2652be] text-slate-800 placeholder-slate-400 font-sans transition-colors"
            required
          />
        </div>

        <div className="w-full">
          <textarea
            name="comentario_cliente"
            value={form.comentario_cliente}
            onChange={handleChange}
            placeholder="Cuéntenos los detalles..."
            rows={2}
            className="w-full text-sm sm:text-base border-b border-slate-200 outline-none py-2 bg-transparent resize-none focus:border-[#2652be] text-slate-800 placeholder-slate-400 font-sans transition-colors"
            required
          ></textarea>
        </div>

        {/* CHECKBOX TÉRMINOS Y CONDICIONES CON DESCARGA DE PDF */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="acepto_terminos"
            name="acepto_terminos"
            checked={form.acepto_terminos || false}
            onChange={handleChange}
            className="w-4 h-4 rounded border-slate-300 text-[#2652be] focus:ring-[#2652be] cursor-pointer accent-[#2652be]"
            required
          />
          <label
            htmlFor="acepto_terminos"
            className="text-xs sm:text-sm text-slate-600 font-sans select-none cursor-pointer"
          >
            Acepto los{" "}
            <a
              href={politicas}
              download="Terminos_y_Condiciones_Gestionados.pdf"
              className="text-[#2652be] underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              Términos y Condiciones
            </a>
          </label>
        </div>

        {/* BOTÓN CON ESTILO Y TRANSICIÓN ESTÁNDAR */}
        <div className="pt-2 sm:pt-4 flex justify-start">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 border border-[#2652be] text-[#2652be] text-[11px] font-bold uppercase tracking-widest rounded-none hover:bg-[#2652be] hover:text-white transition-all duration-300 text-center cursor-pointer"
          >
            ENVIAR MENSAJE
          </button>
        </div>
      </form>
    </div>
  </div>
</section>
       {/* 08. MODALIDAD DE TRABAJO */}
          <section
            id="modalidad-trabajo"
            className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto bg-slate-50 border-b border-slate-200 antialiased font-sans overflow-hidden"
          >
            <div className="mb-12 md:mb-16 space-y-4 text-left">
              <span className="text-[10px]  uppercase tracking-[0.15em] bg-slate-900 text-white px-2.5 py-1 rounded-sm font-bold">
                Modelo Híbrido
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#2652be] leading-[1.1]">
                Modalidad de Trabajo
              </h2>
              <p className="text-slate-600 font-light text-sm sm:text-base max-w-3xl leading-relaxed">
                El modelo de gestión de{" "}
                <span className="font-bold text-[#2652be]">Gestionados</span>{" "}
                combina presencia física programada con gestión remota, lo que
                permite optimizar costos sin sacrificar calidad ni
                disponibilidad.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* CARD 1: PRESENCIAL */}
              <div className="modalidad-card bg-white p-6 sm:p-8 rounded-sm border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:border-[#2652be] transition-colors duration-300 min-h-[280px]">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-sm bg-slate-100 flex items-center justify-center text-[#2652be]">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-sans">
                    Presencial
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    Supervisión de áreas, equipos, personal, proveedores y
                    residentes.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-[9px]  uppercase tracking-wider text-slate-400"></div>
              </div>

              {/* CARD 2: REMOTA */}
              <div className="modalidad-card bg-white p-6 sm:p-8 rounded-sm border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:border-[#2652be] transition-colors duration-300 min-h-[280px]">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-sm bg-slate-100 flex items-center justify-center text-[#2652be]">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-sans">
                    Remota
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    <span className="font-semibold text-slate-800">
                      Lunes a viernes de 08:30 a 17:30
                    </span>{" "}
                    — Gestión financiera, cobranza, informes y comunicados.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-[9px]  uppercase tracking-wider text-[#2652be] font-bold">
                  DISPONIBILIDAD DIARIA
                </div>
              </div>

              {/* CARD 3: EMERGENCIAS (DESTACADA) */}
              <div className="modalidad-card bg-[#2652be] p-6 sm:p-8 rounded-sm shadow-md flex flex-col justify-between text-white min-h-[280px]">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center text-white">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-sans">Emergencias</h3>
                  <p className="text-xs sm:text-sm text-blue-100/90 font-light leading-relaxed">
                    Atención disponible las{" "}
                    <span className="font-semibold text-white">
                      24 horas, los 7 días de la semana
                    </span>{" "}
                    para contingencias críticas.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-[9px]  uppercase tracking-wider text-blue-200 font-bold">
                  RESPUESTA 24/7
                </div>
              </div>

              {/* CARD 4: PLATAFORMA DIGITAL */}
              <div className="modalidad-card bg-white p-6 sm:p-8 rounded-sm border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:border-[#2652be] transition-colors duration-300 min-h-[280px]">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-sm bg-slate-100 flex items-center justify-center text-[#2652be]">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-sans">
                    Plataforma digital
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    Acceso permanente a estados de cuenta, requerimientos,
                    reportes y comunicados para directiva y condóminos.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-[9px]  uppercase tracking-wider text-[#2652be] font-bold">
                  TRANSPARENCIA TOTAL
                </div>
              </div>
            </div>
          </section>

      

      {/* ========================================================================= */}
      {/* SECCIONES COMUNES (SE OCULTAN EN LOGIN Y ADMINISTRACIÓN)                  */}
      {/* ========================================================================= */}
      {!ocultarSeccionesComunes && (
        <>

        {/* SECCIÓN MAPA Y OFICINAS CORREGIDA */}
      <section
        id="contacto"
        className="w-full bg-slate-50 py-12 md:py-20 px-4 sm:px-8 lg:px-12 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl bg-white border border-slate-200 shadow-2xl rounded-sm overflow-hidden flex flex-col lg:flex-row items-stretch">
          {/* PARTE AZUL (OFICINAS Y REDES) */}
          <div className="w-full lg:w-5/12 p-10 bg-[#2652be] text-white flex flex-col justify-between min-h-[380px]">
            <div className="space-y-6">
              <span className="text-[9px]  uppercase tracking-[0.2em] text-blue-200 block">
                ¡ENCUÉNTRANOS!
              </span>
              <h2 className="text-4xl font-light leading-tight">
                Nuestras <span className="font-bold">Oficinas</span>
              </h2>
              <div className="w-12 border-b border-white/30 pt-2"></div>

              <div className="space-y-2 pt-4">
                <span className="text-[9px]  uppercase tracking-[0.15em] text-blue-200 block">
                  DIRECCIÓN PRINCIPAL
                </span>
                <p className="text-base font-normal leading-snug">
                  Av. Brasil 39-91 y Granda Centeno <br />
                  <strong className="font-bold border-b border-white/60 pb-0.5">
                    Edificio IACA
                  </strong>
                </p>
                <span className="text-[10px]  tracking-wider text-blue-200 block pt-1">
                  QUITO • ECUADOR
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-8 lg:pt-0">
              <span className="text-[9px]  uppercase tracking-[0.15em] text-blue-200 block">
                CONÉCTATE CON NOSOTROS
              </span>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/gestionados"
                  className="w-9 h-9 border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/25 transition-colors text-white"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/gestionados/"
                  className="w-9 h-9 border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/25 transition-colors text-white"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/gestionadosec/"
                  className="w-9 h-9 border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/25 transition-colors text-white"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* PARTE MEDIOS CORREGIDA DE COMPRESIÓN HORIZONTAL */}
          <div className="w-full lg:w-7/12 flex flex-col lg:flex-row">
            {/* Imagen de la Ubicación */}
            <div className="w-full lg:w-1/2 min-h-[250px] lg:min-h-full">
              <img
                src={fotoUbi}
                alt="Ubicación"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contenedor del Mapa - w-full obliga a no comprimirse a los lados */}
            <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full bg-slate-100">
              <iframe
                title="map"
                className="w-full h-[400px] lg:h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8007356267603!2d-78.49326382620029!3d-0.17010963542227045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a9139c7d977%3A0x7998fce9b673004f!2sEdif.%20IACA%2C%20Av.%20Brasil%2C%20170102%20Quito!5e0!3m2!1ses!2sec!4v1782449427184!5m2!1ses!2sec"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
         

          {/* FOOTER CORPORATIVO */}
          <footer className="w-full bg-[#2652be] text-white px-6 md:px-12 py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex flex-col items-center md:items-start gap-4">
                <img
                  src={logo2}
                  alt="Gestionados"
                  className="h-12 w-auto object-contain"
                />
                <p className=" text-[11px] tracking-widest text-white/90">
                  © 2026. Todos los derechos reservados.
                </p>

                <p className=" text-[11px] tracking-widest text-white/90">
                  Gestionados | MANAGER GSL ADMINISTRADORA EDLIM CIA. LTDA.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* BOTÓN WHATSAPP EXACTO A LA IMAGEN */}
                <a
                  href="https://wa.me/593989198398"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 border border-white/20 bg-white/5 px-6 py-3.5 rounded-none  text-[11px] font-bold tracking-widest transition-colors hover:bg-white/10"
                >
                  {/* Icono de WhatsApp Vectorial Simétrico */}
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.766 0 1.267.411 2.437 1.107 3.393l-.725 2.651 2.715-.712c.915.572 1.996.907 3.16.907 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.766-5.767-5.766zm2.84 8.086c-.15.244-.738.468-1.02.497-.26.027-.51.135-1.636-.312-1.439-.572-2.336-2.03-2.408-2.126-.073-.096-.582-.773-.582-1.474 0-.7.365-1.042.496-1.186.13-.144.286-.18.382-.18.096 0 .192.002.274.006.088.004.206-.034.322.246.12.29.412 1.002.448 1.074.036.072.06.156.012.252-.048.096-.072.156-.144.24-.072.084-.152.188-.217.252-.072.072-.148.15-.064.294.084.144.372.614.8 1.002.552.492 1.02.644 1.164.716.144.072.228.06.312-.036.084-.096.364-.424.46-.57.096-.144.192-.12.324-.072.132.048.836.396.98.468.144.072.24.108.276.168.036.06.036.348-.114.592zM12.004 0C5.378 0 0 5.374 0 12c0 2.112.546 4.164 1.588 5.97L0 24l6.198-1.626c1.762.96 3.756 1.468 5.8 1.468 6.628 0 12.002-5.374 12.002-12 0-3.204-1.248-6.216-3.516-8.484C18.222 1.248 15.21 0 12.004 0z" />
                  </svg>
                  <span>+593 98 919 8398</span>
                </a>

                {/* BOTÓN CORREO EXACTO A LA IMAGEN */}
                <button
                  onClick={manejarCorreo}
                  className="flex items-center justify-center gap-4 border border-white/20 bg-white/5 px-6 py-3.5 rounded-none  text-[11px] font-bold tracking-widest transition-colors hover:bg-white/10"
                >
                  {/* Icono de Correo Vectorial */}
                  <svg
                    className="w-4 h-4 fill-none stroke-current stroke-[1.8] shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>info@gestionadosec.com</span>
                </button>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* 1. BOTÓN FLOTANTE TEST DE GESTIÓN (Izquierda en PC, agrupado a la derecha en celular) */}
<div className="fixed z-50 animate-bounce hover:animate-none transition-all duration-300
  bottom-[152px] right-5            {/* Celular: Arriba del de WhatsApp en la derecha */}
  md:bottom-5 md:left-6 md:right-auto {/* Computadora: Vuelve a la esquina inferior izquierda */}"
>
  <Link
    to="/test"
    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all border border-white/10
      w-14 h-14 px-0                  {/* Celular: Botón circular perfecto */}
      md:w-auto md:h-14 md:px-5 md:gap-2 {/* Computadora: Se estira para mostrar el texto */}"
  >
    {/* Icono de test optimizado y limpio (Se ve excelente en celular y PC) */}
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      className="w-6 h-6 text-white"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9h6M9 13h6M9 17h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 3v18M19 3v18" strokeLinecap="round" opacity="0.3" />
    </svg>
    
    {/* Texto: Solo visible en pantallas medianas (md:) en adelante */}
    <span className="hidden md:inline text-sm tracking-wide font-medium">
      Test de Gestión
    </span>
  </Link>
</div>

{/* 2. BOTÓN FLOTANTE WHATSAPP (Siempre a la derecha) */}
<div className="fixed z-50 animate-bounce hover:animate-none transition-all duration-300
  bottom-20 right-5     {/* Celular: Esquina inferior derecha */}
  md:bottom-5 md:right-6 {/* Computadora: Mantiene su posición */}"
>
  <a
    href="https://wa.me/593989198398"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-emerald-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all border border-white/10"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-7 h-7 text-white"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  </a>
</div>
      
    </div>
  );
}

export default App;
