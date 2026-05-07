// app/api/ai/lineas-trabajo/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { contexto, arbolSoluciones } = await request.json();

    // Simulación de generación con IA
    // En producción, aquí iría una llamada a OpenAI, Anthropic, etc.
    const lineas = arbolSoluciones.mediosDirectos.map((medio: string, index: number) => ({
      titulo: `Línea ${index + 1}: ${medio.slice(0, 50)}`,
      descripcion: `Desarrollo de ${medio.toLowerCase()} para ${contexto.poblacionObjetivo} en ${contexto.ubicacion || 'la zona'}`,
      objetivo: arbolSoluciones.finesDirectos[index] || 'Mejorar condiciones de vida',
      actividades: [
        `Diagnóstico inicial de necesidades en ${contexto.sector}`,
        'Diseño de intervenciones específicas',
        `Implementación de acciones para ${contexto.poblacionObjetivo}`,
        'Monitoreo y seguimiento continuo',
        'Evaluación de impacto'
      ],
      indicadores: [
        'Número de beneficiarios directos',
        'Porcentaje de mejora en indicadores clave',
        'Grado de satisfacción de participantes',
        'Sostenibilidad de resultados'
      ],
      presupuestoEstimado: 15000 + (index * 5000),
      duracionMeses: 12 + (index * 3),
      prioridad: index < 2 ? 'alta' : 'media',
      publicarParaFinanciacion: index < 3,
      evidenciasCumplimiento: [
        'Informes trimestrales de progreso',
        'Fotografías y videos de actividades',
        'Testimonios de beneficiarios',
        'Datos cuantitativos de impacto',
        'Certificados de formación (si aplica)'
      ]
    }));

    return NextResponse.json(lineas);
  } catch (error) {
    console.error('Error generando líneas de trabajo:', error);
    return NextResponse.json(
      { error: 'Error generando líneas de trabajo' },
      { status: 500 }
    );
  }
}
