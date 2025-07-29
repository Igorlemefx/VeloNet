# 🔧 Configurar GitHub Pages - Intranet Velotax

## 🚨 **ERRO 404 - SOLUÇÃO PASSO A PASSO**

### **Passo 1: Acessar o Repositório**
1. Vá para: https://github.com/Igorlemefx/intranet-velotax
2. Certifique-se de estar logado no GitHub

### **Passo 2: Configurar GitHub Pages**
1. **Clique em "Settings"** (aba superior)
2. **Role para baixo** até encontrar "Pages" no menu lateral esquerdo
3. **Clique em "Pages"**

### **Passo 3: Configurar Source**
1. Em **"Source"**, selecione **"Deploy from a branch"**
2. Em **"Branch"**, selecione **"main"**
3. Em **"Folder"**, selecione **"/(root)"**
4. **Clique em "Save"**

### **Passo 4: Aguardar Deploy**
1. Após salvar, aguarde alguns minutos
2. O GitHub vai mostrar uma mensagem: **"Your site is published at..."**
3. A URL será: `https://igorlemefx.github.io/intranet-velotax/`

### **Passo 5: Testar Acesso**
1. Acesse: https://igorlemefx.github.io/intranet-velotax/
2. Deve aparecer a página inicial da Velotax
3. Clique em "Acessar Intranet"
4. Use as credenciais:

## 🔐 **Credenciais de Acesso**

### **E-mails Autorizados (@velotax.com.br):**
- `suporte.manha@velotax.com.br` - Senha: `velotax2025`
- `admin@velotax.com.br` - Senha: `admin123`
- `igor@velotax.com.br` - Senha: `velotax2025`
- `teste@velotax.com.br` - Senha: `teste123`
- `suporte@velotax.com.br` - Senha: `velotax2025`
- `ti@velotax.com.br` - Senha: `velotax2025`
- `rh@velotax.com.br` - Senha: `velotax2025`
- `financeiro@velotax.com.br` - Senha: `velotax2025`

## 🚨 **Se Ainda Der Erro 404:**

### **Verificar se os arquivos estão no repositório:**
1. Vá para: https://github.com/Igorlemefx/intranet-velotax
2. Verifique se existe o arquivo `index.html` na raiz
3. Se não existir, execute estes comandos:

```bash
git add index.html login.html
git commit -m "Adicionar arquivos para GitHub Pages"
git push
```

### **Verificar Actions (se configurado):**
1. Vá para a aba **"Actions"** no repositório
2. Verifique se há workflows executando
3. Aguarde a conclusão do deploy

## 📱 **URLs de Acesso:**

### **Página Inicial:**
```
https://igorlemefx.github.io/intranet-velotax/
```

### **Login Direto:**
```
https://igorlemefx.github.io/intranet-velotax/login.html
```

### **Intranet Direta:**
```
https://igorlemefx.github.io/intranet-velotax/intranet_simples.html
```

## 🔧 **Troubleshooting:**

### **Se o GitHub Pages não aparecer:**
1. Verifique se o repositório é público ou você tem GitHub Pro
2. GitHub Pages gratuito só funciona com repositórios públicos

### **Se der erro de CORS:**
1. Use HTTPS sempre
2. Não acesse via IP, use o domínio do GitHub Pages

### **Se não carregar os estilos:**
1. Verifique a conexão com internet
2. Os estilos vêm do CDN do Tailwind CSS

## 📞 **Suporte:**

Se ainda tiver problemas, verifique:
1. Se todos os arquivos estão no repositório
2. Se o GitHub Pages está configurado corretamente
3. Se aguardou tempo suficiente para o deploy

---

**Após configurar, a intranet estará online e segura! 🚀** 