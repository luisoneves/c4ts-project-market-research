import { MOCK_USERS } from './mockData';
import { User, AuthResponse } from '@/types';

const AUTH_TOKEN_KEY = 'c4ts_auth_token';
const AUTH_USER_KEY = 'c4ts_auth_user';

export class AuthService {
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

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userWithoutPassword));
    }

    return {
      token,
      user: userWithoutPassword
    };
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
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
}
