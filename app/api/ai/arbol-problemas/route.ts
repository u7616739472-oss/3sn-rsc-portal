// app/api/ai/arbol-problemas/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const contexto = await request.json();

    // Simulación de generación con IA
    // En producción, aquí iría una llamada a OpenAI, Anthropic, etc.
    const arbolProblemas = {
      problemaRaiz: contexto.problemaDescripcion,
      causasDirectas: [
        `Recursos limitados en el sector ${contexto.sector}`,
        `Falta de programas específicos para ${contexto.poblacionObjetivo}`,
        `Barreras de acceso en ${contexto.ubicacion || 'la zona'}`,
        `Insuficiente coordinación entre actores sociales`
      ],
      causasIndirectas: [
        'Presupuestos públicos reducidos',
        'Escasa concienciación social',
        'Marco regulatorio inadecuado'
      ],
      efectosDirectos: [
        `Deterioro de la calidad de vida de ${contexto.poblacionObjetivo}`,
        'Aumento de la brecha social',
        'Pérdida de oportunidades de desarrollo',
        'Desigualdad en el acceso a servicios básicos'
      ],
      efectosIndirectos: [
        'Ciclo de pobreza intergeneracional',
        'Fragmentación social',
        'Menor desarrollo económico local'
      ],
      efectoFinal: `Perpetuación de la exclusión social y pérdida de potencial humano en ${contexto.ubicacion || 'la comunidad'}`
    };

    return NextResponse.json(arbolProblemas);
  } catch (error) {
    console.error('Error generando árbol de problemas:', error);
    return NextResponse.json(
      { error: 'Error generando árbol de problemas' },
      { status: 500 }
    );
  }
}
