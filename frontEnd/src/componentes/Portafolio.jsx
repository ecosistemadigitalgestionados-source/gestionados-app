import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap as gsapActual } from "gsap";

import ban1 from '../assets/portafolioB .png';
import iaca from '../assets/iaca.jpg';
import kenta from '../assets/kenta.jpg';
import paseo from '../assets/paseo.png';
import bosque from '../assets/bosque.jpeg';
import century from '../assets/century.png';
import arsahk from '../assets/arshak.png';

import antesI1 from '../assets/01 Antes Impermeabilizacion y pintura jardineras.jpg'
import despuesI1 from '../assets/01 Despues Impermeabilización y pintura  de jardineras.jpg'
import antesI2 from '../assets/21 Antes Gypsum   Iluminacion Iaca.jpg'
import despuesI2 from '../assets/21 Despues gypsum Iluminacion iaca.jpg'
import antesI3 from '../assets/23 Antes puerta garaje Iaca.jpg'
import despuesI3 from '../assets/23 Despues Puerta garage Iaca.jpg'
import antesI4 from '../assets/Limpieza de vidrios exteriores 01.jpg'
import despuesI4 from '../assets/Limpieza de vidrios exteriores 02.jpg'

import antesC1 from '../assets/22Antes Asc Century.jpg'
import despuesC1 from '../assets/22 Despues Century.jpg'
import antesC2 from '../assets/26 Antes Piso ceramica Century.jpg'
import despuesC2 from '../assets/26 Despues Piso porcelanato Century.jpg'
import antesC3 from '../assets/27 Antes cielo razo Iluminacion Century.jpg'
import despuesC3 from '../assets/27 Despues Gypsum Iluminacion Century.jpg'
import antesC4 from '../assets/28 Antes Pintura Hall Century.jpg'
import despuesC4 from '../assets/28 Despues Veneciano Hall Century.jpg'

import antesk1 from '../assets/24 Antes Pintura y estuco.jpg'
import despuesk1 from '../assets/24 Despues Pintura y estuco.jpg'
import antesk2 from '../assets/25 Jardineras antes.jpg'
import despuesk2 from '../assets/25 Jardineras despues (6).jpg'

gsapActual.registerPlugin(ScrollTrigger);

// ==========================================
// COMPONENTE INTERNO: TARJETA DE EVIDENCIA
// ==========================================
function TarjetaEvidencia({ evidencia, onZoom }) {
  const [verDespues, setVerDespues] = useState(true);

  return (
    <div 
      onClick={() => onZoom(evidencia)}
      className="evidencia-card bg-slate-100 border border-slate-200 rounded-sm overflow-hidden flex flex-col justify-between relative min-h-[340px] group transition-all duration-300 shadow-xs cursor-zoom-in"
    >
      <div className="absolute inset-0 bg-slate-900 overflow-hidden">
        <img 
          src={verDespues ? evidencia.fotoDespues : evidencia.fotoAntes} 
          alt={evidencia.tag}
          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/40"></div>
      </div>

      <div className="relative z-10 p-4 flex justify-end items-center w-full">
        <div 
          className="flex bg-black/70 backdrop-blur-md p-1 rounded-xs border border-white/20"
          onClick={(e) => e.stopPropagation()} 
        >
          <button
            onClick={() => setVerDespues(false)}
            className={`text-[10px]  uppercase px-2 py-1 rounded-xs font-bold transition-all ${
              !verDespues ? "bg-red-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Antes
          </button>
          <button
            onClick={() => setVerDespues(true)}
            className={`text-[10px]  uppercase px-2 py-1 rounded-xs font-bold transition-all ${
              verDespues ? "bg-green-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Después
          </button>
        </div>
      </div>

      <div className="relative z-10 p-5 pt-24 text-white pointer-events-none">
        
        <p className="text-sm font-light tracking-tight leading-snug text-slate-100 ">
          {evidencia.desc}
        </p>
        <span className="text-xs  text-blue-400 mt-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click para ver pantalla completa [+]
        </span>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL PORTAFOLIO
// ==========================================
function Portafolio() {
  const containerRef = useRef(null);
  const [activeCase, setActiveCase] = useState("iaca");
  const [modalEvidencia, setModalEvidencia] = useState(null);

  // Casos Principales (Panel Interactivo Intercambiable)
  const listaCasos = [
    {
      id: "iaca",
      nombre: "Edificio IACA",
      periodo: "20 años de gestión",
      fotoEdificio: iaca,
      descripcion: "Cuando un condómino necesita proteger su patrimonio y sostener su valor en el tiempo, el caso de Edificio IACA demuestra la capacidad de Gestionados para intervenir con visión de largo plazo y lograr que una estructura de 1993 luzca y opere como nueva.",
      bloques: [
        {
          categoria: "Eficiencia Financiera y Sostenibilidad",
          items: [
            "Reducción del 96% en planilla de agua: de USD 660,00 a un promedio de USD 20,00 mediante auditoría técnica avanzada y corrección de fugas.",
            "Reducción del 76% en planilla eléctrica: de USD 514,00 a USD 123,00 implementando una modernización integral a tecnología LED en áreas comunes.",
            "Fondo de reserva acumulado: USD 20.000 líquidos en cuenta destinados a mejoras de gran escala y la próxima modernización de ascensores por terminación de vida útil."
          ]
        },
        {
          categoria: "Infraestructura e Intervenciones Mayores",
          items: [
            "Obras civiles estructurales: Impermeabilización técnica de terraza, renovación estética y funcional de pasillos, cielos rasos y diseño arquitectónico de jardines.",
            "Cambio funcional en accesos: Sustitución de puertas antiguas de aluminio por vidrio templado en el lobby, elevando la luminosidad y la plusvalía."
          ]
        },
        {
          categoria: "Seguridad Integral",
          items: [
            "Sistema de seguridad modernizado: Despliegue de circuito cerrado de televisión (CCTV), automatización de control de accesos vehiculares/peatonales y sistema centralizado contra incendios bajo norma."
          ]
        }
      ],
      destacado: "El edificio, construido en 1993, opera y luce como nuevo gracias a una gestión presencial y estratégica. Su valor comercial ha crecido de forma sostenida en el mercado corporativo de Quito.",
      evidencias: [
        { tipo: "Reforma", tag: "Paredes & Drywall", desc: "Impermeabilizacion y pintura jardineras.", 
          fotoAntes: antesI1,
          fotoDespues: despuesI1
        },
        { tipo: "Fachada", tag: "Mantenimiento Externo", desc: "Gypsum   Iluminacion Iaca.",
          fotoAntes: antesI2,
          fotoDespues: despuesI2
        },
        { tipo: "Zonas Verdes", tag: "Jardinería Integrada", desc: "Puerta garaje Iaca.",
          fotoAntes: antesI3,
          fotoDespues: despuesI3
        },
        { tipo: "Zonas Verdes", tag: "Jardinería Integrada", desc: "Limpieza de vidrios exteriores en altura.",
          fotoAntes: antesI4,
          fotoDespues: despuesI4
        }
      ]
    },
    {
      id: "century",
      nombre: "Edificio Century Plaza",
      periodo: "Gestión Integral",
      fotoEdificio: century,
      descripcion: "Estructuración legal, mitigación absoluta de morosidad y adecuación de infraestructura para el cumplimiento estricto de las normativas municipales del Distrito Metropolitano de Quito.",
      bloques: [
        {
          categoria: "Regularización Corporativa y Legal",
          items: [
            "Recepción formal desde el constructor: Saneamiento de actas de entrega, actualización de nombramientos oficiales, obtención de RUC e instrumentación de cuenta bancaria corporativa exclusiva y normas claras de convivencia."
          ]
        },
        {
          categoria: "Resultados Financieros de Alto Impacto",
          items: [
            "Recuperación patrimonial: Restitución de un espacio que estaba ocupado ilegalmente por el constructor. Hoy se encuentra arrendado y genera ingresos que cubren el 20% del presupuesto operativo anual del condominio.",
            "Cero morosidad: Activación inmediata de protocolos de cobranza predictiva y convenios de pago dirigidos, erradicando las cuentas vencidas."
          ]
        },
        {
          categoria: "Modernización, Identidad y Emergencias",
          items: [
            "Renovación de áreas comunes: Actualización de acabados en pasillos, pisos y cielos rasos.",
            "Identidad visual corporativa: Implementación coordinada de rótulo exterior del edificio, directorios internos y señalización de oficinas.",
            "Planes de autoprotección: Despliegue de señalética de seguridad, diseño de rutas de evacuación validadas por el Cuerpo de Bomberos y simulacros periódicos.",
            "Gestión operativa de emergencias: Intervención técnica inmediata ante tuberías de desagüe rotas, inundaciones severas por lluvias y control preventivo de fugas de gas."
          ]
        }
      ],
      evidencias: [
        { tipo: "Estructural", tag: "Reparación de Fisuras", desc: "Ascensor Century.",
          fotoAntes: antesC1,
          fotoDespues: despuesC1
        },
        { tipo: "Seguridad", tag: "Pasamanos Reglamentarios", desc: "Piso porcelanato Century.",
          fotoAntes: antesC2,
          fotoDespues: despuesC2
        },
        { tipo: "Estructural", tag: "Reparación de Fisuras", desc: "Cielo razo Iluminacion Century.",
          fotoAntes: antesC3,
          fotoDespues: despuesC3
        },
        { tipo: "Estructural", tag: "Reparación de Fisuras", desc: "Pintura Hall Century.",
          fotoAntes: antesC4,
          fotoDespues: despuesC4
        },
      ]
    },
    {
      id: "kenta",
      nombre: "Conjunto Kenta Vista",
      periodo: "Mediación Residencial",
      fotoEdificio: kenta,
      descripcion: "Enfoque especializado en la transición constructiva técnico-legal y el desarrollo de normativas que promueven la convivencia armónica.",
      bloques: [
        {
          categoria: "Hitos de Gestión y Mediación",
          items: [
            "Recepción institucional formal: Estructuración legal completa que incluye la entrega de actas desde el promotor, RUC, cuenta bancaria copropietaria y nombramientos vigentes.",
            "Mediación técnica exitosa: Se gestionó que el constructor asumiera un costo de USD 6.000 en reparaciones físicas y estructurales de los estacionamientos sin costo para el fondo común.",
            "Seguridad tecnológica: Implementación integral de sistemas cerrados de televisión (CCTV) con monitoreo en puntos ciegos y controles estrictos de acceso electrónico.",
            "Normas de convivencia: Elaboración y aprobación de reglamentos internos personalizados, adaptados exclusivamente a la dinámica real del conjunto."
          ]
        }
      ],
      evidencias: [
        { tipo: "Obra Civil", tag: "Reparación Estructural", desc: "Pintura y estuco.",
          fotoAntes: antesk1,
          fotoDespues: despuesk1
        },
        { tipo: "Seguridad", tag: "Monitoreo CCTV", desc: "Jardineras.",
          fotoAntes: antesk2,
          fotoDespues: despuesk2
        }
      ]
    },
    {
      id: "arshak",
      nombre: "Edificio Arshak",
      periodo: "Regularización Técnica",
      fotoEdificio: arsahk,
      descripcion: "Intervención ágil para resolver trabas operativas e institucionales con el constructor, asegurando la habitabilidad y el cumplimiento normativo contra incendios.",
      bloques: [
        {
          categoria: "Regularización Operativa y Legal",
          items: [
            "Recepción formal desde el constructor: Organización técnica de actas de entrega, registro de nombramientos ante las entidades pertinentes, obtención de RUC, cuenta bancaria y normas internas de convivencia.",
            "Mediación por amenidades: Gestión directa con el constructor para asegurar la entrega formal, funcional y con acabados óptimos de las áreas recreativas del edificio.",
            "Permisos y servicios centrales: Legalización completa de la documentación técnica para el despacho continuo de gas centralizado y la obtención de los permisos anuales del Cuerpo de Bomberos."
          ]
        }
      ]
    },
    {
      id: "paseos",
      nombre: "Conjunto Paseos de Pichincha",
      periodo: "Recuperación Crítica",
      fotoEdificio: paseo,
      descripcion: "Saneamiento financiero profundo y reestructuración de pasivos comerciales urgentes con proveedores clave de servicios.",
      bloques: [
        {
          categoria: "Resultados Financieros y Cartera",
          items: [
            "Recuperación de cartera vencida: Retorno de USD 30.000 de cartera vencida profunda en el transcurso de un año mediante atención personalizada de requerimientos y convenios de pago estructurados.",
            "Regularización de cuentas por pagar: Liquidación y ordenamiento de deudas acumuladas con la compañía de seguridad privada por tres meses vencidos, con un valor aproximado de USD 7.000."
          ]
        }
      ]
    },
    {
      id: "bosque",
      nombre: "Edificio El Bosque",
      periodo: "Transición Corporativa",
      fotoEdificio: bosque,
      descripcion: "Saneamiento normativo inicial y procesos formales de mediación para salvaguardar la correcta entrega de áreas de esparcimiento.",
      bloques: [
        {
          categoria: "Gestión Operativa e Institucional",
          items: [
            "Recepción formal desde el constructor: Organización técnica y legal de actas de entrega, registro de nombramientos vigentes, obtención de RUC, apertura de cuenta bancaria y redacción de normas internas de convivencia.",
            "Mediación por amenidades: Gestión directa con la empresa constructora para asegurar la entrega formal de las áreas recreativas del edificio con acabados óptimos."
          ]
        }
      ]
    }
  ];

  // Listado Independiente para la sección inferior de Casos Adicionales
  const casosAdicionales = [
    {
      nombre: "Edificio Stilo",
      periodo: "Ingresos Extraordinarios",
      descripcion: "Saneamiento financiero exprés mediante esquemas inteligentes de cobranza y estructuración de modelos de negocio estables utilizando la infraestructura existente.",
      items: [
        "Recuperación express de cartera: Retorno de USD 10.000 de cartera vencida en un período de solo tres meses mediante atención personalizada de requerimientos históricos y convenios de pago ágiles.",
        "Estructuración de ingresos pasivos: Contratos de arriendo a largo plazo con operadores de telecomunicaciones en la azotea, inyectando un flujo permanente que representa el 50% del presupuesto operativo.",
        "Regularización laboral: Blindaje patronal mediante la instrumentación contractual y la regularización legal completa del personal de limpieza con larga antigüedad."
      ]
    },
    {
      nombre: "Edificio Botticelli",
      periodo: "Saneamiento Inicial",
      descripcion: "Estructuración jurídica base y formalización reglamentaria del condominio para su correcta operación autónoma.",
      items: [
        "Recepción formal desde el constructor: Trámite completo de actas de entrega, regularización de nombramientos legales, obtención de RUC corporativo, instrumentación de cuenta bancaria y diseño del reglamento de convivencia."
      ]
    },
    {
      nombre: "Edificio Roma",
      periodo: "Saneamiento de Infraestructura",
      descripcion: "Intervenciones estructurales de alta complejidad técnica destinadas a resolver vicios ocultos de construcción y optimizar los activos de protección patrimonial.",
      items: [
        "Reemplazo de ducto principal: Sustitución total de tuberías en el ducto principal (dañadas por fisuras estructurales antiguas) piso por piso, eliminando de raíz humedades y malos olores.",
        "Control de filtraciones: Corrección de filtraciones originadas por llaves de paso, reparando paredes afectadas y eliminando desprendimientos de pintura.",
        "Mejora estética y seguridad: Instalación de puertas metálicas reforzadas que elevaron notablemente el estándar estético y de seguridad en cada piso.",
        "Gestión de Riesgos y Seguros: Selección, negociación y contratación de la póliza contra incendios, gestionando con éxito reclamos por siniestros de inundaciones y roturas de tuberías."
      ]
    },
    {
      nombre: "Edificio Reyes Uribe",
      periodo: "Auditoría Operativa",
      descripcion: "Reingeniería de proveedores, optimización laboral patronal y renovación del sistema estético de la fachada arquitectónica.",
      items: [
        "Auditoría y Talento Humano: Revisión del personal propio del edificio, regularización absoluta de obligaciones patronales IESS y gestión transparente de liquidaciones pendientes.",
        "Optimización de Proveedores: Depuración técnica, selección rigurosa y contratación de nuevos proveedores homologados para mantenimientos del sistema central.",
        "Infraestructura y pintura: Ejecución del mantenimiento estético de la fachada mediante un canje estratégico de cuentas por cobrar para financiar la pintura exterior sin mermar la liquidez.",
        "Seguridad: Modernización e instalación de sistemas de ingreso digital avanzados en el acceso principal."
      ]
    }
  ];

  const casoSeleccionado = listaCasos.find((c) => c.id === activeCase) || listaCasos[0];

 // 1. Animaciones estáticas (Solo corren una vez al cargar la web)
  useEffect(() => {
    let ctx = gsapActual.context(() => {
      gsapActual.fromTo(".hero-text-animate", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out" }
      );

      gsapActual.from(".tarjeta-adicional-animate", {
        scrollTrigger: {
          trigger: ".grid-casos-adicionales",
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Animaciones dinámicas (Corren siempre al cambiar de caso o al cargar el primero)
  useEffect(() => {
    let ctx = gsapActual.context(() => {
      // Animación de la tarjeta contenedora
      gsapActual.fromTo(
        ".contenido-caso-dinamico",
        { opacity: 0, y: 15, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out" }
      );

      // Animación de las evidencias (fotos de antes y después) sin ScrollTrigger que las bloquee
      gsapActual.fromTo(
        ".evidencia-card",
        { opacity: 0, y: 25 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out",
          onComplete: () => {
            if (typeof gsapActual.ScrollTrigger !== "undefined") {
              gsapActual.ScrollTrigger.refresh();
            }
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCase]);

  // 3. Bloqueo de Scroll del Modal
  useEffect(() => {
    if (modalEvidencia) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [modalEvidencia]);

  return (
    <div
  ref={containerRef}
  id="seccion-resultados"
  className="w-full antialiased bg-white text-[#2652be] pb-24 sm:pb-32 border-t border-blue-100 font-['Poppins',sans-serif]"
>
  {/* 01. HERO BANNER */}
<section className="w-full py-24 sm:py-32 md:py-36 px-4 sm:px-6 lg:px-12 relative overflow-hidden text-white min-h-[500px] flex items-center">
  {/* Foto de Fondo */}
  <div className="absolute inset-0 w-full h-full z-0">
    <img 
    loading="eager"
      fetchPriority="high"
      src={ban1} 
      alt="Resultados reales en condominios"
      className="w-full h-full object-cover object-center select-none pointer-events-none"
    />
  </div>

  {/* Capa de Gradiente de Fondo */}
  <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

  {/* Contenido */}
  <div className="max-w-7xl mx-auto relative z-20 w-full">
    <div className="my-auto max-w-4xl space-y-6 select-none relative">
      
      {/* Título Principal */}
      <h1 
        style={{ 
          textShadow: '0 4px 28px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.85)' 
        }}
        className="text-3xl sm:text-5xl lg:text-7xl uppercase tracking-tight leading-[1.12] hero-text-animate font-extralight font-['Poppins',sans-serif]"
      >
        Resultados reales en condominios similares
      </h1>

      {/* Descripción */}
      <p 
        style={{ 
          textShadow: '0 2px 14px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9)' 
        }}
        className="text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl pt-2 text-slate-100 opacity-95 hero-text-animate font-['Poppins',sans-serif]"
      >
        La mejor forma de evaluar una propuesta es revisar si el proveedor ya ha resuelto con éxito problemas similares a los que hoy enfrenta el cliente. En ese sentido, Gestionados no solo ofrece un método; también presenta resultados concretos.
      </p>

    </div>
  </div>
</section>

  {/* 02. CUERPO INTERACTIVO DE CASOS PRINCIPALES */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8 sm:mt-16">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      
      {/* NAVEGACIÓN LATERAL */}
      <div className="lg:col-span-4 space-y-2 sm:space-y-3 lg:sticky lg:top-24 z-20">
        <span className="text-[11px] sm:text-xs  font-bold tracking-widest text-[#2652be]/60 block px-1 uppercase font-['Poppins',sans-serif]">
          Seleccione un Inmueble
        </span>
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-3 lg:pb-0 scrollbar-none snap-x w-full">
          {listaCasos.map((caso) => (
            <button
              key={caso.id}
              onClick={() => setActiveCase(caso.id)}
              className={`w-[260px] sm:w-[320px] lg:w-full text-left p-4 sm:p-5 rounded-sm transition-all duration-300 flex flex-col justify-between border snap-center shrink-0 font-['Poppins',sans-serif] ${
                activeCase === caso.id
                  ? "bg-[#2652be] text-white border-[#2652be] shadow-md translate-x-0 lg:translate-x-1.5"
                  : "bg-blue-50/20 text-[#2652be]/70 border-blue-100 hover:text-[#2652be] md:hover:bg-blue-50/50"
              }`}
            >
              <span className="text-xs sm:text-base  uppercase tracking-tight line-clamp-1 font-['Poppins',sans-serif]">
                {caso.nombre}
              </span>
              <span className={`text-[10px] sm:text-xs block  mt-1.5 tracking-wide uppercase font-['Poppins',sans-serif] ${
                activeCase === caso.id ? "text-blue-200 font-medium" : "text-[#2652be]/50 font-normal"
              }`}>
                {caso.periodo}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* PANEL DE DETALLE */}
      <div className="lg:col-span-8 space-y-6 sm:space-y-8 contenido-caso-dinamico">
        <div className="bg-white border border-blue-100 rounded-sm p-4 sm:p-10 shadow-xs flex flex-col justify-between min-h-[400px]">
          <div className="space-y-6 sm:space-y-8">
            
            <div className="pb-5 border-b border-blue-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-xl sm:text-3xl font-black text-[#2652be] uppercase tracking-tight font-['Poppins',sans-serif]">
                  {casoSeleccionado.nombre}
                </h3>
                <span className="text-[10px] sm:text-xs  font-bold px-2.5 py-0.5 bg-[#2652be]/10 text-[#2652be] rounded-xs border border-[#2652be]/20 uppercase w-fit font-['Poppins',sans-serif]">
                  {casoSeleccionado.periodo}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px]  tracking-widest text-[#2652be] uppercase block font-bold font-['Poppins',sans-serif]">// Reseña de Estructura</span>
              <p className="text-sm sm:text-base font-light leading-relaxed text-[#2652be] font-['Poppins',sans-serif]">
                {casoSeleccionado.descripcion}
              </p>
            </div>

            {casoSeleccionado.fotoEdificio && (
              <div className="w-full relative rounded-sm overflow-hidden border border-blue-100 shadow-xs bg-white">
                <img 
                  src={casoSeleccionado.fotoEdificio} 
                  alt={`Fachada de ${casoSeleccionado.nombre}`}
                  className="w-full h-auto object-contain block mx-auto"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 text-white text-[10px] sm:text-xs  rounded-xs border border-white/10 uppercase font-['Poppins',sans-serif]">
                  Vista General de Infraestructura
                </div>
              </div>
            )}

            <div className="space-y-6 sm:space-y-8">
              {casoSeleccionado.bloques.map((bloque, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-[11px] sm:text-sm  font-bold uppercase tracking-wider text-[#2652be] bg-blue-50/30 px-3 py-1.5 border-l-2 border-[#2652be] w-fit rounded-xs font-['Poppins',sans-serif]">
                    {bloque.categoria}
                  </h4>
                  <ul className="space-y-3 pl-1">
                    {bloque.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-base text-[#2652be]/90 font-light leading-relaxed font-['Poppins',sans-serif]">
                        <span className="text-[#2652be] font-bold mt-1 shrink-0 select-none text-sm sm:text-base leading-none">▪</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {casoSeleccionado.destacado && (
            <div className="mt-8 pt-5 bg-blue-50/10 p-4 sm:p-6 rounded-sm border border-blue-100/60">
              <p className="text-xs sm:text-base text-[#2652be] font-light italic leading-relaxed font-['Poppins',sans-serif]">
                {casoSeleccionado.destacado}
              </p>
            </div>
          )}
        </div>

        {/* SECCIÓN DE FOTOS (ANTES Y DESPUÉS) */}
        {casoSeleccionado.evidencias && casoSeleccionado.evidencias.length > 0 && (
          <div className="space-y-4 grid-evidencias">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {casoSeleccionado.evidencias.map((evidencia, eIdx) => (
                <TarjetaEvidencia 
                  key={`${activeCase}-${eIdx}`}
                  evidencia={evidencia} 
                  onZoom={(ev) => setModalEvidencia(ev)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-blue-100">
          <p className="text-xs  text-[#2652be]/60 italic text-center font-['Poppins',sans-serif]">
            Gestionados sabe actuar tanto en temas operativos como en conflictos que impactan directamente la seguridad y la convivencia.
          </p>
        </div>

      </div>
    </div>
  </div>

  {/* 03. NUEVA SECCIÓN: CASOS ADICIONALES */}
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-20 sm:mt-28">
    <div className="pb-4 border-b border-blue-100 mb-8 sm:mb-12">
      <h2 className="text-xl sm:text-3xl font-black text-[#2652be] uppercase tracking-tight font-['Poppins',sans-serif]">
        Casos Adicionales de Éxito
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 grid-casos-adicionales">
      {casosAdicionales.map((caso, index) => (
        <div 
          key={index}
          className="tarjeta-adicional-animate bg-white border border-blue-100 rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-lg sm:text-xl font-black text-[#2652be] uppercase tracking-tight font-['Poppins',sans-serif]">
                {caso.nombre}
              </h3>
              <span className="text-[9px] sm:text-[10px]  font-bold px-2 py-0.5 bg-blue-50/50 text-[#2652be]/75 rounded-xs border border-blue-100 uppercase whitespace-nowrap font-['Poppins',sans-serif]">
                {caso.periodo}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm font-light text-[#2652be]/80 leading-relaxed italic font-['Poppins',sans-serif]">
              {caso.descripcion}
            </p>

            <ul className="space-y-3 pt-2">
              {caso.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#2652be]/90 font-light leading-relaxed font-['Poppins',sans-serif]">
                  <span className="text-[#2652be]/70 font-bold mt-0.5 shrink-0 select-none">▪</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 04. LIGHTBOX MODAL FULLSCREEN */}
  {modalEvidencia && (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-4"
      onClick={() => setModalEvidencia(null)}
    >
      <div 
        className="bg-white border border-blue-100/10 rounded-sm w-full max-w-6xl overflow-hidden shadow-2xl relative flex flex-col max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800  text-[10px] sm:text-xs">
          <button 
            onClick={() => setModalEvidencia(null)}
            className="text-slate-400 hover:text-white transition-colors p-1 font-sans text-lg sm:text-xl font-bold ml-2"
          >
            ✕
          </button>
        </div>

        <div className="w-full bg-slate-950 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2 p-2 scrollbar-none h-[55vh] md:h-[65vh]">
          <div className="relative h-full bg-slate-900/40 flex items-center justify-center overflow-hidden border border-slate-800/50 rounded-xs">
            <img 
              src={modalEvidencia.fotoAntes} 
              alt="Estado Anterior" 
              className="max-w-full max-h-full object-contain"
            />
            <span className="absolute bottom-3 left-3 text-[10px]  font-bold bg-red-600 text-white px-2.5 py-0.5 rounded-xs shadow-md uppercase tracking-wider font-['Poppins',sans-serif]">
              Antes de la Intervención
            </span>
          </div>

          <div className="relative h-full bg-slate-900/40 flex items-center justify-center overflow-hidden border border-slate-800/50 rounded-xs">
            <img 
              src={modalEvidencia.fotoDespues} 
              alt="Resultado Finalizado" 
              className="max-w-full max-h-full object-contain"
            />
            <span className="absolute bottom-3 left-3 text-[10px]  font-bold bg-green-600 text-white px-2.5 py-0.5 rounded-xs shadow-md uppercase tracking-wider font-['Poppins',sans-serif]">
              Resultado Finalizado
            </span>
          </div>
        </div>

        <div className="bg-blue-50/10 p-4 sm:p-6 border-t border-blue-100 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1 shrink-0">
              <h4 className="text-sm sm:text-xl font-black text-[#2652be] uppercase tracking-tight font-['Poppins',sans-serif]">
                {casoSeleccionado.nombre}
              </h4>
            </div>
            <p className="text-xs sm:text-base text-[#2652be]/90 font-light max-w-xl sm:text-right leading-relaxed font-['Poppins',sans-serif]">
              {modalEvidencia.desc}
            </p>
          </div>
        </div>

      </div>
    </div>
  )}
</div>
  );
}

export default Portafolio;