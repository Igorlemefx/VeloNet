/* === VELOIGP APP.JS - INTEGRAÇÃO COM API 55PBX === */

console.log('🚀 VeloIGP iniciando com integração 55PBX...');

// Estado da aplicação
let currentUser = null;
let currentSection = 'overview';
let dadosAtuais = null;
let graficos = {};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    console.log('✅ VeloIGP carregado com sucesso!');
});

// Função principal de inicialização
function initializeApp() {
    setupNavigation();
    setupAuthentication();
    setupAPIIntegration();
    loadMetrics();
    setupThemeToggle();
    
    // Carregar tema salvo
    if (window.VeloIGP_Charts) {
        window.VeloIGP_Charts.carregarTemaSalvo();
    }
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
    document.querySelectorAll(`[data-section="${section}"]`).forEach(btn => {
        btn.classList.add('active');
    });
    
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
    if (window.VeloIGP_Charts) {
        window.VeloIGP_Charts.mostrarMensagemSucesso('🔐 Conectando com Google...');
    }
    
    setTimeout(() => {
        // Simular usuário logado
        currentUser = {
            name: 'João Silva',
            email: 'joao.silva@velotax.com.br',
            avatar: 'https://ui-avatars.com/api/?name=João+Silva&background=0074E8&color=fff'
        };
        
        updateAuthUI();
        if (window.VeloIGP_Charts) {
            window.VeloIGP_Charts.mostrarMensagemSucesso('✅ Login realizado com sucesso!');
        }
        
        // Carregar dados do usuário
        loadUserData();
    }, 2000);
}

// Função de logout
function handleLogout() {
    currentUser = null;
    updateAuthUI();
    if (window.VeloIGP_Charts) {
        window.VeloIGP_Charts.mostrarMensagemSucesso('👋 Logout realizado com sucesso!');
    }
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

// Configuração da integração com API
function setupAPIIntegration() {
    // Verificar se a API está disponível
    if (window.VeloIGP_API) {
        console.log('🔌 API 55PBX configurada e disponível');
        setupAPIControls();
    } else {
        console.warn('⚠️ API 55PBX não configurada');
    }
}

// Configurar controles da API
function setupAPIControls() {
    const refreshBtn = document.querySelector('.btn-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            atualizarDashboardComAPI();
        });
    }
    
    // Atualizar data atual
    atualizarDataAtual();
}

// Atualizar data atual
function atualizarDataAtual() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const hoje = new Date();
        const dataFormatada = hoje.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        dateElement.textContent = dataFormatada;
    }
}

// Atualizar dashboard com dados da API
async function atualizarDashboardComAPI() {
    if (!window.VeloIGP_API) {
        console.warn('⚠️ API não disponível');
        return;
    }
    
    try {
        // Mostrar loading
        if (window.VeloIGP_Charts) {
            window.VeloIGP_Charts.mostrarLoading('overview');
        }
        
        // Buscar dados dos últimos 7 dias
        const dataFim = window.VeloIGP_API.obterDataHoje();
        const dataInicio = new Date(dataFim);
        dataInicio.setDate(dataInicio.getDate() + window.VeloIGP_API.PERIODOS.ULTIMOS_7_DIAS);
        
        const dataInicioStr = window.VeloIGP_API.formatarDataParaAPI(dataInicio);
        const dataFimStr = window.VeloIGP_API.formatarDataParaAPI(dataFim);
        
        console.log('📊 Buscando dados de:', dataInicioStr, 'até', dataFimStr);
        
        const resultado = await window.VeloIGP_API.buscarRelatorioAPI(
            dataInicioStr, 
            dataFimStr, 
            'report_01'
        );
        
        if (resultado.sucesso && resultado.dados) {
            dadosAtuais = resultado.dados;
            const indicadores = window.VeloIGP_API.calcularIndicadores(resultado.dados);
            atualizarDashboardComIndicadores(indicadores);
            
            if (window.VeloIGP_Charts) {
                window.VeloIGP_Charts.mostrarMensagemSucesso('✅ Dados atualizados com sucesso!');
            }
        } else {
            throw new Error(resultado.erro || 'Erro desconhecido na API');
        }
        
    } catch (erro) {
        console.error('❌ Erro ao atualizar dashboard:', erro);
        
        if (window.VeloIGP_Charts) {
            window.VeloIGP_Charts.mostrarMensagemErro(`Erro ao carregar dados: ${erro.message}`);
        }
        
        // Carregar dados simulados em caso de erro
        carregarDadosSimulados();
        
    } finally {
        // Esconder loading
        if (window.VeloIGP_Charts) {
            window.VeloIGP_Charts.esconderLoading('overview');
        }
    }
}

// Atualizar dashboard com indicadores calculados
function atualizarDashboardComIndicadores(indicadores) {
    if (!indicadores) return;
    
    // Atualizar métricas principais
    atualizarMetrica('produtividade', indicadores.indice_qualidade);
    atualizarMetrica('eficiencia', indicadores.tma);
    atualizarMetrica('metas', indicadores.nota_satisfacao);
    
    // Criar gráficos se disponível
    if (window.VeloIGP_Charts) {
        criarGraficosDashboard(indicadores);
    }
}

// Atualizar métrica específica
function atualizarMetrica(tipo, valor) {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        if (card.classList.contains(tipo) || card.querySelector(`[data-metric="${tipo}"]`)) {
            const valueElement = card.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = `${valor}%`;
            }
            
            // Atualizar barra de progresso
            const progressBar = card.querySelector('.progress-fill');
            if (progressBar) {
                progressBar.style.width = `${valor}%`;
            }
        }
    });
}

// Criar gráficos do dashboard
function criarGraficosDashboard(indicadores) {
    // Dados simulados para gráficos (substituir por dados reais da API)
    const dadosGraficos = {
        volume: [
            { label: 'Segunda', valor: 85 },
            { label: 'Terça', valor: 92 },
            { label: 'Quarta', valor: 78 },
            { label: 'Quinta', valor: 88 },
            { label: 'Sexta', valor: 95 }
        ],
        tma: [
            { label: 'Segunda', valor: 3.2 },
            { label: 'Terça', valor: 2.8 },
            { label: 'Quarta', valor: 3.5 },
            { label: 'Quinta', valor: 2.9 },
            { label: 'Sexta', valor: 2.6 }
        ],
        satisfacao: [
            { label: 'Excelente', valor: 45 },
            { label: 'Bom', valor: 35 },
            { label: 'Regular', valor: 15 },
            { label: 'Ruim', valor: 5 }
        ]
    };
    
    // Criar gráficos
    if (window.VeloIGP_Charts) {
        graficos.volume = window.VeloIGP_Charts.criarGraficoVolume(dadosGraficos.volume, 'grafico-volume');
        graficos.tma = window.VeloIGP_Charts.criarGraficoTMA(dadosGraficos.tma, 'grafico-tma');
        graficos.satisfacao = window.VeloIGP_Charts.criarGraficoSatisfacao(dadosGraficos.satisfacao, 'grafico-satisfacao');
    }
}

// Carregar dados simulados
function carregarDadosSimulados() {
    const indicadoresSimulados = {
        indice_qualidade: 87.5,
        tma: 92.1,
        nota_satisfacao: 78.9
    };
    
    atualizarDashboardComIndicadores(indicadoresSimulados);
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
    console.log('📊 Dados da visão geral carregados');
    
    // Tentar carregar dados da API se disponível
    if (window.VeloIGP_API) {
        atualizarDashboardComAPI();
    }
}

// Carregar dados de performance
function loadPerformanceData() {
    const content = document.getElementById('performance');
    content.innerHTML = `
        <div class="section-header">
            <h2>Análise de Performance</h2>
            <p>Métricas detalhadas de performance e tendências</p>
        </div>
        <div class="performance-grid">
            <div class="performance-card">
                <h3>📈 Tendência Mensal</h3>
                <div id="grafico-tendencia" class="chart-placeholder">Gráfico de performance será exibido aqui</div>
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
    
    // Criar gráfico se disponível
    if (window.VeloIGP_Charts) {
        const dadosTendencia = [
            { label: 'Jan', valor: 75 },
            { label: 'Fev', valor: 82 },
            { label: 'Mar', valor: 87 },
            { label: 'Abr', valor: 91 }
        ];
        
        window.VeloIGP_Charts.criarGrafico(dadosTendencia, 'linha', 'grafico-tendencia', {
            label: 'Tendência Mensal'
        });
    }
}

// Carregar métricas detalhadas
function loadDetailedMetrics() {
    const content = document.getElementById('metrics');
    content.innerHTML = `
        <div class="section-header">
            <h2>Métricas Detalhadas</h2>
            <p>Análise profunda dos indicadores de produtividade</p>
        </div>
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
        <div class="section-header">
            <h2>Consulta em Tempo Real</h2>
            <p>Dados atualizados via API em tempo real</p>
        </div>
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
        <div class="section-header">
            <h2>Consulta de Planilhas</h2>
            <p>Integração com planilhas para análise de dados</p>
        </div>
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
        <div class="section-header">
            <h2>Relatórios</h2>
            <p>Geração e visualização de relatórios executivos</p>
        </div>
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

// Configurar toggle de tema
function setupThemeToggle() {
    // Adicionar botão de tema ao header se não existir
    const headerActions = document.querySelector('.header-actions');
    if (headerActions && !document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle btn-icon';
        themeToggle.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
        `;
        themeToggle.addEventListener('click', () => {
            if (window.VeloIGP_Charts) {
                window.VeloIGP_Charts.alternarTema();
            }
        });
        
        headerActions.appendChild(themeToggle);
    }
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
    
    // Cores mais sutis e profissionais
    const colors = {
        success: '#28A745',
        error: '#DC3545',
        info: '#007BFF'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
        gap: 1.5rem;
        margin-top: 2rem;
    }
    
    .performance-card {
        background: var(--primary-white);
        border: 1px solid var(--border-light);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: var(--shadow-sm);
    }
    
    .chart-placeholder {
        background: var(--primary-light-gray);
        height: 200px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-gray);
        margin-top: 1rem;
        border: 1px dashed var(--border-medium);
    }
    
    .api-status {
        background: rgba(0, 123, 255, 0.1);
        color: var(--primary-blue);
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        border: 1px solid rgba(0, 123, 255, 0.2);
    }
    
    .status-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #28A745;
        border-radius: 50%;
        margin-right: 0.5rem;
    }
    
    .generate-btn {
        background: var(--primary-blue);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-sm);
    }
    
    .generate-btn:hover {
        background: var(--primary-dark-blue);
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
    }
    
    .spreadsheet-select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-light);
        border-radius: 6px;
        font-family: 'Poppins', sans-serif;
        margin-top: 0.5rem;
    }
    
    .table-placeholder {
        background: var(--primary-light-gray);
        height: 150px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-gray);
        margin-top: 1rem;
        border: 1px dashed var(--border-medium);
    }
    
    .theme-toggle {
        background: var(--primary-light-gray);
        border: 1px solid var(--border-light);
        color: var(--primary-gray);
    }
    
    .theme-toggle:hover {
        background: var(--primary-blue);
        color: white;
    }
`;
document.head.appendChild(style);
