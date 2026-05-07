'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';import Link from 'next/link';

export default function RegistroPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Datos del usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombreContacto, setNombreContacto] = useState('');

  // Datos de la ONGD
  const [nombreONG, setNombreONG] = useState('');
  const [nif, setNif] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [sector, setSector] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [website, setWebsite] = useState('');
  const [tamano, setTamano] = useState<'micro' | 'pequena' | 'mediana' | 'grande'>('pequena');

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Crear cuenta de usuario
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre: nombreContacto,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError('Error al crear la cuenta');
        setLoading(false);
        return;
      }

      // 2. Crear registro de ONGD
      const { data: ongdData, error: ongdError } = await supabase
        .from('ongds')
        .insert({
          nombre: nombreONG,
          nif,
          descripcion,
          sector,
          ubicacion,
          telefono,
          website,
          tamano,
          email_contacto: email,
          activa: true,
        })
        .select()
        .single();

      if (ongdError) {
        setError('Error al registrar la ONGD: ' + ongdError.message);
        setLoading(false);
        return;
      }

      // 3. Asociar usuario con ONGD como admin
      const { error: usuarioError } = await supabase.from('usuarios_ongd').insert({
        ongd_id: ongdData.id,
        user_id: authData.user.id,
        rol: 'admin',
        nombre: nombreContacto,
        email,
        sso_provider: 'email',
        activo: true,
      });

      if (usuarioError) {
        setError('Error al asociar usuario: ' + usuarioError.message);
        setLoading(false);
        return;
      }

      // Éxito - redireccionar
      router.push('/privado?registro=exitoso');
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white text-2xl mx-auto mb-4">
            3N
          </div>
          <h1 className="text-2xl font-bold text-white">Registra tu ONGD en 3SN</h1>
          <p className="text-gray-400 mt-1">Únete a la red de impacto social verificado</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    paso >= s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 2 && <div className={`flex-1 h-0.5 mx-2 ${paso > s ? 'bg-blue-600' : 'bg-gray-800'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className={`text-xs ${paso >= 1 ? 'text-white' : 'text-gray-500'}`}>Datos usuario</span>
            <span className={`text-xs ${paso >= 2 ? 'text-white' : 'text-gray-500'}`}>Datos ONGD</span>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <form onSubmit={paso === 2 ? handleRegistro : (e) => e.preventDefault()}>
            {/* Paso 1: Datos de Usuario */}
            {paso === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">👤 Datos del Administrador</h2>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    value={nombreContacto}
                    onChange={(e) => setNombreContacto(e.target.value)}
                    required
                    placeholder="Juan Pérez"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Email corporativo</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="contacto@miongd.org"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Confirmar contraseña</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repite tu contraseña"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (nombreContacto && email && password && password === confirmPassword && password.length >= 8) {
                      setPaso(2);
                    } else {
                      setError('Completa todos los campos correctamente');
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
                >
                  Siguiente: Datos de la ONGD →
                </button>
              </div>
            )}

            {/* Paso 2: Datos de la ONGD */}
            {paso === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">🏛️ Datos de la Organización</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-300 mb-2">Nombre de la ONGD *</label>
                    <input
                      type="text"
                      value={nombreONG}
                      onChange={(e) => setNombreONG(e.target.value)}
                      required
                      placeholder="Fundación Esperanza Global"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">NIF/CIF *</label>
                    <input
                      type="text"
                      value={nif}
                      onChange={(e) => setNif(e.target.value)}
                      required
                      placeholder="G12345678"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Tamaño</label>
                    <select
                      value={tamano}
                      onChange={(e) => setTamano(e.target.value as any)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    >
                      <option value="micro">Micro (1-2 personas)</option>
                      <option value="pequena">Pequeña (3-10 personas)</option>
                      <option value="mediana">Mediana (11-50 personas)</option>
                      <option value="grande">Grande (50+ personas)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Sector *</label>
                    <input
                      type="text"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      required
                      placeholder="Educación, Salud, Medio Ambiente..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Ubicación</label>
                    <input
                      type="text"
                      value={ubicacion}
                      onChange={(e) => setUbicacion(e.target.value)}
                      placeholder="Madrid, España"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+34 900 000 000"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://www.miongd.org"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-300 mb-2">Descripción</label>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      rows={3}
                      placeholder="Describe la misión y actividades principales de tu organización..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-800 rounded-lg px-4 py-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPaso(1)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    ← Volver
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !nombreONG || !nif || !sector}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    {loading ? '✨ Creando cuenta...' : '✅ Completar Registro'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/privado/login" className="text-blue-400 hover:text-blue-300">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
