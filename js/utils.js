/* === VELONET UTILS.JS === */

const VeloNetUtils = {
    // Formatação de data
    formatDate: (date) => new Date(date).toLocaleDateString('pt-BR'),
    
    // Notificações
    showNotification: (message, type = 'info') => {
        console.log(`🔔 ${type.toUpperCase()}: ${message}`);
    },
    
    // Validação de email
    isValidEmail: (email) => email.includes('@velotax.com.br'),
    
    // LocalStorage
    storage: {
        set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
        get: (key) => JSON.parse(localStorage.getItem(key) || 'null'),
        remove: (key) => localStorage.removeItem(key)
    }
};

console.log('✅ Utilitários carregados');
