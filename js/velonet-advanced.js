// VeloNet Advanced - Sistema de Funcionalidades Avançadas

class VeloNetAdvanced {
    constructor() {
        this.currentUser = null;
        this.currentTheme = 'dark';
        this.notifications = [];
        this.mediaFiles = [];
        this.news = [];
        this.users = [];
        this.init();
    }

    init() {
        this.loadUserData();
        this.loadTheme();
        this.setupEventListeners();
        this.initializeCharts();
        this.setupCustomCursor();
        this.loadNews();
        this.loadUsers();
    }

    // Sistema de Autenticação Google
    setupGoogleAuth() {
        if (typeof google !== 'undefined') {
            google.accounts.id.initialize({
                client_id: '1070039276915-2b694q77hs2tgv3heuf5olrfoc4udq9r.apps.googleusercontent.com',
                callback: this.handleGoogleSignIn.bind(this)
            });
        }
    }

    handleGoogleSignIn(response) {
        try {
            const payload = this.decodeJWT(response.credential);
            
            if (payload.email.endsWith('@velotax.com.br')) {
                this.currentUser = {
                    id: payload.sub,
                    name: payload.name,
                    email: payload.email,
                    picture: payload.picture,
                    role: this.getUserRole(payload.email),
                    department: this.getUserDepartment(payload.email),
                    joinDate: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                };

                this.saveUserData();
                this.showMainApp();
                this.showNotification('Login realizado com sucesso!', 'success');
                this.updateUserInterface();
            } else {
                this.showNotification('Apenas e-mails @velotax.com.br são permitidos.', 'error');
            }
        } catch (error) {
            console.error('Erro no login Google:', error);
            this.showNotification('Erro no login. Tente novamente.', 'error');
        }
    }

    decodeJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    // Sistema de Temas
    setTheme(theme) {
        this.currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('velonet-theme', theme);
        this.updateThemeColors();
        this.showNotification(`Tema ${theme} aplicado!`, 'success');
    }

    updateThemeColors() {
        const root = document.documentElement;
        const themes = {
            light: {
                '--bg-primary': '#ffffff',
                '--bg-secondary': '#f8f9fa',
                '--text-primary': '#000000',
                '--text-secondary': '#6c757d',
                '--accent-color': '#007AFF'
            },
            dark: {
                '--bg-primary': '#000000',
                '--bg-secondary': '#1c1c1e',
                '--text-primary': '#ffffff',
                '--text-secondary': '#8e8e93',
                '--accent-color': '#007AFF'
            },
            blue: {
                '--bg-primary': '#0a1929',
                '--bg-secondary': '#132f4c',
                '--text-primary': '#ffffff',
                '--text-secondary': '#b2bac2',
                '--accent-color': '#66b2ff'
            }
        };

        const themeColors = themes[this.currentTheme];
        Object.entries(themeColors).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });
    }

    // Sistema de Notificações
    showNotification(message, type = 'info', duration = 3000) {
        const notification = {
            id: Date.now(),
            message,
            type,
            timestamp: new Date()
        };

        this.notifications.push(notification);
        this.displayNotification(notification);

        setTimeout(() => {
            this.removeNotification(notification.id);
        }, duration);
    }

    displayNotification(notification) {
        const notificationEl = document.createElement('div');
        notificationEl.className = `notification notification-${notification.type}`;
        notificationEl.id = `notification-${notification.id}`;
        
        notificationEl.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <i class="fas fa-${this.getNotificationIcon(notification.type)} mr-2"></i>
                    <span>${notification.message}</span>
                </div>
                <button onclick="velonet.removeNotification(${notification.id})" class="ml-4 text-gray-400 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notificationEl);
        
        // Animate in
        setTimeout(() => {
            notificationEl.style.transform = 'translateX(0)';
            notificationEl.style.opacity = '1';
        }, 100);
    }

    removeNotification(id) {
        const notificationEl = document.getElementById(`notification-${id}`);
        if (notificationEl) {
            notificationEl.style.transform = 'translateX(100%)';
            notificationEl.style.opacity = '0';
            setTimeout(() => {
                notificationEl.remove();
            }, 300);
        }
        
        this.notifications = this.notifications.filter(n => n.id !== id);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Sistema de Mídia
    setupMediaUpload() {
        const dropZone = document.getElementById('mediaDropZone');
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('drag-over');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                const files = Array.from(e.dataTransfer.files);
                this.handleMediaFiles(files);
            });
        }
    }

    handleMediaFiles(files) {
        files.forEach(file => {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const mediaItem = {
                        id: Date.now() + Math.random(),
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        url: e.target.result,
                        uploadedBy: this.currentUser?.email,
                        uploadedAt: new Date().toISOString()
                    };

                    this.mediaFiles.push(mediaItem);
                    this.displayMediaItem(mediaItem);
                    this.showNotification(`Mídia "${file.name}" carregada com sucesso!`, 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    displayMediaItem(mediaItem) {
        const mediaContainer = document.getElementById('mediaContainer');
        if (mediaContainer) {
            const mediaEl = document.createElement('div');
            mediaEl.className = 'media-item glass-panel p-4';
            mediaEl.innerHTML = `
                <div class="relative">
                    ${mediaItem.type.startsWith('image/') 
                        ? `<img src="${mediaItem.url}" alt="${mediaItem.name}" class="w-full h-32 object-cover rounded-lg">`
                        : `<video src="${mediaItem.url}" class="w-full h-32 object-cover rounded-lg"></video>`
                    }
                    <button onclick="velonet.deleteMedia(${mediaItem.id})" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <i class="fas fa-times text-xs"></i>
                    </button>
                </div>
                <div class="mt-2">
                    <p class="text-sm font-medium text-white truncate">${mediaItem.name}</p>
                    <p class="text-xs text-gray-400">${this.formatFileSize(mediaItem.size)}</p>
                </div>
            `;
            mediaContainer.appendChild(mediaEl);
        }
    }

    deleteMedia(id) {
        this.mediaFiles = this.mediaFiles.filter(m => m.id !== id);
        this.showNotification('Mídia removida com sucesso!', 'success');
        this.refreshMediaDisplay();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Sistema de Notícias
    loadNews() {
        this.news = [
            {
                id: 1,
                title: 'Nova Política de Atendimento',
                content: 'Implementamos novas diretrizes para melhorar a qualidade do atendimento ao cliente.',
                author: 'RH',
                category: 'Importante',
                date: '2025-01-15',
                readBy: [],
                reactions: { like: 12, love: 5, helpful: 8 }
            },
            {
                id: 2,
                title: 'Treinamento de Produtos',
                content: 'Novo módulo de treinamento sobre produtos disponível na plataforma.',
                author: 'Treinamentos',
                category: 'Novo',
                date: '2025-01-14',
                readBy: [],
                reactions: { like: 8, love: 3, helpful: 6 }
            }
        ];
    }

    addNews(newsData) {
        const news = {
            id: Date.now(),
            ...newsData,
            date: new Date().toISOString(),
            readBy: [],
            reactions: { like: 0, love: 0, helpful: 0 }
        };

        this.news.unshift(news);
        this.displayNews();
        this.showNotification('Notícia publicada com sucesso!', 'success');
    }

    markNewsAsRead(newsId) {
        const news = this.news.find(n => n.id === newsId);
        if (news && !news.readBy.includes(this.currentUser?.email)) {
            news.readBy.push(this.currentUser?.email);
            this.showNotification('Notícia marcada como lida!', 'success');
        }
    }

    reactToNews(newsId, reaction) {
        const news = this.news.find(n => n.id === newsId);
        if (news) {
            news.reactions[reaction]++;
            this.showNotification(`Reação "${reaction}" adicionada!`, 'success');
        }
    }

    // Sistema de Usuários
    loadUsers() {
        this.users = [
            {
                id: 1,
                name: 'João Silva',
                email: 'joao.silva@velotax.com.br',
                role: 'Atendente',
                department: 'Suporte',
                status: 'Online',
                avatar: 'https://via.placeholder.com/40x40'
            },
            {
                id: 2,
                name: 'Maria Santos',
                email: 'maria.santos@velotax.com.br',
                role: 'Supervisor',
                department: 'Suporte',
                status: 'Online',
                avatar: 'https://via.placeholder.com/40x40'
            }
        ];
    }

    getUserRole(email) {
        // Lógica para determinar o cargo baseado no email
        if (email.includes('admin')) return 'Administrador';
        if (email.includes('supervisor')) return 'Supervisor';
        if (email.includes('gerente')) return 'Gerente';
        return 'Atendente';
    }

    getUserDepartment(email) {
        // Lógica para determinar o departamento
        if (email.includes('ti')) return 'TI';
        if (email.includes('rh')) return 'RH';
        if (email.includes('financeiro')) return 'Financeiro';
        return 'Suporte';
    }

    // Sistema de Gemini AI
    openGemini() {
        const geminiUrl = 'https://gemini.google.com/';
        window.open(geminiUrl, '_blank');
        this.showNotification('Gemini AI aberto em nova aba!', 'info');
    }

    // Sistema de Cursor Personalizado
    setupCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });

        // Add hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || 
                e.target.closest('button') || e.target.closest('a')) {
                cursor.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            cursor.classList.remove('hover');
        });
    }

    // Sistema de Gráficos
    initializeCharts() {
        this.createPerformanceChart();
        this.createDistributionChart();
        this.createUserActivityChart();
    }

    createPerformanceChart() {
        const ctx = document.getElementById('performanceChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
                datasets: [{
                    label: 'Atendimentos',
                    data: [45, 52, 48, 61, 47],
                    borderColor: '#007AFF',
                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }

    createDistributionChart() {
        const ctx = document.getElementById('distributionChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Telefone', 'Tickets', 'Chat', 'Email'],
                datasets: [{
                    data: [47, 23, 15, 8],
                    backgroundColor: ['#007AFF', '#34C759', '#FF9500', '#FF3B30']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#ffffff' }
                    }
                }
            }
        });
    }

    createUserActivityChart() {
        const ctx = document.getElementById('userActivityChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['João', 'Maria', 'Pedro', 'Ana', 'Carlos'],
                datasets: [{
                    label: 'Atendimentos',
                    data: [47, 52, 38, 45, 42],
                    backgroundColor: '#007AFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }

    // Sistema de Event Listeners
    setupEventListeners() {
        // Theme selector
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-theme]')) {
                this.setTheme(e.target.dataset.theme);
            }
        });

        // News reactions
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-reaction]')) {
                const newsId = parseInt(e.target.closest('[data-news-id]').dataset.newsId);
                const reaction = e.target.dataset.reaction;
                this.reactToNews(newsId, reaction);
            }
        });

        // Mark news as read
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-mark-read]')) {
                const newsId = parseInt(e.target.dataset.markRead);
                this.markNewsAsRead(newsId);
            }
        });

        // Gemini button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-gemini]')) {
                this.openGemini();
            }
        });
    }

    // Sistema de Persistência
    saveUserData() {
        localStorage.setItem('velonet-user', JSON.stringify(this.currentUser));
    }

    loadUserData() {
        const userData = localStorage.getItem('velonet-user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('velonet-theme') || 'dark';
        this.setTheme(savedTheme);
    }

    // Interface Updates
    updateUserInterface() {
        if (this.currentUser) {
            document.getElementById('userName').textContent = this.currentUser.name;
            document.getElementById('userEmail').textContent = this.currentUser.email;
            document.getElementById('userAvatar').src = this.currentUser.picture;
        }
    }

    showMainApp() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
    }

    // Logout
    logout() {
        if (confirm('Deseja realmente sair do sistema?')) {
            this.currentUser = null;
            localStorage.removeItem('velonet-user');
            document.getElementById('mainApp').classList.add('hidden');
            document.getElementById('loginScreen').classList.remove('hidden');
            this.showNotification('Logout realizado com sucesso!', 'success');
        }
    }
}

// Initialize VeloNet Advanced
const velonet = new VeloNetAdvanced();

// Export for global access
window.velonet = velonet; 