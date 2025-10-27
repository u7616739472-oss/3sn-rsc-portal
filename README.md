# 3SN RSC Portal 🌍

Portal para conectar empresas (RSC), ONGDs y ciudadanía con proyectos de impacto real y financiación blockchain bajo custodia 3SN.

## 🎨 Demo
**🚧 Proyecto en desarrollo activo**
- **Landing**: Buscador inteligente con sugerencias contextuales
- **Explicación 3SN**: Cómo funciona nuestra plataforma 
- **Publicar proyecto**: Formulario moderno para ONGDs y ciudadanía
- **Financiación**: Proyectos en búsqueda de inversión con custodia blockchain

## 🚀 Qué es 3SN
**3SN** es una base de datos de proyectos que potencia la participación de las empresas con su **Responsabilidad Social Corporativa (RSC)** en proyectos reales propuestos por profesionales del **tercer sector**.

### 📊 Beneficios por Stakeholder

#### 🏢 Para Empresas
- **RSC Transparente**: Impacto medible y verificable
- **Custodia Segura**: Fondos protegidos via smart contracts
- **Diversificación**: Portfolio de proyectos sociales
- **Reputación**: Asociación con causas importantes
- **Compliance**: Cumplimiento regulatorio RSC automatizado

#### 🌍 Para ONGDs/Tercer Sector
- **Acceso a Financiación**: Conexión directa con empresas
- **Transparencia**: Seguimiento en tiempo real de fondos
- **Eficiencia**: Menos intermediarios, más recursos al proyecto
- **Escalabilidad**: Acceso a múltiples fuentes de financiación
- **Profesionalización**: Herramientas de gestión de proyectos

#### 👥 Para Ciudadanía
- **Participación Activa**: Proponer y apoyar proyectos
- **Transparencia Total**: Ver el destino real de las inversiones
- **Impacto Local**: Conexión con proyectos de su comunidad
- **Democracia Participativa**: Voz en el desarrollo social
- **Educación**: Aprender sobre sostenibilidad y RSC

## 💼 Tecnología

### Stack Principal
- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: API Routes de Next.js
- **Base de Datos**: PostgreSQL (Supabase)
- **Blockchain**: Smart Contracts (Ethereum/Polygon)
- **Deployment**: Vercel (optimizado)

### Arquitectura
- **MVC Pattern**: Separación clara de responsabilidades
- **API REST**: Endpoints documentados con OpenAPI
- **Real-time**: WebSockets para actualizaciones en vivo
- **CDN**: Optimización de assets estáticos
- **Monitoring**: Logs centralizados y alertas

## 🛠️ Instalación y Configuración

### Requisitos Previos
```bash
node >= 18.17.0
npm >= 9.0.0
git >= 2.0.0
```

### Instalación Local
```bash
# Clonar repositorio
git clone https://github.com/u7616739472-oss/3sn-rsc-portal.git
cd 3sn-rsc-portal

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Inicializar base de datos
npm run db:setup
npm run db:seed  # Cargar datos de ejemplo

# Ejecutar en desarrollo
npm run dev
```

### 🗄️ Inicialización de Base de Datos

El proyecto incluye datos de ejemplo (seed data) con empresas y proyectos RSC reales para facilitar el desarrollo y testing.

#### Estructura de Datos
Los datos de ejemplo se encuentran en `src/data/seed.ts` e incluyen:

**Empresas de Ejemplo** (8 empresas):
- **Españolas**: Iberdrola, Inditex, Santander, Telefónica, Acciona
- **Internacionales**: Nestlé, Microsoft, Unilever
- **Sectores**: Energía, Textil, Finanzas, Tecnología, Alimentación, etc.

**Proyectos RSC** (12 proyectos):
- Parque Eólico Comunitario
- Textiles Circulares
- Smart Cities Sostenibles
- Microfinanzas Rurales
- IA para Educación Inclusiva
- Y más...

#### Comandos de Base de Datos
```bash
# Limpiar e inicializar base de datos
npm run db:reset

# Solo cargar datos de ejemplo
npm run db:seed

# Verificar datos cargados
npm run db:status

# Backup de datos actuales
npm run db:backup
```

#### Estructura de Seed Data
Cada empresa incluye:
- **nombre**: Nombre de la empresa
- **sector**: Sector de actividad
- **descripción**: Descripción de la empresa
- **proyectos**: Array de IDs de proyectos en que participa
- **país**: España o Internacional
- **lineasRSC**: Líneas de Responsabilidad Social Corporativa

Cada proyecto incluye:
- **nombre**: Nombre del proyecto
- **descripción**: Descripción detallada
- **presupuesto**: Presupuesto en euros
- **participantes**: Array de IDs de empresas participantes
- **país**: País de implementación
- **estadoFinanciación**: Estado actual (pendiente, aprobado, en_progreso, completado, rechazado)
- **smartContract**: Dirección placeholder del contrato inteligente
- **oráculo**: Identificador del oráculo blockchain

#### Usando los Datos en Desarrollo
```typescript
// Importar datos de ejemplo
import { seedData, companiesSeed, projectsSeed } from '@/data/seed';

// Usar en componentes
const { companies, projects } = seedData;

// Filtrar por sector
const energyCompanies = companies.filter(c => c.sector.includes('Energía'));

// Buscar proyectos por estado
const activeProjects = projects.filter(p => p.estadoFinanciacion === 'en_progreso');
```

## ⚙️ Scripts Disponibles

### Desarrollo
```bash
npm run dev          # Servidor desarrollo (localhost:3000)
npm run build        # Build para producción
npm run start        # Ejecutar build de producción
npm run lint         # Linter ESLint + Prettier
npm run type-check   # Verificación TypeScript
```

### Base de Datos
```bash
npm run db:generate  # Generar migraciones
npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Cargar datos de ejemplo
npm run db:reset     # Limpiar y reinicializar
npm run db:studio    # Abrir Prisma Studio
```

### Testing
```bash
npm run test         # Tests unitarios
npm run test:e2e     # Tests end-to-end
npm run test:watch   # Tests en modo watch
npm run coverage     # Reporte de cobertura
```

## 🗂️ Estructura del Proyecto
```
3sn-rsc-portal/
├── src/
│   ├── app/              # App Router (Next.js 14)
│   ├── components/       # Componentes reutilizables
│   ├── lib/             # Utilidades y configuración
│   ├── data/            # 📊 Seed data y fixtures
│   │   └── seed.ts      # Datos de ejemplo para desarrollo
│   ├── styles/          # Estilos globales
│   └── types/           # Tipos TypeScript
├── public/              # Assets estáticos
├── prisma/              # Schema y migraciones DB
├── tests/               # Tests unitarios y e2e
└── docs/                # Documentación adicional
```

## 🎯 Roadmap

### Fase 1: Fundación ✅
- [x] Setup inicial del proyecto
- [x] Diseño de UI/UX base
- [x] Estructura de base de datos
- [x] Autenticación básica
- [x] **Seed data con empresas y proyectos de ejemplo**

### Fase 2: Core Features 🚧
- [ ] Sistema de proyectos completo
- [ ] Dashboard para empresas
- [ ] Panel para ONGDs
- [ ] Búsqueda y filtros avanzados
- [ ] Sistema de notificaciones

### Fase 3: Blockchain 🔜
- [ ] Integración con smart contracts
- [ ] Sistema de custodia de fondos
- [ ] Oráculos para verificación
- [ ] Notificaciones en tiempo real
- [ ] API pública para terceros

### Fase 4: Escalabilidad 🌍
- [ ] Multi-idioma
- [ ] Múltiples blockchains
- [ ] Integraciones ERP empresariales
- [ ] App móvil

## 🤝 Cómo Colaborar

### Desarrolladores
1. **Fork** del repositorio
2. Crear **branch** por feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** con mensajes descriptivos: `git commit -m 'Agregar búsqueda por geolocalizzación'`
4. **Push** al branch: `git push origin feature/nueva-funcionalidad`
5. Crear **Pull Request** con descripción detallada

### Reportar Issues
- Usar las plantillas de GitHub Issues
- Incluir capturas de pantalla si es visual
- Especificar navegador y versión
- Pasos para reproducir el problema

### Documentación
- Documentar nuevas APIs en `/docs`
- Actualizar README con cambios importantes
- Comentar código complejo
- Incluir ejemplos de uso

## 🔒 Seguridad

### Smart Contracts
- Auditorías regulares por terceros
- Tests exhaustivos con 100% cobertura
- Actualizaciones graduales con timelock
- Multi-sig para funciones críticas

### Datos Personales
- Cumplimiento GDPR/LOPD
- Encriptación end-to-end
- Logs anonimizados
- Acceso mínimo privilegiado

## 📄 Licencia
**MIT License** - Ver archivo [LICENSE](LICENSE) para detalles.

## 📨 Contacto
- **Proyecto**: [3SN RSC Portal](https://github.com/u7616739472-oss/3sn-rsc-portal)
- **Issues**: [GitHub Issues](https://github.com/u7616739472-oss/3sn-rsc-portal/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/u7616739472-oss/3sn-rsc-portal/discussions)

---
<div align="center">
  <strong>Transformando la RSC a través de la tecnología blockchain y la transparencia</strong>
</div>
<div align="center">
  <sub>Construido con ❤️ por desarrolladores comprometidos con el impacto social</sub>
</div>
