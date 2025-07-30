// Configuração das APIs fictícias para o VeloNet
// Este arquivo será substituído pelas APIs reais quando implementadas

const API_CONFIG = {
    // URLs base das APIs (fictícias por enquanto)
    BASE_URL: 'https://api.velotax.com.br/v1',
    
    // Endpoints para métricas de atendimento
    ENDPOINTS: {
        // Dashboard de Atendimento
        DASHBOARD_DIARIO: '/dashboard/diario',
        DASHBOARD_MENSAL: '/dashboard/mensal',
        ATENDIMENTOS_TELEFONE: '/atendimentos/telefone',
        ATENDIMENTOS_TICKETS: '/atendimentos/tickets',
        SATISFACAO: '/metricas/satisfacao',
        TMA: '/metricas/tma',
        PAUSAS: '/metricas/pausas',
        MONITORIA: '/metricas/monitoria',
        
        // Menu Principal
        NOTICIAS: '/noticias',
        PROCESSOS: '/processos',
        PONTO: '/ponto',
        DESEMPENHO: '/desempenho'
    },
    
    // Dados fictícios para desenvolvimento
    MOCK_DATA: {
        // Atendimentos do Dia
        atendimentosDia: {
            telefone: 47,
            tickets: 23,
            satisfacao: 4.8,
            tma: '3:45',
            pausas: {
                almoco: '1:00',
                treinamento: '0:30',
                feedback: '0:15'
            },
            monitoria: {
                gravadas: 12,
                pendentes: 3,
                score: 8.5
            }
        },
        
        // Atendimentos do Mês
        atendimentosMes: {
            total: 1247,
            satisfacao: 4.7,
            tma: '4:12',
            posicao: 3,
            ranking: 'Top 10%'
        },
        
        // Notícias
        noticias: [
            {
                id: 1,
                titulo: 'Nova Política de Atendimento',
                descricao: 'Implementamos novas diretrizes para melhorar a qualidade do atendimento ao cliente.',
                data: '2025-01-15',
                autor: 'RH',
                categoria: 'Importante'
            },
            {
                id: 2,
                titulo: 'Treinamento de Produtos',
                descricao: 'Novo módulo de treinamento sobre produtos disponível na plataforma.',
                data: '2025-01-14',
                autor: 'Treinamentos',
                categoria: 'Novo'
            },
            {
                id: 3,
                titulo: 'Manutenção do Sistema',
                descricao: 'Sistema ficará indisponível das 02:00 às 04:00 para manutenção.',
                data: '2025-01-13',
                autor: 'TI',
                categoria: 'Aviso'
            }
        ],
        
        // Processos
        processos: [
            {
                id: 1,
                nome: 'Processo de Atendimento',
                descricao: 'Fluxo completo do atendimento ao cliente',
                responsavel: 'Gabriel',
                categoria: 'Atendimento'
            },
            {
                id: 2,
                nome: 'Escalação de Problemas',
                descricao: 'Como escalar problemas complexos',
                responsavel: 'Gabriel',
                categoria: 'Suporte'
            },
            {
                id: 3,
                nome: 'Gestão de Qualidade',
                descricao: 'Controle de qualidade do atendimento',
                responsavel: 'Gabriel',
                categoria: 'Qualidade'
            },
            {
                id: 4,
                nome: 'Procedimentos de Emergência',
                descricao: 'Protocolos para situações críticas',
                responsavel: 'Gabriel',
                categoria: 'Emergência'
            }
        ],
        
        // Ponto Eletrônico
        ponto: {
            status: 'Presente',
            entrada: '08:00',
            horasHoje: '6h 45min',
            horasSemana: '32h 15min',
            horasMes: '145h 30min',
            historico: [
                { data: '15/01', tipo: 'Entrada', hora: '08:00' },
                { data: '15/01', tipo: 'Pausa', hora: '12:00 - 13:00' },
                { data: '14/01', tipo: 'Saída', hora: '17:30' }
            ]
        }
    }
};

// Função para simular chamadas de API
async function fetchAPI(endpoint, options = {}) {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Retorna dados fictícios baseados no endpoint
    switch(endpoint) {
        case API_CONFIG.ENDPOINTS.DASHBOARD_DIARIO:
            return API_CONFIG.MOCK_DATA.atendimentosDia;
            
        case API_CONFIG.ENDPOINTS.DASHBOARD_MENSAL:
            return API_CONFIG.MOCK_DATA.atendimentosMes;
            
        case API_CONFIG.ENDPOINTS.NOTICIAS:
            return API_CONFIG.MOCK_DATA.noticias;
            
        case API_CONFIG.ENDPOINTS.PROCESSOS:
            return API_CONFIG.MOCK_DATA.processos;
            
        case API_CONFIG.ENDPOINTS.PONTO:
            return API_CONFIG.MOCK_DATA.ponto;
            
        default:
            throw new Error(`Endpoint não encontrado: ${endpoint}`);
    }
}

// Função para atualizar dados em tempo real
function startRealTimeUpdates(callback, interval = 30000) {
    setInterval(async () => {
        try {
            const data = await fetchAPI(API_CONFIG.ENDPOINTS.DASHBOARD_DIARIO);
            callback(data);
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
        }
    }, interval);
}

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, fetchAPI, startRealTimeUpdates };
} 