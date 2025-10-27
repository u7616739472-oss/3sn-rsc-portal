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

### Funcionalidades Blockchain
- **Custodia de Fondos**: Smart contracts auditados
- **Oráculos**: Verificación automática de hitos
- **Transparencia**: Transacciones públicas auditables
- **Automatización**: Liberación de fondos por cumplimiento de KPIs

## 🗺️ Estructura del Proyecto

```
3sn-rsc-portal/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing con buscador inteligente
│   │   ├── explicacion-3sn/
│   │   │   └── page.tsx                # Explicación visual de 3SN
│   │   ├── publicar-proyecto/
│   │   │   └── page.tsx                # Formulario para publicar proyectos
│   │   ├── financiacion/
│   │   │   └── page.tsx                # Listado de proyectos + blockchain
│   │   └── api/
│   │       ├── projects/              # CRUD de proyectos
│   │       ├── search/                # Búsqueda inteligente
│   │       └── blockchain/            # Integración smart contracts
│   ├── components/
│   │   ├── ui/                      # Componentes base (shadcn)
│   │   ├── SearchBar.tsx            # Buscador con sugerencias
│   │   ├── ProjectCard.tsx          # Tarjetas de proyectos
│   │   ├── BlockchainStatus.tsx     # Estado de custodia
│   │   └── FormModern.tsx           # Formularios modernos
│   ├── lib/
│   │   ├── blockchain.ts            # Utilidades Web3
│   │   ├── database.ts              # Queries DB
│   │   └── search.ts                # Lógica de búsqueda
│   └── types/
│       └── project.ts               # Tipos TypeScript
├── public/
│   ├── images/                    # Imágenes y assets
│   └── icons/                     # Iconografía
├── contracts/                     # Smart contracts Solidity
│   ├── ProjectCustody.sol         # Custodia de fondos
│   └── Oracle.sol                 # Oráculo de verificación
└── docs/                          # Documentación técnica
```

## 🛠️ Configuración de Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn
- PostgreSQL (local o Supabase)
- MetaMask o wallet compatible

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/u7616739472-oss/3sn-rsc-portal.git
cd 3sn-rsc-portal

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus claves

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno Requeridas
```env
# Base de datos
DATABASE_URL="postgresql://..."

# Blockchain
ETHEREUM_RPC_URL="https://..."
CONTRACT_ADDRESS="0x..."
PRIVATE_KEY="0x..."

# APIs externas
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

## 📝 Roadmap

### Fase 1: MVP 🏁
- [ ] Landing con buscador funcional
- [ ] Página explicativa de 3SN
- [ ] Formulario básico de publicación
- [ ] Lista estática de proyectos

### Fase 2: Integración Blockchain 🔗
- [ ] Smart contracts de custodia
- [ ] Oráculo de verificación
- [ ] Conexión con wallets
- [ ] Panel de transparencia

### Fase 3: Funcionalidades Avanzadas 🚀
- [ ] Sistema de reputación
- [ ] Analytics e informes
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
