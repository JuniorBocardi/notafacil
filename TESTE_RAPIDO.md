# ✅ Teste Rápido - NotaFácil

Siga este checklist para verificar se tudo está funcionando:

## 1️⃣ Ambiente Local

- [ ] Executar `npm run dev`
- [ ] Abrir http://localhost:5173 no navegador
- [ ] Ver a landing page carregando
- [ ] Não há erros no console

## 2️⃣ Autenticação

- [ ] Clicar em "Criar conta grátis"
- [ ] Preencher formulário de cadastro
- [ ] Senha mostra força (fraca/média/forte)
- [ ] Aceitar termos
- [ ] Clicar em "Criar Conta Grátis"
- [ ] Ser redirecionado para o dashboard
- [ ] Ver nome do usuário no header
- [ ] Clicar em avatar → menu dropdown
- [ ] Clicar em "Sair"
- [ ] Ser redirecionado para login
- [ ] Fazer login com as credenciais criadas

## 3️⃣ Dashboard

- [ ] Ver estatísticas (Total de Notas: 0)
- [ ] Ver gráfico de categorias vazio
- [ ] Ver mensagem "Nenhuma nota fiscal ainda"
- [ ] Botão "Adicionar Primeira Nota" funciona

## 4️⃣ Upload de Notas (PRECISA de API KEY)

- [ ] Ir para "Minhas Notas"
- [ ] Clicar no botão flutuante (câmera)
- [ ] Modal de upload aparece
- [ ] Pode fazer drag and drop
- [ ] Pode clicar em "Tirar Foto"
- [ ] Pode clicar em "Upload de Arquivo"
- [ ] Selecionar uma imagem (JPG, PNG)
- [ ] Preview mostra a imagem
- [ ] Clicar em "Analisar Nota Fiscal"
- [ ] Loader mostra (Analisando...)
- [ ] ✨ **Se tiver API key:** Nota é adicionada com dados extraídos
- [ ] ✨ **Se não tiver:** Erro "OPENAI_API_KEY not configured"

## 5️⃣ Filtros (Sem API Key, criar notas manualmente para teste)

- [ ] Ir para "Minhas Notas"
- [ ] Sidebar de filtros visível
- [ ] Dropdown "Período" funciona
- [ ] Checkboxes de categoria funcionam
- [ ] Input de busca funciona
- [ ] Dropdown de ordenação funciona
- [ ] Em mobile: botão "Filtros" abre drawer

## 6️⃣ Visualizações

- [ ] Grid view mostra cards
- [ ] Botão de grid selecionado (azul)
- [ ] Clicar em list mostra tabela
- [ ] Botão de list selecionado (azul)
- [ ] Clicar em grid volta para cards

## 7️⃣ Perfil

- [ ] Clicar em Avatar → Meu Perfil
- [ ] Ver dados do usuário
- [ ] Campo de nome editável
- [ ] Campo de email apenas leitura
- [ ] Botão "Salvar Alterações" funciona
- [ ] Mensagem de sucesso aparece

## 8️⃣ Plano

- [ ] Clicar em Avatar → Plano e Cobrança
- [ ] Ver card "Gratuito" e "Premium"
- [ ] Premium mostra como "Mais Popular"
- [ ] Botão de upgrade funciona
- [ ] Ver use do mês (progress bar)

## 9️⃣ Configurações

- [ ] Clicar em Avatar → Configurações
- [ ] Toggles de notificações funcionam
- [ ] Seleção de tema (Claro/Escuro/Automático)
- [ ] Idioma mostra "Português (BR)"

## 🔟 Responsividade Mobile

- [ ] Redimensionar para mobile (< 768px)
- [ ] Menu hambúrguer aparece
- [ ] Clicar em hamburger abre menu
- [ ] Links do menu funcionam
- [ ] Sidebar de filtros vira drawer
- [ ] Grid fica 1 coluna
- [ ] Modais adaptam ao tamanho

## ⚠️ Erros Comuns

### "Erro: imageUrl is required"
- Imagem não foi feita upload
- Tente novamente

### "OPENAI_API_KEY not configured"
- **ESPERADO** até você configurar a chave
- Veja `OPENAI_SETUP.md`

### Página em branco
- Abra DevTools (F12)
- Veja errors no console
- Verifique se o Supabase está acessível

### Erro 404 em Edge Functions
- Edge Function não foi deployada
- Execute: `supabase functions deploy analyze-nota`

## 🎯 Se Tudo Passou

Parabéns! ✨ Seu app está funcionando perfeitamente!

Próximo passo: Configure a chave da API OpenAI em `OPENAI_SETUP.md`

## 🐛 Se Algo Falhou

1. Verifique DevTools (F12) para errors
2. Verifique logs do Supabase
3. Leia `SETUP.md` para troubleshooting
4. Verifique variáveis de ambiente

## 📝 Notas

- Algumas funcionalidades precisam de dados (ex: filtros funcionam melhor com notas)
- Upload de notas requer API key da OpenAI
- Primeira carga pode ser lenta (primeiro build)
- LocalStorage pode precisar de limpeza: `localStorage.clear()`
