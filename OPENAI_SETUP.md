# Configuração da API OpenAI para NotaFácil

## ⚠️ IMPORTANTE: Próximos Passos

O app está totalmente funcional, mas você precisa configurar sua chave da API OpenAI para que a análise de notas fiscais funcione.

## Como Configurar

### Passo 1: Obtenha sua API Key

1. Acesse [https://platform.openai.com/api/keys](https://platform.openai.com/api/keys)
2. Faça login com sua conta
3. Clique em "Create new secret key"
4. **Copie e guarde a chave** (ela não pode ser recuperada depois)

### Passo 2: Configure no Supabase

Você precisa adicionar essa chave como um "Secret" no Supabase Edge Functions.

#### Opção A: Via Dashboard Supabase (Recomendado)

1. Abra o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto "NotaFácil"
3. Vá para **Edge Functions** (no menu lateral esquerdo)
4. Clique na function **analyze-nota**
5. Na parte superior, clique em **Settings**
6. Em **Secrets**, clique em "Add secret"
7. Preencha:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Cole sua chave da API OpenAI
8. Clique em "Add"

#### Opção B: Via CLI (Alternativa)

```bash
# Instale ou atualize a CLI do Supabase
npm install -g supabase

# Faça login
supabase login

# Defina o secret
supabase secrets set OPENAI_API_KEY=sua_chave_aqui --project-id=igswkolloqdzjgwvsuxf
```

### Passo 3: Teste a Configuração

1. Faça login no app
2. Vá para "Minhas Notas"
3. Clique no botão flutuante para adicionar uma nova nota
4. Selecione ou fotografe uma nota fiscal legível
5. Clique em "Analisar Nota Fiscal"
6. Se tudo estiver correto, a IA analisará e extrairá os dados

## Troubleshooting

### "Error: imageUrl is required"
- Verifique se a imagem foi feita upload corretamente
- Tente novamente com uma foto mais clara

### "OPENAI_API_KEY not configured"
- Confirme que você adicionou o secret no Supabase
- Aguarde alguns minutos para a alteração ser propagada
- Tente fazer upload novamente

### "Error: 401 Unauthorized"
- Sua chave da API OpenAI pode estar inválida
- Verifique se copiou corretamente
- Gere uma nova chave se necessário

### "Error: 429 Rate Limited"
- Você atingiu o limite de requisições do OpenAI
- Aguarde alguns minutos antes de tentar novamente
- Considere atualizar seu plano OpenAI

### "Error: 503 Service Unavailable"
- O serviço OpenAI pode estar fora do ar
- Tente novamente em alguns minutos

## Limites de Uso

**Com $5 de crédito você consegue aproximadamente:**
- ~250-300 análises de notas simples
- ~100-150 análises de notas complexas com muitos itens

**Quanto custa cada análise?**
- Imagem simples: ~$0.01-0.02
- Imagem complexa: ~$0.03-0.05

## Monitoramento de Gastos

1. Acesse [https://platform.openai.com/account/billing/overview](https://platform.openai.com/account/billing/overview)
2. Você verá em tempo real quanto já gastou
3. Pode definir limites de gasto em **Billing Limits**

## Próximos Passos

Após configurar a API:

1. **Cadastre-se** - Criar uma conta no app
2. **Faça login** - Entre com suas credenciais
3. **Adicione notas** - Comece a fotografar/fazer upload de notas fiscais
4. **Explore o dashboard** - Veja suas análises e gastos

## Suporte

Se tiver problemas:
- Verifique o SETUP.md para mais informações
- Consulte os logs do Supabase Edge Functions
- Acesse [Documentação OpenAI](https://platform.openai.com/docs)
