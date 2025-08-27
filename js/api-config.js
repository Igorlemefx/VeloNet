/* === VELOIGP API CONFIG - 55PBX INTEGRATION === */

// Configurações da API 55PBX
const API_55PBX_CONFIG = {
    BASE_URL: "https://reportapi02.55pbx.com:50500/api/",
    TOKEN: "seu_token_api_55pbx", // Substituir pelo token real
    ENDPOINTS: {
        METRICS: "pbx/reports/metrics/",
        QUEUES: "all_queues",
        NUMBERS: "all_numbers", 
        AGENTS: "all_agent"
    }
};

// Períodos padrão
const PERIODOS = {
    ULTIMOS_7_DIAS: -7,
    ULTIMOS_30_DIAS: -30,
    ULTIMOS_3_MESES: -90,
    ULTIMOS_6_MESES: -180
};

// Funções de utilidade para datas
function calcularIntervaloData(dias, dataReferencia = new Date()) {
    const data = new Date(dataReferencia);
    data.setDate(data.getDate() + dias);
    return data.toISOString().split('T')[0];
}

function formatarDataParaAPI(data) {
    return data.toISOString().split('T')[0];
}

function obterDataHoje() {
    return new Date();
}

// Funções de cabeçalho da API
function criarHeaders() {
    return {
        "Authorization": `Bearer ${API_55PBX_CONFIG.TOKEN}`,
        "Content-Type": "application/json"
    };
}

// Construção de URLs da API
function construirUrlRelatorio(dataInicio, dataFim, tipoRelatorio) {
    const { BASE_URL, ENDPOINTS } = API_55PBX_CONFIG;
    return `${BASE_URL}${ENDPOINTS.METRICS}${dataInicio}/${dataFim}/${ENDPOINTS.QUEUES}/${ENDPOINTS.NUMBERS}/${ENDPOINTS.AGENTS}/${tipoRelatorio}`;
}

// Função principal de busca na API
async function buscarRelatorioAPI(dataInicio, dataFim, tipoRelatorio = "report_01") {
    try {
        const url = construirUrlRelatorio(dataInicio, dataFim, tipoRelatorio);
        const headers = criarHeaders();
        
        console.log('🔍 Buscando relatório:', url);
        
        const resposta = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        
        if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        
        const dados = await resposta.json();
        console.log('✅ Dados recebidos:', dados);
        
        return {
            sucesso: true,
            dados: dados
        };
        
    } catch (erro) {
        console.error('❌ Erro na API:', erro);
        return {
            sucesso: false,
            erro: erro.message,
            dados: null
        };
    }
}

// Funções de processamento de dados
function calcularIndicadores(dados) {
    if (!dados || !Array.isArray(dados)) {
        console.warn('⚠️ Dados inválidos para cálculo de indicadores');
        return null;
    }
    
    try {
        const volumeLigacoes = dados.reduce((total, item) => total + (item.totalCallAttended || 0), 0);
        const tma = calcularMedia(dados, "averageCallTime");
        const mte = calcularMedia(dados, "averageWaitTime");
        const notaSatisfacao = obterNotaSatisfacao(dados);
        const indiceQualidade = calcularIndiceQualidade(dados);
        
        return {
            volume_ligacoes: volumeLigacoes,
            tma: tma,
            mte: mte,
            nota_satisfacao: notaSatisfacao,
            indice_qualidade: indiceQualidade,
            total_registros: dados.length
        };
        
    } catch (erro) {
        console.error('❌ Erro ao calcular indicadores:', erro);
        return null;
    }
}

function calcularMedia(dados, campo) {
    const valores = dados
        .map(item => item[campo])
        .filter(valor => valor !== null && valor !== undefined && !isNaN(valor));
    
    if (valores.length === 0) return 0;
    
    const soma = valores.reduce((total, valor) => total + valor, 0);
    return Math.round((soma / valores.length) * 100) / 100;
}

function obterNotaSatisfacao(dados) {
    // Implementar lógica específica para nota de satisfação
    const notas = dados
        .map(item => item.satisfactionScore || item.rating)
        .filter(nota => nota !== null && nota !== undefined);
    
    if (notas.length === 0) return 0;
    
    const media = notas.reduce((total, nota) => total + nota, 0) / notas.length;
    return Math.round(media * 100) / 100;
}

function calcularIndiceQualidade(dados) {
    // Implementar lógica para índice de qualidade baseado em múltiplos fatores
    const fatores = {
        tma: calcularMedia(dados, "averageCallTime"),
        mte: calcularMedia(dados, "averageWaitTime"),
        satisfacao: obterNotaSatisfacao(dados),
        resolucao: calcularTaxaResolucao(dados)
    };
    
    // Fórmula de qualidade (exemplo)
    const indice = (
        (fatores.satisfacao * 0.4) +
        (fatores.resolucao * 0.3) +
        (Math.max(0, 100 - fatores.tma) * 0.2) +
        (Math.max(0, 100 - fatores.mte) * 0.1)
    );
    
    return Math.round(indice * 100) / 100;
}

function calcularTaxaResolucao(dados) {
    // Implementar lógica para taxa de resolução
    const resolvidos = dados.filter(item => item.resolved === true || item.status === 'resolved');
    return dados.length > 0 ? (resolvidos.length / dados.length) * 100 : 0;
}

// Exportar funções para uso global
window.VeloIGP_API = {
    buscarRelatorioAPI,
    calcularIndicadores,
    calcularIntervaloData,
    formatarDataParaAPI,
    obterDataHoje,
    PERIODOS,
    API_55PBX_CONFIG
};

console.log('🚀 VeloIGP API Config carregado com sucesso!');
