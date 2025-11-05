import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          password_hash: string;
          plan: 'free' | 'premium';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      notas_fiscais: {
        Row: {
          id: string;
          user_id: string;
          image_url: string;
          pdf_url: string | null;
          thumbnail_url: string | null;
          estabelecimento: string;
          cnpj: string | null;
          endereco: string | null;
          telefone: string | null;
          valor_total: number;
          data_emissao: string;
          hora_emissao: string | null;
          numero_nota: string | null;
          categoria: string;
          status: 'processando' | 'processada' | 'erro';
          is_favorite: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notas_fiscais']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['notas_fiscais']['Insert']>;
      };
      itens_nota: {
        Row: {
          id: string;
          nota_fiscal_id: string;
          quantidade: number;
          descricao: string;
          valor_unitario: number;
          valor_total: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['itens_nota']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['itens_nota']['Insert']>;
      };
      insights_ia: {
        Row: {
          id: string;
          nota_fiscal_id: string;
          user_id: string;
          tipo_insight: 'economia' | 'alerta' | 'comparacao';
          mensagem: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['insights_ia']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['insights_ia']['Insert']>;
      };
    };
  };
};
