# Sistema de Autenticación y Registro - 3SN Portal

## Resumen

El portal 3SN implementa un sistema completo de autenticación y registro para ONGDs (Organizaciones No Gubernamentales de Desarrollo) utilizando **Supabase Auth** con soporte para múltiples proveedores SSO.

## Flujos Implementados

### 1. Registro de Nueva ONGD (`/privado/registro`)

**Proceso en 2 pasos:**

#### Paso 1: Datos del Administrador
- Nombre completo
- Email corporativo
- Contraseña (mínimo 8 caracteres)
- Confirmación de contraseña

#### Paso 2: Datos de la Organización
- Nombre de la ONGD *
- NIF/CIF *
- Tamaño (micro, pequeña, mediana, grande)
- Sector *
- Ubicación
- Teléfono
- Website
- Descripción

**Tras completar el registro:**
1. Se crea la cuenta de usuario en Supabase Auth
2. Se crea el registro en la tabla `ongds`
3. Se asocia el usuario con la ONGD en `usuarios_ongd` con rol `admin`
4. Redirección automática al dashboard privado

### 2. Login (`/privado/login`)

**Métodos de autenticación disponibles:**

1. **Google Workspace (OAuth)**
   - Login con cuenta corporativa de Google
   - Configuración en Supabase Dashboard

2. **Microsoft Entra ID (OAuth)**
   - Antes Azure AD
   - Login con cuenta corporativa de Microsoft
   - Configuración en Supabase Dashboard

3. **Email + Contraseña**
   - Login tradicional
   - Contraseñas hashadas con bcrypt

4. **Magic Link**
   - Link de acceso enviado por email
   - Sin contraseña
   - Válido por tiempo limitado

5. **AWS IAM**
   - Requiere configuración por administrador
   - Para organizaciones que usan AWS

## Arquitectura

### Base de Datos (Supabase)

```sql
-- Tabla de ONGDs
ongds (
  id UUID PRIMARY KEY,
  nombre TEXT,
  nif TEXT UNIQUE,
  descripcion TEXT,
  sector TEXT,
  google_workspace_domain TEXT,  -- Para SSO Google
  azure_tenant_id TEXT,           -- Para SSO Microsoft
  aws_account_id TEXT,            -- Para SSO AWS
  ...
)

-- Relación usuarios-ongd
usuarios_ongd (
  id UUID PRIMARY KEY,
  ongd_id UUID REFERENCES ongds(id),
  user_id UUID REFERENCES auth.users(id),
  rol TEXT CHECK (rol IN ('admin', 'gestor', 'lector')),
  sso_provider TEXT,  -- 'google', 'azure', 'aws', 'email'
  ...
)
```

### Row Level Security (RLS)

Todas las tablas tienen políticas RLS que garantizan:
- Usuarios solo ven datos de su ONGD
- Solo admins y gestores pueden crear/modificar proyectos
- Separación total entre organizaciones

## Configuración

### Variables de Entorno

Copia `.env.local.example` a `.env.local` y configura:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# OpenAI (para IA Marco Lógico)
OPENAI_API_KEY=sk-your-api-key-here
```

### Configurar SSO en Supabase

1. **Google Workspace:**
   - Dashboard → Authentication → Providers → Google
   - Añadir Client ID y Client Secret de Google Cloud Console
   - Configurar redirect URI: `https://your-project.supabase.co/auth/v1/callback`

2. **Microsoft Entra ID:**
   - Dashboard → Authentication → Providers → Azure
   - Añadir Client ID y Client Secret de Azure Portal
   - Configurar redirect URI

3. **AWS IAM:**
   - Requiere SAML configuration
   - Contactar con el equipo de 3SN para setup

## Roles y Permisos

### Admin
- Gestión completa de la ONGD
- Crear/editar/eliminar proyectos
- Gestionar usuarios
- Configurar integraciones SSO

### Gestor
- Crear y editar proyectos
- Ver todos los proyectos de la ONGD
- No puede gestionar usuarios

### Lector
- Solo lectura
- Ver proyectos de la ONGD
- No puede crear ni modificar

## Seguridad

### Implementado
- ✅ Contraseñas hashadas (bcrypt)
- ✅ Row Level Security (RLS)
- ✅ OAuth 2.0 para SSO
- ✅ Email verification
- ✅ Session management con Supabase
- ✅ HTTPS only (Vercel)
- ✅ Rate limiting (Supabase built-in)

### Pendiente
- ⏳ 2FA (Two-Factor Authentication)
- ⏳ Audit logs
- ⏳ IP whitelisting para SSO empresarial

## Flujo de Usuario

```
1. Usuario visita 3sn-rsc-portal.vercel.app
   ↓
2. Click en "Panel ONGD" en navbar
   ↓
3. Redirige a /privado/login
   ↓
4a. Si ya tiene cuenta → Login con método preferido → Dashboard
4b. Si no tiene cuenta → Click "Registrar mi ONGD" → Formulario 2 pasos → Dashboard
   ↓
5. Dashboard privado (/privado)
   - Ver proyectos
   - Crear nuevo proyecto con Marco Lógico + IA
   - Gestionar financiación
   - Ver evidencias en blockchain
```

## Testing Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar Supabase:**
   - Crear proyecto en supabase.com
   - Ejecutar `supabase/schema.sql` en SQL Editor
   - Copiar URL y Anon Key a `.env.local`

3. **Iniciar dev server:**
   ```bash
   npm run dev
   ```

4. **Probar registro:**
   - Ir a http://localhost:3000/privado/registro
   - Completar formulario
   - Verificar email en Supabase Dashboard → Authentication → Users

## Troubleshooting

### "Email no confirmado"
- En desarrollo: desactivar email confirmation en Supabase
- Dashboard → Authentication → Settings → Email Auth → Disable "Confirm email"

### "OAuth redirect mismatch"
- Verificar que la redirect URI en el provider coincida con Supabase
- Formato: `https://[PROJECT-REF].supabase.co/auth/v1/callback`

### "Row Level Security policy violation"
- Verificar que el usuario esté asociado a una ONGD en `usuarios_ongd`
- Verificar que las políticas RLS estén creadas correctamente

## Recursos

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js App Router Auth](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [OAuth 2.0 Spec](https://oauth.net/2/)
- [Marco Lógico ONU](https://www.un.org/sustainabledevelopment/es/objetivos-de-desarrollo-sostenible/)
