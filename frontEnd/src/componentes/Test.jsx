import React, { useState } from "react";
import { Link } from "react-router-dom";

const PREGUNTAS = [
  {
    id: 1,
    pregunta: "¿Su conjunto tiene póliza de seguro contra incendios vigente, conforme lo exige el Art. 16 de la Ley de Propiedad Horizontal?",
    detalle: "La ley exige obligatoriamente que toda copropiedad cuente con este seguro activo para proteger la infraestructura."
  },
  {
    id: 2,
    pregunta: "¿Su condominio está provisionando el fondo de reserva obligatorio del 5% conforme al art. 31 del RGLPH?",
    detalle: "Este fondo es clave para reparaciones mayores, emergencias o mantenimiento imprevisto del conjunto."
  },
  {
    id: 3,
    pregunta: "¿Tiene en su poder los permisos vigentes emitidos por el Ministerio del Interior y los permisos de porte y tenencia de armas del COMACO de su compañía de seguridad?",
    detalle: "La falta de estos permisos expone legalmente a la directiva ante cualquier incidente de seguridad."
  },
  {
    id: 4,
    pregunta: "¿Tiene en su poder la póliza de responsabilidad civil contra daños a terceros de su empresa de seguridad?",
    detalle: "Es vital para garantizar cobertura económica si ocurre un siniestro que afecte bienes o personas dentro del condominio."
  },
  {
    id: 5,
    pregunta: "¿Recibe mensualmente los roles de pago y el certificado de cumplimiento de aportes al IESS de todos sus servicios complementarios?",
    detalle: "Evita la responsabilidad patronal solidaria. Si la empresa de seguridad o limpieza no paga al IESS, el conjunto asume la deuda."
  },
  {
    id: 6,
    pregunta: "¿Las multas y sanciones a copropietarios están debidamente tipificadas en el reglamento interno inscrito, o son aplicadas de forma discrecional y podrían ser impugnadas judicialmente?",
    detalle: "Cualquier sanción impuesta que no esté legalmente inscrita en el reglamento original es nula ante la ley."
  },
  {
    id: 7,
    pregunta: "¿Su sistema de videovigilancia cuenta con el protocolo y el aviso legal que exige la Ley Orgánica de Protección de Datos Personales?",
    detalle: "Grabar áreas comunes sin el debido consentimiento o protocolo de manejo de datos personales acarrea multas severas."
  }
];

const TestGestion = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (tipo) => {
    const nuevasRespuestas = [...respuestas, tipo];
    setRespuestas(nuevasRespuestas);

    if (currentIdx < PREGUNTAS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const totalNegativas = respuestas.filter((r) => r === "no" || r === "nose").length;

  // Paletas de alertas limpias y de alto contraste
  let estadoSemaforo = {
    color: "green",
    titulo: "Verde",
    bgClass: "bg-emerald-500",
    textClass: "text-emerald-700",
    borderClass: "border-emerald-200",
    bgCard: "bg-emerald-50/60",
    significado: "Su Directiva opera con un nivel de cumplimiento sólido. Gestionados puede ayudarle a sostenerlo y anticipar nuevas obligaciones normativas.",
    cta: "Agendar Asesoría Preventiva",
    btnColorClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200",
    mensajeWa: "Hola Gestionados, completé el Test de Riesgo Rápido y obtuve Semáforo VERDE. Quisiera agendar una asesoría preventiva."
  };

  if (totalNegativas >= 1 && totalNegativas <= 2) {
    estadoSemaforo = {
      color: "yellow",
      titulo: "Amarillo",
      bgClass: "bg-amber-500",
      textClass: "text-amber-700",
      borderClass: "border-amber-200",
      bgCard: "bg-amber-50/60",
      significado: "Existen brechas que deben cerrarse antes de que deriven en contingencias legales. Es momento de una revisión profesional.",
      cta: "Solicitar Revisión Profesional",
      btnColorClass: "bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-amber-200",
      mensajeWa: `Hola Gestionados, completé el Test de Riesgo Rápido y obtuve Semáforo AMARILLO con ${totalNegativas} alertas.`
    };
  } else if (totalNegativas >= 3) {
    estadoSemaforo = {
      color: "red",
      titulo: "Rojo",
      bgClass: "bg-rose-500 animate-pulse",
      textClass: "text-rose-700",
      borderClass: "border-rose-200",
      bgCard: "bg-rose-50/60",
      significado: "Su Directiva tiene exposición jurídica crítica. Cada día sin acción incrementa el riesgo para su patrimonio personal y el del conjunto.",
      cta: "¡SOLICITAR COTIZACIÓN URGENTE!",
      btnColorClass: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200",
      mensajeWa: `Hola Gestionados, acabo de realizar el Test de Riesgo Rápido y obtuve Semáforo ROJO con ${totalNegativas} alertas. Necesito una cotización urgente.`
    };
  }

  const reiniciarTest = () => {
    setCurrentIdx(0);
    setRespuestas([]);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-16">
      {/* Tarjeta Limpia y Corporativa */}
      <div className="w-full max-w-xl bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] overflow-hidden">
        
        {/* Cabecera Minimalista */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/40">
          <div>
            <h1 className="text-lg font-extrabold text-blue-900 tracking-tight">
              Test de Riesgo Rápido
            </h1>
            <p className="text-xs text-slate-500 font-medium">Evalúe la vulnerabilidad jurídica de su conjunto</p>
          </div>
          <Link to="/" className="text-xs text-slate-400 hover:text-blue-600 transition-colors font-bold uppercase tracking-wider">
            Volver
          </Link>
        </div>

        {/* CONTENIDO */}
        {!showResult ? (
          <div className="p-6 md:p-8">
            {/* Barra de progreso súper sutil */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                style={{ width: `${((currentIdx + 1) / PREGUNTAS.length) * 100}%` }}
              ></div>
            </div>

            {/* Pregunta */}
            <div className="min-h-[140px] flex flex-col justify-center">
              <span className="text-blue-600 font-extrabold text-xs tracking-wider uppercase">
                Pregunta {currentIdx + 1} de {PREGUNTAS.length}
              </span>
              <h2 className="text-lg md:text-xl font-bold mt-2 text-slate-800 leading-snug">
                {PREGUNTAS[currentIdx].pregunta}
              </h2>
              {PREGUNTAS[currentIdx].detalle && (
                <p className="text-slate-500 text-xs md:text-sm mt-3 border-l-2 border-blue-500 pl-3 leading-relaxed">
                  {PREGUNTAS[currentIdx].detalle}
                </p>
              )}
            </div>

            {/* Botones de opción con contrastes elegantes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              <button
                onClick={() => handleAnswer("si")}
                className="py-3 px-4 bg-white hover:bg-blue-50/50 hover:border-blue-600 hover:text-blue-700 border border-slate-200 rounded-xl font-bold text-sm transition-all text-slate-700 active:scale-95 shadow-sm"
              >
                SÍ
              </button>
              <button
                onClick={() => handleAnswer("no")}
                className="py-3 px-4 bg-white hover:bg-rose-50 hover:border-rose-500 hover:text-rose-600 border border-slate-200 rounded-xl font-bold text-sm transition-all text-slate-700 active:scale-95 shadow-sm"
              >
                NO
              </button>
              <button
                onClick={() => handleAnswer("nose")}
                className="py-3 px-4 bg-white hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700 border border-slate-200 rounded-xl font-bold text-sm transition-all text-slate-700 active:scale-95 shadow-sm"
              >
                NO SÉ
              </button>
            </div>
          </div>
        ) : (
          /* RESULTADOS: Adiós al azul con rojo horrible */
          <div className="p-6 md:p-8 text-center">
            
            {/* Semáforo en formato limpio e impecable */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6">
              <div className={`w-3.5 h-3.5 rounded-full ${estadoSemaforo.bgClass}`}></div>
              <span className={`text-sm font-black uppercase tracking-wider ${estadoSemaforo.textClass}`}>
                Semáforo {estadoSemaforo.titulo}
              </span>
            </div>

            {/* Caja de explicación con estilo de alerta moderna */}
            <div className={`border ${estadoSemaforo.borderClass} ${estadoSemaforo.bgCard} rounded-2xl p-6 mb-8 text-left`}>
              <p className="text-slate-800 font-semibold text-sm md:text-base leading-relaxed">
                {estadoSemaforo.significado}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-between items-center text-xs text-slate-500">
                <span>Alertas de riesgo encontradas:</span>
                <span className={`font-extrabold text-sm ${totalNegativas > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                  {totalNegativas} de {PREGUNTAS.length}
                </span>
              </div>
            </div>

            {/* Acciones principales */}
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/593989198398?text=${encodeURIComponent(estadoSemaforo.mensajeWa)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-3.5 px-6 rounded-xl font-extrabold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-slate-100 flex items-center justify-center gap-2 text-sm md:text-base ${estadoSemaforo.btnColorClass}`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.104-3.328l.381.226c1.617.96 3.734 1.467 5.862 1.468 5.485 0 9.947-4.613 9.95-10.28.002-2.744-1.064-5.324-2.998-7.262C17.472 3.186 14.896 2.12 12.16 2.12c-5.488 0-9.948 4.612-9.95 10.281a10.198 10.198 0 001.536 5.378l.25.398-.999 3.647 3.71-.973z"/>
                </svg>
                {estadoSemaforo.cta}
              </a>

              <button
                onClick={reiniciarTest}
                className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                Volver a realizar el test
              </button>
            </div>

            {/* Sello de confianza */}
            <p className="text-xs text-slate-400 mt-8 leading-relaxed border-t border-slate-100 pt-6">
              No espere a que una notificación judicial le revele sus vulnerabilidades. <br />
              <strong className="text-blue-700 font-bold">Gestionados</strong> está listo para asumir esta responsabilidad con criterio técnico y respaldo legal.
            </p>

          </div>
        )}
      </div>
    </div>
  );
};

export default TestGestion;