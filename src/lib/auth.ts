import { MOCK_USERS } from './mockData';
import { User, AuthResponse } from '@/types';

const AUTH_TOKEN_KEY = 'c4ts_auth_token';
const AUTH_USER_KEY = 'c4ts_auth_user';

export class AuthService {
  /**
   * ✅ CORREÇÃO: Salva token em localStorage E cookie
   */
  static login(email: string, password: string): AuthResponse | null {
    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return null;
    }

    const token = btoa(`${user.id}:${Date.now()}`);
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Save to localStorage (client-side)
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userWithoutPassword));
      
      // ✅ CRÍTICO: Também salvar no cookie para o proxy.ts conseguir ler
      document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 dias
    }

    return {
      token,
      user: userWithoutPassword
    };
  }

  /**
   * ✅ CORREÇÃO: Limpa localStorage E cookie
   */
  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      
      // ✅ CRÍTICO: Limpar cookie também
      document.cookie = `${AUTH_TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }

  static getCurrentUser(): Omit<User, 'password'> | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem(AUTH_USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  static isClient(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'client';
  }
}
