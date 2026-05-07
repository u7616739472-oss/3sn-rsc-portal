import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      ongds: {
        Row: {
          id: string
          nombre: string
          email: string
          cif: string
          descripcion: string
          logo_url: string | null
          verified: boolean
          auth_provider: 'google' | 'azure' | 'aws' | 'email'
          provider_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['ongds']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['ongds']['Insert']>
      }
      proyectos: {
        Row: {
          id: string
          ongd_id: string
          titulo: string
          estado: 'borrador' | 'en_revision' | 'publicado' | 'financiado' | 'completado'
          paso_actual: number
          problema: string | null
          arbol_problemas: object | null
          arbol_soluciones: object | null
          lineas_trabajo: object | null
          presupuesto_total: number
          publicar_financiacion: boolean
          blockchain_hash: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['proyectos']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['proyectos']['Insert']>
      }
      lineas_trabajo: {
        Row: {
          id: string
          proyecto_id: string
          titulo: string
          descripcion: string
          presupuesto: number
          publicar: boolean
          evidencias: object[]
          blockchain_hash: string | null
          estado: 'pendiente' | 'en_ejecucion' | 'completada'
          created_at: string
        }
      }
      evidencias: {
        Row: {
          id: string
          linea_id: string
          tipo: 'documento' | 'imagen' | 'video' | 'url'
          titulo: string
          url: string
          blockchain_hash: string
          blockchain_tx: string
          timestamp: string
          verificado: boolean
        }
      }
      financiaciones: {
        Row: {
          id: string
          linea_id: string
          empresa_id: string
          monto: number
          estado: 'interesado' | 'comprometido' | 'transferido'
          created_at: string
        }
      }
    }
  }
}
