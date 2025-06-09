'use client';
import { useEffect, useState } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TarjetasAdminProps { filtros: { categoria: string }; }
interface Usuario {
  id?: string;
  nombre: string;
  apellido: string;
  carrera: string;
  contraseña: string;
  correo_institucional: string;
  creadoEn: Date;
  descripcion: string;
  fecha_nacimiento: string;
  fotoPerfil: string;
  fotoPortada: string;
  universidadId: string;
  universidadNombre: string;
  bloqueado?: boolean;
}
interface Reporte { id: string; postId: string; motivo: string; }

export default function TarjetasAdmin({ filtros }: TarjetasAdminProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [postsMap, setPostsMap] = useState<Record<string, string>>({});
  const [nuevoUsuario, setNuevoUsuario] = useState<Partial<Usuario>>({});
  const [usuariosBloqueados, setUsuariosBloqueados] = useState<Usuario[]>([]);
  const [ocultos, setOcultos] = useState<string[]>([]);

  const obtenerUsuarios = async () => {
    const snap = await getDocs(collection(db, "usuarios"));
    const list = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Usuario[];
    setUsuarios(list);
    setUsuariosBloqueados(list.filter(u => u.bloqueado));
  };

  const obtenerReportes = async () => {
    const snap = await getDocs(collection(db, "reportes_publicaciones"));
    const reps = snap.docs.map(d => ({ id: d.id, ...d.data() } as Reporte));
    setReportes(reps);

    const map: Record<string, string> = {};
    await Promise.all(reps.map(async r => {
      const p = await getDoc(doc(db, "posts", r.postId));
      map[r.postId] = p.exists() ? (p.data() as any).contenido : "[No existe]";
    }));
    setPostsMap(map);
  };

  const crearUsuario = async () => {
    // Validar campos mínimos
    if (!nuevoUsuario.nombre || !nuevoUsuario.correo_institucional || !nuevoUsuario.contraseña) {
      alert("Por favor completa los campos: nombre, correo institucional y contraseña");
      return;
    }

    await addDoc(collection(db, "usuarios"), {
      ...nuevoUsuario,
      creadoEn: new Date(),
      bloqueado: false,
    });
    setNuevoUsuario({});
    obtenerUsuarios();
    alert("Usuario creado correctamente");
  };

  const editarUsuario = async (id: string, campo: keyof Usuario, valor: string) => {
    const ref = doc(db, "usuarios", id);
    await updateDoc(ref, { [campo]: valor });
    obtenerUsuarios();
  };

  const cambiarBloqueo = async (u: Usuario) => {
    const ref = doc(db, "usuarios", u.id!);
    await updateDoc(ref, { bloqueado: !u.bloqueado });
    obtenerUsuarios();
  };

  const eliminarUsuario = async (id: string) => {
    await deleteDoc(doc(db, "usuarios", id));
    obtenerUsuarios();
  };

  const eliminarReporte = async (id: string) => {
    await deleteDoc(doc(db, "reportes_publicaciones", id));
    obtenerReportes();
  };

  const toggleOcultar = (id: string) => {
    setOcultos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  useEffect(() => {
    if (filtros.categoria === "Dashboard") {
      obtenerUsuarios();
      obtenerReportes();
    } else if (filtros.categoria === "Usuarios") {
      obtenerUsuarios();
    } else if (filtros.categoria === "Reportes") {
      obtenerReportes();
    }
  }, [filtros]);

  if (filtros.categoria === "Dashboard") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <Tarjeta titulo="Total de Usuarios" valor={usuarios.length} />
        <Tarjeta titulo="Usuarios Bloqueados" valor={usuariosBloqueados.length} />
        <Tarjeta titulo="Total de Reportes" valor={reportes.length} />
        <Tarjeta titulo="Publicaciones Reportadas" valor={new Set(reportes.map(r => r.postId)).size} />
      </div>
    );
  }

  if (filtros.categoria === "Usuarios") {
    return (
      <div>
        <h3>Gestión de Usuarios</h3>
        <table className="w-full border">
          
          <thead style={{ background: "linear-gradient(to right, #4EDCD8, #30A3A3)", color: "white" }}>
<tr>
            <th>Nombre</th><th>Apellido</th><th>Correo</th><th>Carrera</th><th>Bloqueado</th><th>Eliminar</th>
          </tr></thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} className="border-t">
                <td><Input defaultValue={u.nombre} onKeyDown={e => e.key === "Enter" && editarUsuario(u.id!, "nombre", (e.target as any).value)} /></td>
                <td><Input defaultValue={u.apellido} onKeyDown={e => e.key === "Enter" && editarUsuario(u.id!, "apellido", (e.target as any).value)} /></td>
                <td><Input defaultValue={u.correo_institucional} onKeyDown={e => e.key === "Enter" && editarUsuario(u.id!, "correo_institucional", (e.target as any).value)} /></td>
                <td><Input defaultValue={u.carrera} onKeyDown={e => e.key === "Enter" && editarUsuario(u.id!, "carrera", (e.target as any).value)} /></td>
                <td>{u.bloqueado ? "✅" : ""}</td>
                <td><Button style={{ background: "linear-gradient(to right,rgb(240, 61, 61),rgb(141, 24, 43))", color: "white" }} variant="destructive" onClick={() => eliminarUsuario(u.id!)}>Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (filtros.categoria === "Crear Usuario") {
    return (
      <div className="p-4 space-y-2 max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4">Crear Nuevo Usuario</h3>
        {[
          "nombre",
          "apellido",
          "carrera",
          "contraseña",
          "correo_institucional",
          
          "universidadId"
        ].map(campo => (
          <Input
            key={campo}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1).replace(/_/g, ' ')}
            value={(nuevoUsuario as any)[campo] || ""}
            onChange={e => setNuevoUsuario(prev => ({ ...prev, [campo]: e.target.value }))}
          />
        ))}
        <Button style={{ background: "linear-gradient(to right, #4EDCD8, #30A3A3)", color: "white" }} onClick={crearUsuario}>Crear Usuario</Button>
      </div>
    );
  }

  if (filtros.categoria === "Reportes") {
    return (
      <div>
        <h3>Reportes de Publicaciones</h3>
        <table className="w-full border">
          <thead style={{ background: "linear-gradient(to right, #4EDCD8, #30A3A3)", color: "white" }}>
            <tr>
            <th>Motivo</th><th>PostId</th><th>Contenido</th><th>Acciones</th>
          </tr></thead>
          <tbody>
            {reportes.map(r => (
              <tr key={r.id} className="border-t">
                <td>{r.motivo}</td>
                <td>{r.postId}</td>
                <td>{postsMap[r.postId] || "[Cargando]"}</td>
                <td>
                  <Button style={{ background: "linear-gradient(to right,rgb(220, 78, 78),rgb(91, 18, 23))", color: "white" }} variant="destructive" onClick={() => eliminarReporte(r.id)}>Eliminar</Button>
                  <Button style={{ background: "linear-gradient(to right, #4EDCD8, #30A3A3)", color: "white" }} onClick={() => toggleOcultar(r.id)}>
                    {ocultos.includes(r.id) ? "Mostrar" : "Ocultar"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

function Tarjeta({ titulo, valor }: { titulo: string; valor: number }) {
  return (
    <div className="rounded-xl text-white shadow-lg p-6" style={{ background: "linear-gradient(to right, #4EDCD8, #30A3A3)" }}>
      <h4 className="text-lg font-semibold mb-2">{titulo}</h4>
      <p className="text-3xl font-bold">{valor}</p>
    </div>
  );
}
