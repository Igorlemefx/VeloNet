/* === VELOIGP APP.JS === */

console.log('🚀 VeloIGP iniciando...');

// Estado da aplicação
let currentUser = null;
let currentSection = 'overview';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    console.log('✅ VeloIGP carregado com sucesso!');
});

// Função principal de inicialização
function initializeApp() {
    setupNavigation();
    setupAuthentication();
    loadMetrics();
}

// Configuração da navegação
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.dataset.section;
            navigateToSection(section);
        });
    });
}

// Navegação entre seções
function navigateToSection(section) {
    // Remover classe active de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar classe active ao botão clicado
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Esconder todas as seções
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    document.getElementById(section).classList.add('active');
    
    currentSection = section;
    
    // Carregar dados específicos da seção
    loadSectionData(section);
}

// Configuração da autenticação
function setupAuthentication() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleGoogleLogin);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Verificar se já está logado
    checkAuthStatus();
}

// Simulação de login com Google
function handleGoogleLogin() {
    console.log('🔐 Iniciando login com Google...');
    
    // Simular processo de login
    showNotification('🔐 Conectando com Google...', 'info');
    
    setTimeout(() => {
        // Simular usuário logado
        currentUser = {
            name: 'João Silva',
            email: 'joao.silva@velotax.com.br',
            avatar: 'https://ui-avatars.com/api/?name=João+Silva&background=1634FF&color=fff'
        };
        
        updateAuthUI();
        showNotification('✅ Login realizado com sucesso!', 'success');
        
        // Carregar dados do usuário
        loadUserData();
    }, 2000);
}

// Função de logout
function handleLogout() {
    currentUser = null;
    updateAuthUI();
    showNotification('👋 Logout realizado com sucesso!', 'info');
}

// Verificar status da autenticação
function checkAuthStatus() {
    // Aqui você pode verificar tokens salvos, cookies, etc.
    // Por enquanto, sempre começa deslogado
    updateAuthUI();
}

// Atualizar interface de autenticação
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        loginBtn.classList.add('hidden');
        userInfo.classList.remove('hidden');
        userName.textContent = currentUser.name;
    } else {
        loginBtn.classList.remove('hidden');
        userInfo.classList.add('hidden');
    }
}

// Carregar métricas iniciais
function loadMetrics() {
    console.log('📊 Carregando métricas...');
    
    // Simular carregamento de dados
    setTimeout(() => {
        updateMetrics();
    }, 1000);
}

// Atualizar métricas
function updateMetrics() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach((card, index) => {
        // Simular animação de carregamento
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Carregar dados específicos da seção
function loadSectionData(section) {
    console.log(`📂 Carregando dados da seção: ${section}`);
    
    switch(section) {
        case 'overview':
            loadOverviewData();
            break;
        case 'performance':
            loadPerformanceData();
            break;
        case 'metrics':
            loadDetailedMetrics();
            break;
        case 'realtime':
            loadRealtimeData();
            break;
        case 'spreadsheets':
            loadSpreadsheetData();
            break;
        case 'reports':
            loadReportsData();
            break;
    }
}

// Carregar dados da visão geral
function loadOverviewData() {
    // Dados já estão no HTML
    console.log('📊 Dados da visão geral carregados');
}

// Carregar dados de performance
function loadPerformanceData() {
    const content = document.getElementById('performance');
    content.innerHTML = `
        <h2>🎯 Análise de Performance</h2>
        <div class="performance-grid">
            <div class="performance-card">
                <h3>📈 Tendência Mensal</h3>
                <div class="chart-placeholder">Gráfico de performance será exibido aqui</div>
            </div>
            <div class="performance-card">
                <h3>🎯 KPIs Principais</h3>
                <ul>
                    <li>Produtividade: 87.5%</li>
                    <li>Eficiência: 92.1%</li>
                    <li>Qualidade: 89.3%</li>
                </ul>
            </div>
        </div>
    `;
}

// Carregar métricas detalhadas
function loadDetailedMetrics() {
    const content = document.getElementById('metrics');
    content.innerHTML = `
        <h2>📊 Métricas Detalhadas</h2>
        <div class="metrics-detail">
            <p>Métricas detalhadas de produtividade serão carregadas via API.</p>
            <div class="api-status">Status: Conectando...</div>
        </div>
    `;
}

// Carregar dados em tempo real
function loadRealtimeData() {
    const content = document.getElementById('realtime');
    content.innerHTML = `
        <h2>⚡ Consulta em Tempo Real</h2>
        <div class="realtime-dashboard">
            <div class="api-connection">
                <span class="status-dot"></span>
                API Status: Conectado
            </div>
            <div class="data-stream">
                <h3>Fluxo de Dados</h3>
                <div class="stream-item">📊 Produtividade: 87.5%</div>
                <div class="stream-item">⏰ Eficiência: 92.1%</div>
                <div class="stream-item">🎯 Metas: 78.9%</div>
            </div>
        </div>
    `;
}

// Carregar dados de planilhas
function loadSpreadsheetData() {
    const content = document.getElementById('spreadsheets');
    content.innerHTML = `
        <h2>📋 Consulta de Planilhas</h2>
        <div class="spreadsheet-interface">
            <div class="file-selector">
                <h3>Selecionar Planilha</h3>
                <select class="spreadsheet-select">
                    <option>Produtividade_Q1_2024.xlsx</option>
                    <option>Métricas_Mensais.xlsx</option>
                    <option>KPIs_Trimestrais.xlsx</option>
                </select>
            </div>
            <div class="data-preview">
                <h3>Prévia dos Dados</h3>
                <div class="table-placeholder">Tabela de dados será exibida aqui</div>
            </div>
        </div>
    `;
}

// Carregar dados de relatórios
function loadReportsData() {
    const content = document.getElementById('reports');
    content.innerHTML = `
        <h2>📄 Relatórios</h2>
        <div class="reports-interface">
            <div class="report-generator">
                <h3>Gerar Relatório</h3>
                <button class="generate-btn">📊 Gerar Relatório de Produtividade</button>
            </div>
            <div class="reports-list">
                <h3>Relatórios Disponíveis</h3>
                <ul>
                    <li>📈 Relatório Mensal - Março 2024</li>
                    <li>🎯 Relatório de KPIs - Q1 2024</li>
                    <li>📊 Análise de Performance - Fevereiro 2024</li>
                </ul>
            </div>
        </div>
    `;
}

// Carregar dados do usuário
function loadUserData() {
    console.log('👤 Carregando dados do usuário:', currentUser.name);
    // Aqui você pode carregar dados específicos do usuário logado
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '🔔';
    
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-message">${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#15A237' : type === 'error' ? '#FCC200' : '#1634FF'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Adicionar CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .performance-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .performance-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 2rem;
    }
    
    .chart-placeholder {
        background: rgba(255, 255, 255, 0.1);
        height: 200px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.6);
        margin-top: 1rem;
    }
    
    .api-status {
        background: rgba(22, 148, 255, 0.2);
        color: var(--primary-light-blue);
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
    }
    
    .status-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #15A237;
        border-radius: 50%;
        margin-right: 0.5rem;
    }
    
    .generate-btn {
        background: var(--primary-bright-blue);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .generate-btn:hover {
        background: var(--primary-light-blue);
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);
