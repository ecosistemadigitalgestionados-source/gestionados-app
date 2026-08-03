import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo3 from '../assets/logo3.png';

function Administracion({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [vistaActiva, setVistaActiva] = useState("usuarios");
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Paginación (10 en 10)
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  // CRUD Estados
  const [nuevoUsuario, setNuevoUsuario] = useState({ usuario: "", password: "" });
  const [nuevoCliente, setNuevoCliente] = useState({ nombre_cliente: "", contacto_cliente: "", correo_cliente: "", comentario_cliente: "" });
  
  const [mostrarModalUsuario, setMostrarModalUsuario] = useState(false);
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);

  const [idEditando, setIdEditando] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState({ usuario: "", password: "" });
  const [clienteEditado, setClienteEditado] = useState({ nombre_cliente: "", contacto_cliente: "", correo_cliente: "", comentario_cliente: "" });
  
  const [errorCRUD, setErrorCRUD] = useState("");

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
  const esAdmin = usuarioLogueado?.usuario === "admin";

  // Helper de Formateo de Fechas para Ecuador
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "Sin fecha";
    const fecha = new Date(fechaStr);
    if (isNaN(fecha.getTime())) return "Sin fecha";
    
    return fecha.toLocaleDateString("es-EC", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    setPaginaActual(1);
  }, [vistaActiva, busqueda]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (setIsLoggedIn) setIsLoggedIn(false);
      navigate("/", { replace: true });
    }
  }, [navigate, setIsLoggedIn]);

  const cargarDatos = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const resUser = await fetch("https://gestionados-app.onrender.com/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resUser.status === 401) {
        limpiarSesionYSalir();
        return;
      }
      if (resUser.ok) {
        const dataUser = await resUser.json();
        setUsuarios(dataUser);
      }

      const resClient = await fetch("https://gestionados-app.onrender.com/api/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resClient.ok) {
        const dataClient = await resClient.json();
        setClientes(dataClient);
      }
    } catch (err) {
      console.error("Error cargando panel:", err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [navigate]);

  const limpiarSesionYSalir = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  // Filtros de búsqueda
  const usuariosFiltrados = usuarios.filter((u) => {
    const termino = busqueda.toLowerCase();
    const fechaFormateada = formatearFecha(u.created_at || u.fecha_creacion || u.fecha).toLowerCase();
    return (
      u.usuario?.toLowerCase().includes(termino) ||
      fechaFormateada.includes(termino)
    );
  });

  const clientesFiltrados = clientes.filter((c) => {
    const termino = busqueda.toLowerCase();
    const fechaFormateada = formatearFecha(c.created_at || c.fecha_creacion || c.fecha).toLowerCase();
    return (
      c.nombre_cliente?.toLowerCase().includes(termino) ||
      c.correo_cliente?.toLowerCase().includes(termino) ||
      c.contacto_cliente?.toLowerCase().includes(termino) ||
      c.comentario_cliente?.toLowerCase().includes(termino) ||
      fechaFormateada.includes(termino)
    );
  });

  // Paginación matemática
  const totalRegistrosFiltrados = vistaActiva === "usuarios" ? usuariosFiltrados.length : clientesFiltrados.length;
  const totalPaginas = Math.ceil(totalRegistrosFiltrados / registrosPorPagina) || 1;
  const indiceUltimo = paginaActual * registrosPorPagina;
  const indicePrimero = indiceUltimo - registrosPorPagina;
  
  const usuariosVisibles = usuariosFiltrados.slice(indicePrimero, indiceUltimo);
  const clientesVisibles = clientesFiltrados.slice(indicePrimero, indiceUltimo);

  // Handlers CRUD
  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    setErrorCRUD("");
    try {
      const res = await fetch("https://gestionados-app.onrender.com/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(nuevoUsuario),
      });
      if (!res.ok) throw new Error("Error al registrar");
      setNuevoUsuario({ usuario: "", password: "" });
      setMostrarModalUsuario(false);
      cargarDatos();
    } catch (err) { setErrorCRUD(err.message); }
  };

  const handleGuardarEdicionUsuario = async (id) => {
    try {
      const cuerpoPeticion = { usuario: usuarioEditado.usuario };
      if (usuarioEditado.password && usuarioEditado.password.trim() !== "") {
        cuerpoPeticion.password = usuarioEditado.password;
      }

      const res = await fetch(`https://gestionados-app.onrender.com/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(cuerpoPeticion),
      });

      if (!res.ok) throw new Error("Error al actualizar");
      
      setIdEditando(null);
      cargarDatos();
    } catch (err) { 
      console.error(err); 
      alert("Error al actualizar el usuario.");
    }
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    try {
      await fetch(`https://gestionados-app.onrender.com/api/usuarios/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      cargarDatos();
    } catch (err) { console.error(err); }
  };

  const handleCrearCliente = async (e) => {
    e.preventDefault();
    setErrorCRUD("");
    try {
      const res = await fetch("https://gestionados-app.onrender.com/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(nuevoCliente),
      });
      if (!res.ok) throw new Error("Error al registrar cliente");
      setNuevoCliente({ nombre_cliente: "", contacto_cliente: "", correo_cliente: "", comentario_cliente: "" });
      setMostrarModalCliente(false);
      cargarDatos();
    } catch (err) { setErrorCRUD(err.message); }
  };

  const handleGuardarEdicionCliente = async (id) => {
    try {
      await fetch(`https://gestionados-app.onrender.com/api/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(clienteEditado),
      });
      setIdEditando(null);
      cargarDatos();
    } catch (err) { console.error(err); }
  };

  const handleEliminarCliente = async (id) => {
    if (!window.confirm("¿Eliminar este cliente?")) return;
    try {
      await fetch(`https://gestionados-app.onrender.com/api/clientes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      cargarDatos();
    } catch (err) { console.error(err); }
  };

  // EXPORTACIÓN A PDF CON DOBLE RESTRICCIÓN PROPORCIONAL
  const descargarPDF = (tipoReporte) => {
    let datosAExportar = [];
    if (tipoReporte === "PAGINA_ACTUAL") {
      datosAExportar = vistaActiva === "usuarios" ? usuariosVisibles : clientesVisibles;
    } else if (tipoReporte === "FILTRADOS") {
      datosAExportar = vistaActiva === "usuarios" ? usuariosFiltrados : clientesFiltrados;
    } else {
      datosAExportar = vistaActiva === "usuarios" ? usuarios : clientes;
    }

    if (datosAExportar.length === 0) {
      alert("No hay registros que coincidan con la selección actual.");
      return;
    }

    // Instanciamos el objeto Image en memoria asignando tu asset logo3
    const img = new Image();
    img.src = logo3;

    // Disparamos la generación del archivo una vez que el navegador cargue el asset
    img.onload = () => {
      const doc = new jsPDF();

      try {
        // --- DOBLE CONTROL DE PROPORCIONES (ANCHO Y ALTO CONTENIDOS) ---
        const maxAnchoPermitido = 32; // Ancho máximo idóneo para la cabecera
        const maxAltoPermitido = 14;  // Altura máxima para evitar logos gigantes
        
        let anchoFinal = maxAnchoPermitido;
        let altoProporcional = (img.height * maxAnchoPermitido) / img.width;
        
        // Si la proporción rompe el alto permitido, recalculamos en base al alto
        if (altoProporcional > maxAltoPermitido) {
          altoProporcional = maxAltoPermitido;
          anchoFinal = (img.width * maxAltoPermitido) / img.height;
        }
        
        // Centrado vertical exacto en la caja superior
        const coordenadaY = 24 - (altoProporcional / 2);
        // Alineación perfecta al margen límite de la grilla (196mm)
        const coordenadaX = 196 - anchoFinal;

        // Renderizamos resguardando la relación de aspecto sin distorsión
        doc.addImage(img, "PNG", coordenadaX, coordenadaY, anchoFinal, altoProporcional);
      } catch (e) {
        console.warn("Error al renderizar la imagen del logo desde assets:", e);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139);
        doc.text("GESTIONADOS", 150, 20);
      }

      // Encabezado del Reporte
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(15, 23, 42); 
      doc.text(`REPORTE DE ${vistaActiva.toUpperCase()}`, 14, 20);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105); 
      doc.text(`Criterio de exportación: ${tipoReporte.replace("_", " ")}`, 14, 27);
      doc.text(`Filtro activo: "${busqueda || "Ninguno"}"`, 14, 32);
      
      // Línea divisoria sutil
      doc.setDrawColor(226, 232, 240); 
      doc.setLineWidth(0.5);
      doc.line(14, 38, 196, 38);

      // Mantenemos el tema original ("striped" estándar de jsPDF) sin alterar estilos nativos
      const estilosTabla = {
        startY: 44,
        margin: { left: 14, right: 14 },
        theme: "striped",
      };

      if (vistaActiva === "usuarios") {
        const columnas = ["ID", "Usuario de Acceso", "Fecha de Registro"];
        const filas = datosAExportar.map(u => [
          u.id_usuario || u.id,
          u.usuario,
          formatearFecha(u.created_at || u.fecha_creacion || u.fecha)
        ]);
        autoTable(doc, { ...estilosTabla, head: [columnas], body: filas });
      } else {
        const columnas = ["Cliente Lead", "Teléfono", "Email", "Comentario / Solicitud", "Fecha Ingreso"];
        const filas = datosAExportar.map(c => [
          c.nombre_cliente,
          c.contacto_cliente,
          c.correo_cliente,
          c.comentario_cliente || "Sin comentarios",
          formatearFecha(c.created_at || c.fecha_creacion || c.fecha)
        ]);
        autoTable(doc, { ...estilosTabla, head: [columnas], body: filas });
      }

      doc.save(`Reporte_${vistaActiva}_${tipoReporte.toLowerCase()}.pdf`);
    };
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-800 font-sans">
      
      {/* SIDEBAR RESPONSIVE */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-4 sm:p-5 flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-slate-800">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center md:block">
            <div>
              <h2 className="font-bold tracking-widest text-xs font-mono text-blue-400 uppercase">Gestionados Panel</h2>
              <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Rol: {esAdmin ? "Administrador" : "Personal"}</p>
            </div>
            <button onClick={limpiarSesionYSalir} className="md:hidden px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs font-mono tracking-wider uppercase">
              Salir
            </button>
          </div>
          <div className="hidden md:block h-px bg-slate-800"></div>
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 font-mono text-xs font-bold uppercase tracking-wider scrollbar-none">
            <button
              onClick={() => { setVistaActiva("usuarios"); setIdEditando(null); }}
              className={`text-left whitespace-nowrap px-4 py-3 rounded transition-all cursor-pointer ${vistaActiva === "usuarios" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
            >
              • Usuarios ({usuariosFiltrados.length})
            </button>
            <button
              onClick={() => { setVistaActiva("clientes"); setIdEditando(null); }}
              className={`text-left whitespace-nowrap px-4 py-3 rounded transition-all cursor-pointer ${vistaActiva === "clientes" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
            >
              • Clientes / Leads ({clientesFiltrados.length})
            </button>
          </nav>
        </div>
        <div className="hidden md:flex justify-between items-center bg-slate-950 p-3 rounded border border-slate-800 font-mono text-[11px]">
          <div className="truncate mr-2">
            <span className="text-slate-500 block">Operador:</span>
            <span className="text-white font-bold block truncate">{usuarioLogueado?.usuario || "Invitado"}</span>
          </div>
          <button onClick={limpiarSesionYSalir} className="text-red-400 hover:text-red-300 font-bold uppercase transition-colors cursor-pointer">Salir</button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
            {vistaActiva === "usuarios" ? "Control de Usuarios" : "Base de Leads Recolectados"}
          </h1>
          <div className="flex items-center gap-2">
            {vistaActiva === "usuarios" && esAdmin && (
              <button onClick={() => { setErrorCRUD(""); setMostrarModalUsuario(true); }} className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm cursor-pointer">
                + Nuevo Usuario
              </button>
            )}
            {vistaActiva === "clientes" && esAdmin && (
              <button onClick={() => { setErrorCRUD(""); setMostrarModalCliente(true); }} className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm cursor-pointer">
                + Registrar Cliente
              </button>
            )}
          </div>
        </div>

        {/* BUSCADOR Y PAGINACIÓN ARRIBA */}
        <div className="bg-white p-4 border border-slate-200 rounded-sm mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex-1">
            <input
              className="w-full max-w-md border border-slate-200 bg-slate-50 rounded-sm px-4 py-2 text-sm outline-none focus:border-blue-600 focus:bg-white transition-all"
              placeholder="🔍 Buscar texto o fecha (DD/MM/AAAA)..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-4 font-mono text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <span className="text-slate-500 whitespace-nowrap">Pág. <b>{paginaActual}</b> de <b>{totalPaginas}</b></span>
            <div className="flex gap-1">
              <button onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1} className="px-3 py-1.5 border border-slate-200 rounded-sm hover:bg-slate-50 font-bold disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer">◀ Ant</button>
              <button onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas} className="px-3 py-1.5 border border-slate-200 rounded-sm hover:bg-slate-50 font-bold disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer">Sig ▶</button>
            </div>
          </div>
        </div>

        {/* BOTONES DIRECTOS PARA EXPORTACIÓN A PDF */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-6 bg-slate-100 p-3 rounded-sm border border-slate-200">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1 lg:mb-0 lg:mr-2">Exportar Reporte:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full lg:w-auto">
            <button onClick={() => descargarPDF("PAGINA_ACTUAL")} className="px-3 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-mono text-xs font-semibold rounded-xs shadow-xs text-center cursor-pointer">
              📄 Página Actual
            </button>
            <button onClick={() => descargarPDF("FILTRADOS")} className="px-3 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-mono text-xs font-semibold rounded-xs shadow-xs text-center cursor-pointer">
              🔍 Según Filtro
            </button>
            <button onClick={() => descargarPDF("TODO")} className="px-3 py-2 bg-slate-800 text-white hover:bg-slate-700 font-mono text-xs font-semibold rounded-xs shadow-xs text-center cursor-pointer">
              🗄️ Toda la Base
            </button>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        {vistaActiva === "usuarios" ? (
          esAdmin ? (
            <div>
              <div className="hidden md:block overflow-x-auto border border-slate-200 rounded-sm bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                      <th className="p-4 font-bold">ID</th>
                      <th className="p-4 font-bold">Identificador de Acceso</th>
                      <th className="p-4 font-bold">Nueva Clave (Solo Reseteo)</th>
                      <th className="p-4 font-bold">Fecha Registro</th>
                      <th className="p-4 font-bold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {usuariosVisibles.map((u) => {
                      const currentId = u.id_usuario || u.id;
                      const esEditando = idEditando === currentId;
                      return (
                        <tr key={currentId} className="hover:bg-slate-50/40">
                          <td className="p-4 font-mono text-xs text-slate-400">{currentId}</td>
                          <td className="p-4">
                            {esEditando ? (
                              <input type="text" className="border border-blue-400 p-1 text-sm bg-white outline-none rounded-xs" value={usuarioEditado.usuario} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, usuario: e.target.value })} />
                            ) : (
                              <span className="font-medium text-slate-900">{u.usuario}</span>
                            )}
                          </td>
                          <td className="p-4">
                            {esEditando ? (
                              <input type="password" className="border border-blue-400 p-1 text-sm bg-white outline-none rounded-xs placeholder:text-slate-400" placeholder="Escriba nueva contraseña" value={usuarioEditado.password || ""} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, password: e.target.value })} />
                            ) : (
                              <span className="text-xs font-mono text-slate-400">••••••••</span>
                            )}
                          </td>
                          <td className="p-4 text-xs font-mono text-slate-600">{formatearFecha(u.created_at || u.fecha_creacion || u.fecha)}</td>
                          <td className="p-4 text-right space-x-2">
                            {u.usuario !== "admin" && (
                              esEditando ? (
                                <>
                                  <button onClick={() => handleGuardarEdicionUsuario(currentId)} className="text-green-600 font-bold font-mono text-xs cursor-pointer">OK</button>
                                  <button onClick={() => setIdEditando(null)} className="text-slate-400 font-bold font-mono text-xs cursor-pointer">X</button>
                                </>
                              ) : (
                                <>
                                  <button onClick={() => { setIdEditando(currentId); setUsuarioEditado({ usuario: u.usuario, password: "" }); }} className="text-blue-600 text-xs font-bold font-mono cursor-pointer">Editar</button>
                                  <button onClick={() => handleEliminarUsuario(currentId)} className="text-red-600 text-xs font-bold font-mono cursor-pointer">Eliminar</button>
                                </>
                              )
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="block md:hidden space-y-3">
                {usuariosVisibles.map((u) => {
                  const currentId = u.id_usuario || u.id;
                  const esEditando = idEditando === currentId;
                  return (
                    <div key={currentId} className="bg-white p-4 border border-slate-200 rounded-sm shadow-xs space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="text-[10px] font-mono text-slate-400">ID: {currentId}</span>
                        <span className="text-[11px] font-mono text-slate-500">{formatearFecha(u.created_at || u.fecha_creacion || u.fecha)}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <label className="text-[11px] uppercase font-mono text-slate-400 block font-bold">Usuario:</label>
                          {esEditando ? (
                            <input type="text" className="w-full border border-blue-400 p-1.5 mt-0.5 bg-white outline-none text-sm rounded-xs" value={usuarioEditado.usuario} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, usuario: e.target.value })} />
                          ) : (
                            <p className="font-bold text-slate-900">{u.usuario}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-[11px] uppercase font-mono text-slate-400 block font-bold">Nueva Clave:</label>
                          {esEditando ? (
                            <input type="password" className="w-full border border-blue-400 p-1.5 mt-0.5 bg-white outline-none text-sm rounded-xs placeholder:text-slate-400" placeholder="Dejar vacío para no cambiar" value={usuarioEditado.password || ""} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, password: e.target.value })} />
                          ) : (
                            <p className="text-slate-400 font-mono text-xs">••••••••</p>
                          )}
                        </div>
                      </div>
                      {u.usuario !== "admin" && (
                        <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-2">
                          {esEditando ? (
                            <>
                              <button onClick={() => handleGuardarEdicionUsuario(currentId)} className="px-3 py-1 bg-green-600 text-white font-mono text-xs font-bold rounded-xs cursor-pointer">Guardar</button>
                              <button onClick={() => setIdEditando(null)} className="px-3 py-1 bg-slate-200 text-slate-700 font-mono text-xs font-bold rounded-xs cursor-pointer">Cancelar</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => { setIdEditando(currentId); setUsuarioEditado({ usuario: u.usuario, password: "" }); }} className="text-blue-600 text-xs font-bold font-mono cursor-pointer">Editar Registro</button>
                              <button onClick={() => handleEliminarUsuario(currentId)} className="text-red-600 text-xs font-bold font-mono cursor-pointer">Eliminar</button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {usuariosVisibles.length === 0 && (
                <div className="bg-white p-6 border text-center text-slate-400 text-xs font-mono rounded-sm">Cero coincidencias de usuarios.</div>
              )}
            </div>
          ) : (
            <div className="bg-amber-50 text-amber-800 p-4 border border-amber-200 text-xs font-mono rounded-sm">
              ⚠️ Vista exclusiva del Administrador.
            </div>
          )
        ) : (
          <div>
            <div className="hidden md:block overflow-x-auto border border-slate-200 rounded-sm bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-4 font-bold">Cliente</th>
                    <th className="p-4 font-bold">Teléfono</th>
                    <th className="p-4 font-bold">Email</th>
                    <th className="p-4 font-bold">Comentario</th>
                    <th className="p-4 font-bold">Fecha Ingreso</th>
                    {esAdmin && <th className="p-4 font-bold text-right">Acciones</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {clientesVisibles.map((c) => {
                    const currentId = c.id_cliente || c.id;
                    const esEditando = idEditando === currentId;
                    return (
                      <tr key={currentId} className="hover:bg-slate-50/40">
                        {esEditando ? (
                          <>
                            <td className="p-2"><input className="border border-blue-400 p-1 text-xs w-full outline-none bg-white rounded-xs" value={clienteEditado.nombre_cliente} onChange={(e) => setClienteEditado({...clienteEditado, nombre_cliente: e.target.value})} /></td>
                            <td className="p-2"><input className="border border-blue-400 p-1 text-xs w-full font-mono outline-none bg-white rounded-xs" value={clienteEditado.contacto_cliente} onChange={(e) => setClienteEditado({...clienteEditado, contacto_cliente: e.target.value})} /></td>
                            <td className="p-2"><input className="border border-blue-400 p-1 text-xs w-full outline-none bg-white rounded-xs" value={clienteEditado.correo_cliente} onChange={(e) => setClienteEditado({...clienteEditado, correo_cliente: e.target.value})} /></td>
                            <td className="p-2"><textarea className="border border-blue-400 p-1 text-xs w-full outline-none bg-white rounded-xs" value={clienteEditado.comentario_cliente} onChange={(e) => setClienteEditado({...clienteEditado, comentario_cliente: e.target.value})} /></td>
                          </>
                        ) : (
                          <>
                            <td className="p-4 font-bold text-slate-900">{c.nombre_cliente}</td>
                            <td className="p-4 font-mono text-xs">{c.contacto_cliente}</td>
                            <td className="p-4 text-xs font-mono">{c.correo_cliente}</td>
                            <td className="p-4 text-xs text-slate-500 max-w-xs">{c.comentario_cliente}</td>
                          </>
                        )}
                        <td className="p-4 text-xs font-mono text-slate-600 whitespace-nowrap">
                          {formatearFecha(c.created_at || c.fecha_creacion || c.fecha)}
                        </td>
                        {esAdmin && (
                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            {esEditando ? (
                              <>
                                <button onClick={() => handleGuardarEdicionCliente(currentId)} className="text-green-600 font-bold text-xs font-mono cursor-pointer">OK</button>
                                <button onClick={() => setIdEditando(null)} className="text-slate-400 font-bold text-xs font-mono cursor-pointer">X</button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => { setIdEditando(currentId); setClienteEditado({ nombre_cliente: c.nombre_cliente, contacto_cliente: c.contacto_cliente, correo_cliente: c.correo_cliente, comentario_cliente: c.comentario_cliente }); }} className="text-blue-600 text-xs font-bold font-mono cursor-pointer">Editar</button>
                                <button onClick={() => handleEliminarCliente(currentId)} className="text-red-600 text-xs font-bold font-mono cursor-pointer">Eliminar</button>
                              </>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="block md:hidden space-y-3">
              {clientesVisibles.map((c) => {
                const currentId = c.id_cliente || c.id;
                const esEditando = idEditando === currentId;
                return (
                  <div key={currentId} className="bg-white p-4 border border-slate-200 rounded-sm shadow-xs space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-mono text-slate-400">ID Ref: {currentId}</span>
                      <span className="text-[11px] font-mono text-slate-500">{formatearFecha(c.created_at || c.fecha_creacion || c.fecha)}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <label className="text-[11px] uppercase font-mono text-slate-400 block font-bold">Cliente Lead:</label>
                        {esEditando ? (
                          <input className="w-full border border-blue-400 p-1.5 mt-0.5 text-sm bg-white rounded-xs" value={clienteEditado.nombre_cliente} onChange={(e) => setClienteEditado({...clienteEditado, nombre_cliente: e.target.value})} />
                        ) : (
                          <p className="font-bold text-slate-900">{c.nombre_cliente}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] uppercase font-mono text-slate-400 block font-bold">Teléfono:</label>
                          {esEditando ? (
                            <input className="w-full border border-blue-400 p-1.5 mt-0.5 font-mono text-sm bg-white rounded-xs" value={clienteEditado.contacto_cliente} onChange={(e) => setClienteEditado({...clienteEditado, contacto_cliente: e.target.value})} />
                          ) : (
                            <p className="font-mono text-xs">{c.contacto_cliente || "N/A"}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-[11px] uppercase font-mono text-slate-400 block font-bold">Email:</label>
                          {esEditando ? (
                            <input className="w-full border border-blue-400 p-1.5 mt-0.5 text-sm bg-white rounded-xs" value={clienteEditado.correo_cliente} onChange={(e) => setClienteEditado({...clienteEditado, correo_cliente: e.target.value})} />
                          ) : (
                            <p className="truncate text-xs font-mono">{c.correo_cliente || "N/A"}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] uppercase font-mono text-slate-400 block font-bold">Comentario / Solicitud:</label>
                        {esEditando ? (
                          <textarea className="w-full border border-blue-400 p-1.5 mt-0.5 text-sm bg-white rounded-xs h-20 outline-none" value={clienteEditado.comentario_cliente} onChange={(e) => setClienteEditado({...clienteEditado, comentario_cliente: e.target.value})} />
                        ) : (
                          <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xs mt-0.5 border border-slate-100">{c.comentario_cliente || "Sin comentarios."}</p>
                        )}
                      </div>
                    </div>
                    {esAdmin && (
                      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-2">
                        {esEditando ? (
                          <>
                            <button onClick={() => handleGuardarEdicionCliente(currentId)} className="px-3 py-1 bg-green-600 text-white font-mono text-xs font-bold rounded-xs cursor-pointer">Guardar</button>
                            <button onClick={() => setIdEditando(null)} className="px-3 py-1 bg-slate-200 text-slate-700 font-mono text-xs font-bold rounded-xs cursor-pointer">Cancelar</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { setIdEditando(currentId); setClienteEditado({ nombre_cliente: c.nombre_cliente, contacto_cliente: c.contacto_cliente, correo_cliente: c.correo_cliente, comentario_cliente: c.comentario_cliente }); }} className="text-blue-600 text-xs font-bold font-mono cursor-pointer">Editar Datos</button>
                            <button onClick={() => handleEliminarCliente(currentId)} className="text-red-600 text-xs font-bold font-mono cursor-pointer">Eliminar</button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {clientesVisibles.length === 0 && (
              <div className="bg-white p-6 border text-center text-slate-400 text-xs font-mono rounded-sm">Cero leads registrados bajo esta consulta.</div>
            )}
          </div>
        )}
      </main>

      {/* MODAL NUEVO USUARIO */}
      {mostrarModalUsuario && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-sm border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">Crear Nuevo Operador</h3>
            {errorCRUD && <p className="text-xs font-mono bg-red-50 text-red-600 p-2 border border-red-200">{errorCRUD}</p>}
            <form onSubmit={handleCrearUsuario} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1">Usuario de Acceso</label>
                <input type="text" required className="w-full border border-slate-200 px-3 py-2 bg-slate-50 rounded-sm outline-none focus:border-blue-600 focus:bg-white" value={nuevoUsuario.usuario} onChange={(e) => setNuevoUsuario({...nuevoUsuario, usuario: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1">Contraseña Inicial</label>
                <input type="password" required className="w-full border border-slate-200 px-3 py-2 bg-slate-50 rounded-sm outline-none focus:border-blue-600 focus:bg-white" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({...nuevoUsuario, password: e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setMostrarModalUsuario(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 font-mono text-xs font-bold uppercase rounded-sm cursor-pointer">Cerrar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase rounded-sm shadow-xs cursor-pointer">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVO CLIENTE */}
      {mostrarModalCliente && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-sm border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">Registrar Cliente Manual</h3>
            {errorCRUD && <p className="text-xs font-mono bg-red-50 text-red-600 p-2 border border-red-200">{errorCRUD}</p>}
            <form onSubmit={handleCrearCliente} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1">Nombre Completo</label>
                <input type="text" required className="w-full border border-slate-200 px-3 py-2 bg-slate-50 rounded-sm outline-none focus:border-blue-600 focus:bg-white" value={nuevoCliente.nombre_cliente} onChange={(e) => setNuevoCliente({...nuevoCliente, nombre_cliente: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1">Contacto / Telf</label>
                  <input type="text" className="w-full border border-slate-200 px-3 py-2 bg-slate-50 rounded-sm outline-none focus:border-blue-600 focus:bg-white font-mono" value={nuevoCliente.contacto_cliente} onChange={(e) => setNuevoCliente({...nuevoCliente, contacto_cliente: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1">Correo Electrónico</label>
                  <input type="email" className="w-full border border-slate-200 px-3 py-2 bg-slate-50 rounded-sm outline-none focus:border-blue-600 focus:bg-white text-xs" value={nuevoCliente.correo_cliente} onChange={(e) => setNuevoCliente({...nuevoCliente, correo_cliente: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1">Comentario Inicial</label>
                <textarea className="w-full border border-slate-200 px-3 py-2 bg-slate-50 rounded-sm outline-none focus:border-blue-600 focus:bg-white h-20 resize-none" value={nuevoCliente.comentario_cliente} onChange={(e) => setNuevoCliente({...nuevoCliente, comentario_cliente: e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setMostrarModalCliente(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 font-mono text-xs font-bold uppercase rounded-sm cursor-pointer">Cerrar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase rounded-sm shadow-xs cursor-pointer">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Administracion;