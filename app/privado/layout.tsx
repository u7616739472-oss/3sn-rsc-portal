'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
export default function PrivadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/privado/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) router.push('/privado/login');
        else setUser(session.user);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-50">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <Link href="/privado" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">3N</div>
            <div>
              <div className="font-bold text-white text-sm">3SN Portal</div>
              <div className="text-xs text-gray-400">Area Privada ONGD</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/privado" icon="🏠" label="Dashboard" />
          <NavItem href="/privado/proyectos" icon="📁" label="Proyectos" />
          <NavItem href="/privado/proyectos/nuevo" icon="➕" label="Nuevo Proyecto" />
          <NavItem href="/privado/financiacion" icon="💰" label="Financiación" />
          <NavItem href="/privado/blockchain" icon="⛓️" label="Blockchain" />
          <NavItem href="/privado/configuracion" icon="⚙️" label="Configuración" />
        </nav>

        {/* SSO Info + Sign out */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-white truncate">{user?.email || 'Usuario'}</div>
              <div className="text-xs text-gray-500">Gestor</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded px-3 py-2 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 min-h-screen">
        {/* Top bar */}
        <div className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Bienvenido al Panel de Gestión —{' '}
            <span className="text-blue-400">3SN Red Social para el Cambio</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
            <span className="text-gray-400">Red 3SN-Simnet activa</span>
          </div>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
