import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ban1 from '../assets/limpiar.jpg';

import li1 from '../assets/li1.jpg';
import li2 from '../assets/li2.jpg';
import li3 from '../assets/li3.jpg';
import li4 from '../assets/li4.jpg';
import li5 from '../assets/li5.jpg';

import tra1 from '../assets/tra1.jpg';
import tra2 from '../assets/tra2.jpg';

gsap.registerPlugin(ScrollTrigger);

function Limpieza() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const doloresLimpieza = [
  { t: "Personal inestable o ausencias", d: "Personal que no cumple horarios o falta con frecuencia, dejando las áreas comunales desatendidas y sin reemplazos inmediatos.", icon: "users" },
  { t: "Deterioro de áreas y mala imagen", d: "Áreas comunales que pierden brillo y se desgastan debido al uso de productos químicos inadecuados y falta de protocolos técnicos.", icon: "broken-surface" }, // <-- Renombrado para claridad
  { t: "Desgaste en gestión de personal", d: "La directiva termina absorbiendo el rol de supervisor, controlando horarios, lidiando con quejas y resolviendo conflictos diarios.", icon: "user-cog" },
  { t: "Riesgo patronal y laboral real", d: "Exposición a demandas, liquidaciones costosas, reclamos de vacaciones o afiliaciones incompletas que recaen sobre la directiva.", icon: "scale" },
  { t: "Falta de control y supervisión", d: "Inexistencia de bitácoras o checklists. Nadie audita formalmente qué se limpió, cuándo se hizo y bajo qué estándar de calidad.", icon: "shield-alert" },
  { t: "Pérdida de plusvalía del condominio", d: "Un condominio con accesos, lobbies o parqueaderos descuidados reduce el valor de renta y compra.", icon: "trending-down" }
];

  const bloquesServicio = [
    {
      id: "BLOQUE 1",
      titulo: "Personal de Limpieza Calificado",
      descBreve: "Selección rigurosa y perfiles adaptados a la infraestructura de su copropiedad.",
      items: [
        "Perfiles adecuados y validados según el tipo, tamaño y flujo de su condominio.",
        "Sustituciones garantizadas de manera inmediata en caso de ausencias, permisos o enfermedades.",
        "Capacitación continua en el uso correcto de insumos técnicos, diluciones y equipos industriales.",
        "Personal uniformado e identificado con equipos de protección personal completos."
      ]
    },
    {
      id: "BLOQUE 2",
      titulo: "Plan Técnico de Limpieza",
      descBreve: "Operación planificada por frecuencias para mitigar el desgaste de materiales.",
      items: [
        "Rutinas estructuradas con tareas diarias, semanales y mensuales obligatorias.",
        "Checklists detallados por áreas específicas: lobbies, pasillos, escaleras, parqueaderos, zonas húmedas y jardineras.",
        "Adaptación del plan a la realidad operativa y flujos de tránsito particulares de cada copropiedad.",
        "Uso de productos específicos según el tipo de piso y superficie para evitar manchas y pérdida de brillo."
      ]
    },
    {
      id: "BLOQUE 3",
      titulo: "Supervisión y Control Activo",
      descBreve: "Inspección constante en campo para asegurar el estándar de calidad contratado.",
      items: [
        "Visitas periódicas de supervisión técnica sin previo aviso para control de calidad.",
        "Emisión de reportes de cumplimiento y estado general directo a la administración o directiva.",
        "Canales de comunicación claros y digitales para el reporte inmediato de incidencias.",
        "Mapeo de indicadores de gestión y control de asistencia riguroso."
      ]
    },
    {
      id: "BLOQUE 4",
      titulo: "Cumplimiento Laboral Absoluto",
      descBreve: "Cero fricciones legales. Blindaje patronal total para los copropietarios.",
      items: [
        "Contratación formal de todo el personal directamente bajo la nómina de Gestionados.",
        "Garantía de afiliación obligatoria al IESS y pago oportuno de todos los beneficios de ley.",
        "Gestión integral de vacaciones, licencias, permisos médicos, reemplazos y liquidaciones.",
        "Absorción total de la responsabilidad solidaria bajo el cumplimiento estricto normativo."
      ]
    }
  ];

  const pasosTrabajo = [
    { paso: "1. Diagnóstico", titulo: "Evaluación técnica", desc: "Inspección en sitio de las áreas comunales, horarios de uso, necesidades especiales (zonas húmedas, parqueaderos) y cálculo de insumos requeridos." },
    { paso: "2. Propuesta", titulo: "Diseño del Plan", desc: "Definición exacta de frecuencias, horarios óptimos, perfiles sugeridos del personal y estructuración del presupuesto optimizado." },
    { paso: "3. Ejecución", titulo: "Implementación", desc: "Asignación del personal seleccionado, inducción detallada sobre las normas del condominio y entrega de checklists de control diario." },
    { paso: "4. Control", titulo: "Seguimiento", desc: "Supervisión técnica periódica en campo, apertura de canales digitales para feedback de la directiva y ajustes dinámicos según necesidades." }
  ];

  const faqsLimpieza = [
    { q: "¿Qué incluye exactamente el servicio de limpieza de áreas comunales en mi condominio?", a: "Incluimos limpieza y desinfección periódica de pasillos, escaleras, halls, parqueaderos, áreas verdes, zonas de juego y áreas sociales, de acuerdo con un plan definido para su condominio. Adaptamos la frecuencia por tipo de área y nivel de tráfico de personas, para mantener siempre una buena presentación y reducir riesgos sanitarios." },
    { q: "¿Qué beneficios tiene tercerizar la limpieza con una empresa administradora en Quito, Tumbaco o Cumbayá?", a: "La tercerización con una empresa administradora profesional reduce riesgos laborales, mejora el cumplimiento legal y simplifica la gestión de la directiva. Además, permite estandarizar procesos, controlar calidad del servicio y reemplazar al personal cuando es necesario sin que la directiva tenga que gestionar contrataciones o despidos." },
    { q: "¿Cómo se define el costo del servicio de limpieza para mi condominio o conjunto residencial?", a: "El costo se define según el tamaño del condominio, número de áreas comunales, frecuencia de limpieza requerida y nivel de complejidad de la operación. En un diagnóstico inicial, revisamos áreas, necesidades específicas y presupuesto disponible para proponer un plan claro y sin sorpresas." },
    { q: "¿Cuántas veces por semana se debe limpiar un condominio?", a: "Según el tamaño: conjuntos pequeños (hasta 30 unidades) pueden requerir 3 días por semana; conjuntos medianos (31-80 unidades) entre 4 y 5 días; conjuntos grandes requieren cobertura diaria." },
    { q: "¿Es mejor contratar limpieza directa o a través de la administradora?", a: "Contratar la limpieza a través de la administradora elimina por completo el riesgo patronal y la carga administrativa para la directiva, centralizando la supervisión y los reportes en un solo canal." },
    { q: "¿Qué riesgos laborales implica contratar personal de limpieza directamente?", a: "El riesgo patronal en Ecuador es real: accidentes de trabajo, afiliación al IESS, liquidaciones, Mandato 8, y responsabilidad civil de los miembros de la directiva como empleadores directos." },
    { q: "¿Qué diferencia hay entre limpieza básica y limpieza profunda?", a: "La limpieza básica cubre las rutinas diarias o semanales de mantenimiento. La limpieza profunda incluye desinfección profunda de superficies, limpieza de vidrios exteriores, pulido de pisos, mantenimiento de áreas de difícil acceso, etc." },
    { q: "¿Cómo saber si el servicio de limpieza en mi condominio es de calidad?", a: "Para evaluar la calidad se deben auditar indicadores como reportes de cumplimiento diario, asistencia, supervisiones periódicas y satisfacción. En Gestionados garantizamos este estándar eliminando la improvisación con entregables digitales y reportes en tiempo real." },
    { q: "¿Una empresa administradora puede proveer también el servicio de limpieza?", a: "Sí, y las ventajas de tenerlo integrado son: un solo proveedor, coordinación directa, supervisión técnica incluida, facturación simplificada, reducción de riesgo patronal y mejor comunicación entre ambos servicios." }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-limpieza-anim", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }
      );

      gsap.fromTo(".dolor-limpieza-card", 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: { 
            trigger: "#dolores-limpieza-sec", 
            start: "top 92%", 
            toggleActions: "play none none none",
            once: true 
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        }
      );

      gsap.fromTo(".paso-limpieza-anim", 
        { x: -20, opacity: 0 },
        {
          scrollTrigger: { 
            trigger: "#pasos-limpieza-sec", 
            start: "top 92%", 
            once: true 
          },
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }, containerRef);

    window.addEventListener("resize", ScrollTrigger.refresh);
    
    return () => {
      clearTimeout(timer);
      ctx.revert();
      window.removeEventListener("resize", ScrollTrigger.refresh);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      
      className="w-full antialiased bg-white text-slate-600 selection:bg-[#2652be] selection:text-white overflow-hidden"
    >
     {/* 00. HERO BANNER - LIMPIEZA */}
<section className="w-full py-24 sm:py-32 md:py-36 px-4 sm:px-6 lg:px-12 relative overflow-hidden text-white min-h-[500px] flex items-center">
  
  {/* FOTO DE FONDO CON ANIMACIÓN GSAP DIRECTA EN EL ATRIBUTO REF */}
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
    <img 
    loading="eager"
      fetchPriority="high"
      src={ban1} 
      alt="Limpieza de áreas comunes"
      ref={(el) => {
        if (el) {
          gsap.to(el, {
            scale: 1.12,
            duration: 18,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        }
      }}
      className="w-full h-full object-cover object-center select-none pointer-events-none will-change-transform"
    />
  </div>

  {/* CAPA SUTIL FOCALIZADA DETRÁS DEL TEXTO */}
  <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

  {/* CONTENIDO DEL HERO */}
  <div className="max-w-7xl mx-auto relative z-20 w-full">
    <div className="my-auto max-w-4xl space-y-6 select-none relative">
      
      {/* TÍTULO PRINCIPAL (Un apenitas más grande) */}
      <h1 
        style={{ 
          textShadow: '0 4px 28px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.85)' 
        }}
        className="hero-limpieza-anim text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.12]"
      >
        Limpieza de áreas comunes
      </h1>

      {/* DESCRIPCIÓN PEQUEÑA (Un apenitas más grande) */}
      <p 
        style={{ 
          textShadow: '0 2px 14px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9)' 
        }}
        className="hero-limpieza-anim text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl pt-2 text-slate-100 opacity-95"
      >
        Limpieza técnica para condominios en Quito, Tumbaco y Cumbayá. Equipos entrenados, supervisión constante y cero riesgos laborales para su directiva.
      </p>

    </div>
  </div>
</section>
      {/* 01. SECCIÓN DE DOLORES */}
<section id="dolores-limpieza-sec" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white border-b border-slate-100">
  <div className="max-w-7xl mx-auto">
    <div className="max-w-3xl mb-10 sm:mb-14 space-y-2">
      <h2 className="text-xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2652be] leading-[1.2]">
        Problemas frecuentes cuando la <br className="hidden sm:inline" />
        <span className="text-[#2652be] font-normal">limpieza no está profesionalizada.</span>
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed tracking-wide">
        La directiva no debería estar gestionando personas de forma directa ni asumiendo riesgos patronales innecesarios.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
  {doloresLimpieza?.map((dolor, i) => (
    <div 
      key={i} 
      className="dolor-limpieza-card p-5 sm:p-6 bg-[#2652be] rounded-2xl flex flex-col justify-start h-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
    >
      {/* Contenedor del Icono Dinámico */}
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-white shrink-0">
        
        {/* Personal / Usuarios */}
        {dolor.icon === "users" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}

        {/* Deterioro de Áreas y Mala Imagen (Superficie Aagrietada / Desgaste) */}
        {(dolor.icon === "broken-surface" || dolor.icon === "sparkles-off") && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l-2 5 4 3-3 5 3 5" />
          </svg>
        )}

        {/* Gestión de Personal / Supervisión Operativa */}
        {dolor.icon === "user-cog" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11l1.5 1.5m0-3L19 11m-8-8l1.5 1.5" />
          </svg>
        )}

        {/* Legal / Balanza */}
        {dolor.icon === "scale" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        )}

        {/* Control / Escudo de Audítoria */}
        {dolor.icon === "shield-alert" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )}

        {/* Pérdida de Plusvalía / Flecha Abajo */}
        {dolor.icon === "trending-down" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
          </svg>
        )}
      </div>

      {/* Textos Informativos */}
      <div className="flex-1 flex flex-col justify-start">
        <h3 className="text-base sm:text-lg font-medium tracking-tight text-white mb-2 leading-snug min-h-[3rem] sm:min-h-[3.5rem] flex items-center">
          {dolor.t}
        </h3>
        <p className="text-xs sm:text-sm text-blue-100/90 font-light leading-relaxed tracking-wide">
          {dolor.d}
        </p>
      </div>

    </div>
  ))}
</div>
  </div>
</section>

      {/* 02. INTERACTIVA DE BLOQUES (QUÉ INCLUYE) */}
<section id="bloques-servicio-sec" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-blue-50/20 border-b border-blue-100/50">
  <div className="max-w-7xl mx-auto">
    
    {/* Título de la Sección */}
    <div className="mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[#2652be] leading-[1.2]">
        ¿Qué incluye el <span className="font-normal">servicio?</span>
      </h2>
    </div>

    {/* Botones de Navegación Responsive */}
    <div className="flex overflow-x-auto whitespace-nowrap border border-blue-100 bg-white rounded-xl p-1.5 gap-2 mb-6 scrollbar-none snap-x snap-mandatory shadow-sm">
      {bloquesServicio.map((bloque, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(idx)}
          className={`inline-block flex-1 min-w-[155px] sm:min-w-0 py-3 px-4 text-xs font-normal tracking-wide transition-all duration-300 rounded-lg text-center border snap-center ${
            activeTab === idx 
              ? "bg-[#2652be] text-white border-[#2652be] shadow-xs" 
              : "text-blue-900/40 border-transparent hover:text-[#2652be] hover:bg-blue-50/50"
          }`}
        >
          {bloque.titulo.split(" ")[0]}
        </button>
      ))}
    </div>

    {/* Contenedor de Información Adaptable */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      
      {/* Bloque Principal Izquierdo */}
      <div className="lg:col-span-8 bg-white border border-blue-100 p-6 sm:p-8 lg:p-10 rounded-xl flex flex-col justify-between shadow-sm">
        {bloquesServicio?.[activeTab] ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 mb-5 pb-4 border-b border-blue-50">
              <span className="w-max text-[10px] font-normal text-[#2652be] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md tracking-wider shrink-0">
                {bloquesServicio[activeTab].id}
              </span>
              <h3 className="text-base sm:text-lg md:text-xl font-normal tracking-tight text-[#2652be]">
                {bloquesServicio[activeTab].titulo}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3.5 mt-4">
              {bloquesServicio[activeTab].items?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-1.5 rounded-lg hover:bg-blue-50/30 transition-colors">
                  <div className="w-5 h-5 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-normal text-[#2652be]">{idx + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-950/80 font-light leading-relaxed tracking-wide">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Bloque Lateral Derecho con Fotos Vivas Únicas */}
      <div className="lg:col-span-4 bg-slate-900 text-white p-6 sm:p-8 rounded-xl flex flex-col justify-between relative overflow-hidden border border-slate-200 shadow-sm min-h-[340px] lg:min-h-auto">
        {bloquesServicio?.[activeTab] ? (
          <>
            {/* Imagen de fondo viva y real según la pestaña activa */}
            <div className="absolute inset-0 z-0">
              <img 
                src={
                  bloquesServicio[activeTab].imagenUrl || 
                  (activeTab === 0 ? "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" : // Limpieza / Áreas Comunes
                   activeTab === 1 ? li1 : // Mantenimiento / Técnico
                   activeTab === 2 ? li2 : // Supervisión / Control
                                     li3)  // Infraestructura / Condominios
                } 
                alt={bloquesServicio[activeTab].titulo}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Degradado negro mínimo para asegurar lectura limpia abajo */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20" />
            </div>

            {/* Contenido Superior en el Frente */}
            <div className="relative z-10 space-y-4">
              <p className="text-xs sm:text-sm text-white font-light leading-relaxed italic border-l-2 border-blue-400 pl-3.5 py-0.5 drop-shadow-md">
                "{bloquesServicio[activeTab].descBreve}"
              </p>
              <p className="text-xs text-slate-100 font-light pt-4 leading-relaxed tracking-wide border-t border-white/10 drop-shadow-xs">
                Planificación milimétrica que evita el desgaste prematuro de la infraestructura y garantiza la presentación óptima diaria del condominio.
              </p>
            </div>

            {/* Contenido Inferior en el Frente */}
            <div className="relative z-10 pt-4 border-t border-white/10 mt-8 lg:mt-0">
              <span className="text-[10px] tracking-widest text-slate-300 font-mono block drop-shadow-xs">
                Estrategia / {bloquesServicio[activeTab].id}
              </span>
            </div>
          </>
        ) : null}
      </div>

    </div>
  </div>
</section>
{/* 04. ENFOQUE EN RIESGO LABORAL (BLOQUE CLAVE) */}
<section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white border-b border-blue-100">
  <div className="max-w-7xl mx-auto">
    
    <div className="bg-[#2652be] border border-[#2652be]/20 p-6 sm:p-10 lg:p-12 rounded-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center shadow-sm">
      
      {/* Columna Izquierda: Contenido Principal */}
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-[1.15]">
          Limpieza sin riesgo patronal <br className="hidden sm:inline" />
          <span className="font-normal text-blue-100">para la directiva.</span>
        </h2>
        <p className="text-xs sm:text-sm text-blue-100/90 font-light leading-relaxed max-w-xl tracking-wide">
          Gestionados asume la relación laboral con el personal de limpieza. El condominio paga una factura de servicio, no sueldos ni beneficios de manera directa.
        </p>
      </div>

      {/* Columna Derecha: Puntos Clave */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        <div className="bg-white border border-blue-100 p-5 rounded-xl shadow-xs">
          <span className="w-2 h-2 bg-[#2652be]/80 inline-block rounded-full mb-2" />
          <h4 className="text-[#2652be] tracking-tight font-normal text-sm mb-1">Eliminación del rol de “empleador” para el condominio.</h4>
        </div>
        
        <div className="bg-white border border-blue-100 p-5 rounded-xl shadow-xs">
          <span className="w-2 h-2 bg-[#2652be]/80 inline-block rounded-full mb-2" />
          <h4 className="text-[#2652be] tracking-tight font-normal text-sm mb-1">Manejo profesional de nómina, permisos, licencias y liquidaciones.</h4>
          
        </div>

        <div className="bg-white border border-blue-100 p-5 rounded-xl shadow-xs">
          <span className="w-2 h-2 bg-[#2652be]/80 inline-block rounded-full mb-2" />
          <h4 className="text-[#2652be] tracking-tight font-normal text-sm mb-1">Reducción del riesgo de inspecciones y demandas laborales.</h4>
          
        </div>
      </div>

    </div>

  </div>
</section>

{/* 04. CÓMO TRABAJAMOS (TARJETAS ENCUADRADAS CON VIÑETAS DETALLADAS) */}
<section id="pasos-limpieza-sec" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white border-b border-slate-100">
  <div className="max-w-7xl mx-auto">
    
    {/* Título de la Sección */}
    <div className="mb-12 sm:mb-16">
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[#2652be] leading-[1.2]">
        ¿Cómo trabajamos?
      </h2>
    </div>

    {/* Grid de Pasos */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Paso 1: Diagnóstico */}
      <div className="p-4 rounded-xl border border-[#2652be]/30 bg-white shadow-xs flex flex-col justify-between">
        <div className="space-y-4">
          <div className="w-full h-44 rounded-lg overflow-hidden relative shadow-2xs">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80" 
              alt="Diagnóstico del condominio" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200/40 shadow-sm">
              <span className="text-sm font-normal text-[#2652be] font-mono">01</span>
            </div>
          </div>
          
          <div className="space-y-3 px-1 pb-2">
            <div>
              <span className="text-[10px] text-[#2652be]/70 font-light tracking-widest uppercase block">Fase 01</span>
              <h3 className="text-base font-normal tracking-tight text-[#2652be] border-b border-slate-100/80 pb-2">
                Diagnóstico del condominio
              </h3>
            </div>
            <ul className="space-y-2 pt-1">
              {[
                "Áreas comunales.",
                "Horarios de uso.",
                "Necesidades especiales (zonas húmedas, jardines, parqueaderos).",
                "Cantidad de insumos."
              ].map((sub, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500 font-light leading-relaxed tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2652be]/70 shrink-0 mt-1.5" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Paso 2: Propuesta */}
      <div className="p-4 rounded-xl border border-[#2652be]/30 bg-white shadow-xs flex flex-col justify-between">
        <div className="space-y-4">
          <div className="w-full h-44 rounded-lg overflow-hidden relative shadow-2xs">
            <img 
              src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=500&q=80" 
              alt="Propuesta de plan de limpieza" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200/40 shadow-sm">
              <span className="text-sm font-normal text-[#2652be] font-mono">02</span>
            </div>
          </div>
          
          <div className="space-y-3 px-1 pb-2">
            <div>
              <span className="text-[10px] text-[#2652be]/70 font-light tracking-widest uppercase block">Fase 02</span>
              <h3 className="text-base font-normal tracking-tight text-[#2652be] border-b border-slate-100/80 pb-2">
                Propuesta de plan de limpieza
              </h3>
            </div>
            <ul className="space-y-2 pt-1">
              {[
                "Frecuencia.",
                "Horario.",
                "Perfil del personal."
              ].map((sub, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500 font-light leading-relaxed tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2652be]/70 shrink-0 mt-1.5" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Paso 3: Implementación */}
      <div className="p-4 rounded-xl border border-[#2652be]/30 bg-white shadow-xs flex flex-col justify-between">
        <div className="space-y-4">
          <div className="w-full h-44 rounded-lg overflow-hidden relative shadow-2xs">
            <img 
              src={tra1} 
              alt="Implementación" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200/40 shadow-sm">
              <span className="text-sm font-normal text-[#2652be] font-mono">03</span>
            </div>
          </div>
          
          <div className="space-y-3 px-1 pb-2">
            <div>
              <span className="text-[10px] text-[#2652be]/70 font-light tracking-widest uppercase block">Fase 03</span>
              <h3 className="text-base font-normal tracking-tight text-[#2652be] border-b border-slate-100/80 pb-2">
                Implementación
              </h3>
            </div>
            <ul className="space-y-2 pt-1">
              {[
                "Asignación de personal.",
                "Inducción a las reglas del condominio.",
                "Entrega de checklists."
              ].map((sub, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500 font-light leading-relaxed tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2652be]/70 shrink-0 mt-1.5" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Paso 4: Seguimiento */}
      <div className="p-4 rounded-xl border border-[#2652be]/30 bg-white shadow-xs flex flex-col justify-between">
        <div className="space-y-4">
          <div className="w-full h-44 rounded-lg overflow-hidden relative shadow-2xs">
            <img 
              src={tra2} 
              alt="Seguimiento" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200/40 shadow-sm">
              <span className="text-sm font-normal text-[#2652be] font-mono">04</span>
            </div>
          </div>
          
          <div className="space-y-3 px-1 pb-2">
            <div>
              <span className="text-[10px] text-[#2652be]/70 font-light tracking-widest uppercase block">Fase 04</span>
              <h3 className="text-base font-normal tracking-tight text-[#2652be] border-b border-slate-100/80 pb-2">
                Seguimiento
              </h3>
            </div>
            <ul className="space-y-2 pt-1">
              {[
                "Supervisión periódica.",
                "Canal para feedback de la directiva.",
                "Ajustes del plan según necesidad."
              ].map((sub, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500 font-light leading-relaxed tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2652be]/70 shrink-0 mt-1.5" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>
{/* 05. QUÉ GANA EL CONDOMINIO, MEJOR JUNTOS & CONTRATACIÓN (DISEÑO PREMIUM CON BORDES Y TÍTULOS EN AZUL) */}
<section className="w-full py-16 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-slate-100">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-stretch">
      
      {/* 1. Qué gana el condominio */}
      <div className="space-y-8 flex flex-col justify-between p-6 rounded-2xl border border-[#2652be]/30 bg-white">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[#2652be] leading-[1.2]">
            ¿Qué gana el <br /> 
            <span className="font-normal text-[#2652be]">condominio?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light tracking-wide">
            Beneficios inmediatos en la convivencia y el mantenimiento diario.
          </p>
        </div>
        
        <div className="space-y-2 flex-1 pt-4">
          {[
            "Áreas limpias y ordenadas todos los días.",
            "Imagen cuidada frente a residentes y visitas.",
            "Menos quejas y conflictos por limpieza.",
            "Directiva sin desgaste en gestión de personal.",
            "Reducción del riesgo de problemas laborales.",
            "Mayor valor percibido del condominio."
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start py-3.5 px-2 border-b border-slate-100/70">
              <svg className="w-4 h-4 text-[#2652be] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-xs sm:text-sm text-slate-600 font-light tracking-wide">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Mejor juntos: Administración + Limpieza */}
      <div className="space-y-8 p-6 sm:p-8 rounded-2xl border border-[#2652be]/30 bg-white flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2652be] leading-[1.2]">
            Mejor juntos: <br />
            <span className="font-normal text-[#2652be]">administración + limpieza</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed tracking-wide">
            Cuando administramos y limpiamos, hay un solo responsable de la experiencia diaria del condominio. Eso simplifica decisiones, seguimiento y resultados.
          </p>
        </div>
        
        <div className="space-y-4 flex-1 pt-6">
  {[
    {
    text: "Coordinación directa entre administración y limpieza.",
    icon: (
      <svg className="w-5 h-5 text-[#2652be] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        {/* Ícono de Sinergia / Coordinación (Manos/Unión) */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    text: "Mayor eficiencia en reportar y resolver incidencias.",
    icon: (
      <svg className="w-5 h-5 text-[#2652be] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        {/* Ícono de Eficiencia / Rayo o Solución Rápida */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    text: "Un solo canal de comunicación para la directiva.",
    icon: (
      <svg className="w-5 h-5 text-[#2652be] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        {/* Ícono de Comunicación Centralizada (Megáfono / Canal) */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    )
  }
  ].map((item, i) => (
    <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-[#2652be]/20 shadow-2xs">
      <div className="w-5 h-5 rounded-full bg-[#2652be]/10 flex items-center justify-center shrink-0">
        {item.icon}
      </div>
      <p className="text-xs sm:text-sm text-slate-600 font-light tracking-wide leading-snug">{item.text}</p>
    </div>
  ))}
</div>
      </div>

      {/* 3. Formatos de contratación */}
      <div className="space-y-8 flex flex-col justify-between p-6 rounded-2xl border border-[#2652be]/30 bg-white">
        <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2652be] leading-[1.2]">
          Formatos de <br />
          <span className="font-normal text-[#2652be]">contratación</span>
        </h3>
        
        <div className="space-y-6 flex-1 pt-2 grid grid-cols-1">
  {/* Opción A */}
  <div className="rounded-xl border border-[#2652be]/30 bg-white shadow-xs overflow-hidden flex flex-col justify-between">
    {/* Imagen grande en la mitad superior */}
    <div className="w-full h-40 relative shrink-0">
      <img 
        src={li4} 
        alt="Limpieza independiente"
        className="w-full h-full object-cover"
      />
    </div>
    
    {/* Bloque de Contenido Inferior */}
    <div className="p-5 space-y-3 flex-1 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h4 className="text-base font-normal tracking-tight text-[#2652be]">
          Limpieza independiente
        </h4>
        <span className="text-[9px] uppercase tracking-widest text-[#2652be] font-mono font-bold bg-blue-50 px-2 py-0.5 rounded-sm border border-[#2652be]/10">
          Opción A
        </span>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed tracking-wide">
        Contratación exclusiva del servicio de limpieza técnica y mantenimiento para el conjunto residencial.
      </p>
    </div>
  </div>

  {/* Opción B */}
  <div className="rounded-xl border border-[#2652be]/30 bg-white shadow-xs overflow-hidden flex flex-col justify-between">
    {/* Imagen grande en la mitad superior */}
    <div className="w-full h-40 relative shrink-0">
      <img 
        src={li5} 
        alt="Limpieza integrada"
        className="w-full h-full object-cover"
      />
    </div>
    
    {/* Bloque de Contenido Inferior */}
    <div className="p-5 space-y-3 flex-1 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h4 className="text-base font-normal tracking-tight text-[#2652be]">
          Limpieza integrada
        </h4>
        <span className="text-[9px] uppercase tracking-widest text-[#2652be] font-mono font-bold bg-blue-50 px-2 py-0.5 rounded-sm border border-[#2652be]/10">
          Opción B
        </span>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed tracking-wide">
        Servicio unificado y centralizado dentro del contrato global de administración del condominio.
      </p>
    </div>
  </div>
</div>
      </div>

    </div>
  </div>
</section>

{/* 07. SECCIÓN DE ACORDEONES FAQ (CONTRASTE AZUL) */}
<section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#2652be] text-white">
  <div className="max-w-3xl mx-auto">
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white leading-[1.2]">
        Preguntas y <span className="font-normal text-blue-100">Respuestas de Limpieza</span>
      </h2>
    </div>

    <div className="space-y-3">
      {faqsLimpieza.map((faq, idx) => {
        const isOpen = openFaq === idx;
        return (
          <div 
            key={idx} 
            className={`border rounded-xl overflow-hidden transition-all duration-300 ${
              isOpen 
                ? "border-blue-300/30 bg-[#1e3fa1]" 
                : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            <button
              onClick={() => setOpenFaq(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors focus:outline-none"
            >
              <span className="text-xs sm:text-sm font-normal tracking-wide text-white pr-4 leading-relaxed">
                {faq.q}
              </span>
              <span className={`text-blue-200 font-light text-base shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                {isOpen ? "－" : "＋"}
              </span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen 
                  ? "max-h-[500px] border-t border-white/10 bg-[#19358a]/40 p-4 sm:p-5" 
                  : "max-h-0 p-0 pointer-events-none"
              }`}
            >
              <p className="text-xs sm:text-sm text-blue-100/90 font-light leading-relaxed tracking-wide">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
    </div>
  );
}

export default Limpieza;