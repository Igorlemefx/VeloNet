/* === VELONET MAIN.JS === */

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 VeloNet iniciando...');
    
    // Simular carregamento
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        
        // Inicializar componentes
        initSidebar();
        initHeader();
        initContent();
        
        console.log('✅ VeloNet carregado com sucesso!');
    }, 2000);
});

// Inicializar Sidebar
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
        <div class="p-6">
            <h2 class="text-2xl font-bold mb-6">VeloNet</h2>
            <nav class="space-y-2">
                <button class="menu-item w-full text-left p-3 rounded-lg hover:bg-blue-500/20">
                    🏠 Dashboard
                </button>
                <button class="menu-item w-full text-left p-3 rounded-lg hover:bg-blue-500/20">
                    👥 Usuários
                </button>
                <button class="menu-item w-full text-left p-3 rounded-lg hover:bg-blue-500/20">
                    📊 Relatórios
                </button>
                <button class="menu-item w-full text-left p-3 rounded-lg hover:bg-blue-500/20">
                    ⚙️ Configurações
                </button>
            </nav>
        </div>
    `;
}

// Inicializar Header
function initHeader() {
    const header = document.getElementById('header');
    header.innerHTML = `
        <h1 class="text-2xl font-bold">Portal Corporativo VeloNet</h1>
        <div class="ml-auto flex items-center space-x-4">
            <span>👤 Admin</span>
            <button class="px-4 py-2 bg-red-600 rounded-lg">Sair</button>
        </div>
    `;
}

// Inicializar Content
function initContent() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
                <h3 class="text-xl font-bold mb-4">📊 Dashboard</h3>
                <p>Bem-vindo ao VeloNet!</p>
            </div>
            <div class="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
                <h3 class="text-xl font-bold mb-4">👥 Usuários</h3>
                <p>Gestão de colaboradores</p>
            </div>
            <div class="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
                <h3 class="text-xl font-bold mb-4">📈 Relatórios</h3>
                <p>Análises e métricas</p>
            </div>
        </div>
    `;
}
