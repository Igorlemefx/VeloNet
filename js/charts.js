/* === VELOIGP CHARTS - VISUALIZAÇÕES E GRÁFICOS === */

// Configurações dos gráficos
const CHART_CONFIG = {
    cores: {
        primaria: "#0074E8",
        secundaria: "#42A5F5",
        sucesso: "#4CAF50",
        erro: "#F44336",
        alerta: "#FFC107",
        fundo: "#FFFFFF"
    },
    animacao: {
        duracao: 500,
        easing: "easeInOutQuart"
    },
    responsividade: true
};

// Classe para criação de gráficos
class VeloIGPChart {
    constructor(containerId, tipo, dados, opcoes = {}) {
        this.containerId = containerId;
        this.tipo = tipo;
        this.dados = dados;
        this.opcoes = { ...CHART_CONFIG, ...opcoes };
        this.chart = null;
        
        this.inicializar();
    }
    
    inicializar() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`❌ Container não encontrado: ${this.containerId}`);
            return;
        }
        
        this.criarGrafico();
        this.configurarAnimacoes();
        this.configurarResponsividade();
    }
    
    criarGrafico() {
        const container = document.getElementById(this.containerId);
        
        switch (this.tipo) {
            case 'linha':
                this.criarGraficoLinha(container);
                break;
            case 'barra':
                this.criarGraficoBarra(container);
                break;
            case 'pizza':
                this.criarGraficoPizza(container);
                break;
            case 'area':
                this.criarGraficoArea(container);
                break;
            default:
                this.criarGraficoPadrao(container);
        }
    }
    
    criarGraficoLinha(container) {
        // Implementar gráfico de linha usando Chart.js ou similar
        container.innerHTML = `
            <div class="chart-container">
                <canvas id="${this.containerId}_canvas"></canvas>
            </div>
        `;
        
        // Aqui você pode integrar com Chart.js, D3.js ou outra biblioteca
        this.criarChartJS('line');
    }
    
    criarGraficoBarra(container) {
        container.innerHTML = `
            <div class="chart-container">
                <canvas id="${this.containerId}_canvas"></canvas>
            </div>
        `;
        
        this.criarChartJS('bar');
    }
    
    criarGraficoPizza(container) {
        container.innerHTML = `
            <div class="chart-container">
                <canvas id="${this.containerId}_canvas"></canvas>
            </div>
        `;
        
        this.criarChartJS('doughnut');
    }
    
    criarGraficoArea(container) {
        container.innerHTML = `
            <div class="chart-container">
                <canvas id="${this.containerId}_canvas"></canvas>
            </div>
        `;
        
        this.criarChartJS('line', { fill: true });
    }
    
    criarChartJS(tipo, opcoesAdicionais = {}) {
        const canvas = document.getElementById(`${this.containerId}_canvas`);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Configuração básica do Chart.js
        const config = {
            type: tipo,
            data: this.prepararDadosChartJS(),
            options: {
                responsive: this.opcoes.responsividade,
                animation: {
                    duration: this.opcoes.animacao.duracao,
                    easing: this.opcoes.animacao.easing
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: tipo !== 'doughnut' ? {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Período'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Valor'
                        }
                    }
                } : {},
                ...opcoesAdicionais
            }
        };
        
        // Aqui você criaria o gráfico real com Chart.js
        // this.chart = new Chart(ctx, config);
        
        // Por enquanto, vamos criar um placeholder visual
        this.criarPlaceholderVisual(canvas);
    }
    
    prepararDadosChartJS() {
        // Converter dados para formato do Chart.js
        if (!this.dados || !Array.isArray(this.dados)) {
            return {
                labels: ['Sem dados'],
                datasets: [{
                    label: 'Valor',
                    data: [0],
                    backgroundColor: this.opcoes.cores.primaria,
                    borderColor: this.opcoes.cores.secundaria,
                    borderWidth: 2
                }]
            };
        }
        
        const labels = this.dados.map(item => item.label || item.data || 'Item');
        const valores = this.dados.map(item => item.value || item.valor || 0);
        
        return {
            labels: labels,
            datasets: [{
                label: this.opcoes.label || 'Dados',
                data: valores,
                backgroundColor: this.opcoes.cores.primaria,
                borderColor: this.opcoes.cores.secundaria,
                borderWidth: 2,
                fill: this.opcoes.fill || false
            }]
        };
    }
    
    criarPlaceholderVisual(canvas) {
        // Criar um placeholder visual enquanto não temos Chart.js
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Desenhar um gráfico simples
        ctx.fillStyle = this.opcoes.cores.fundo;
        ctx.fillRect(0, 0, width, height);
        
        ctx.strokeStyle = this.opcoes.cores.primaria;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        // Desenhar linha simples
        const pontos = this.dados && this.dados.length > 0 ? 
            this.dados.length : 5;
        
        for (let i = 0; i < pontos; i++) {
            const x = (i / (pontos - 1)) * width;
            const y = height - (Math.random() * 0.8 + 0.1) * height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Adicionar texto
        ctx.fillStyle = this.opcoes.cores.primaria;
        ctx.font = '16px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Gráfico ${this.tipo} - ${this.opcoes.label || 'Dados'}`, width / 2, height / 2);
    }
    
    configurarAnimacoes() {
        // Configurar animações personalizadas
        const container = document.getElementById(this.containerId);
        if (container) {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                container.style.transition = `all ${this.opcoes.animacao.duracao}ms ease`;
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    configurarResponsividade() {
        if (!this.opcoes.responsividade) return;
        
        const container = document.getElementById(this.containerId);
        if (container) {
            container.style.width = '100%';
            container.style.height = 'auto';
            container.style.minHeight = '300px';
        }
    }
    
    atualizarDados(novosDados) {
        this.dados = novosDados;
        if (this.chart) {
            // Atualizar dados do gráfico real
            // this.chart.data = this.prepararDadosChartJS();
            // this.chart.update();
        } else {
            // Recriar placeholder
            this.criarGrafico();
        }
    }
}

// Funções utilitárias para criação de gráficos
function criarGrafico(dados, tipoGrafico, containerId, opcoes = {}) {
    return new VeloIGPChart(containerId, tipoGrafico, dados, opcoes);
}

function criarGraficoVolume(dados, containerId) {
    return criarGrafico(dados, 'barra', containerId, {
        label: 'Volume de Ligações',
        cores: {
            primaria: "#0074E8",
            secundaria: "#42A5F5"
        }
    });
}

function criarGraficoTMA(dados, containerId) {
    return criarGrafico(dados, 'linha', containerId, {
        label: 'Tempo Médio de Atendimento',
        cores: {
            primaria: "#4CAF50",
            secundaria: "#81C784"
        }
    });
}

function criarGraficoMTE(dados, containerId) {
    return criarGrafico(dados, 'linha', containerId, {
        label: 'Tempo Médio de Espera',
        cores: {
            primaria: "#FFC107",
            secundaria: "#FFD54F"
        }
    });
}

function criarGraficoSatisfacao(dados, containerId) {
    return criarGrafico(dados, 'pizza', containerId, {
        label: 'Satisfação do Cliente',
        cores: {
            primaria: "#9C27B0",
            secundaria: "#BA68C8"
        }
    });
}

// Funções de layout e grid
function montarLayout() {
    const app = document.getElementById('app');
    if (app) {
        app.classList.add('grid-layout-flexivel');
    }
}

function aplicarEspacamento(espacamento = '16px') {
    document.documentElement.style.setProperty('--espacamento-padrao', espacamento);
}

function usarTipografia(fonte = 'Poppins') {
    document.documentElement.style.setProperty('--font-family-principal', `'${fonte}', sans-serif`);
}

// Funções de tema
function alternarTema() {
    const body = document.body;
    const temaAtual = body.classList.contains('tema-escuro') ? 'tema-claro' : 'tema-escuro';
    
    body.classList.remove('tema-claro', 'tema-escuro');
    body.classList.add(temaAtual);
    
    // Salvar preferência
    localStorage.setItem('veloigp-tema', temaAtual);
    
    console.log(`🎨 Tema alterado para: ${temaAtual}`);
}

function carregarTemaSalvo() {
    const temaSalvo = localStorage.getItem('veloigp-tema') || 'tema-claro';
    document.body.classList.add(temaSalvo);
    console.log(`🎨 Tema carregado: ${temaSalvo}`);
}

// Funções de loading e estados
function mostrarLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="loading-skeleton">
                <div class="skeleton-header"></div>
                <div class="skeleton-content"></div>
                <div class="skeleton-footer"></div>
            </div>
        `;
    }
}

function esconderLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        const skeleton = container.querySelector('.loading-skeleton');
        if (skeleton) {
            skeleton.remove();
        }
    }
}

// Funções de mensagens
function mostrarMensagemErro(texto, containerId = 'mensagens') {
    const container = document.getElementById(containerId) || document.body;
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem erro';
    mensagem.innerHTML = `
        <span class="icon">❌</span>
        <span class="texto">${texto}</span>
    `;
    
    container.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.remove();
    }, 5000);
}

function mostrarMensagemSucesso(texto, containerId = 'mensagens') {
    const container = document.getElementById(containerId) || document.body;
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem sucesso';
    mensagem.innerHTML = `
        <span class="icon">✅</span>
        <span class="texto">${texto}</span>
    `;
    
    container.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.remove();
    }, 3000);
}

// Exportar funções para uso global
window.VeloIGP_Charts = {
    criarGrafico,
    criarGraficoVolume,
    criarGraficoTMA,
    criarGraficoMTE,
    criarGraficoSatisfacao,
    montarLayout,
    aplicarEspacamento,
    usarTipografia,
    alternarTema,
    carregarTemaSalvo,
    mostrarLoading,
    esconderLoading,
    mostrarMensagemErro,
    mostrarMensagemSucesso
};

console.log('📊 VeloIGP Charts carregado com sucesso!');
