import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ban1 from '../assets/nosotrosFot.jpg'

import ad1 from '../assets/ad1.jpeg';
import ad2 from '../assets/ad2.jpeg';
import ad3 from '../assets/ad3.jpeg';

import di1 from '../assets/di1.jpg';
import di2 from '../assets/di2.jpg';
import di3 from '../assets/di3.jpg';

gsap.registerPlugin(ScrollTrigger);

function Servicios() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const ejesServicios = [
    {
      id: "EJE 1",
      titulo: "Control Financiero y Cobranza",
      descBreve: "La morosidad no se resuelve con recordatorios aislados; se controla con seguimiento, criterio y trazabilidad.",
      items: [
        "Presupuesto anual detallado por rubro, justificado y aprobado en asamblea de copropietarios.",
        "Fondo de reserva obligatorio del 5% constituido y monitoreado conforme al art. 31 del RGLPH.",
        "Recaudo 100% bancario: alícuotas y gastos solo por transferencia o depósito, sin manejo de efectivo.",
        "Protocolo de cobranza en 3 etapas: notificación formal, mediación profesional con validez legal y acción judicial.",
        "Informes financieros mensuales conciliados con el estado de cuenta del condominio, más reportes de morosidad para seguimiento de cartera.",
        "Plataforma digital con acceso en tiempo real a estados de cuenta, informes económicos y recibos actualizados.",
      ],
      imagen: ad1,
    },
    {
      id: "EJE 2",
      titulo: "Operación Activa",
      descBreve: "Operación activa, no administración de escritorio. Convertimos a Gestionados en el socio estratégico de su directiva.",
      items: [
        "Supervisión presencial programada de áreas comunales, equipos y amenidades.",
        "Checklist mensual y bitácoras de mantenimiento para control preventivo y seguimiento operativo.",
        "Implementación de calendarios de mantenimiento preventivo conforme a especificaciones del fabricante.",
        "Supervisión y capacitación del personal propio del conjunto, cuando exista.",
        "Trabajo exclusivo con personal técnico calificado y proveedores certificados.",
        "Tiempo de respuesta de hasta 12 horas a requerimientos y solicitudes de residentes.",
        "Aplicación del reglamento interno, mediación y elaboración de normas de convivencia para neutralizar conflictos.",
        "Auditoría mensual a la compañía de seguridad: verificación de permisos, acreditaciones y aportes al IESS, en cumplimiento del Mandato Constituyente No. 8.",
        "Presentación de proyectos de mejora continua para elevar la competitividad y la plusvalía del conjunto.",
      ],
      imagen:ad2,
    },
    {
      id: "EJE 3",
      titulo: "Cumplimiento Legal y Control Documental",
      descBreve: "No esperamos a que el problema escale; lo detectamos, lo coordinamos y lo cerramos.",
      items: [
        "Gestión de actas, convocatorias y documentación de asambleas ordinarias y extraordinarias conforme a la Ley de Propiedad Horizontal and su reglamento.",
        "Gestión y seguimiento del seguro obligatorio contra incendios conforme al Art. 16 de la LPH.",
        "Vigilancia del cumplimiento de obligaciones laborales, tributarias y de seguridad social del personal propio del conjunto.",
        "Aplicación rigurosa del Mandato Constituyente No. 8 en servicios tercerizados para proteger responsabilidad solidaria.",
        "Implementación del Plan de Autoprotección y simulacros de evacuación conforme a la normativa del Cuerpo de Bomberos del DMQ.",
        "Garantía de validez jurídica de las decisiones adoptadas en asamblea, reduciendo riesgos de nulidad o impugnación.",
      ],
      imagen:ad3,
    },
  ];

  const planPasos = [
    {
      mes: "Mes 1",
      titulo: "Diagnóstico y ordenamiento",
      desc: "Regularización legal inicial (acta, nombramientos, RUC y actualización de datos con servicios/proveedores). Inventario y estado general del condominio. Base de datos de copropietarios and arrendatarios. Auditoría documental inicial sin costo adicional de contratos, proveedores y servicios complementarios. Implementación de plataforma y capacitación a residentes.",
    },
    {
      mes: "Mes 2",
      titulo: "Análisis y planificación",
      desc: "Evaluación de costos y cotizaciones de servicios. Análisis de cartera vencida. Elaboración de presupuesto del periodo. Planificación operativa y financiera.",
    },
    {
      mes: "Mes 3",
      titulo: "Asamblea de regularización",
      desc: "Resultados de auditoría documental y del estado real del conjunto. Presentación y aprobación del presupuesto y planificación del periodo. Propuesta de acciones de cobranza y decisiones económicas a aprobar.",
    },
    {
      mes: "Meses 4-12",
      titulo: "Ejecución y control",
      desc: "Ejecución del presupuesto aprobado. Gestión permanente de cobranza, mantenimiento, proveedores, residentes y cumplimiento legal. Ejecución de resoluciones aprobadas en asamblea. Presentación de propuestas de mejora para el conjunto.",
    },
  ];

  const entregables = [
  { 
    title: "Informe económico conciliado con el estado de cuenta del condominio", 
    icon: "bank" 
  },
  { 
    title: "Informe de actividades", 
    icon: "report" 
  },
  { 
    title: "Reportes de morosidad para control y seguimiento de cartera", 
    icon: "users" 
  },
  { 
    title: "Checklist mensuales y bitácoras de mantenimiento", 
    icon: "log" 
  },
  { 
    title: "Soporte documental de pagos, recibos y novedades de gestión", 
    icon: "shield" 
  },
  { 
    title: "Documentación administrativa cuando corresponda", 
    icon: "legal" 
  }
];

  const dolores = [
  { 
    t: "Morosidad y cobranza débil", 
    d: "Cuando no existe un protocolo formal de seguimiento, la cartera vencida crece y reduce la liquidez del condominio.", 
    icon: "wallet" 
  },
  { 
    t: "Falta de transparencia financiera", 
    d: "Si no hay trazabilidad, estados de cuenta claros y control documental, la directiva queda expuesta frente a condóminos y asamblea.", 
    icon: "file-search" // <-- Este es el cambio
  },
  { 
    t: "Mantenimiento reactivo y costoso", 
    d: "Cuando no existe control preventivo, los daños se corrigen tarde y con mayor costo.", 
    icon: "wrench" 
  },
  { 
    t: "Pérdida de plusvalía", 
    d: "Cuando el condominio pierde valor en el tiempo por falta de gestión y planificación.", 
    icon: "trending-down" 
  },
  { 
    t: "Desgaste operativo de la directiva", 
    d: "La directiva termina resolviendo tareas que no le corresponden: proveedores, quejas, cobros, conflictos y seguimientos diarios.", 
    icon: "users" 
  },
  { 
    t: "Exposición legal y normativa", 
    d: "La ausencia de control sobre póliza contra incendios, fondo de reserva, contratos, IESS, servicios complementarios o requisitos de Bomberos incrementa el riesgo.", 
    icon: "scale" 
  }
];

  const faqs = [
    { q: "¿Qué hace una empresa administradora de condominios?", a: "Una empresa administradora de condominios en Quito se encarga de la gestión financiera, operativa y legal del edificio o conjunto, coordinando pagos, mantenimiento, proveedores y cumplimiento normativo para la directiva y los copropietarios." },
    { q: "¿Qué incluye la administración de condominios?", a: "Incluye manejo de cuotas y morosidad, elaboración de presupuestos y estados financieros, coordinación de mantenimiento y limpieza de áreas comunes, contratación y supervisión de proveedores, asambleas, actas y cumplimiento de obligaciones legales y laborales." },
    { q: "¿Cómo elegir una empresa administradora en Quito?", a: "Se debe revisar su experiencia comprobable en la ciudad, referencias de otros condominios, claridad en sus reportes financieros, formalidad legal, cobertura en la zona (Quito norte, Tumbaco, Cumbayá) y tiempos de respuesta ante incidentes." },
    { q: "¿Qué riesgos evita una administración profesional?", a: "Reduce riesgos de desorden financiero, morosidad alta, conflictos internos, deterioro de las áreas comunes, demandas laborales o legales y mala gestión de proveedores que afecten el patrimonio del edificio." },
    { q: "¿Cuánto cuesta la administración de un condominio con Gestionados?", a: "Nuestros honorarios dependen del tamaño del condominio, el número de unidades y los servicios contratados. Ofrecemos un diagnóstico gratuito para presentar una propuesta personalizada sin compromiso." },
    { q: "¿Pueden contratar solo el servicio de limpieza?", a: "Sí. El servicio de limpieza profesional de áreas comunes puede contratarse de forma independiente o integrado a la administración. Incluye personal capacitado, insumos y cumplimiento del Mandato 8." },
    { q: "¿Qué es el diagnóstico gratuito que ofrecen?", a: "Es un análisis inicial sin costo del estado de su condominio: situación financiera, documentación, contratos vigentes y cumplimiento legal. Al final, presentamos una propuesta personalizada sin compromiso." }
  ];

  // EFECTO PRINCIPAL DE ANIMACIONES GSAP
  useEffect(() => {
  if (!containerRef.current) return;

  // Forzar un retraso pequeño para asegurar que el HTML y la fuente Raleway estén listos
  const timer = setTimeout(() => { 
    ScrollTrigger.refresh(); 
  }, 300);

  // Crear el contexto de GSAP asignándolo a una variable para limpiarlo correctamente
  const ctx = gsap.context(() => {
    
    // 00. Hero Principal
    gsap.fromTo(".hero-anim", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }
    );

    // 01. CORRECCIÓN RADICAL: Evaluación de Riesgos (Dolores)
    gsap.fromTo(".dolor-card", 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: { 
          trigger: "#dolores-sec", 
          start: "top 92%", // Se activa casi apenas asoma en pantalla
          toggleActions: "play none none none",
          once: true,
          // Si sospechas que no se activa, puedes descomentar la línea de abajo para ver los marcadores en pantalla:
          // markers: true 
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out"
      }
    );

    // 02. Plan de Implementación
    gsap.fromTo(".plan-item-anim", 
      { x: -20, opacity: 0 },
      {
        scrollTrigger: { 
          trigger: "#plan-implementacion", 
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

    // 04. CORRECCIÓN RADICAL: Documentación Mensual (Entregables)
    gsap.fromTo(".entregable-card", 
      { y: 20, opacity: 0 },
      {
        scrollTrigger: { 
          trigger: "#entregables-sec", 
          start: "top 92%", 
          toggleActions: "play none none none",
          once: true 
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power1.out"
      }
    );

  }, containerRef); // <- IMPORTANTE: El scope asegura que GSAP solo busque clases dentro de este componente

  window.addEventListener("resize", ScrollTrigger.refresh);
  
  return () => {
    clearTimeout(timer);
    ctx.revert(); // <- Esto destruye y limpia CUALQUIER animación colgada en el Strict Mode
    window.removeEventListener("resize", ScrollTrigger.refresh);
  };
}, []);

  return (
    <div
      ref={containerRef}
      
      className="w-full antialiased bg-white text-slate-600 selection:bg-[#2652be] selection:text-white overflow-hidden ']"
    >
  {/* 00. HERO BANNER PRINCIPAL */}
<section className="w-full relative text-white pt-24 pb-16 sm:pt-36 sm:pb-24 md:pt-44 md:pb-32 px-4 sm:px-8 lg:px-12 overflow-hidden min-h-[500px] flex items-center">
  
  {/* FOTO DE FONDO CON ANIMACIÓN GSAP DIRECTA EN EL ATRIBUTO REF */}
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
    <img 
      loading="eager"
      fetchPriority="high"
      src={ban1} 
      alt="Administración de condominios"
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
  <div className="max-w-6xl mx-auto relative z-20 w-full px-4 sm:px-6">
    {/* items-center para mantener el balance vertical */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
      
      {/* Columna Izquierda: Título Principal (Un apenitas más grande) */}
      <div className="lg:col-span-7 text-center lg:text-left">
        <h1 
          style={{ 
            textShadow: '0 4px 28px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.85)' 
          }}
          className="hero-anim text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.2] text-white select-none"
        >
          Protegemos su inversión, <br className="hidden sm:inline" />
          <span >garantizamos su tranquilidad.</span>
        </h1>
      </div>
      
      {/* Columna Derecha: Bloque Descriptivo (Un apenitas más grande) */}
      <div className="lg:col-span-5 text-center lg:text-left lg:pl-6 lg:border-l pt-4 lg:pt-0 border-t lg:border-t-0 border-white/20 max-w-md mx-auto lg:max-w-none">
        <p 
          style={{ 
            textShadow: '0 2px 14px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9)' 
          }}
          className="hero-anim text-sm sm:text-base md:text-lg text-slate-100 font-light leading-relaxed tracking-wide opacity-95"
        >
          Ordenamos la operación, controlamos las finanzas y reducimos el riesgo de su condominio con una gestión profesional, medible y transparente.
        </p>
      </div>

    </div>
  </div>
</section>

    {/* 01. SECCIÓN DE DOLORES (EVALUACIÓN DE RIESGOS) */}
<section id="dolores-sec" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white border-b border-slate-100">
  <div className="max-w-7xl mx-auto">
    <div className="max-w-3xl mb-10 sm:mb-14 space-y-2">
      <h2 className="text-xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2652be] leading-[1.2]">
        Cuando no hay administración profesional, <br className="hidden sm:inline" />
        <span className="text-[#2652be] font-normal">los problemas se acumulan.</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
  {dolores?.map((dolor, i) => (
    <div key={i} className="dolor-card p-5 sm:p-6 bg-[#2652be] rounded-2xl flex flex-col justify-start h-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
      
      {/* Contenedor del Icono Dinámico (Altura fija para no desplazar el texto) */}
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-white shrink-0">
        
        {/* Cartera / Finanzas */}
        {dolor.icon === "wallet" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        )}

        {/* Transparencia / Lupa y Documento */}
        {dolor.icon === "file-search" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
            <circle cx="11.5" cy="14.5" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.25 16.25L16 19" />
          </svg>
        )}

        {/* Mantenimiento / Llave */}
        {dolor.icon === "wrench" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}

        {/* Pérdida de Plusvalía */}
        {dolor.icon === "trending-down" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
          </svg>
        )}

        {/* Convivencia / Usuarios */}
        {dolor.icon === "users" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}

        {/* Legal / Balanza */}
        {dolor.icon === "scale" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        )}
      </div>
      
      {/* Título y Descripción (Ocupan el resto de la tarjeta con alineación uniforme) */}
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

     {/* 02. INTERACTIVA DE EJES */}
<section id="servicios-detallados" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-slate-50 border-b border-slate-200">
  <div className="max-w-7xl mx-auto">
    
    {/* Cabecera de la Sección */}
    <div className="mb-6 sm:mb-10">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#2652be] leading-[1.2] mt-1.5">
        Ejes de Gestión.
      </h2>
    </div>

    {/* Menú de pestañas con Scroll Horizontal */}
    <div className="flex overflow-x-auto whitespace-nowrap border border-slate-200 bg-white rounded-sm p-1 gap-1.5 mb-6 scrollbar-thin shadow-sm">
      {ejesServicios?.map((eje, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(idx)}
          className={`inline-block flex-1 min-w-[180px] sm:min-w-0 py-2.5 px-3.5 text-[11px] sm:text-xs font-mono transition-all duration-300 rounded-sm text-center border ${
            activeTab === idx 
              ? "bg-[#2652be] text-white border-[#2652be] font-semibold" 
              : "text-slate-400 border-transparent font-normal hover:text-slate-700 hover:bg-slate-100/80"
          }`}
        >
          {eje.id}: {eje.titulo.split(" ")[0]}
        </button>
      ))}
    </div>

    {/* Contenedor Principal */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Columna Izquierda: Listado de Items Técnicos */}
      <div className="lg:col-span-8 bg-white border border-slate-200 p-5 sm:p-8 lg:p-10 rounded-sm flex flex-col justify-between shadow-sm">
        {ejesServicios && ejesServicios[activeTab] ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
              <span className="w-max font-mono text-[10px] font-normal text-[#2652be] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-sm tracking-wider shrink-0">
                {ejesServicios[activeTab].id}
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-light tracking-tight text-[#2652be] leading-[1.2]">
                {ejesServicios[activeTab].titulo}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3 mt-4">
              {ejesServicios[activeTab].items?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-1 rounded-sm hover:bg-slate-50/50 transition-colors">
                  <div className="w-5 h-5 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-mono font-medium text-[#2652be]">{idx + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed tracking-wide">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 text-slate-400 font-mono text-xs tracking-widest">
            // CARGANDO EJES DE GESTIÓN...
          </div>
        )}
      </div>

      {/* Columna Derecha Dinámica: Foto Viva con degradado mínimo */}
      <div className="lg:col-span-4 bg-slate-900 text-white rounded-sm flex flex-col justify-between relative overflow-hidden shadow-sm border border-slate-200 min-h-[340px] lg:min-h-auto">
        {ejesServicios && ejesServicios[activeTab] ? (
          <>
            {/* Imagen de fondo real, más clara y viva */}
            <div className="absolute inset-0 z-0">
              <img 
                src={
                  ejesServicios[activeTab].imagen || 
                  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                } 
                alt={ejesServicios[activeTab].titulo}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Filtro sutil: una capa oscura muy leve arriba y un degradado negro abajo solo para leer el texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />
            </div>

           {/* Contenido en el Frente */}
<div className="relative z-10 p-5 sm:p-6 lg:p-8 h-full flex flex-col justify-center items-center text-center">
  <div className="space-y-3 max-w-md mx-auto">
    {/* Texto centrado con drop-shadow */}
    <h4 className="text-lg sm:text-xl font-light tracking-tight leading-[1.2] text-white drop-shadow-md">
      ¿Por qué importa este pilar?
    </h4>
    
    {/* Cita breve con borde azul al centro o borde superior para mejor legibilidad */}
    <p className="text-xs sm:text-sm text-white font-light leading-relaxed italic border-t border-blue-400/80 pt-2 pb-1 drop-shadow-xs">
      "{ejesServicios[activeTab].descBreve}"
    </p>

    <p className="text-[11px] sm:text-xs text-slate-100 font-light pt-2 leading-relaxed border-t border-white/10 tracking-wide drop-shadow-xs">
      La aplicación estricta de estos procesos mitiga riesgos legales solidarios, blinda los fondos comunales y asegura la plusvalía real de la copropiedad.
    </p>
  </div>

  <div className="pt-4 border-t border-white/10 mt-6 w-full max-w-xs">
    <span className="text-[10px] font-mono tracking-widest text-slate-300 font-light block drop-shadow-xs">
      Estrategia / {ejesServicios[activeTab].id}
    </span>
  </div>
</div>
          </>
        ) : (
          <div className="relative z-10 space-y-3 p-5 sm:p-6 lg:p-8">
            <span className="font-mono text-[9px] tracking-widest text-slate-400 block font-light">// ANÁLISIS DE ENFOQUE</span>
            <h4 className="text-lg sm:text-xl font-light tracking-tight leading-[1.2]">Gestión Profesional</h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed tracking-wide">
              Seleccione un pilar estratégico de la arquitectura operativa para evaluar su impacto real en el conjunto.
            </p>
          </div>
        )}
      </div>

    </div>
  </div>
</section>

    {/* 03. PLAN DE IMPLEMENTACIÓN */}
<section id="plan-implementacion" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-slate-50 border-b border-slate-100">
  <div className="max-w-7xl mx-auto">
    
    {/* Título de la sección */}
    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-1">
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[#2652be] leading-[1.2]">
        Plan para ordenar su condominio
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {planPasos?.map((paso, idx) => {
        // Lógica para asegurar que paso.desc sea un array si viene como un string con puntos
        const itemsPuntos = Array.isArray(paso.desc) 
          ? paso.desc 
          : paso.desc?.split('.').filter(p => p.trim().length > 0) || [];

        return (
          <div 
            key={idx} 
            className="plan-item-anim bg-white border border-slate-200 rounded-xl relative flex flex-col overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#2652be]/40"
          >
            {/* Contenedor de la foto */}
            <div className="w-full h-40 relative overflow-hidden bg-slate-100 shrink-0">
              <img 
                src={
                  paso.imagen || 
                  (idx === 0 ? di1 : 
                   idx === 1 ? "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80" : 
                   idx === 2 ? di2 : 
                               di3)
                } 
                alt={paso.titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Indicador numérico */}
              <div className="absolute top-3 left-3 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-xs border border-slate-200 flex items-center justify-center font-mono text-xs font-medium text-[#2652be] shadow-xs">
                {idx + 1}
              </div>
            </div>

            {/* Contenedor de texto con VIÑETAS */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono font-normal text-[#2652be] block tracking-wide">
                    {paso.mes}
                  </span>
                  <h3 className="text-base font-medium tracking-tight text-[#2652be] mt-0.5 leading-snug">
                    {paso.titulo}
                  </h3>
                </div>
                
                {/* LISTA CON VIÑETAS (BULLET POINTS) */}
                <ul className="space-y-2 pt-1">
                  {itemsPuntos.map((punto, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 font-light leading-relaxed">
                      {/* Puntos o bullets estilizados en color azul institucional */}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2652be] shrink-0 mt-1.5"></span>
                      <span>{punto.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  </div>
</section>
      {/* 04. ENTREGABLES CONCRETOS (DOCUMENTACIÓN MENSUAL) */}
<section id="entregables-sec" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-slate-50 border-b border-slate-200">
  <div className="max-w-7xl mx-auto">
    
    {/* Cabecera de la Sección Estilizada */}
    <div className="mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[#2652be] leading-[1.2] mt-1.5">
        Entregables concretos, <br className="hidden sm:inline" /> no promesas abstractas
      </h2>
    </div>

   {/* Grid de Tarjetas de Entregables */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
  {entregables?.map((ent, i) => (
    <div 
      key={i} 
      className="entregable-card p-5 sm:p-6 bg-[#2652be] rounded-2xl flex flex-col items-start justify-between shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
    >
      {/* Contenedor del Ícono */}
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-white shrink-0">
        
        {/* 1. Informe Económico / Banco */}
        {ent.icon === "bank" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10zM8 14v3m4-3v3m4-3v3" />
          </svg>
        )}

        {/* 2. Informe de Actividades / Gráfica y Reporte */}
        {ent.icon === "report" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}

        {/* 3. Reportes de Morosidad y Cartera / Tarjeta con Alerta de Cobro */}
        {ent.icon === "users" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}

        {/* 4. Checklist y Bitácoras de Mantenimiento */}
        {ent.icon === "log" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        )}

        {/* 5. Soporte Documental de Pagos / Ticket Factura */}
{ent.icon === "shield" && (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M17 3H7a2 2 0 00-2 2v16l3-2 4 2 4-2 3 2V5a2 2 0 00-2-2z" />
  </svg>
)}

        {/* 6. Documentación Administrativa / Archivos de Gestión */}
        {ent.icon === "legal" && (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        )}

      </div>

      {/* Título */}
      <div>
        <h3 className="text-base sm:text-lg font-medium tracking-tight text-white leading-snug">
          {ent.title}
        </h3>
      </div>

    </div>
  ))}
</div>

  </div>
</section>

     

      {/* 06. SECCIÓN DE ACORDEONES FAQ */}
<section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#2652be] text-white border-b border-blue-900/40">
  <div className="max-w-3xl mx-auto">
    
    {/* Cabecera Corregida con Contraste Real */}
    <div className="text-center mb-10 sm:mb-14 space-y-2">
      <h2 className="text-2xl sm:text-4xl  uppercase tracking-tight text-white">
        Preguntas y Respuestas
      </h2>
    </div>

    {/* Contenedor de Acordeones */}
    <div className="space-y-3">
      {faqs?.map((faq, idx) => {
        const isOpen = openFaq === idx;
        return (
          <div 
            key={idx} 
            className={`border rounded-sm overflow-hidden transition-all duration-300 ${
              isOpen 
                ? "border-blue-300/40 bg-[#1e3fa1]" 
                : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            {/* Botón de Control */}
            <button
              onClick={() => setOpenFaq(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors focus:outline-none"
            >
              <span className="text-xs sm:text-sm font-light uppercase tracking-tight text-white pr-4 leading-snug">
                {faq.q}
              </span>
              <span className={`text-blue-200 font-mono text-lg shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                {isOpen ? "－" : "＋"}
              </span>
            </button>

            {/* Contenido Desplegable Animado */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen 
                  ? "max-h-[500px] border-t border-white/10 bg-[#19358a]/40 p-4 sm:p-5" 
                  : "max-h-0 p-0 pointer-events-none"
              }`}
            >
              <p className="text-xs sm:text-sm text-blue-100/90 font-normal leading-relaxed">
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

export default Servicios;