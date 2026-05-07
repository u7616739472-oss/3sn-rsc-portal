'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as AI from '@/lib/ai';
import { registrarEnBlockchain } from '@/lib/blockchain';
import { supabase } from '@/lib/supabase';
export default function NuevoProyectoPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [contexto, setContexto] = useState<AI.ProblemaContexto>({
    nombreONG: '',
    sector: '',
    poblacionObjetivo: '',
    problemaDescripcion: '',
    ubicacion: '',
    contextoAdicional: '',
  });
  const [arbolProblemas, setArbolProblemas] = useState<AI.ArbolProblemas | null>(null);
  const [arbolSoluciones, setArbolSoluciones] = useState<AI.ArbolSoluciones | null>(null);
  const [lineas, setLineas] = useState<AI.LineaTrabajo[]>([]);

  const generarArbolProblemas = async () => {
    setLoading(true);
    try {
      const arbol = await AI.generarArbolProblemas(contexto);
      setArbolProblemas(arbol);
      setPaso(3);
    } catch (err) {
      alert('Error generando árbol de problemas');
    }
    setLoading(false);
  };

  const generarArbolSoluciones = async () => {
    if (!arbolProblemas) return;
    setLoading(true);
    try {
      const arbol = await AI.generarArbolSoluciones(contexto, arbolProblemas);
      setArbolSoluciones(arbol);
      setPaso(4);
    } catch (err) {
      alert('Error generando árbol de soluciones');
    }
    setLoading(false);
  };

  const generarLineasTrabajo = async () => {
    if (!arbolSoluciones) return;
    setLoading(true);
    try {
      const lineasGen = await AI.generarLineasTrabajo(contexto, arbolSoluciones);
      setLineas(lineasGen);
      setPaso(5);
    } catch (err) {
      alert('Error generando líneas de trabajo');
    }
    setLoading(false);
  };

  const guardarProyecto = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Debes iniciar sesión');
      return;
    }

    // Guardar proyecto
    const { data: proyecto, error: errorProyecto } = await supabase
      .from('proyectos')
      .insert({
        titulo: `${contexto.problemaDescripcion.slice(0, 60)}...`,
        problema_descripcion: contexto.problemaDescripcion,
        problema_contexto: contexto,
        sector: contexto.sector,
        poblacion_objetivo: contexto.poblacionObjetivo,
        ubicacion: contexto.ubicacion,
        arbol_problemas: arbolProblemas,
        arbol_soluciones: arbolSoluciones,
        estado: 'lineas_trabajo',
        presupuesto_total: AI.calcularPresupuestoTotal(lineas),
        created_by: user.id,
        ongd_id: 'demo-ongd-id',
      })
      .select()
      .single();

    if (errorProyecto || !proyecto) {
      alert('Error guardando proyecto');
      setLoading(false);
      return;
    }

    // Guardar líneas de trabajo
    for (const linea of lineas) {
      const { data: lineaGuardada } = await supabase
        .from('lineas_trabajo')
        .insert({
          proyecto_id: proyecto.id,
          titulo: linea.titulo,
          descripcion: linea.descripcion,
          objetivo: linea.objetivo,
          actividades: linea.actividades,
          indicadores: linea.indicadores,
          presupuesto_estimado: linea.presupuestoEstimado,
          duracion_meses: linea.duracionMeses,
          prioridad: linea.prioridad,
          publicar_para_financiacion: linea.publicarParaFinanciacion,
          evidencias_cumplimiento: linea.evidenciasCumplimiento,
          estado: 'borrador',
        })
        .select()
        .single();

      // Registrar en blockchain
      if (lineaGuardada) {
        const record = await registrarEnBlockchain({
          proyectoId: proyecto.id,
          lineaId: lineaGuardada.id,
          tipo: 'linea_trabajo',
          titulo: `Proyecto: ${proyecto.titulo} - Línea: ${linea.titulo}`,
          contenidoHash: JSON.stringify(linea),
          timestamp: new Date().toISOString(),
          ongdId: 'ongd-temp-id' // TODO: obtener del contexto de sesión
        });
        await supabase
          .from('lineas_trabajo')
          .update({
            blockchain_hash: record.hash,
            blockchain_timestamp: new Date().toISOString(),
          })
          .eq('id', lineaGuardada.id);
      }
    }

    setLoading(false);
    router.push(`/privado/proyectos/${proyecto.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { n: 1, label: 'Problema' },
            { n: 2, label: 'Árbol Problemas' },
            { n: 3, label: 'Árbol Soluciones' },
            { n: 4, label: 'Líneas de Trabajo' },
            { n: 5, label: 'Revisión' },
          ].map((step, i) => (
            <div key={step.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    paso >= step.n ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {step.n}
                </div>
                <div className={`text-xs mt-1 ${paso >= step.n ? 'text-white' : 'text-gray-500'}`}>
                  {step.label}
                </div>
              </div>
              {i < 4 && (
                <div className={`flex-1 h-0.5 mx-2 ${paso > step.n ? 'bg-blue-600' : 'bg-gray-800'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Paso 1: Problema */}
      {paso === 1 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">🔍 Paso 1: Define el Problema</h2>
          <p className="text-gray-400 mb-6">Describe el problema central que tu proyecto quiere resolver.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Nombre de tu ONG</label>
              <input
                type="text"
                value={contexto.nombreONG}
                onChange={(e) => setContexto({ ...contexto, nombreONG: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="Ej: Fundación Esperanza"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Sector</label>
                <input
                  type="text"
                  value={contexto.sector}
                  onChange={(e) => setContexto({ ...contexto, sector: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  placeholder="Ej: Educación, Salud, Empleo..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Ubicación</label>
                <input
                  type="text"
                  value={contexto.ubicacion || ''}
                  onChange={(e) => setContexto({ ...contexto, ubicacion: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  placeholder="Ej: Madrid, España"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Población Objetivo</label>
              <input
                type="text"
                value={contexto.poblacionObjetivo}
                onChange={(e) => setContexto({ ...contexto, poblacionObjetivo: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="Ej: Jóvenes en riesgo de exclusión social"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Descripción del Problema</label>
              <textarea
                value={contexto.problemaDescripcion}
                onChange={(e) => setContexto({ ...contexto, problemaDescripcion: e.target.value })}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="Describe el problema principal que quieres resolver con este proyecto..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Contexto Adicional (opcional)</label>
              <textarea
                value={contexto.contextoAdicional || ''}
                onChange={(e) => setContexto({ ...contexto, contextoAdicional: e.target.value })}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="Información adicional que ayude a la IA a entender mejor el contexto..."
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setPaso(2)}
              disabled={!contexto.nombreONG || !contexto.problemaDescripcion}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium"
            >
              Siguiente: Generar Árbol de Problemas →
            </button>
          </div>
        </div>
      )}

      {/* Paso 2: Generar Árbol Problemas */}
      {paso === 2 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">🌳 Paso 2: Árbol de Problemas</h2>
          <p className="text-gray-400 mb-6">
            La IA analizará tu problema y generará un árbol con causas y efectos. Podrás editarlo después.
          </p>
          {!arbolProblemas ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🧠</div>
              <p className="text-gray-400 mb-6">Listo para generar el árbol de problemas con IA</p>
              <button
                onClick={generarArbolProblemas}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium"
              >
                {loading ? 'Generando con IA...' : '🪄 Generar Árbol de Problemas'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Problema Raíz</h3>
                <textarea
                  value={arbolProblemas.problemaRaiz}
                  onChange={(e) => setArbolProblemas({ ...arbolProblemas, problemaRaiz: e.target.value })}
                  rows={2}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Causas</h3>
                  {arbolProblemas.causasDirectas.map((c, i) => (
                    <div key={i} className="mb-2">
                      <input
                        value={c}
                        onChange={(e) => {
                          const nuevas = [...arbolProblemas.causasDirectas];
                          nuevas[i] = e.target.value;
                          setArbolProblemas({ ...arbolProblemas, causasDirectas: nuevas });
                        }}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Efectos</h3>
                  {arbolProblemas.efectosDirectos.map((e, i) => (
                    <div key={i} className="mb-2">
                      <input
                        value={e}
                        onChange={(ev) => {
                          const nuevos = [...arbolProblemas.efectosDirectos];
                          nuevos[i] = ev.target.value;
                          setArbolProblemas({ ...arbolProblemas, efectosDirectos: nuevos });
                        }}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setPaso(1)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                >
                  ← Volver
                </button>
                <button
                  onClick={generarArbolSoluciones}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium"
                >
                  {loading ? 'Generando...' : 'Siguiente: Árbol de Soluciones →'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Paso 3: Árbol Soluciones */}
      {paso === 3 && arbolSoluciones && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">🌟 Paso 3: Árbol de Soluciones</h2>
          <p className="text-gray-400 mb-6">Convertimos los problemas en objetivos alcanzables.</p>
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Objetivo General</h3>
              <textarea
                value={arbolSoluciones.objetivoGeneral}
                onChange={(e) => setArbolSoluciones({ ...arbolSoluciones, objetivoGeneral: e.target.value })}
                rows={2}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Medios</h3>
                {arbolSoluciones.mediosDirectos.map((m, i) => (
                  <div key={i} className="mb-2">
                    <input
                      value={m}
                      onChange={(e) => {
                        const nuevos = [...arbolSoluciones.mediosDirectos];
                        nuevos[i] = e.target.value;
                        setArbolSoluciones({ ...arbolSoluciones, mediosDirectos: nuevos });
                      }}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                ))}
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Fines</h3>
                {arbolSoluciones.finesDirectos.map((f, i) => (
                  <div key={i} className="mb-2">
                    <input
                      value={f}
                      onChange={(e) => {
                        const nuevos = [...arbolSoluciones.finesDirectos];
                        nuevos[i] = e.target.value;
                        setArbolSoluciones({ ...arbolSoluciones, finesDirectos: nuevos });
                      }}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setPaso(2)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
              >
                ← Volver
              </button>
              <button
                onClick={generarLineasTrabajo}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium"
              >
                {loading ? 'Generando...' : 'Siguiente: Generar Líneas →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paso 4: Líneas */}
      {paso === 4 && lineas.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">📋 Paso 4: Líneas de Trabajo</h2>
          <p className="text-gray-400 mb-6">
            La IA ha generado {lineas.length} líneas de trabajo con actividades, presupuesto y evidencias.
          </p>
          <div className="space-y-4 mb-6">
            {lineas.map((linea, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <input
                      value={linea.titulo}
                      onChange={(e) => {
                        const nuevas = [...lineas];
                        nuevas[i].titulo = e.target.value;
                        setLineas(nuevas);
                      }}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white font-medium mb-2"
                    />
                    <textarea
                      value={linea.descripcion}
                      onChange={(e) => {
                        const nuevas = [...lineas];
                        nuevas[i].descripcion = e.target.value;
                        setLineas(nuevas);
                      }}
                      rows={2}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Presupuesto</label>
                    <input
                      type="number"
                      value={linea.presupuestoEstimado}
                      onChange={(e) => {
                        const nuevas = [...lineas];
                        nuevas[i].presupuestoEstimado = Number(e.target.value);
                        setLineas(nuevas);
                      }}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Duración (meses)</label>
                    <input
                      type="number"
                      value={linea.duracionMeses}
                      onChange={(e) => {
                        const nuevas = [...lineas];
                        nuevas[i].duracionMeses = Number(e.target.value);
                        setLineas(nuevas);
                      }}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Publicar financiación</label>
                    <input
                      type="checkbox"
                      checked={linea.publicarParaFinanciacion}
                      onChange={(e) => {
                        const nuevas = [...lineas];
                        nuevas[i].publicarParaFinanciacion = e.target.checked;
                        setLineas(nuevas);
                      }}
                      className="w-6 h-6 bg-gray-700 border border-gray-600 rounded"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  Actividades: {linea.actividades.length} • Indicadores: {linea.indicadores.length} • Evidencias:
                  {linea.evidenciasCumplimiento.length}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <div>
                <div className="text-sm text-blue-300 font-medium">
                  Presupuesto Total: {AI.formatearPresupuesto(AI.calcularPresupuestoTotal(lineas))}
                </div>
                <div className="text-xs text-blue-400">
                  {AI.lineasParaFinanciacion(lineas).length} líneas publicadas para financiación
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setPaso(3)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
            >
              ← Volver
            </button>
            <button
              onClick={guardarProyecto}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium"
            >
              {loading ? 'Guardando y registrando en Blockchain...' : '✅ Guardar Proyecto'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
