import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium';
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const { data, error } = await supabase
          .from('users')
          .select('id, email, name, plan, avatar_url')
          .eq('id', userId)
          .maybeSingle();

        if (data && !error) {
          setUser(data);
        } else {
          localStorage.removeItem('userId');
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error || !users) {
        return { error: 'Email ou senha incorretos' };
      }

      const bcrypt = await import('bcryptjs');
      const isValid = await bcrypt.compare(password, users.password_hash);

      if (!isValid) {
        return { error: 'Email ou senha incorretos' };
      }

      const userData: User = {
        id: users.id,
        email: users.email,
        name: users.name,
        plan: users.plan,
        avatar_url: users.avatar_url,
      };

      setUser(userData);
      localStorage.setItem('userId', users.id);
      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'Erro ao fazer login. Tente novamente.' };
    }
  }

  async function signUp(email: string, password: string, name: string) {
    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingUser) {
        return { error: 'Este email já está cadastrado' };
      }

      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, 10);

      const { data: newUser, error } = await supabase
        .from('users')
        .insert({
          email,
          name,
          password_hash: hashedPassword,
          plan: 'free',
        })
        .select('id, email, name, plan, avatar_url')
        .single();

      if (error || !newUser) {
        return { error: 'Erro ao criar conta. Tente novamente.' };
      }

      const userData: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        plan: newUser.plan,
        avatar_url: newUser.avatar_url,
      };

      setUser(userData);
      localStorage.setItem('userId', newUser.id);
      return {};
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: 'Erro ao criar conta. Tente novamente.' };
    }
  }

  async function signOut() {
    setUser(null);
    localStorage.removeItem('userId');
  }

  async function updateProfile(data: Partial<User>) {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);

      if (error) {
        return { error: 'Erro ao atualizar perfil' };
      }

      setUser({ ...user, ...data });
      return {};
    } catch (error) {
      console.error('Update profile error:', error);
      return { error: 'Erro ao atualizar perfil' };
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
