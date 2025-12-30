'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = AuthService.login(email, password);

      if (!result) {
        setError('Email ou senha inválidos');
        setLoading(false);
        return;
      }

      // Redirect based on role
      if (result.user.role === 'admin') {
        router.push('/dashboard-admin');
      } else {
        router.push('/dashboard-client');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mb-4">
            <span className="text-3xl font-bold text-white">C4</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">C4TS</h1>
          <p className="text-gray-600 mt-2">Sistema de Gerenciamento de Projetos</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="••••••"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            Entrar
          </Button>
        </form>

        {/* Demo users info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">Usuários de demonstração:</p>
          <div className="space-y-2 text-xs">
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="font-semibold text-purple-900">Administradores:</p>
              <p className="text-purple-700">luis@c4ts.com / 123456</p>
              <p className="text-purple-700">pedro@c4ts.com / 123456</p>
              <p className="text-purple-700">nicholas@c4ts.com / 123456</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="font-semibold text-green-900">Cliente:</p>
              <p className="text-green-700">naka@cliente.com / 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
