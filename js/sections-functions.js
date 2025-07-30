// Funções para todas as seções do VeloNet

// ===== FUNÇÕES DE NOTÍCIAS =====
function reactToNews(newsId, reaction) {
    showNotification(`Reação "${reaction}" adicionada à notícia!`, 'success');
    
    // Atualizar contador visual
    const button = event.target.closest('.reaction-btn');
    if (button) {
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 1000);
    }
}

function markAsRead(newsId) {
    showNotification('Notícia marcada como lida!', 'success');
    
    // Marcar visualmente como lida
    const newsCard = event.target.closest('.glass-panel');
    if (newsCard) {
        newsCard.style.opacity = '0.6';
        newsCard.style.borderColor = '#34C759';
    }
}

// ===== FUNÇÕES DE PROCESSOS =====
function openProcess(processType) {
    const processes = {
        'atendimento': 'Processo de Atendimento ao Cliente',
        'escalacao': 'Escalação de Problemas',
        'qualidade': 'Gestão de Qualidade',
        'emergencia': 'Procedimentos de Emergência'
    };
    
    showNotification(`Abrindo ${processes[processType]}...`, 'info');
    
    // Simular abertura de processo
    setTimeout(() => {
        showNotification(`${processes[processType]} carregado com sucesso!`, 'success');
    }, 1000);
}

// ===== FUNÇÕES DE TREINAMENTOS =====
function startTraining(trainingType) {
    const trainings = {
        'atendimento': 'Atendimento ao Cliente',
        'produtos': 'Produtos e Serviços',
        'sistema': 'Sistema VeloNet'
    };
    
    showNotification(`Iniciando treinamento: ${trainings[trainingType]}`, 'info');
    
    // Simular início do treinamento
    setTimeout(() => {
        showNotification(`Treinamento "${trainings[trainingType]}" iniciado!`, 'success');
    }, 1500);
}

// ===== FUNÇÕES DE PONTO =====
function registerEntry() {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    showNotification(`Entrada registrada às ${time}`, 'success');
    
    // Atualizar status visual
    const statusElement = document.querySelector('.status-online');
    if (statusElement) {
        statusElement.innerHTML = '<span class="text-white text-2xl font-bold">Presente</span>';
    }
}

function registerExit() {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    showNotification(`Saída registrada às ${time}`, 'success');
    
    // Atualizar status visual
    const statusElement = document.querySelector('.status-online');
    if (statusElement) {
        statusElement.innerHTML = '<span class="text-white text-2xl font-bold">Ausente</span>';
        statusElement.classList.remove('status-online');
        statusElement.classList.add('status-offline');
    }
}

function startPause() {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    showNotification(`Pausa iniciada às ${time}`, 'info');
    
    // Atualizar status visual
    const statusElement = document.querySelector('.status-online');
    if (statusElement) {
        statusElement.innerHTML = '<span class="text-white text-2xl font-bold">Pausa</span>';
        statusElement.classList.remove('status-online');
        statusElement.classList.add('status-pause');
    }
}

// ===== FUNÇÕES DE BASE DE CONHECIMENTO =====
function openDocument(docType) {
    const documents = {
        'manual': 'Manual de Atendimento',
        'procedimentos': 'Procedimentos Operacionais',
        'faq': 'FAQ - Perguntas Frequentes'
    };
    
    showNotification(`Abrindo ${documents[docType]}...`, 'info');
    
    // Simular abertura de documento
    setTimeout(() => {
        showNotification(`${documents[docType]} carregado!`, 'success');
    }, 1000);
}

// ===== FUNÇÕES DE MÍDIA =====
function selectMediaFiles() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,video/*';
    
    input.onchange = (e) => {
        const files = Array.from(e.target.files);
        handleMediaFiles(files);
    };
    
    input.click();
}

function handleMediaFiles(files) {
    files.forEach(file => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const mediaItem = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    url: e.target.result
                };
                
                displayMediaItem(mediaItem);
                showNotification(`Mídia "${file.name}" carregada!`, 'success');
            };
            reader.readAsDataURL(file);
        }
    });
}

function displayMediaItem(mediaItem) {
    const container = document.getElementById('mediaContainer');
    if (container) {
        const mediaEl = document.createElement('div');
        mediaEl.className = 'glass-panel p-4';
        mediaEl.innerHTML = `
            <div class="relative">
                ${mediaItem.type.startsWith('image/') 
                    ? `<img src="${mediaItem.url}" alt="${mediaItem.name}" class="w-full h-32 object-cover rounded-lg">`
                    : `<video src="${mediaItem.url}" class="w-full h-32 object-cover rounded-lg"></video>`
                }
                <button onclick="deleteMedia(this)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <i class="fas fa-times text-xs"></i>
                </button>
            </div>
            <div class="mt-2">
                <p class="text-sm font-medium text-white truncate">${mediaItem.name}</p>
                <p class="text-xs text-gray-400">${formatFileSize(mediaItem.size)}</p>
            </div>
        `;
        container.appendChild(mediaEl);
    }
}

function deleteMedia(button) {
    const mediaItem = button.closest('.glass-panel');
    if (mediaItem) {
        mediaItem.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            mediaItem.remove();
            showNotification('Mídia removida!', 'success');
        }, 300);
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ===== FUNÇÕES DO GEMINI =====
function openGemini() {
    const geminiUrl = 'https://gemini.google.com/';
    window.open(geminiUrl, '_blank');
    showNotification('Gemini AI aberto em nova aba!', 'success');
}

// ===== FUNÇÕES DE ADMINISTRAÇÃO =====
function openUserManagement() {
    showNotification('Abrindo gestão de usuários...', 'info');
    setTimeout(() => {
        showNotification('Painel de gestão de usuários carregado!', 'success');
    }, 1000);
}

function openReports() {
    showNotification('Abrindo relatórios...', 'info');
    setTimeout(() => {
        showNotification('Relatórios carregados com sucesso!', 'success');
    }, 1000);
}

function openSettings() {
    showNotification('Abrindo configurações...', 'info');
    setTimeout(() => {
        showNotification('Configurações carregadas!', 'success');
    }, 1000);
}

// ===== FUNÇÕES AUXILIARES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'border-red-500' : 'border-green-500'}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'check-circle'} mr-2 text-${type === 'error' ? 'red' : 'green'}-500"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== CONFIGURAÇÃO DE DRAG & DROP =====
function setupMediaUpload() {
    const dropZone = document.getElementById('mediaDropZone');
    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-blue-500', 'bg-blue-500', 'bg-opacity-10');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-blue-500', 'bg-blue-500', 'bg-opacity-10');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-500', 'bg-blue-500', 'bg-opacity-10');
            const files = Array.from(e.dataTransfer.files);
            handleMediaFiles(files);
        });
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    setupMediaUpload();
    console.log('✅ Funções das seções carregadas com sucesso!');
}); 