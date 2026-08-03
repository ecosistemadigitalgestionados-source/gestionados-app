import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ban1 from '../assets/nosotrosFoto.jpg'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Nosotros() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero Animation
      gsap.from(".hero-animate", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // 2. Cronología e IACA Animation
      gsap.from(".timeline-animate", {
        scrollTrigger: {
          trigger: ".history-section",
          start: "top 75%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      // 3. Filosofía Animation
      gsap.from(".philosophy-animate", {
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white overflow-x-hidden font-['Poppins']"
    >
  {/* 01. HERO / INTRODUCCIÓN */}
<section className="w-full py-24 sm:py-32 md:py-36 px-4 sm:px-6 lg:px-12 relative overflow-hidden text-white min-h-[500px] flex items-center">
  
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
  <div className="max-w-7xl mx-auto relative z-20 w-full">
    <div className="my-auto max-w-4xl space-y-6 select-none relative">
      
      {/* TÍTULO PRINCIPAL */}
      <h1 
        style={{ 
          textShadow: '0 4px 28px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.85)' 
        }}
        className="hero-animate text-3xl sm:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.15]"
      >
        Más de 20 años administrando condominios con orden, control y resultados
      </h1>

      {/* DESCRIPCIÓN PEQUEÑA */}
      <p 
        style={{ 
          textShadow: '0 2px 14px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9)' 
        }}
        className="hero-animate text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl pt-2 text-slate-100 opacity-95"
      >
        Desde 2006, acompañamos a directivas y copropietarios en la gestión profesional de sus condominios, cuidando su operación, su organización y su patrimonio.
      </p>

    </div>
  </div>
</section>
      {/* 02. NUESTRA HISTORIA & LÍNEA DE TIEMPO + CASO IACA */}
      <section className="history-section w-full py-20 px-4 sm:px-6 lg:px-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Columna Izquierda: Línea de Tiempo e Historia Unificadas */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#2652be] font-semibold">
                  Trayectoria
                </span>
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2652be] mt-1">
                  Nuestra historia
                </h2>
              </div>

              <div className="relative border-l border-slate-200 pl-6 space-y-8 ml-2">
                {/* Hito 2006 */}
                <div className="timeline-animate relative">
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#2652be] border-4 border-white ring-1 ring-slate-200" />
                  <div className="space-y-2">
                    <span className="text-lg font-light text-[#2652be] block leading-none">
                      2006 — Administración directa
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                      Inicié como asistente en la administración del Edificio
                      IACA. Con el tiempo, la empresa que gestionaba el inmueble
                      fue removida y el presidente confió en mí para continuar.
                      Ese fue el punto de partida que impulsó la llegada de
                      nuevos condominios que nos permitió aprender desde la
                      operación del día a día.
                    </p>
                  </div>
                </div>

                {/* Hito 2016 */}
                <div className="timeline-animate relative">
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#2652be] border-4 border-white ring-1 ring-slate-200" />
                  <div className="space-y-2">
                    <span className="text-lg font-light text-[#2652be] block leading-none">
                      2016 — Constitución formal
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                      En 2016 tomamos la decisión de constituir formalmente la
                      empresa. Entendimos que la administración informal tenía
                      un límite: estructura, procesos y respaldo empresarial no
                      eran posibles de sostener sin una base sólida. Nace así
                      Gestionados, con el objetivo de construir una operación
                      organizada y profesional que pudiera escalar sin perder el
                      control.
                    </p>
                  </div>
                </div>

                {/* Hito 2026 */}
                <div className="timeline-animate relative">
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#2652be] border-4 border-white ring-1 ring-slate-200" />
                  <div className="space-y-1">
                    <span className="text-lg font-light text-[#2652be] block leading-none">
                      2026 — Consolidación y expansión
                    </span>
                    <p className="text-xs sm:text-sm text-slate-400 font-light">
                      En esta etapa consolidamos nuestra metodología técnica y
                      nuestros estándares de control en el condominio.
                      Fortalecemos una estructura de equipo, una red de
                      proveedores aliados y procesos claros, que hoy nos
                      permiten administrar más edificios y conjuntos manteniendo
                      orden, continuidad y confianza para las directivas y los
                      copropietarios.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: El Caso de Éxito Destacado */}
            <div className="timeline-animate lg:col-span-6 bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-2xl space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#2652be] font-mono font-bold bg-blue-50 px-2 py-0.5 rounded-md w-fit block">
                Referente Principal
              </span>
              <h3 className="text-xl font-normal tracking-tight text-[#2652be]">
                Un trabajo que se mide en el tiempo
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                El Edificio IACA es nuestro mayor referente: son más de 20 años
                de gestión continua manteniendo su operación, su orden y su
                valor intactos.
              </p>

              <div className="p-4 bg-white border border-blue-100 border-l-4 border-l-[#2652be] rounded-r-xl italic text-xs sm:text-sm text-[#132868] font-light leading-relaxed">
                "Que el constructor y los copropietarios digan que un edificio
                con 30 años de antigüedad se mantiene como nuevo y ordenado es
                uno de los mayores reconocimientos que podemos recibir."
              </div>

              <p className="text-xs text-slate-500 font-light leading-relaxed pt-2">
                Administrar no es solo mantener un edificio funcionando. Es
                garantizar que quienes viven o trabajan en él tengan absoluta
                seguridad, continuidad y confianza en su entorno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. FILOSOFÍA Y PRINCIPIOS - DISEÑO DE ALTO IMPACTO */}
      <section className="philosophy-section w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-white border-b border-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Bloque Izquierdo: El Manifiesto (Fuerza Visual y Contenido Destacado) */}
            <div className="lg:col-span-5 bg-[#2652be] text-white p-8 sm:p-12 rounded-sm flex flex-col justify-between philosophy-animate shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-10 -translate-y-10" />

              <div className="space-y-6 relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl  uppercase tracking-tight leading-[1.1]">
                  Cómo entendemos nuestro trabajo
                </h2>
              </div>

              <div className="mt-12 lg:mt-0 space-y-4 relative z-10 border-t border-white/20 pt-8">
                <p className="text-base sm:text-lg font-light leading-relaxed text-blue-50">
                  Más que administrar,{" "}
                  <span className="font-bold text-white uppercase">
                    ordenamos, controlamos y protegemos
                  </span>{" "}
                  el patrimonio de quienes confían en nosotros.
                </p>
                <p className="text-xs sm:text-sm font-light leading-relaxed text-blue-100/80">
                  No vemos la administración como una tarea operativa, sino como
                  una responsabilidad directa sobre el funcionamiento, la
                  organización y el valor real del condominio.
                </p>
              </div>
            </div>

            {/* Bloque Derecho: Pilares Absolutos (Tarjetería Limpia, Estructurada y Corporativa) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 philosophy-animate">
              <div className="space-y-3">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#2652be]/60 uppercase block">
                  Pilares Inquebrantables
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#2652be]">
                  Nuestros principios absolutos
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: "Honradez",
                    desc: "Garantizamos un manejo de recursos transparente, con rendición de cuentas auditable y claridad milimétrica en cada movimiento financiero.",
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  },
                  {
                    title: "Ética",
                    desc: "Actuamos bajo el marco legal y las normativas técnicas vigentes. Cada decisión protege legal y operativamente a la copropiedad.",
                    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                  },
                  {
                    title: "Respeto",
                    desc: "Fomentamos una convivencia sana mediante procesos de comunicación asertiva, resolviendo conflictos con firmeza, empatía y profesionalismo.",
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                  },
                ].map((p, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-col sm:flex-row gap-4 items-start bg-white p-5 sm:p-6 rounded-sm border border-blue-100 shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-sm bg-blue-50 flex items-center justify-center text-[#2652be] shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={p.icon}
                        />
                      </svg>
                    </div>
                    <div className="space-y-1 mt-1 sm:mt-0">
                      <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-[#2652be]">
                        {p.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#2652be]/80 font-light leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-[#2652be]" />
                  </div>
                ))}
              </div>

              <p className="text-[10px] sm:text-xs font-medium text-[#2652be]/50 italic pt-2">
                // Estos principios no son un discurso, son la base sobre la que
                trabajamos cada día con cada cliente.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 04. EQUIPO */}
      <section className="team-section w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-slate-50/70 border-b border-blue-50 relative overflow-hidden">
        {/* Patrón de fondo sutil para dar textura de "sitio vivo" */}
        <div className="absolute inset-0 bg-[radial-gradient(#2652be_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
          {/* Cabecera Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Izquierda */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl  uppercase tracking-tight text-[#2652be] leading-[1.05]">
                Un equipo que respalda cada operación
              </h2>
            </div>

            {/* Derecha */}
            <div className="lg:col-span-6 border-l-2 border-[#2652be] pl-6 lg:pl-8">
              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
                <strong className="text-[#2652be] font-bold">
                  Gestionados
                </strong>{" "}
                no depende de una sola persona. Trabajamos con una estructura
                organizada que permite responder de forma técnica, operativa y
                administrativa a cada condominio de manera simultánea.
              </p>
            </div>
          </div>

          {/* Organigrama Maquetado de Alto Impacto - Versión Conexiones Perfectas */}
          <div className="w-full pt-16 border-t border-slate-200/60 relative">
            {/* Luces de fondo de color ambiental para dar profundidad */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
              {/* Nivel 1: Gerencia (Azul Eléctrico Profundo) */}
              <div className="relative pb-16 flex flex-col items-center w-full">
                <div className="bg-gradient-to-br from-[#2652be] via-[#1e43a3] to-[#112a6b] text-white px-10 py-5 rounded-2xl shadow-[0_15px_30px_rgba(38,82,190,0.3)] border border-blue-400/30 text-center w-64 transform transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_20px_40px_rgba(38,82,190,0.4)]">
                  <span className="font-black tracking-wider uppercase text-base sm:text-lg block">
                    Gerencia
                  </span>
                </div>

                {/* Línea vertical principal que baja de Gerencia directamente */}
                <div className="absolute bottom-0 left-1/2 w-[3px] h-16 bg-[#2652be]" />
              </div>

              {/* Nivel 2: Legal - Staff (Alineado y conectado físicamente a la línea central) */}
              <div className="relative w-full flex justify-center pb-16">
                {/* Línea central continua que conecta el nivel superior con el inferior */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-[#2652be]" />

                {/* Contenedor del Staff: Posicionamiento absoluto para forzar que toque físicamente la línea del medio */}
                <div className="relative z-10 flex items-center justify-end w-full max-w-4xl pr-[50%]">
                  {/* Tarjeta de Asesoría Legal */}
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl shadow-[0_10px_25px_rgba(245,158,11,0.25)] border border-amber-400/30 text-center w-52 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_30px_rgba(245,158,11,0.35)]">
                    <span className="font-black tracking-wide uppercase text-xs sm:text-sm block">
                      Legal
                    </span>
                  </div>

                  {/* Puente físico directo: Sale de la derecha de la tarjeta y choca con la línea vertical azul central */}
                  <div className="w-12 lg:w-20 h-[3px] bg-gradient-to-r from-amber-500 to-[#2652be]" />
                </div>
              </div>

              {/* Nivel 3: Gerencias de Área y Contador */}
              <div className="relative w-full pt-12">
                {/* Línea horizontal de distribución (Conecta las 3 columnas en escritorio) */}
                <div className="absolute top-0 left-[16.6%] right-[16.6%] h-[3px] bg-[#2652be] hidden md:block rounded-full" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
                  {/* Conectores verticales individuales que caen PERFECTAMENTE al centro de cada tarjeta superior */}
                  <div className="absolute top-0 left-[16.6%] w-[3px] h-12 bg-[#2652be] hidden md:block -translate-x-1/2" />
                  <div className="absolute top-0 left-1/2 w-[3px] h-12 bg-[#2652be] hidden md:block -translate-x-1/2" />
                  <div className="absolute top-0 left-[83.3%] w-[3px] h-12 bg-[#2652be] hidden md:block -translate-x-1/2" />

                  {/* Gerencia Comercial */}
                  <div className="flex flex-col items-center pt-0 md:pt-12">
                    <div className="bg-white px-6 py-6 rounded-2xl shadow-[0_10px_25px_rgba(38,82,190,0.08)] border-2 border-[#2652be] text-center w-full max-w-[240px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(38,82,190,0.15)]">
                      <span className="font-black tracking-wide uppercase text-xs sm:text-sm text-slate-800 block">
                        Gerencia Comercial
                      </span>
                    </div>
                  </div>

                  {/* Gerencia de Operaciones + Subordinados */}
                  <div className="flex flex-col items-center pt-0 md:pt-12">
                    {/* Tarjeta de Gerencia Operaciones */}
                    <div className="bg-white px-6 py-6 rounded-2xl shadow-[0_10px_25px_rgba(99,102,241,0.08)] border-2 border-indigo-600 text-center w-full max-w-[240px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(99,102,241,0.15)]">
                      <span className="font-black tracking-wide uppercase text-xs sm:text-sm text-slate-800 block">
                        Gerencia Operaciones
                      </span>
                    </div>

                    {/* Conector directo fuerte de color Índigo que baja al primer subordinado */}
                    <div className="w-[3px] h-8 bg-indigo-600" />

                    {/* Subordinados Operativos conectados en cadena limpia */}
                    <div className="flex flex-col items-center w-full max-w-[210px]">
                      {/* Supervisor (Acento Esmeralda) */}
                      <div className="flex flex-col items-center w-full">
                        <div className="bg-emerald-50 border-2 border-emerald-500 text-slate-800 px-5 py-3 rounded-xl text-center w-full shadow-sm transition-all duration-300 hover:bg-emerald-100/50 hover:scale-[1.02]">
                          <span className="font-extrabold tracking-wide uppercase text-xs text-slate-800">
                            Supervisores
                          </span>
                        </div>
                        {/* Conector visible fuerte de unión */}
                        <div className="w-[3px] h-6 bg-slate-400" />
                      </div>

                      {/* Administradores (Acento Violeta) */}
                      <div className="flex flex-col items-center w-full">
                        <div className="bg-violet-50 border-2 border-violet-500 text-slate-800 px-5 py-3 rounded-xl text-center w-full shadow-sm transition-all duration-300 hover:bg-violet-100/50 hover:scale-[1.02]">
                          <span className="font-extrabold tracking-wide uppercase text-xs text-slate-800">
                            Administradores
                          </span>
                        </div>
                        {/* Conector visible fuerte de unión */}
                        <div className="w-[3px] h-6 bg-slate-400" />
                      </div>

                      {/* Personal Limpieza (Gris Ejecutivo con Borde Fuerte) */}
                      <div className="w-full">
                        <div className="bg-slate-50 border-2 border-slate-400 text-slate-800 px-5 py-3 rounded-xl text-center w-full shadow-sm transition-all duration-300 hover:bg-slate-100 hover:scale-[1.02]">
                          <span className="font-extrabold tracking-wide uppercase text-xs text-slate-800">
                            Personal Limpieza
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contador (Color Cyan de Contraste) */}
                  <div className="flex flex-col items-center pt-0 md:pt-12">
                    <div className="bg-white px-6 py-6 rounded-2xl shadow-[0_10px_25px_rgba(6,182,212,0.08)] border-2 border-cyan-600 text-center w-full max-w-[240px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(6,182,212,0.15)]">
                      <span className="font-black tracking-wide uppercase text-xs sm:text-sm text-slate-800 block">
                        Contador
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
