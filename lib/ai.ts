// lib/ai.ts
// Módulo de IA para asistencia en Marco Lógico
// Usa OpenAI GPT-4 via API Route para evitar exponer claves en cliente

export interface ProblemaContexto {
  nombreONG: string;
  sector: string;
  poblacionObjetivo: string;
  problemaDescripcion: string;
  ubicacion?: string;
  contextoAdicional?: string;
}

export interface ArbolProblemas {
  problemaRaiz: string;
  causasDirectas: string[];
  causasIndirectas: string[];
  efectosDirectos: string[];
  efectosIndirectos: string[];
  efectoFinal: string;
}

export interface ArbolSoluciones {
  objetivoGeneral: string;
  mediosDirectos: string[];
  mediosIndirectos: string[];
  finesDirectos: string[];
  finesIndirectos: string[];
  finUltimo: string;
}

export interface LineaTrabajo {
  id: string;
  titulo: string;
  descripcion: string;
  objetivo: string;
  actividades: string[];
  indicadores: string[];
  presupuestoEstimado: number;
  duracionMeses: number;
  publicarParaFinanciacion: boolean;
  evidenciasCumplimiento: string[];
  prioridad: 'alta' | 'media' | 'baja';
}

export interface ProyectoMarcoLogico {
  problema: ProblemaContexto;
  arbolProblemas: ArbolProblemas;
  arbolSoluciones: ArbolSoluciones;
  lineasTrabajo: LineaTrabajo[];
  resumenEjecutivo: string;
}

// Genera árbol de problemas con IA via API
export async function generarArbolProblemas(
  contexto: ProblemaContexto
): Promise<ArbolProblemas> {
  const response = await fetch('/api/ai/arbol-problemas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contexto),
  });
  if (!response.ok) throw new Error('Error generando árbol de problemas');
  return response.json();
}

// Genera árbol de soluciones basado en el árbol de problemas
export async function generarArbolSoluciones(
  contexto: ProblemaContexto,
  arbolProblemas: ArbolProblemas
): Promise<ArbolSoluciones> {
  const response = await fetch('/api/ai/arbol-soluciones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contexto, arbolProblemas }),
  });
  if (!response.ok) throw new Error('Error generando árbol de soluciones');
  return response.json();
}

// Genera líneas de trabajo con presupuesto estimado
export async function generarLineasTrabajo(
  contexto: ProblemaContexto,
  arbolSoluciones: ArbolSoluciones
): Promise<LineaTrabajo[]> {
  const response = await fetch('/api/ai/lineas-trabajo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contexto, arbolSoluciones }),
  });
  if (!response.ok) throw new Error('Error generando líneas de trabajo');
  return response.json();
}

// Genera resumen ejecutivo del proyecto completo
export async function generarResumenEjecutivo(
  proyecto: Omit<ProyectoMarcoLogico, 'resumenEjecutivo'>
): Promise<string> {
  const response = await fetch('/api/ai/resumen-ejecutivo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proyecto),
  });
  if (!response.ok) throw new Error('Error generando resumen ejecutivo');
  const data = await response.json();
  return data.resumen;
}

// Sugiere mejoras a una línea de trabajo existente
export async function sugerirMejorasLinea(
  linea: LineaTrabajo,
  contexto: ProblemaContexto
): Promise<Partial<LineaTrabajo>> {
  const response = await fetch('/api/ai/mejorar-linea', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ linea, contexto }),
  });
  if (!response.ok) throw new Error('Error sugiriendo mejoras');
  return response.json();
}

// Genera indicadores de evidencia para blockchain
export async function generarEvidenciasBlockchain(
  linea: LineaTrabajo
): Promise<string[]> {
  const response = await fetch('/api/ai/evidencias-blockchain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(linea),
  });
  if (!response.ok) throw new Error('Error generando evidencias');
  const data = await response.json();
  return data.evidencias;
}

// Estima presupuesto para una línea de trabajo
export async function estimarPresupuesto(
  linea: Omit<LineaTrabajo, 'presupuestoEstimado'>,
  pais: string = 'España'
): Promise<{ minimo: number; maximo: number; recomendado: number; justificacion: string }> {
  const response = await fetch('/api/ai/estimar-presupuesto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ linea, pais }),
  });
  if (!response.ok) throw new Error('Error estimando presupuesto');
  return response.json();
}

// Helpers para formateo de datos Marco Lógico
export function calcularPresupuestoTotal(lineas: LineaTrabajo[]): number {
  return lineas.reduce((sum, l) => sum + l.presupuestoEstimado, 0);
}

export function lineasParaFinanciacion(lineas: LineaTrabajo[]): LineaTrabajo[] {
  return lineas.filter(l => l.publicarParaFinanciacion);
}

export function formatearPresupuesto(cantidad: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(cantidad);
}
