// Seed data for 3SN RSC Portal database
// Companies and projects for Corporate Social Responsibility (CSR) platform

export interface Company {
  id: string;
  nombre: string;
  sector: string;
  descripcion: string;
  proyectos: string[]; // IDs of projects they participate in
  pais: string;
  lineasRSC: string[];
}

export interface Project {
  id: string;
  nombre: string;
  descripcion: string;
  presupuesto: number;
  participantes: string[]; // Company IDs
  pais: string;
  estadoFinanciacion: 'pendiente' | 'aprobado' | 'en_progreso' | 'completado' | 'rechazado';
  smartContract: string; // placeholder
  oraculo: string; // placeholder
}

// Sample companies data
export const companiesSeed: Company[] = [
  {
    id: 'comp-001',
    nombre: 'Iberdrola SA',
    sector: 'Energía Renovable',
    descripcion: 'Líder mundial en energías renovables y sostenibilidad energética',
    proyectos: ['proj-001', 'proj-003'],
    pais: 'España',
    lineasRSC: ['Energía Limpia', 'Cambio Climático', 'Desarrollo Sostenible']
  },
  {
    id: 'comp-002',
    nombre: 'Inditex Group',
    sector: 'Textil y Moda',
    descripcion: 'Grupo textil global comprometido con la moda sostenible y responsable',
    proyectos: ['proj-002', 'proj-004'],
    pais: 'España',
    lineasRSC: ['Moda Sostenible', 'Trabajo Digno', 'Economía Circular']
  },
  {
    id: 'comp-003',
    nombre: 'Santander Bank',
    sector: 'Servicios Financieros',
    descripcion: 'Banco internacional enfocado en inclusión financiera y educación',
    proyectos: ['proj-005', 'proj-001'],
    pais: 'España',
    lineasRSC: ['Inclusión Financiera', 'Educación', 'Emprendimiento']
  },
  {
    id: 'comp-004',
    nombre: 'Telefónica SA',
    sector: 'Telecomunicaciones',
    descripcion: 'Operador global de telecomunicaciones con foco en digitalización inclusiva',
    proyectos: ['proj-006', 'proj-007'],
    pais: 'España',
    lineasRSC: ['Digitalización', 'Brecha Digital', 'Conectividad Rural']
  },
  {
    id: 'comp-005',
    nombre: 'Nestlé International',
    sector: 'Alimentación y Bebidas',
    descripcion: 'Multinacional alimentaria comprometida con la nutrición y sostenibilidad',
    proyectos: ['proj-008', 'proj-009'],
    pais: 'Internacional',
    lineasRSC: ['Nutrición', 'Agua', 'Agricultura Sostenible']
  },
  {
    id: 'comp-006',
    nombre: 'Microsoft Corporation',
    sector: 'Tecnología',
    descripcion: 'Gigante tecnológico enfocado en sostenibilidad e IA responsable',
    proyectos: ['proj-007', 'proj-010'],
    pais: 'Internacional',
    lineasRSC: ['Inteligencia Artificial Responsable', 'Carbono Neutro', 'Accesibilidad']
  },
  {
    id: 'comp-007',
    nombre: 'Acciona SA',
    sector: 'Infraestructura y Energía',
    descripcion: 'Empresa española líder en infraestructuras sostenibles y energías renovables',
    proyectos: ['proj-003', 'proj-011'],
    pais: 'España',
    lineasRSC: ['Infraestructura Sostenible', 'Energía Verde', 'Biodiversidad']
  },
  {
    id: 'comp-008',
    nombre: 'Unilever PLC',
    sector: 'Bienes de Consumo',
    descripcion: 'Multinacional de bienes de consumo con plan de vida sostenible',
    proyectos: ['proj-012', 'proj-004'],
    pais: 'Internacional',
    lineasRSC: ['Vida Sostenible', 'Igualdad de Género', 'Plástico Cero']
  }
];

// Sample projects data
export const projectsSeed: Project[] = [
  {
    id: 'proj-001',
    nombre: 'Parque Eólico Comunitario',
    descripcion: 'Desarrollo de parques eólicos con participación comunitaria y beneficios locales',
    presupuesto: 2500000,
    participantes: ['comp-001', 'comp-003'],
    pais: 'España',
    estadoFinanciacion: 'en_progreso',
    smartContract: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    oraculo: 'chainlink_energy_oracle_v1'
  },
  {
    id: 'proj-002',
    nombre: 'Textiles Circulares',
    descripcion: 'Programa de reciclaje y reutilización de textiles para economía circular',
    presupuesto: 1800000,
    participantes: ['comp-002'],
    pais: 'España',
    estadoFinanciacion: 'aprobado',
    smartContract: '0x2b3c4d5e6f7890ab1234567890abcdef12345678',
    oraculo: 'textile_recycling_oracle_v2'
  },
  {
    id: 'proj-003',
    nombre: 'Smart Cities Sostenibles',
    descripcion: 'Implementación de tecnologías inteligentes para ciudades más sostenibles',
    presupuesto: 5000000,
    participantes: ['comp-001', 'comp-007'],
    pais: 'España',
    estadoFinanciacion: 'en_progreso',
    smartContract: '0x3c4d5e6f7890ab1234567890abcdef1234567890',
    oraculo: 'smart_city_metrics_oracle'
  },
  {
    id: 'proj-004',
    nombre: 'Moda Ética Global',
    descripcion: 'Iniciativa para promover prácticas éticas en la cadena de suministro textil',
    presupuesto: 3200000,
    participantes: ['comp-002', 'comp-008'],
    pais: 'Internacional',
    estadoFinanciacion: 'aprobado',
    smartContract: '0x4d5e6f7890ab1234567890abcdef123456789012',
    oraculo: 'ethical_fashion_tracker_v1'
  },
  {
    id: 'proj-005',
    nombre: 'Microfinanzas Rurales',
    descripcion: 'Programa de microcréditos para emprendimiento en zonas rurales',
    presupuesto: 1500000,
    participantes: ['comp-003'],
    pais: 'España',
    estadoFinanciacion: 'completado',
    smartContract: '0x5e6f7890ab1234567890abcdef12345678901234',
    oraculo: 'rural_finance_oracle_v3'
  },
  {
    id: 'proj-006',
    nombre: 'Conectividad Rural 5G',
    descripcion: 'Expansión de redes 5G en áreas rurales para reducir la brecha digital',
    presupuesto: 4500000,
    participantes: ['comp-004'],
    pais: 'España',
    estadoFinanciacion: 'en_progreso',
    smartContract: '0x6f7890ab1234567890abcdef1234567890123456',
    oraculo: 'connectivity_metrics_oracle'
  },
  {
    id: 'proj-007',
    nombre: 'IA para Educación Inclusiva',
    descripcion: 'Plataforma de IA para personalizar educación y mejorar accesibilidad',
    presupuesto: 3800000,
    participantes: ['comp-004', 'comp-006'],
    pais: 'Internacional',
    estadoFinanciacion: 'aprobado',
    smartContract: '0x7890ab1234567890abcdef123456789012345678',
    oraculo: 'education_ai_metrics_oracle'
  },
  {
    id: 'proj-008',
    nombre: 'Agua Limpia para Todos',
    descripcion: 'Sistemas de purificación de agua en comunidades con acceso limitado',
    presupuesto: 2800000,
    participantes: ['comp-005'],
    pais: 'Internacional',
    estadoFinanciacion: 'en_progreso',
    smartContract: '0x890ab1234567890abcdef12345678901234567890',
    oraculo: 'water_quality_oracle_v2'
  },
  {
    id: 'proj-009',
    nombre: 'Agricultura Regenerativa',
    descripcion: 'Programa de apoyo a prácticas agrícolas regenerativas y sostenibles',
    presupuesto: 2200000,
    participantes: ['comp-005'],
    pais: 'Internacional',
    estadoFinanciacion: 'pendiente',
    smartContract: '0x90ab1234567890abcdef1234567890123456789a',
    oraculo: 'regenerative_agriculture_oracle'
  },
  {
    id: 'proj-010',
    nombre: 'Carbono Neutro 2030',
    descripcion: 'Iniciativa para alcanzar neutralidad de carbono mediante tecnología verde',
    presupuesto: 6000000,
    participantes: ['comp-006'],
    pais: 'Internacional',
    estadoFinanciacion: 'aprobado',
    smartContract: '0xa0b1234567890abcdef123456789012345678901b',
    oraculo: 'carbon_neutral_oracle_v4'
  },
  {
    id: 'proj-011',
    nombre: 'Biodiversidad Urbana',
    descripcion: 'Proyectos de infraestructura verde para promover biodiversidad en ciudades',
    presupuesto: 1900000,
    participantes: ['comp-007'],
    pais: 'España',
    estadoFinanciacion: 'en_progreso',
    smartContract: '0xb1234567890abcdef123456789012345678901bc',
    oraculo: 'biodiversity_urban_oracle'
  },
  {
    id: 'proj-012',
    nombre: 'Empaquetado Sostenible',
    descripcion: 'Desarrollo de alternativas sostenibles al packaging tradicional',
    presupuesto: 2600000,
    participantes: ['comp-008'],
    pais: 'Internacional',
    estadoFinanciacion: 'aprobado',
    smartContract: '0xc234567890abcdef123456789012345678901bcd',
    oraculo: 'sustainable_packaging_oracle'
  }
];

// Export combined seed data
export const seedData = {
  companies: companiesSeed,
  projects: projectsSeed
};

export default seedData;
