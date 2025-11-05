/*
  # Create Authentication and Notes Management Schema

  ## Overview
  Complete database schema for NotaFácil authentication and fiscal notes management system.

  ## New Tables

  ### 1. `users` - User accounts
    - `id` (uuid, primary key) - User unique identifier
    - `email` (text, unique) - User email for login
    - `name` (text) - Full name
    - `password_hash` (text) - Hashed password
    - `plan` (text) - Subscription plan (free/premium)
    - `avatar_url` (text, nullable) - Profile picture URL
    - `created_at` (timestamptz) - Account creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `notas_fiscais` - Fiscal notes storage
    - `id` (uuid, primary key) - Note unique identifier
    - `user_id` (uuid, foreign key) - Owner of the note
    - `image_url` (text) - Original image storage path
    - `pdf_url` (text, nullable) - PDF version if available
    - `thumbnail_url` (text, nullable) - Thumbnail for list view
    - `estabelecimento` (text) - Store/establishment name
    - `cnpj` (text, nullable) - Business tax ID
    - `endereco` (text, nullable) - Store address
    - `telefone` (text, nullable) - Store phone
    - `valor_total` (decimal) - Total amount
    - `data_emissao` (date) - Emission date
    - `hora_emissao` (time, nullable) - Emission time
    - `numero_nota` (text, nullable) - Note number
    - `categoria` (text) - Category (alimentação, transporte, etc)
    - `status` (text) - Processing status (processando/processada/erro)
    - `is_favorite` (boolean) - Favorite flag
    - `created_at` (timestamptz) - Upload timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `itens_nota` - Items within each fiscal note
    - `id` (uuid, primary key) - Item unique identifier
    - `nota_fiscal_id` (uuid, foreign key) - Parent note
    - `quantidade` (decimal) - Quantity
    - `descricao` (text) - Item description
    - `valor_unitario` (decimal) - Unit price
    - `valor_total` (decimal) - Total price (quantity * unit price)
    - `created_at` (timestamptz) - Creation timestamp

  ### 4. `insights_ia` - AI-generated insights
    - `id` (uuid, primary key) - Insight unique identifier
    - `nota_fiscal_id` (uuid, foreign key) - Related note
    - `user_id` (uuid, foreign key) - User who owns the insight
    - `tipo_insight` (text) - Type (economia/alerta/comparacao)
    - `mensagem` (text) - Insight message
    - `created_at` (timestamptz) - Creation timestamp

  ### 5. `user_sessions` - Active user sessions
    - `id` (uuid, primary key) - Session unique identifier
    - `user_id` (uuid, foreign key) - Session owner
    - `device_info` (text, nullable) - Device information
    - `ip_address` (text, nullable) - IP address
    - `last_activity` (timestamptz) - Last activity timestamp
    - `created_at` (timestamptz) - Session creation timestamp

  ## Security

  All tables have Row Level Security (RLS) enabled with restrictive policies:
  
  1. **users table**: Users can only read/update their own profile
  2. **notas_fiscais table**: Users can only access their own notes
  3. **itens_nota table**: Users can only access items from their notes
  4. **insights_ia table**: Users can only access their own insights
  5. **user_sessions table**: Users can only access their own sessions

  ## Important Notes
  
  - All monetary values use DECIMAL(10,2) for precision
  - All foreign keys have ON DELETE CASCADE for data cleanup
  - Indexes added for frequently queried fields (user_id, categoria, data_emissao)
  - Default values set for timestamps, status, and plan fields
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  password_hash text NOT NULL,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notas_fiscais table
CREATE TABLE IF NOT EXISTS notas_fiscais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  pdf_url text,
  thumbnail_url text,
  estabelecimento text NOT NULL,
  cnpj text,
  endereco text,
  telefone text,
  valor_total decimal(10,2) NOT NULL,
  data_emissao date NOT NULL,
  hora_emissao time,
  numero_nota text,
  categoria text DEFAULT 'outros' CHECK (categoria IN ('alimentacao', 'transporte', 'casa', 'compras', 'saude', 'educacao', 'lazer', 'vestuario', 'beleza', 'pets', 'tecnologia', 'outros')),
  status text DEFAULT 'processando' CHECK (status IN ('processando', 'processada', 'erro')),
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create itens_nota table
CREATE TABLE IF NOT EXISTS itens_nota (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nota_fiscal_id uuid NOT NULL REFERENCES notas_fiscais(id) ON DELETE CASCADE,
  quantidade decimal(10,3) NOT NULL,
  descricao text NOT NULL,
  valor_unitario decimal(10,2) NOT NULL,
  valor_total decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create insights_ia table
CREATE TABLE IF NOT EXISTS insights_ia (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nota_fiscal_id uuid NOT NULL REFERENCES notas_fiscais(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tipo_insight text DEFAULT 'economia' CHECK (tipo_insight IN ('economia', 'alerta', 'comparacao')),
  mensagem text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_info text,
  ip_address text,
  last_activity timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_notas_user_id ON notas_fiscais(user_id);
CREATE INDEX IF NOT EXISTS idx_notas_categoria ON notas_fiscais(categoria);
CREATE INDEX IF NOT EXISTS idx_notas_data_emissao ON notas_fiscais(data_emissao DESC);
CREATE INDEX IF NOT EXISTS idx_itens_nota_fiscal_id ON itens_nota(nota_fiscal_id);
CREATE INDEX IF NOT EXISTS idx_insights_user_id ON insights_ia(user_id);
CREATE INDEX IF NOT EXISTS idx_insights_nota_id ON insights_ia(nota_fiscal_id);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notas_fiscais ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_nota ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights_ia ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for notas_fiscais table
CREATE POLICY "Users can view own notes"
  ON notas_fiscais FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON notas_fiscais FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON notas_fiscais FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON notas_fiscais FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for itens_nota table
CREATE POLICY "Users can view items from own notes"
  ON itens_nota FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM notas_fiscais
      WHERE notas_fiscais.id = itens_nota.nota_fiscal_id
      AND notas_fiscais.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert items to own notes"
  ON itens_nota FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM notas_fiscais
      WHERE notas_fiscais.id = itens_nota.nota_fiscal_id
      AND notas_fiscais.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items from own notes"
  ON itens_nota FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM notas_fiscais
      WHERE notas_fiscais.id = itens_nota.nota_fiscal_id
      AND notas_fiscais.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM notas_fiscais
      WHERE notas_fiscais.id = itens_nota.nota_fiscal_id
      AND notas_fiscais.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from own notes"
  ON itens_nota FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM notas_fiscais
      WHERE notas_fiscais.id = itens_nota.nota_fiscal_id
      AND notas_fiscais.user_id = auth.uid()
    )
  );

-- RLS Policies for insights_ia table
CREATE POLICY "Users can view own insights"
  ON insights_ia FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own insights"
  ON insights_ia FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own insights"
  ON insights_ia FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for user_sessions table
CREATE POLICY "Users can view own sessions"
  ON user_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON user_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON user_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
  ON user_sessions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notas_fiscais_updated_at
  BEFORE UPDATE ON notas_fiscais
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();