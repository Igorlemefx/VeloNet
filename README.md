# 🏢 **INTRANET VELOTAX - PORTAL CORPORATIVO**

Sistema completo de intranet corporativa com autenticação Google, painel administrativo e gestão de usuários.

## 🚀 **FUNCIONALIDADES**

### **🔐 Autenticação Segura**
- ✅ **Login Google** com restrição para @velotax.com.br
- ✅ **Login tradicional** com e-mail e senha
- ✅ **Painel administrativo** para gestão de usuários
- ✅ **Sistema de cargos** (Admin, Gerente, Colaborador)
- ✅ **Logs de atividade** e auditoria

### **📊 Dashboard Principal**
- ✅ **Métricas em tempo real**
- ✅ **Gráficos de desempenho**
- ✅ **Notícias da empresa**
- ✅ **Acesso rápido** às funcionalidades

### **📚 Sistema de Treinamentos**
- ✅ **Módulos educativos** com explicações
- ✅ **Quizzes interativos**
- ✅ **Sistema de certificação**
- ✅ **Progresso individual**
- ✅ **Ranking de colaboradores**

### **📞 Atendimento B2C**
- ✅ **Manual completo** de atendimento
- ✅ **Procedimentos** padronizados
- ✅ **Tom, voz e estilo** corporativo
- ✅ **Vídeos tutoriais** integrados

### **👥 Gestão de Usuários**
- ✅ **Criar/editar** colaboradores
- ✅ **Ativar/desativar** contas
- ✅ **Definir cargos** e permissões
- ✅ **Monitorar** acessos

---

## 🛠 **TECNOLOGIAS**

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **UI Framework**: Tailwind CSS
- **Ícones**: Font Awesome
- **Fontes**: Google Fonts (Inter)
- **Autenticação**: Google OAuth 2.0
- **Gráficos**: Chart.js
- **Armazenamento**: LocalStorage (client-side)

---

## 📁 **ESTRUTURA DO PROJETO**

```
intranet-velotax/
├── 📄 index.html              # Página inicial
├── 🔐 login.html              # Sistema de login
├── 🏠 intranet_simples.html   # Intranet principal
├── 👨‍💼 admin.html             # Painel administrativo
├── 📚 treinamentos_nova.html  # Sistema de treinamentos
├── 📖 base_conhecimento.html  # Base de conhecimentos
├── 📋 README.md               # Documentação principal
├── 🌐 CONFIGURAR_DOMINIO.md   # Guia de configuração
└── 📁 docs/                   # Documentação adicional
```

---

## 🚀 **COMO EXECUTAR**

### **1. Local (Desenvolvimento)**
```bash
# Abrir no navegador
start index.html
```

### **2. Online (Produção)**
```
https://intranet.velotax.com.br
```

---

## 🔐 **ACESSO E CREDENCIAIS**

### **Administradores**
- **E-mail**: `admin@velotax.com.br`
- **Senha**: `admin123`
- **Google**: Use e-mail corporativo

### **Usuários Padrão**
- **E-mail**: `colaborador@velotax.com.br`
- **Senha**: `velotax2025`
- **Google**: Use e-mail corporativo

### **Restrições**
- ✅ Apenas e-mails `@velotax.com.br`
- ✅ Autenticação Google obrigatória
- ✅ Controle de acesso por cargo

---

## 📊 **FUNCIONALIDADES POR CARGO**

### **👑 Administrador**
- ✅ Gestão completa de usuários
- ✅ Criação de cargos e permissões
- ✅ Visualização de logs
- ✅ Acesso a todas as funcionalidades

### **👔 Gerente**
- ✅ Gestão de conteúdo
- ✅ Visualização de relatórios
- ✅ Acesso aos treinamentos
- ✅ Monitoramento de equipe

### **👤 Colaborador**
- ✅ Acesso à intranet
- ✅ Participação em treinamentos
- ✅ Visualização de notícias
- ✅ Acesso à base de conhecimentos

---

## 🌐 **CONFIGURAÇÃO DE DOMÍNIO**

### **Domínio Sugerido**
```
https://intranet.velotax.com.br
```

### **Hospedagem Recomendada**
- **Vercel** (Gratuito)
- **Netlify** (Gratuito)
- **Hostinger** (Pago)

### **Autenticação Google**
- ✅ OAuth 2.0 configurado
- ✅ Restrição de domínio
- ✅ HTTPS obrigatório

---

## 📱 **RESPONSIVIDADE**

- ✅ **Desktop** (1920x1080+)
- ✅ **Tablet** (768px+)
- ✅ **Mobile** (375px+)
- ✅ **Navegação touch** otimizada

---

## 🎨 **DESIGN**

- ✅ **Interface moderna** e profissional
- ✅ **Cores corporativas** Velotax
- ✅ **Animações suaves**
- ✅ **UX otimizada**
- ✅ **Acessibilidade** (WCAG 2.1)

---

## 📚 **DOCUMENTAÇÃO**

### **Guias Disponíveis**
- 📖 [Guia Inicial](docs/guia_inicial.md)
- 🌐 [Configurar Domínio](CONFIGURAR_DOMINIO.md)
- 📋 [README Intranet](README_INTRANET.md)
- 🎓 [README Treinamentos](README_TREINAMENTOS.md)

### **Vídeos Tutoriais**
- 📹 [Procedimentos B2C](https://youtube.com/playlist?list=...)
- 📹 [Manual de Atendimento](https://youtube.com/watch?v=...)

---

## 🔧 **CONFIGURAÇÃO AVANÇADA**

### **Google OAuth**
1. Criar projeto no Google Cloud
2. Configurar OAuth 2.0
3. Atualizar Client ID no `login.html`

### **Domínio Próprio**
1. Registrar domínio
2. Configurar DNS
3. Deploy na hospedagem
4. Configurar HTTPS

### **Backup e Segurança**
- ✅ Backup automático dos dados
- ✅ Logs de auditoria
- ✅ Controle de versão (Git)
- ✅ Monitoramento de acessos

---

## 🚨 **SUPORTE E MANUTENÇÃO**

### **Contatos**
- **TI**: ti@velotax.com.br
- **Suporte**: suporte@velotax.com.br
- **Admin**: admin@velotax.com.br

### **Problemas Comuns**
1. **Erro 404**: Verificar configuração DNS
2. **Login falha**: Verificar Google OAuth
3. **Acesso negado**: Verificar e-mail corporativo
4. **Gráficos não carregam**: Verificar JavaScript

---

## 📈 **ROADMAP**

### **Próximas Funcionalidades**
- 🔄 **Sincronização** com Google Workspace
- 📧 **Notificações** por e-mail
- 📱 **App mobile** nativo
- 🤖 **Chatbot** de suporte
- 📊 **Analytics** avançado

---

## 📄 **LICENÇA**

Este projeto é propriedade da **Velotax** e destinado ao uso interno corporativo.

---

## 🤝 **CONTRIBUIÇÃO**

Para contribuir com o projeto:
1. Fazer fork do repositório
2. Criar branch para feature
3. Fazer commit das mudanças
4. Abrir Pull Request

---

**🎉 Sistema desenvolvido com foco em usabilidade, segurança e performance!** 