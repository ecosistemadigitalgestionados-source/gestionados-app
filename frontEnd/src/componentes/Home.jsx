import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import slide1 from '../assets/slide1.jpeg'
import slide2 from '../assets/slide2.jpeg'
import slide3 from '../assets/slide3.jpeg'
import slide4 from '../assets/slide4.jpeg'


import banner1 from '../assets/video.mp4';



import logo5 from "../assets/logo5.png";

// REGISTRAMOS EL PLUGIN DE FORMA GLOBAL
gsap.registerPlugin(ScrollTrigger);

const BACKGROUND_IMAGES = [
  banner1,
 

];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // REFS SECCIÓN 1 (HERO)
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageContainersRef = useRef([]);

  // REFS SECCIÓN 2 (QUIÉNES SOMOS)
  const sectionRef = useRef(null);
  const countRealRef = useRef(null);
  const countEfficientRef = useRef(null);
  const countTotalRef = useRef(null);

  // REFS SECCIÓN 3 (DIAGNÓSTICO DE GESTIÓN)
  const diagnosticoSectionRef = useRef(null);
  const diagnosticoHeaderRef = useRef(null);
  const diagnosticoGridRef = useRef(null);
  const diagnosticoSolutionRef = useRef(null);

  // ¡NUEVAS REFS DECLARADAS PARA LA SECCIÓN 4!
  const ejesSectionRef = useRef(null);
  const ejesHeaderRef = useRef(null);
  const ejesGridRef = useRef(null);

  // REFS SECCIÓN 5 (CASOS DE ÉXITO)
  const exitoSectionRef = useRef(null);
  const exitoHeaderRef = useRef(null);
  const exitoGridRef = useRef(null);
  const metricAguaRef = useRef(null);
  const metricLuzRef = useRef(null);
  const metricFondoRef = useRef(null);

  // 1. Slider automático sincronizado a 6 segundos (6000ms) para que coincida con el Ken Burns
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length,
    );
  }, 4000);
  return () => clearInterval(timer);
}, []);

// 2. Transición fluida de Opacidad al cambiar de imagen (FOTOS 100% VIVAS)
useEffect(() => {
  BACKGROUND_IMAGES.forEach((_, index) => {
    const el = imageContainersRef.current[index];
    if (el) {
      if (index === currentIndex) {
        // Levanta a opacidad 1 para máxima luz, usando un ease suave de crossfade
        gsap.to(el, { 
          opacity: 1, 
          duration: 2, 
          ease: "power2.inOut",
          overwrite: "auto" // Evita conflictos si el usuario cambia rápido
        });
      } else {
        // Apaga las fotos inactivas sin dejar rastro
        gsap.to(el, { 
          opacity: 0, 
          duration: 2, 
          ease: "power2.inOut",
          overwrite: "auto"
        });
      }
    }
  });
}, [currentIndex]);

// 3. Animación GSAP de entrada inicial para los bloques de texto del Hero
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, delay: 0.3 },
    ).fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      "-=0.9",
    );
  }, containerRef);

  return () => ctx.revert();
}, []);
  // 4. LÓGICA UNIFICADA DE REVEAL Y CONTADORES CON SCROLLTRIGGER (SECCIÓN 2)
  useEffect(() => {
    const targets = [
      { ref: countRealRef, value: 20, suffix: "+" },
      { ref: countEfficientRef, value: 15, suffix: "+" },
      { ref: countTotalRef, value: 800, suffix: "+" },
    ];

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      mainTl
        .to(".JSON-scroll-reveal-left", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
        .to(
          ".JSON-scroll-reveal-right",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.6",
        );

      targets.forEach(({ ref, value, suffix }) => {
        if (!ref.current) return;

        const counterObj = { val: 0 };

        gsap.to(counterObj, {
          val: value,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          onUpdate: () => {
            if (ref.current) {
              if (suffix === "/7") {
                ref.current.innerText = `${Math.floor(counterObj.val)}${suffix}`;
              } else {
                ref.current.innerText = `${suffix === "+" ? suffix : ""}${Math.floor(counterObj.val)}${suffix === "%" ? suffix : ""}`;
              }
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 5. ANIMACIÓN CON SCROLLTRIGGER PARA SECCIÓN 3 (DIAGNÓSTICO)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!diagnosticoSectionRef.current) return;

      // Animación del Encabezado de Diagnóstico
      gsap.fromTo(
        diagnosticoHeaderRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: diagnosticoHeaderRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      // Animación en Cascada (Stagger) de las Tarjetas de Dolores
      gsap.fromTo(
        diagnosticoGridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: diagnosticoGridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      // Animación de la Tarjeta de Solución Final
      gsap.fromTo(
        diagnosticoSolutionRef.current,
        { opacity: 0, scale: 0.96, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.05)",
          scrollTrigger: {
            trigger: diagnosticoSolutionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, diagnosticoSectionRef);

    return () => ctx.revert();
  }, []);

  // 6. ANIMACIÓN CON SCROLLTRIGGER PARA SECCIÓN 4 (LOS TRES EJES DE SOLUCIÓN)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ejesSectionRef.current) return;

      // Animación del Encabezado de Ejes
      gsap.fromTo(
        ejesHeaderRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ejesHeaderRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      // Animación en Cascada de las Tarjetas e incluye el botón al final
      gsap.fromTo(
        ejesGridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ejesGridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, ejesSectionRef); // Alcance aislado correctamente

    return () => ctx.revert();
  }, []);

  // 7. ANIMACIÓN DE ENTRADA Y CONTADORES AUTOMÁTICOS (SECCIÓN 5)
  useEffect(() => {
    const targets = [
      { ref: metricAguaRef, startVal: 0, endVal: 96, prefix: "-", suffix: "%" },
      { ref: metricLuzRef, startVal: 0, endVal: 71, prefix: "-", suffix: "%" },
      {
        ref: metricFondoRef,
        startVal: 0,
        endVal: 20,
        prefix: "$",
        suffix: "k",
      },
    ];

    const ctx = gsap.context(() => {
      if (!exitoSectionRef.current) return;

      // Animación para el encabezado izquierdo
      gsap.fromTo(
        exitoHeaderRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: exitoSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      // Animación de aparición para las columnas de las métricas
      gsap.fromTo(
        exitoGridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: exitoGridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      // Lógica independiente para cada contador numérico
      targets.forEach(({ ref, startVal, endVal, prefix, suffix }) => {
        if (!ref.current) return;

        const counterObj = { val: startVal };

        gsap.to(counterObj, {
          val: endVal,
          duration: 2.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          onUpdate: () => {
            if (ref.current) {
              ref.current.innerText = `${prefix}${Math.floor(counterObj.val)}${suffix}`;
            }
          },
        });
      });
    }, exitoSectionRef);

    return () => ctx.revert();
  }, []);

  const dolores = [
    {
      id: "01",
      
      title: "Desorden financiero y morosidad",
      desc: "La cobranza débil y la falta de cuentas claras reducen la liquidez del condominio y deterioran la confianza de los copropietarios.\nSin flujo de caja suficiente, se aplaza el mantenimiento, se frenan decisiones importantes y la directiva queda expuesta frente a reclamos de los copropietarios y de la asamblea",
      img: slide1
    },
    {
      id: "02",
      
      title: "Gestión reactiva del edificio",
      desc: "Cuando la administración está ausente, los problemas se detectan tarde, los proveedores trabajan sin control y el mantenimiento se vuelve correctivo en lugar de preventivo.\nLo que era un gasto manejable termina convertido en una reparación costosa, mientras el edificio pierde valor y los residentes perciben abandono.",
      img: slide2
    },
    {
      id: "03",
      
      title: "Riesgo legal para la directiva",
      desc: "La falta de seguros obligatorios, planes de emergencia y aplicación de reglamentos deja a la directiva operando sin cobertura suficiente frente a incidentes y obligaciones legales del condominio.\nUn incendio, un accidente o una omisión normativa puede derivar en multas, demandas civiles y afectación patrimonial para quienes integran la directiva",
      img: slide3
    },
    {
      id: "04",
    
      title: "Conflictos y pérdida de confianza",
      desc: "La mala comunicación, los informes poco claros y las decisiones unilaterales generan rumores, malestar y distancia entre residentes, copropietarios y directiva.\nLa convivencia se deteriora, aumentan los conflictos y la asamblea pierde confianza en la capacidad de gestión del edificio y del condominio.",
      img: slide4
    },
    
  ];
  

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === dolores.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? dolores.length - 1 : prev - 1));
  };
// SLIDER AUTOMÁTICO (Cada 5 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 font-sans selection:bg-[#2652be] selection:text-white overflow-x-hidden">
   <section
  ref={containerRef}
  className="relative min-h-[95vh] sm:min-h-screen w-full flex flex-col justify-between p-5 sm:p-8 md:p-12 overflow-hidden bg-slate-900"
>
  {/* CONTENEDOR DEL SLIDER CON EFECTO KEN BURNS (ZOOM CONTINUO - FOTOS 100% VIVAS) */}
  {/* VIDEO DE FONDO EN LOOP (Reemplaza a BACKGROUND_IMAGES) */}
{/* VIDEO DE FONDO EN LOOP (SIN CAPA GRIS) */}
<div className="absolute inset-0 w-full h-full overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover object-center select-none pointer-events-none"
    src={banner1} 
  />
</div>
 
  {/* Contenido Principal: Estructura limpia e intacta */}
<div className="my-auto max-w-4xl z-10 py-8 sm:py-0 space-y-6 sm:space-y-8 select-none relative">
  
  {/* Capa de sombra suave detrás para que el texto resalte sin cambiar la tipografía */}
  <div className="absolute -inset-4 -z-10 bg-slate-950/20 blur-2xl rounded-3xl pointer-events-none" />

  {/* H1: Misma tipografía original con sombra reforzada */}
  <h1
    ref={titleRef}
    style={{ 
      textShadow: '0 4px 28px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.85)' 
    }}
    className="text-slate-100 text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.1] max-w-3xl"
  >
    Administración de condominios en <br />
    Quito, Tumbaco y Cumbayá
  </h1>
  
  {/* H2: Con el borde azul lateral original y mejor contraste */}
  <h2 
    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.8)' }}
    className="text-white text-lg sm:text-xl md:text-2xl font-normal max-w-2xl leading-relaxed border-l-2 border-[#2652be] pl-4"
  >
    Su Directiva merece orden, control y tranquilidad.
  </h2>

  {/* Párrafo descriptivo original */}
  <p
    ref={textRef}
    style={{ textShadow: '0 2px 18px rgba(0,0,0,0.95)' }}
    className="text-sm sm:text-base md:text-lg text-slate-200 max-w-xl font-normal leading-relaxed opacity-95"
  >
    Gestionados administra su condominio con transparencia financiera, cobranza activa y control legal.
  </p>

</div>

  {/* INDICADOR DE SCROLL: Flecha animada móvil */}
  <div className="z-10 flex sm:hidden flex-col items-center gap-1 animate-bounce mx-auto mb-3 opacity-80">
    <span 
      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
      className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300"
    >
      Deslizar
    </span>
    <svg
      className="w-4 h-4 text-[#2652be] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </div>

  {/* Indicadores inferiores estilizados */}
  <div className="z-10 w-full pt-6 md:pt-8 flex justify-between items-center border-t border-white/10 mt-auto">
    <div className="flex gap-2">
      {BACKGROUND_IMAGES.map((_, idx) => (
        <div
          key={idx}
          className={`h-1 rounded-full transition-all duration-500 shadow-md ${
            idx === currentIndex ? "w-8 bg-[#2652be]" : "w-2 bg-white/40"
          }`}
        />
      ))}
    </div>
  </div>
</section>

    {/* 2. SECCIÓN: QUIÉNES SOMOS & ATRIBUTOS INSTITUCIONALES */}
<section
  ref={sectionRef}
  className="w-full max-w-7xl mx-auto bg-slate-50 overflow-hidden border-b border-[#2652be]/30 antialiased relative font-['Poppins']"
>
  <div className="grid grid-cols-1 lg:grid-cols-12">
   {/* BLOQUE IZQUIERDO: Título Editorial Fino y Elegante */}
<div className="lg:col-span-5 bg-gradient-to-br from-[#1a3a8f] via-[#2652be] to-[#1e40af] text-white p-8 sm:p-12 md:p-16 flex flex-col justify-center items-center relative overflow-hidden rounded-b-2xl lg:rounded-b-none shadow-md lg:shadow-none min-h-[350px] lg:min-h-full">
  
  {/* Elementos geométricos de fondo */}
  <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/[0.03] pointer-events-none" />
  <div className="absolute -left-12 top-12 w-48 h-48 rounded-full bg-blue-400/[0.08] blur-xl pointer-events-none" />

  {/* Contenedor del texto: Alineado a la izquierda pero centrado como bloque */}
  <div className="z-10 opacity-0 transform translate-y-8 JSON-scroll-reveal-left w-full max-w-sm text-left">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.2] text-blue-100">
      Somos una <br />
      <span className="font-normal text-white block mt-1">estructura corporativa</span> 
      <span className="font-light italic text-blue-200 block mt-1">sólida y transparente.</span>
    </h2>
  </div>

</div>

    {/* BLOQUE DERECHO: Información Unificada con Grid Técnico Fluido */}
    <div className="lg:col-span-7 p-5 sm:p-10 md:p-16 flex flex-col justify-center space-y-8 sm:space-y-10 text-left relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] bg-opacity-70">
      {/* Destello sutil de luz */}
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Manifiesto Principal: Texto light y limpio */}
      <div className="space-y-3 max-w-3xl z-10 opacity-0 transform translate-y-6 JSON-scroll-reveal-right border-l-2 border-[#2652be]/20 pl-4 sm:pl-6">
        <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed tracking-normal">
          <span className="text-[#2652be] font-medium border-b border-[#2652be]/30 pb-0.5 mr-1 inline-block">
            Gestionados
          </span>{" "}
          es una empresa especializada en Administración de Condominios en Quito, Cumbayá y Tumbaco.
        </p>
      </div>

      {/* BLOQUE DE MÉTRICAS CON CONTADOR ANIMADO (Suavizado, sin font-black) */}
      <div className="w-full max-w-4xl z-10 opacity-0 transform translate-y-6 JSON-scroll-reveal-right">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-100 py-6">
          {/* Métrica 1: Trayectoria */}
          <div className="text-left p-5 rounded-md bg-white border border-[#2652be]/30 shadow-xs">
            <div
              ref={countRealRef}
              className="text-4xl sm:text-5xl font-light text-[#2652be] tracking-tight mb-2"
            >
              +0
            </div>
            <p className="text-[10px] sm:text-xs font-normal tracking-wide text-slate-500">
              Años de Trayectoria
            </p>
          </div>

          {/* Métrica 2: Proyectos */}
          <div className="text-left p-5 rounded-md bg-white border border-[#2652be]/30 shadow-xs">
            <div
              ref={countEfficientRef}
              className="text-4xl sm:text-5xl font-light text-[#2652be] tracking-tight mb-2"
            >
              +0
            </div>
            <p className="text-[10px] sm:text-xs font-normal tracking-wide text-slate-500">
              Proyectos Exitosos
            </p>
          </div>

          {/* Métrica 3: Condóminos */}
          <div className="text-left p-5 rounded-md bg-white border border-[#2652be]/30 shadow-xs">
            <div
              ref={countTotalRef}
              className="text-4xl sm:text-5xl font-light text-[#2652be] tracking-tight mb-2"
            >
              +0
            </div>
            <p className="text-[10px] sm:text-xs font-normal tracking-wide text-slate-500">
              Condóminos Satisfechos
            </p>
          </div>
        </div>
      </div>

      {/* Cierre Técnico Auditable */}
      <div className="pt-4 border-t border-[#2652be]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-4xl z-10 opacity-0 transform translate-y-6 JSON-scroll-reveal-right">
        <p className="font-light text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
          Cada proceso cuenta con respaldo documental y reportes financieros auditables por la directiva y copropietarios en cualquier momento.
        </p>
      </div>
    </div>
  </div>
</section>

{/* 3. SECCIÓN: DIAGNÓSTICO / RIESGOS DE LA GESTIÓN INFORMAL */}
<section
  ref={diagnosticoHeaderRef}
  className="w-full max-w-7xl mx-auto bg-white p-6 sm:p-10 md:p-16 border-b border-[#2652be]/30 antialiased font-['Poppins']"
>
  {/* Grilla 50/50 alineada al centro vertical */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
    
    {/* Izquierda: Ocupa 6 columnas con separación limpia entre líneas */}
<div className="lg:col-span-6 text-center lg:text-left">
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#2652be] leading-[1.35]">
    Los riesgos de la <br />
    <span className="block mt-2 sm:mt-3">
      gestión informal.
    </span>
  </h2>
</div>

   {/* Derecha: Párrafo en 6 columnas con viñetas y texto destacado */}
<div className="lg:col-span-6 border-t-2 lg:border-t-0 lg:border-l-2 border-[#2652be] pt-6 lg:pt-0 lg:pl-8 text-center lg:text-left">
  <div className="space-y-4">
    <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
      Los principales problemas de una administración interna, ausente o informal suelen repetirse y generar:
    </p>

    {/* Lista de viñetas */}
    <ul className="space-y-2 py-1 text-left">
      <li className="flex items-start gap-2.5 text-base sm:text-lg text-slate-600 font-light">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2652be] shrink-0 mt-2.5"></span>
        <span>Desgaste permanente para la directiva</span>
      </li>
      <li className="flex items-start gap-2.5 text-base sm:text-lg text-slate-600 font-light">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2652be] shrink-0 mt-2.5"></span>
        <span>Malestar en los condóminos</span>
      </li>
      <li className="flex items-start gap-2.5 text-base sm:text-lg text-slate-600 font-light">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2652be] shrink-0 mt-2.5"></span>
        <span>Deterioro progresivo del inmueble</span>
      </li>
    </ul>

    
  </div>
</div>

  </div>
</section>
{/*slider */}
    <section className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto bg-white border-b border-[#2652be]/80 antialiased font-sans overflow-hidden">
      
      {/* Grid Principal de la Sección */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        
     {/* Contenedor del Encabezado y Slider */}
<div className="col-span-1 md:col-span-2 lg:col-span-3 w-full max-w-6xl mx-auto py-4 font-['Poppins']">
  
  {/* Bloque: Pregunta y llamada a la acción */}
  <div className="text-center md:text-left mb-8 space-y-3 max-w-3xl">
    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2652be] tracking-tight leading-[1.2]">
      ¿Reconoce alguno de estos problemas en su condominio?
    </h3>
    <p className="text-sm sm:text-base text-slate-600 font-light text-justify">
      Muchos condominios no fallan por falta de intención, sino por una gestión débil en lo financiero, operativo y legal. Cuando eso ocurre, el costo lo pagan los copropietarios, los residentes y la directiva.
    </p>
  </div>

  {/* Slider Contenedor */}
  <div className="relative overflow-hidden rounded-xl bg-slate-950 border shadow-sm">
    
    {/* Track del Slider */}
    <div 
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    >
      {dolores.map((slide, index) => (
        <div 
          key={index} 
          className="w-full flex-shrink-0 relative h-[380px] sm:h-[440px] md:h-[480px] overflow-hidden"
        >
          {/* FOTO 100% LIMPIA */}
          <img 
            src={slide.img} 
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />

          {/* SOMBRA SÚPER SUAVE EN LA BASE */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* TEXTO FLOTANTE */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 z-10 pointer-events-none">
            <div className="max-w-2xl space-y-2">
              
              {/* TÍTULO EN MAYÚSCULAS CON FUERZA */}
              <h4 className="text-xl sm:text-2xl md:text-3xl font-light uppercase text-white tracking-wider leading-snug drop-shadow-lg">
                {slide.title}
              </h4>

              {/* DESCRIPCIÓN */}
              <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed whitespace-pre-line max-w-xl drop-shadow">
                {slide.desc}
              </p>

            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Flechas de Navegación del Slider */}
    <button
      onClick={prevSlide}
      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs border border-white/10 transition-all hidden sm:block z-20"
      aria-label="Anterior"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    
    <button
      onClick={nextSlide}
      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs border border-white/10 transition-all hidden sm:block z-20"
      aria-label="Siguiente"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>

  {/* Indicadores Inferiores */}
  <div className="flex items-center justify-between sm:justify-center gap-6 mt-5 px-2">
    <button onClick={prevSlide} className="sm:hidden p-2 rounded-lg bg-white border border-slate-200 text-[#2652be]">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>

    <div className="flex gap-2">
      {dolores.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`h-1 rounded-full transition-all duration-300 ${
            currentSlide === index ? 'w-5 bg-[#2652be]' : 'w-1 bg-slate-300'
          }`}
          aria-label={`Ir al slide ${index + 1}`}
        />
      ))}
    </div>

    <button onClick={nextSlide} className="sm:hidden p-2 rounded-lg bg-white border border-slate-200 text-[#2652be]">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</div>

    {/* Tarjeta 7 - LA SOLUCIÓN PROFESIONAL */}
<div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4 bg-gradient-to-br from-[#2652be] to-[#1a3a8f] text-white p-6 sm:p-10 rounded-xl shadow-xl shadow-blue-900/10 relative overflow-hidden border border-blue-800">
  
  {/* Logo reducido y ajustado en la esquina */}
  <div className="absolute right-2 bottom-2 w-[140px] sm:w-[180px] pointer-events-none select-none z-0 opacity-10">
    <img 
      src={logo5} 
      alt="" 
      className="w-full h-auto object-contain"
    />
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
    <div className="lg:col-span-4 space-y-3">
      <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-tight leading-none">
        ¿Por qué contratar <br />{" "}
        
        a Gestionados?
      </h3>
    </div>

    <div className="lg:col-span-8 lg:pl-6 space-y-4 border-t lg:border-t-0 lg:border-l border-white/20 pt-5 lg:pt-0">
      
      <div className="sm:text-base text-white font-normal leading-relaxed bg-white/10 p-4 rounded-lg border-l-4 border-white backdrop-blur-xs">
        Contratar a{" "}
        <span className="font-bold underline decoration-2 underline-offset-2">
          Gestionados
        </span>{" "}
        es transformar la administración del condominio en un modelo
        profesional, transparente y legalmente blindado, que reduce la
        morosidad, protege a la directiva y aumenta la plusvalía del
        patrimonio.
      </div>
    </div>
  </div>
</div>
      </div>
    </section>

      {/* 4. SECCIÓN: LOS TRES EJES DE SOLUCIÓN - RESPONSIVE PREMIUM */}
<section
  ref={ejesSectionRef}
  className="w-full py-16 md:py-28 px-6 md:px-12 max-w-7xl mx-auto bg-white border-b border-slate-100 antialiased font-['Poppins']"
>
  {/* Encabezado limpio sin textos gritones */}
  <div ref={ejesHeaderRef} className="mb-12 md:mb-16 space-y-4">
    <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#2652be] max-w-3xl leading-[1.15]">
      Nuestra metodología opera sobre tres ejes fundamentales
    </h2>
    <p className="text-slate-500 font-light text-sm sm:text-lg max-w-2xl leading-relaxed">
      Cada eje cuenta con protocolos definidos, seguimiento permanente y reporte periódico a la directiva.
    </p>
  </div>

  {/* Grid de Tarjetas Rediseñado con Viñetas y Bordes Azules */}
  <div
    ref={ejesGridRef}
    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
  >
    {/* EJE 1 */}
    <div className="flex flex-col rounded-md overflow-hidden border border-[#2652be] bg-white shadow-xs hover:shadow-md transition-all duration-300">
      <div className="bg-[#2652be] px-6 py-4">
        <h3 className="text-white font-semibold text-sm tracking-wide">
          Gestión financiera
        </h3>
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-start">
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-slate-600 text-sm font-light leading-snug">
            <svg className="w-4 h-4 text-[#2652be] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Política de cero efectivos</span>
          </li>
          <li className="flex items-start gap-3 text-slate-600 text-sm font-light leading-snug">
            <svg className="w-4 h-4 text-[#2652be] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Reportes mensuales auditables</span>
          </li>
          <li className="flex items-start gap-3 text-slate-600 text-sm font-light leading-snug">
            <svg className="w-4 h-4 text-[#2652be] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Protocolo de cobranza en 3 etapas</span>
          </li>
        </ul>
      </div>
    </div>

    {/* EJE 2 */}
    <div className="flex flex-col rounded-md overflow-hidden border border-[#2652be] bg-white shadow-xs hover:shadow-md transition-all duration-300">
      <div className="bg-[#2652be] px-6 py-4">
        <h3 className="text-white font-semibold text-sm tracking-wide">
          Gestión activa y operación
        </h3>
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-start">
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-slate-600 text-sm font-light leading-snug">
            <svg className="w-4 h-4 text-[#2652be] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Supervisión presencial programada</span>
          </li>
          <li className="flex items-start gap-3 text-slate-600 text-sm font-light leading-snug">
            <svg className="w-4 h-4 text-[#2652be] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Respuesta máxima: 12 horas hábiles</span>
          </li>
          <li className="flex items-start gap-3 text-slate-600 text-sm font-light leading-snug">
            <svg className="w-4 h-4 text-[#2652be] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Checklists y bitácoras mensuales</span>
          </li>
        </ul>
      </div>
    </div>

    {/* EJE 3 */}
    <div className="flex flex-col rounded-md overflow-hidden border border-[#2652be] bg-white shadow-xs hover:shadow-md transition-all duration-300">
      <div className="bg-[#2652be] px-6 py-4">
        <h3 className="text-white font-semibold text-sm tracking-wide">
          Cumplimiento legal
        </h3>
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-start">
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-slate-600 text-sm font-light leading-snug">
            <svg className="w-4 h-4 text-[#2652be] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>LPH, RGLPH y Mandato 8</span>
          </li>
          <li className="flex items-start gap-3 text-slate-600 text-sm font-light leading-snug">
            <svg className="w-4 h-4 text-[#2652be] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Gestión de pólizas, asambleas y actas</span>
          </li>
          <li className="flex items-start gap-3 text-slate-600 text-sm font-light leading-snug">
            <svg className="w-4 h-4 text-[#2652be] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Protección legal para la directiva</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* Botón de Enlace Destacado sutil */}
  <div className="pt-12 md:pt-16">
    <a
      href="/servicios"
      className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest border-b-2 border-[#2652be] pb-1 text-[#2652be] font-bold transition-all hover:text-slate-900 hover:border-slate-900 cursor-pointer"
    >
      Ver Más
      <svg
        className="w-4 h-4 transition-transform group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
    </a>
  </div>

    {/* SECCIÓN RESPALDO OPERATIVO PREMIUM */}
<div className="col-span-1 md:col-span-2 lg:col-span-3 pt-16 border-[#2652be]/20 space-y-6 z-10">
  
  {/* Encabezado y Descripción */}
  <div className="space-y-2">
    <h5 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#2652be] font-['Poppins']">
      Proveedores estratégicos y herramientas avaladas
    </h5>
    <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#2652be]">
      Una red de aliados que respalda nuestra gestión
    </p>
    <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-4xl">
      Para cumplir nuestra promesa de orden, respuesta y respaldo, trabajamos con proveedores estratégicos y herramientas avaladas en lo legal, técnico, operativo y administrativo.
    </p>
  </div>

  {/* Grid de 6 Tarjetas con SVG Corregido */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-2">
    
    {/* 1. Bufete, Notaría y Mediación (Balanza Legal) */}
    <div className="min-h-[115px] bg-[#2652be] rounded-2xl flex flex-col items-center justify-center p-3.5 text-center select-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
      <svg className="w-7 h-7 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h18" />
      </svg>
      <span className="font-sans text-xs font-medium tracking-wide text-white leading-tight w-full">
        Bufete, Notaría y Mediación
      </span>
    </div>

    {/* 2. Bróker y Aseguradoras (Póliza / Documento Protegido) */}
    <div className="min-h-[115px] bg-[#2652be] rounded-2xl flex flex-col items-center justify-center p-3.5 text-center select-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
      <svg className="w-7 h-7 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
      <span className="font-sans text-xs font-medium tracking-wide text-white leading-tight w-full">
        Bróker y Aseguradoras
      </span>
    </div>

    {/* 3. Seguridad Física y Electrónica (Escudo con Check) */}
    <div className="min-h-[115px] bg-[#2652be] rounded-2xl flex flex-col items-center justify-center p-3.5 text-center select-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
      <svg className="w-7 h-7 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <span className="font-sans text-xs font-medium tracking-wide text-white leading-tight w-full">
        Seguridad Física y Electrónica
      </span>
    </div>

    {/* 4. Mantenimiento de Equipos (Llave Inglesa) */}
    <div className="min-h-[115px] bg-[#2652be] rounded-2xl flex flex-col items-center justify-center p-3.5 text-center select-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
      <svg className="w-7 h-7 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
      <span className="font-sans text-xs font-medium tracking-wide text-white leading-tight w-full">
        Mantenimiento de Equipos
      </span>
    </div>

    {/* 5. Reformas y Modernizaciones (Rodillo de Pintura) */}
    <div className="min-h-[115px] bg-[#2652be] rounded-2xl flex flex-col items-center justify-center p-3.5 text-center select-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
      <svg className="w-7 h-7 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="6" rx="2" />
        <path d="M10 9v4a2 2 0 0 0 2 2h7a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7a4 4 0 0 1-4-4V9" />
        <rect x="7" y="19" width="2" height="3" rx="0.5" />
      </svg>
      <span className="font-sans text-xs font-medium tracking-wide text-white leading-tight w-full">
        Reformas y Modernizaciones
      </span>
    </div>

    {/* 6. Plataforma Administrativa (Monitor de Escritorio / Pantalla PC) */}
    <div className="min-h-[115px] bg-[#2652be] rounded-2xl flex flex-col items-center justify-center p-3.5 text-center select-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
      <svg className="w-7 h-7 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="12" x2="12" y1="17" y2="21" />
        <line x1="8" x2="16" y1="21" y2="21" />
      </svg>
      <span className="font-sans text-xs font-medium tracking-wide text-white leading-tight w-full">
        Plataforma Administrativa
      </span>
    </div>

  </div>

  {/* Párrafo de Cierre de Garantía */}
  <div className="bg-slate-50/80 border-l-4 border-[#2652be] p-4 rounded-r-xl mt-4 shadow-sm">
    <p className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed italic">
      <span className="font-semibold text-[#2652be] not-italic">No improvisamos soluciones:</span> Coordinamos una red de especialistas para responder mejor, reducir riesgos y sostener una administración más confiable.
    </p>
  </div>

</div>
</section>


      {/* 5. SECCIÓN: CASO DE ÉXITO DESTACADO */}
<section
  ref={exitoSectionRef}
  className="w-full bg-[#2652be] text-white py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-blue-900/30 antialiased font-['Poppins'] relative overflow-hidden"
>
  {/* Sutil textura de fondo premium */}
  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none"></div>

  <div className="relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      {/* Contenedor Izquierdo: Encabezado */}
      <div ref={exitoHeaderRef} className="lg:col-span-4 space-y-4">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-[1.1] text-white">
          Casos de <br className="hidden lg:block" /> éxito
        </h2>
        <p className="text-sm text-blue-100/70 font-light max-w-sm leading-relaxed">
          Resultados medibles y gestión transparente que transforman la realidad de nuestros condominios.
        </p>
        <div className="pt-2">
          <a
            href="/portafolio"
            className="group inline-flex items-center gap-2 text-xs tracking-wider border-b border-white/40 pb-1 text-white font-light transition-all hover:text-blue-200 hover:border-blue-200/50"
          >
            Ver casos reales
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bloques de Impacto Rediseñados */}
      <div
        ref={exitoGridRef}
        className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:pl-8 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10"
      >
        {/* Pilar 1: Presupuesto */}
        <div className="space-y-4 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/[0.07]">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-blue-200">
            {/* Icono de Gráfico/Ahorro */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-normal tracking-tight text-white border-b border-white/10 pb-1.5">
              Presupuesto
            </h4>
            <p className="text-xs text-blue-100/70 font-light leading-relaxed">
              Reducción del presupuesto mediante auditoría de recursos y modelo sostenible. Gasto en luz bajó de{" "}
              <span className="font-normal text-white">USD 514,00 a USD 123,00</span> y agua de{" "}
              <span className="font-normal text-white">USD 660,00 a USD 20,40</span>.
            </p>
          </div>
        </div>

        {/* Pilar 2: Mediación */}
        <div className="space-y-4 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/[0.07]">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-blue-200">
            {/* Icono de Apretón de manos / Trato */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-normal tracking-tight text-white border-b border-white/10 pb-1.5">
              Mediación
            </h4>
            <p className="text-xs text-blue-100/70 font-light leading-relaxed">
              Mediación efectiva con constructores y copropietarios para lograr{" "}
              <span className="font-normal text-white">acuerdos de pago ágiles</span> y la recuperación real de valores pendientes.
            </p>
          </div>
        </div>

        {/* Pilar 3: Conservación */}
        <div className="space-y-4 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/[0.07]">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-blue-200">
            {/* Icono de Edificio / Plusvalía */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-normal tracking-tight text-white border-b border-white/10 pb-1.5">
              Conservación
            </h4>
            <p className="text-xs text-blue-100/70 font-light leading-relaxed">
              Edificios protegidos y valorizados continuamente mediante{" "}
              <span className="font-normal text-white">proyectos de mejora</span>, modernización estructural y mantenimiento técnico permanente.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;
