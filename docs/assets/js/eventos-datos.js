// Inscripciones a los eventos de prelanzamiento (solo en este móvil).
import { leer, guardar, topes, cargarJSON } from './nucleo.js';

export const leerInscripciones = () => leer('fs_eventos', {});
export const guardarInscripciones = (d) => guardar('fs_eventos', d);
export const OCUPA = ['reservada', 'confirmada'];

export async function estadoCiudades() {
  const [t, ev] = await Promise.all([topes(), cargarJSON('eventos')]);
  const d = leerInscripciones();
  return ev.prelanzamiento.map((e) => {
    const lista = d[e.id] || [];
    const ocupadas = lista.filter((x) => OCUPA.includes(x.estado)).length;
    const tope = t.eventos[e.id];
    return { ...e, tope, ocupadas, libres: Math.max(0, tope - ocupadas), espera: lista.filter((x) => x.estado === 'espera').length };
  });
}

export function buscarPorCodigo(codigo) {
  const d = leerInscripciones();
  for (const [ciudad, lista] of Object.entries(d)) {
    const r = lista.find((x) => x.codigo === codigo);
    if (r) return { ciudad, r, d };
  }
  return null;
}
