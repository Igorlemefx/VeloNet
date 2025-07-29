# 🔐 **CONFIGURAR AUTENTICAÇÃO GOOGLE - GITHUB PAGES**

## 🎯 **OBJETIVO**
Configurar autenticação Google para a intranet hospedada no GitHub Pages, sem necessidade de domínio próprio.

---

## 📋 **PASSO 1: CONFIGURAR GOOGLE CLOUD**

### **1.1 Criar Projeto**
1. Acesse: https://console.cloud.google.com
2. **Criar projeto**: `velotax-velonet`
3. **Selecionar projeto** criado

### **1.2 Ativar APIs**
1. **APIs & Services** → **Library**
2. **Buscar e ativar**:
   - `Google+ API`
   - `Google Identity API`

### **1.3 Configurar OAuth 2.0**
1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **OAuth 2.0 Client IDs**
3. **Application type**: Web application
4. **Name**: `Velotax VeloNet - GitHub Pages`

### **1.4 Configurar URLs (IMPORTANTE)**
**Authorized JavaScript origins**:
```
https://Velotax.github.io
https://www.Velotax.github.io
```

**Authorized redirect URIs**:
```
https://Velotax.github.io/VeloNet/
https://Velotax.github.io/VeloNet/login.html
https://Velotax.github.io/VeloNet/admin.html
```

### **1.5 Obter Client ID**
- Copie o **Client ID** gerado
- Formato: `123456789-abcdefghijklmnop.apps.googleusercontent.com`

---

## 🔧 **PASSO 2: ATUALIZAR CÓDIGO**

### **2.1 Atualizar login.html**
Substitua `YOUR_GOOGLE_CLIENT_ID` pelo ID real:

```html
<div id="g_id_onload"
     data-client_id="123456789-abcdefghijklmnop.apps.googleusercontent.com"
     data-callback="handleCredentialResponse"
     data-auto_prompt="false">
</div>
```

### **2.2 Verificar Restrições**
O código já está configurado para aceitar apenas `@velotax.com.br`

---

## 🚀 **PASSO 3: TESTAR**

### **3.1 Acessar Intranet**
```
https://Velotax.github.io/VeloNet/
```

### **3.2 Testar Login Google**
1. Clique em "Entrar com Google"
2. Use e-mail `@velotax.com.br`
3. Verifique redirecionamento

### **3.3 Testar Restrições**
1. Tente com e-mail não corporativo
2. Verifique se é bloqueado

---

## 🔗 **LINKS DE ACESSO**

### **Página Inicial**
```
https://Velotax.github.io/VeloNet/
```

### **Login Direto**
```
https://Velotax.github.io/VeloNet/login.html
```

### **Painel Admin**
```
https://Velotax.github.io/VeloNet/admin.html
```

### **Intranet**
```
https://Velotax.github.io/VeloNet/intranet_simples.html
```

---

## 👥 **CREDENCIAIS PARA COMPARTILHAR**

### **Administradores**
- **E-mail**: `admin@velotax.com.br`
- **Senha**: `admin123`
- **Google**: Use e-mail corporativo

### **Usuários Padrão**
- **E-mail**: `colaborador@velotax.com.br`
- **Senha**: `velotax2025`
- **Google**: Use e-mail corporativo

### **Criar Novos Usuários**
1. Acesse o **Painel Admin**
2. Use credenciais de administrador
3. **Adicionar Usuário** com e-mail `@velotax.com.br`

---

## 📱 **MENSAGEM PARA COMPARTILHAR**

```
🔐 VELONET - PORTAL CORPORATIVO VELOTAX

🔗 Link de Acesso: https://Velotax.github.io/VeloNet/

🔑 Credenciais:
- E-mail: seu.email@velotax.com.br
- Senha: velotax2025
- OU: Clique em "Entrar com Google"

📋 Funcionalidades:
✅ Dashboard com métricas
✅ Sistema de treinamentos
✅ Procedimentos B2C
✅ Painel administrativo
✅ Gestão de usuários

⚠️ Acesso restrito a colaboradores @velotax.com.br
```

---

## 🚨 **PROBLEMAS COMUNS**

### **Erro: "popup_closed_by_user"**
- **Causa**: Popup bloqueado pelo navegador
- **Solução**: Permitir popups para o domínio

### **Erro: "access_denied"**
- **Causa**: E-mail não autorizado
- **Solução**: Usar apenas `@velotax.com.br`

### **Erro: "invalid_client"**
- **Causa**: Client ID incorreto
- **Solução**: Verificar configuração no Google Cloud

### **Erro: "redirect_uri_mismatch"**
- **Causa**: URLs não configuradas corretamente
- **Solução**: Verificar Authorized redirect URIs

---

## ✅ **CHECKLIST FINAL**

- [ ] Projeto Google Cloud criado
- [ ] APIs ativadas (Google+, Identity)
- [ ] OAuth 2.0 configurado
- [ ] URLs do GitHub Pages adicionadas
- [ ] Client ID copiado
- [ ] Código atualizado com Client ID
- [ ] Teste de login funcionando
- [ ] Restrições de e-mail funcionando
- [ ] Painel admin acessível
- [ ] Criação de usuários funcionando

---

## 🔒 **SEGURANÇA**

### **Recomendações**
1. **HTTPS ativo** (GitHub Pages já fornece)
2. **Restrição de domínio** configurada
3. **Logs de acesso** habilitados
4. **Backup regular** dos dados

### **Monitoramento**
- Verificar logs no painel admin
- Monitorar acessos não autorizados
- Revisar usuários ativos periodicamente

---

## 📞 **SUPORTE**

### **Em caso de problemas:**
1. Verificar configuração Google Cloud
2. Confirmar Client ID correto
3. Testar em navegador incógnito
4. Verificar console do navegador

### **Contatos:**
- **TI**: ti@velotax.com.br
- **Suporte**: suporte@velotax.com.br
- **Admin**: admin@velotax.com.br

---

**🎉 Sistema pronto para uso com autenticação Google!** 