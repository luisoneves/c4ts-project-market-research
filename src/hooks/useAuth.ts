'use client';

import { useState, useEffect } from 'react';
import { AuthService } from '@/lib/auth';
import { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const logout = () => {
    AuthService.logout();
    setUser(null);
    window.location.href = '/login';
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isClient: user?.role === 'client',
    logout
  };
}
