// app/api/ai/arbol-soluciones/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { contexto, arbolProblemas } = await request.json();

    // Simulación de generación con IA
    // En producción, aquí iría una llamada a OpenAI, Anthropic, etc.
    const arbolSoluciones = {
      objetivoGeneral: arbolProblemas.problemaRaiz.replace(
        /falta|escasez|insuficiente|carencia/gi,
        'acceso garantizado'
      ),
      mediosDirectos: arbolProblemas.causasDirectas.map((causa: string) =>
        causa.replace(
          /recursos limitados|falta de|barreras|insuficiente/gi,
          'recursos adecuados y accesibles'
        )
      ),
      mediosIndirectos: [
        `Incremento de inversión en ${contexto.sector}`,
        'Programas de sensibilización social activos',
        'Marco legal favorable y actualizado'
      ],
      finesDirectos: arbolProblemas.efectosDirectos.map((efecto: string) =>
        efecto.replace(
          /deterioro|aumento|pérdida|desigualdad/gi,
          'mejora'
        )
      ),
      finesIndirectos: [
        'Movilidad social ascendente',
        'Cohesión social fortalecida',
        'Desarrollo económico inclusivo'
      ],
      finUltimo: `Inclusión social efectiva y desarrollo pleno del potencial humano en ${contexto.ubicacion || 'la comunidad'}`
    };

    return NextResponse.json(arbolSoluciones);
  } catch (error) {
    console.error('Error generando árbol de soluciones:', error);
    return NextResponse.json(
      { error: 'Error generando árbol de soluciones' },
      { status: 500 }
    );
  }
}
