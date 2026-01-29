"use client";

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function AuthStatus() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await getSession();
      setSession(currentSession);
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  if (!session) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Non connecté</h3>
        <p className="text-yellow-700 text-sm mb-3">
          Vous devez être connecté pour accéder aux fonctionnalités d'administration.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-semibold text-green-800 mb-2">Connecté</h3>
      <p className="text-green-700 text-sm">
        Email: {session.user?.email}
      </p>
      <p className="text-green-700 text-sm">
        Token: {session.accessToken ? 'Présent' : 'Absent'}
      </p>
    </div>
  );
}











