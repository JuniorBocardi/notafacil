# NotaFácil - Guia de Configuração

## Configuração da API do OpenAI

Para que a análise de notas fiscais funcione, você precisa configurar a chave da API do OpenAI.

### 1. Obter a Chave da API

1. Acesse [platform.openai.com](https://platform.openai.com)
2. Faça login ou crie uma conta
3. Vá para "API Keys" no menu lateral
4. Clique em "Create new secret key"
5. Copie a chave gerada

### 2. Configurar no Supabase

A chave da API do OpenAI deve ser configurada como uma variável de ambiente no Supabase Edge Functions.

**Via Dashboard do Supabase:**

1. Acesse seu projeto no Supabase
2. Vá para "Edge Functions" > "analyze-nota"
3. Clique em "Settings"
4. Em "Secrets", adicione:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Sua chave da API do OpenAI

**Via CLI (se aplicável):**

```bash
supabase secrets set OPENAI_API_KEY=seu_api_key_aqui
```

### 3. Variáveis de Ambiente Locais

Para desenvolvimento local, adicione ao arquivo `.env`:

```
VITE_SUPABASE_URL=https://igswkolloqdzjgwvsuxf.supabase.co
VITE_SUPABASE_ANON_KEY=seu_anon_key_aqui
OPENAI_API_KEY=seu_api_key_aqui
```

## Fluxo de Funcionamento

### 1. Cadastro
- Acesse a página de login
- Clique em "Criar conta grátis"
- Preencha os dados: nome, email, senha
- A conta é criada automaticamente

### 2. Login
- Acesse a página de login
- Digite email e senha
- Será redirecionado para o dashboard

### 3. Upload de Notas Fiscais
- Clique no botão flutuante "Nova Nota" ou vá para "Minhas Notas"
- Escolha fotografar ou fazer upload do arquivo (JPG, PNG ou PDF)
- A IA analisará automaticamente usando ChatGPT
- Os dados serão extraídos e salvos

### 4. Gerenciamento de Notas
- Na página "Minhas Notas":
  - Filtrar por período, categoria e valor
  - Visualizar detalhes completos
  - Marcar como favorito
  - Excluir notas

## Limites de Uso

### Plano Gratuito
- 10 análises por mês
- Armazenamento ilimitado
- Acesso básico ao dashboard

### Plano Premium
- Análises ilimitadas
- Recursos avançados
- Suporte prioritário

## Suporte

Se encontrar problemas com a API do OpenAI:

1. Verifique se a chave está corretamente configurada
2. Verifique se tem crédito suficiente na conta OpenAI
3. Verifique a qualidade da imagem da nota (deve estar legível)
4. Consulte os logs do Supabase Edge Functions

## Modelos de IA Suportados

Atualmente usando: **gpt-4-vision-preview**

Este modelo é capaz de:
- Reconhecer texto em imagens
- Extrair dados estruturados (preços, datas, nomes)
- Categorizar automaticamente
- Gerar insights financeiros
