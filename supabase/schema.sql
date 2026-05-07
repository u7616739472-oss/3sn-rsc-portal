-- ============================================
-- 3SN RSC Portal - Supabase Schema
-- Plataforma de proyectos para ONGDs
-- Marco Lógico + Blockchain + IA
-- ============================================

-- Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: ongds
-- ============================================
CREATE TABLE IF NOT EXISTS public.ongds (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  sector TEXT,
  ubicacion TEXT,
  website TEXT,
  logo_url TEXT,
  nif TEXT UNIQUE,
  email_contacto TEXT,
  telefono TEXT,
  fecha_fundacion DATE,
  tamano TEXT CHECK (tamano IN ('micro', 'pequena', 'mediana', 'grande')),
  activa BOOLEAN DEFAULT true,
  -- SSO integration fields
  google_workspace_domain TEXT,
  azure_tenant_id TEXT,
  aws_account_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: usuarios_ongd
-- ============================================
CREATE TABLE IF NOT EXISTS public.usuarios_ongd (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ongd_id UUID REFERENCES public.ongds(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rol TEXT CHECK (rol IN ('admin', 'gestor', 'lector')) DEFAULT 'lector',
  nombre TEXT,
  email TEXT,
  -- SSO provider tracking
  sso_provider TEXT CHECK (sso_provider IN ('google', 'azure', 'aws', 'email')),
  sso_external_id TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ongd_id, user_id)
);

-- ============================================
-- TABLA: proyectos
-- ============================================
CREATE TABLE IF NOT EXISTS public.proyectos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ongd_id UUID REFERENCES public.ongds(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  -- Marco Lógico Paso 1: Problema
  problema_descripcion TEXT,
  problema_contexto JSONB DEFAULT '{}',
  sector TEXT,
  poblacion_objetivo TEXT,
  ubicacion TEXT,
  -- Árboles (generados con IA, editables)
  arbol_problemas JSONB DEFAULT '{}',
  arbol_soluciones JSONB DEFAULT '{}',
  -- Metadatos del proyecto
  resumen_ejecutivo TEXT,
  estado TEXT CHECK (estado IN (
    'borrador',
    'arbol_problemas',
    'arbol_soluciones',
    'lineas_trabajo',
    'publicado',
    'financiado',
    'en_ejecucion',
    'completado',
    'archivado'
  )) DEFAULT 'borrador',
  presupuesto_total NUMERIC(12,2),
  fecha_inicio_estimada DATE,
  fecha_fin_estimada DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: lineas_trabajo
-- ============================================
CREATE TABLE IF NOT EXISTS public.lineas_trabajo (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  proyecto_id UUID REFERENCES public.proyectos(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  objetivo TEXT,
  actividades JSONB DEFAULT '[]',
  indicadores JSONB DEFAULT '[]',
  presupuesto_estimado NUMERIC(10,2),
  duracion_meses INTEGER,
  prioridad TEXT CHECK (prioridad IN ('alta', 'media', 'baja')) DEFAULT 'media',
  -- Publicar para búsqueda de financiación
  publicar_para_financiacion BOOLEAN DEFAULT false,
  publicado_at TIMESTAMPTZ,
  -- Blockchain
  evidencias_cumplimiento JSONB DEFAULT '[]',
  blockchain_hash TEXT,
  blockchain_tx_id TEXT,
  blockchain_timestamp TIMESTAMPTZ,
  blockchain_network TEXT DEFAULT '3SN-Simnet',
  -- Estado
  estado TEXT CHECK (estado IN (
    'borrador', 'activa', 'en_busqueda_financiacion',
    'financiada', 'en_ejecucion', 'completada', 'cancelada'
  )) DEFAULT 'borrador',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: evidencias
-- ============================================
CREATE TABLE IF NOT EXISTS public.evidencias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  linea_trabajo_id UUID REFERENCES public.lineas_trabajo(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  tipo TEXT CHECK (tipo IN (
    'documento', 'imagen', 'video', 'informe',
    'acta', 'factura', 'memoria', 'otro'
  )),
  url_archivo TEXT,
  -- Blockchain registro
  hash_contenido TEXT,
  blockchain_hash TEXT,
  blockchain_tx_id TEXT,
  blockchain_timestamp TIMESTAMPTZ,
  verificado BOOLEAN DEFAULT false,
  -- Metadatos
  subido_por UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: financiaciones
-- ============================================
CREATE TABLE IF NOT EXISTS public.financiaciones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  linea_trabajo_id UUID REFERENCES public.lineas_trabajo(id) ON DELETE CASCADE,
  financiador_id UUID,
  monto NUMERIC(10,2),
  moneda TEXT DEFAULT 'EUR',
  estado TEXT CHECK (estado IN (
    'propuesta', 'en_negociacion', 'aprobada',
    'rechazada', 'desembolsada', 'completada'
  )) DEFAULT 'propuesta',
  fecha_propuesta TIMESTAMPTZ DEFAULT NOW(),
  fecha_aprobacion TIMESTAMPTZ,
  fecha_desembolso TIMESTAMPTZ,
  condiciones TEXT,
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: ai_generaciones (log de IA)
-- ============================================
CREATE TABLE IF NOT EXISTS public.ai_generaciones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  proyecto_id UUID REFERENCES public.proyectos(id) ON DELETE CASCADE,
  tipo TEXT CHECK (tipo IN (
    'arbol_problemas', 'arbol_soluciones',
    'lineas_trabajo', 'resumen_ejecutivo',
    'evidencias', 'presupuesto'
  )),
  prompt_usado TEXT,
  resultado JSONB,
  modelo TEXT DEFAULT 'gpt-4',
  tokens_usados INTEGER,
  aceptado BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_proyectos_ongd ON public.proyectos(ongd_id);
CREATE INDEX IF NOT EXISTS idx_lineas_proyecto ON public.lineas_trabajo(proyecto_id);
CREATE INDEX IF NOT EXISTS idx_lineas_financiacion ON public.lineas_trabajo(publicar_para_financiacion) WHERE publicar_para_financiacion = true;
CREATE INDEX IF NOT EXISTS idx_evidencias_linea ON public.evidencias(linea_trabajo_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_ongd ON public.usuarios_ongd(ongd_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_user ON public.usuarios_ongd(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.ongds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lineas_trabajo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financiaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios_ongd ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generaciones ENABLE ROW LEVEL SECURITY;

-- Políticas: usuarios sólo ven datos de su ONGD
CREATE POLICY "ongd_members_select" ON public.proyectos
  FOR SELECT USING (
    ongd_id IN (
      SELECT ongd_id FROM public.usuarios_ongd
      WHERE user_id = auth.uid() AND activo = true
    )
  );

CREATE POLICY "ongd_managers_insert" ON public.proyectos
  FOR INSERT WITH CHECK (
    ongd_id IN (
      SELECT ongd_id FROM public.usuarios_ongd
      WHERE user_id = auth.uid()
      AND rol IN ('admin', 'gestor')
      AND activo = true
    )
  );

CREATE POLICY "ongd_managers_update" ON public.proyectos
  FOR UPDATE USING (
    ongd_id IN (
      SELECT ongd_id FROM public.usuarios_ongd
      WHERE user_id = auth.uid()
      AND rol IN ('admin', 'gestor')
      AND activo = true
    )
  );

-- Lineas de trabajo: misma política que proyectos
CREATE POLICY "lineas_select" ON public.lineas_trabajo
  FOR SELECT USING (
    proyecto_id IN (
      SELECT p.id FROM public.proyectos p
      JOIN public.usuarios_ongd u ON u.ongd_id = p.ongd_id
      WHERE u.user_id = auth.uid() AND u.activo = true
    )
  );

CREATE POLICY "lineas_insert_update" ON public.lineas_trabajo
  FOR ALL USING (
    proyecto_id IN (
      SELECT p.id FROM public.proyectos p
      JOIN public.usuarios_ongd u ON u.ongd_id = p.ongd_id
      WHERE u.user_id = auth.uid()
      AND u.rol IN ('admin', 'gestor')
      AND u.activo = true
    )
  );

-- ============================================
-- TRIGGERS: updated_at automático
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_proyectos_updated
  BEFORE UPDATE ON public.proyectos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_lineas_updated
  BEFORE UPDATE ON public.lineas_trabajo
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_ongds_updated
  BEFORE UPDATE ON public.ongds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
