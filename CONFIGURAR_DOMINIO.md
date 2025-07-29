# 🌐 **CONFIGURAÇÃO DE DOMÍNIO PRÓPRIO - VELOTAX**

## 🎯 **OBJETIVO**
Configurar a intranet com domínio próprio (ex: `intranet.velotax.com.br`) e autenticação Google para e-mails corporativos.

---

## 📋 **PASSO 1: CONFIGURAR DOMÍNIO**

### **1.1 Registrar Domínio (se não tiver)**
- **Registrador recomendado**: GoDaddy, Namecheap, ou Registro.br
- **Domínio sugerido**: `intranet.velotax.com.br` ou `portal.velotax.com.br`

### **1.2 Configurar DNS**
Após registrar, configure os registros DNS:

```
Tipo: A
Nome: intranet (ou portal)
Valor: [IP do seu servidor]
TTL: 3600

Tipo: CNAME
Nome: www
Valor: intranet.velotax.com.br
TTL: 3600
```

---

## 🚀 **PASSO 2: HOSPEDAGEM**

### **Opção A: Vercel (Recomendado - Gratuito)**
1. **Criar conta**: https://vercel.com
2. **Conectar GitHub**: Importar repositório `intranet-velotax`
3. **Configurar domínio**:
   - Settings → Domains
   - Adicionar: `intranet.velotax.com.br`
   - Configurar DNS conforme instruções do Vercel

### **Opção B: Netlify (Alternativa)**
1. **Criar conta**: https://netlify.com
2. **Deploy**: Arrastar pasta do projeto
3. **Configurar domínio**: Site settings → Domain management

### **Opção C: Hostinger/GoDaddy (Hospedagem Tradicional)**
1. **Contratar plano** de hospedagem
2. **Fazer upload** dos arquivos via FTP
3. **Configurar domínio** no painel

---

## 🔐 **PASSO 3: AUTENTICAÇÃO GOOGLE**

### **3.1 Criar Projeto Google Cloud**
1. Acesse: https://console.cloud.google.com
2. **Criar projeto**: `velotax-intranet`
3. **Ativar APIs**:
   - Google+ API
   - Google Identity API

### **3.2 Configurar OAuth 2.0**
1. **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
2. **Application type**: Web application
3. **Authorized JavaScript origins**:
   ```
   https://intranet.velotax.com.br
   https://www.intranet.velotax.com.br
   ```
4. **Authorized redirect URIs**:
   ```
   https://intranet.velotax.com.br/login.html
   https://intranet.velotax.com.br/admin.html
   ```

### **3.3 Obter Client ID**
- Copie o **Client ID** gerado
- Substitua `YOUR_GOOGLE_CLIENT_ID` no arquivo `login.html`

---

## ⚙️ **PASSO 4: CONFIGURAR RESTRIÇÕES**

### **4.1 Restrição de Domínio**
O sistema já está configurado para aceitar apenas `@velotax.com.br`

### **4.2 Configurar Google Workspace (Opcional)**
Para maior segurança, configure no Google Workspace:
1. **Admin Console** → **Security** → **API Controls**
2. **Restrict API access** para domínio `velotax.com.br`

---

## 🔧 **PASSO 5: ATUALIZAR CÓDIGO**

### **5.1 Atualizar login.html**
Substitua `YOUR_GOOGLE_CLIENT_ID` pelo ID real:

```javascript
data-client_id="123456789-abcdefghijklmnop.apps.googleusercontent.com"
```

### **5.2 Configurar HTTPS**
Certifique-se de que o domínio use HTTPS (obrigatório para Google OAuth)

---

## 📱 **PASSO 6: TESTAR**

### **6.1 Teste de Acesso**
1. Acesse: `https://intranet.velotax.com.br`
2. Clique em "Entrar com Google"
3. Use e-mail `@velotax.com.br`
4. Verifique redirecionamento para admin ou intranet

### **6.2 Teste de Restrições**
1. Tente acessar com e-mail não corporativo
2. Verifique se é bloqueado
3. Teste criação de usuários via admin

---

## 🎯 **LINKS FINAIS**

### **Página Inicial**
```
https://intranet.velotax.com.br
```

### **Login Direto**
```
https://intranet.velotax.com.br/login.html
```

### **Painel Admin**
```
https://intranet.velotax.com.br/admin.html
```

### **Intranet**
```
https://intranet.velotax.com.br/intranet_simples.html
```

---

## 🔒 **SEGURANÇA**

### **Recomendações**
1. **HTTPS obrigatório**
2. **Backup regular** dos dados
3. **Monitoramento** de acessos
4. **Atualizações** de segurança

### **Credenciais Admin**
- **E-mail**: `admin@velotax.com.br`
- **Senha**: `admin123`
- **Google**: Use e-mail corporativo

---

## 📞 **SUPORTE**

### **Em caso de problemas:**
1. Verificar DNS (pode levar até 24h)
2. Confirmar HTTPS ativo
3. Verificar Google Client ID
4. Testar em navegador incógnito

### **Contatos:**
- **TI**: ti@velotax.com.br
- **Suporte**: suporte@velotax.com.br

---

## ✅ **CHECKLIST FINAL**

- [ ] Domínio registrado e configurado
- [ ] DNS propagado (verificar com `nslookup`)
- [ ] Hospedagem configurada
- [ ] Google OAuth configurado
- [ ] Client ID atualizado no código
- [ ] HTTPS ativo
- [ ] Teste de login funcionando
- [ ] Restrições de e-mail funcionando
- [ ] Painel admin acessível
- [ ] Criação de usuários funcionando

**🎉 Sistema pronto para uso corporativo!** 