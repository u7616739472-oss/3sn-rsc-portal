'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DemoWizardPage() {
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [contexto, setContexto] = useState({
    nombreONG: 'Fundación Desarrollo Social',
    sector: 'Educación',
    ubicacion: 'Madrid, España',
    poblacionObjetivo: 'Jóvenes en riesgo de exclusión social',
    problemaDescripcion: 'Falta de acceso a educación de calidad para jóvenes en situación de vulnerabilidad en Madrid',
    contextoAdicional: ''
  });
  const [arbolProblemas, setArbolProblemas] = useState<any>(null);
  const [arbolSoluciones, setArbolSoluciones] = useState<any>(null);
  const [lineas, setLineas] = useState<any[]>([]);

  const generarArbolProblemas = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/arbol-problemas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contexto)
      });
      const arbol = await response.json();
      setArbolProblemas(arbol);
      setPaso(3);
    } catch (error) {
      alert('Error generando árbol de problemas');
    }
    setLoading(false);
  };

  const generarArbolSoluciones = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/arbol-soluciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contexto, arbolProblemas })
      });
      const arbol = await response.json();
      setArbolSoluciones(arbol);
      setPaso(4);
    } catch (error) {
      alert('Error generando árbol de soluciones');
    }
    setLoading(false);
  };

  const generarLineasTrabajo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/lineas-trabajo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contexto, arbolSoluciones })
      });
      const lineasGen = await response.json();
      setLineas(lineasGen);
      setPaso(5);
    } catch (error) {
      alert('Error generando líneas de trabajo');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">🎯 Demo Wizard Marco Lógico</h1>
          <Link href="/" className="text-blue-400 hover:underline">← Volver al portal</Link>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { n: 1, label: 'Problema' },
              { n: 2, label: 'Árbol Problemas' },
              { n: 3, label: 'Árbol Soluciones' },
              { n: 4, label: 'Líneas de Trabajo' },
              { n: 5, label: 'Resumen' }
            ].map((step, i) => (
              <div key={step.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${paso >= step.n ? 'bg-blue-600' : 'bg-gray-800'}`}>
                    {step.n}
                  </div>
                  <div className={`text-xs mt-1 ${paso >= step.n ? 'text-white' : 'text-gray-500'}`}>
                    {step.label}
                  </div>
                </div>
                {i < 4 && <div className={`flex-1 h-0.5 mx-2 ${paso > step.n ? 'bg-blue-600' : 'bg-gray-800'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Paso 1 */}
        {paso === 1 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">🔍 Paso 1: Define el Problema</h2>
            <p className="text-gray-400 mb-6">Los datos ya están pre-rellenados para la demo</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Nombre de tu ONG</label>
                <input type="text" value={contexto.nombreONG} onChange={(e) => setContexto({...contexto, nombreONG: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Sector</label>
                  <input type="text" value={contexto.sector} onChange={(e) => setContexto({...contexto, sector: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Ubicación</label>
                  <input type="text" value={contexto.ubicacion} onChange={(e) => setContexto({...contexto, ubicacion: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Población Objetivo</label>
                <input type="text" value={contexto.poblacionObjetivo} onChange={(e) => setContexto({...contexto, poblacionObjetivo: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Descripción del Problema</label>
                <textarea value={contexto.problemaDescripcion} onChange={(e) => setContexto({...contexto, problemaDescripcion: e.target.value})} rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white" />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setPaso(2)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                Siguiente: Generar Árbol de Problemas →
              </button>
            </div>
          </div>
        )}

        {/* Paso 2 */}
        {paso === 2 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">🌳 Paso 2: Árbol de Problemas</h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🧠</div>
              <p className="text-gray-400 mb-6">Listo para generar el árbol de problemas con IA</p>
              <button onClick={generarArbolProblemas} disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium">
                {loading ? 'Generando con IA...' : '🪄 Generar Árbol de Problemas'}
              </button>
            </div>
          </div>
        )}

        {/* Paso 3 */}
        {paso === 3 && arbolProblemas && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">✅ Árbol de Problemas Generado</h2>
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Problema Raíz</h3>
                <p className="text-gray-300">{arbolProblemas.problemaRaiz}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">Causas Directas</h3>
                  <ul className="space-y-2">
                    {arbolProblemas.causasDirectas.map((c: string, i: number) => <li key={i} className="text-sm text-gray-300">• {c}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">Efectos Directos</h3>
                  <ul className="space-y-2">
                    {arbolProblemas.efectosDirectos.map((e: string, i: number) => <li key={i} className="text-sm text-gray-300">• {e}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setPaso(2)} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg">← Volver</button>
              <button onClick={generarArbolSoluciones} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                {loading ? 'Generando...' : 'Siguiente: Árbol de Soluciones →'}
              </button>
            </div>
          </div>
        )}

        {/* Paso 4 */}
        {paso === 4 && arbolSoluciones && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">🌟 Árbol de Soluciones Generado</h2>
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Objetivo General</h3>
                <p className="text-gray-300">{arbolSoluciones.objetivoGeneral}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">Medios</h3>
                  <ul className="space-y-2">
                    {arbolSoluciones.mediosDirectos.map((m: string, i: number) => <li key={i} className="text-sm text-gray-300">• {m}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">Fines</h3>
                  <ul className="space-y-2">
                    {arbolSoluciones.finesDirectos.map((f: string, i: number) => <li key={i} className="text-sm text-gray-300">• {f}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setPaso(3)} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg">← Volver</button>
              <button onClick={generarLineasTrabajo} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                {loading ? 'Generando...' : 'Siguiente: Generar Líneas →'}
              </button>
            </div>
          </div>
        )}

        {/* Paso 5 */}
        {paso === 5 && lineas.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">📋 Líneas de Trabajo Generadas</h2>
            <div className="space-y-4 mb-6">
              {lineas.map((linea, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{linea.titulo}</h3>
                  <p className="text-sm text-gray-300 mb-4">{linea.descripcion}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Presupuesto:</span>
                      <span className="text-white font-medium ml-2">{linea.presupuestoEstimado}€</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Duración:</span>
                      <span className="text-white font-medium ml-2">{linea.duracionMeses} meses</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Financiación:</span>
                      <span className={`font-medium ml-2 ${linea.publicarParaFinanciacion ? 'text-green-400' : 'text-gray-400'}`}>
                        {linea.publicarParaFinanciacion ? '✅ Publicar' : '❌ No publicar'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6">
              <div className="text-sm text-blue-300 font-medium">
                💰 Presupuesto Total: {lineas.reduce((sum, l) => sum + l.presupuestoEstimado, 0)}€
              </div>
              <div className="text-xs text-blue-400 mt-1">
                {lineas.filter(l => l.publicarParaFinanciacion).length} líneas publicadas para financiación
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setPaso(4)} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg">← Volver</button>
              <Link href="/privado/login" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium inline-block">
                ✅ Ir al Panel ONGD para Guardar →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
