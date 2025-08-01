// VeloNet Simple - JavaScript limpo e funcional

// Login Functions
function loginWithGoogle() {
    const userInfo = {
        name: 'Usuário Google',
        email: 'usuario.google@velotax.com.br',
        picture: 'https://via.placeholder.com/40x40',
        loginMethod: 'google'
    };
    
    performLogin(userInfo);
    showNotification('Login com Google realizado com sucesso!', 'success');
}

function loginWithDemo() {
    const userInfo = {
        name: 'Demo User',
        email: 'demo@velotax.com.br',
        picture: 'https://via.placeholder.com/40x40',
        loginMethod: 'demo'
    };
    
    performLogin(userInfo);
    showNotification('Login demo realizado com sucesso!', 'success');
}

function loginWithManual() {
    const email = document.getElementById('manualEmail').value;
    const password = document.getElementById('manualPassword').value;
    
    if (!email || !password) {
        showNotification('Preencha todos os campos!', 'error');
        return;
    }
    
    if (!email.endsWith('@velotax.com.br')) {
        showNotification('Apenas e-mails @velotax.com.br são permitidos.', 'error');
        return;
    }
    
    const userInfo = {
        name: email.split('@')[0],
        email: email,
        picture: 'https://via.placeholder.com/40x40',
        loginMethod: 'manual'
    };
    
    performLogin(userInfo);
    showNotification('Login manual realizado com sucesso!', 'success');
}

function performLogin(userInfo) {
    localStorage.setItem('velonet-user', JSON.stringify(userInfo));
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    updateUserInfo();
}

function toggleManualLogin() {
    const form = document.getElementById('manualLoginForm');
    form.classList.toggle('hidden');
}

// Theme Management
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('velonet-theme', theme);
    closeThemeModal();
    showNotification(`Tema ${theme} aplicado!`, 'success');
}

function showThemeSelector() {
    document.getElementById('themeModal').classList.add('active');
}

function closeThemeModal() {
    document.getElementById('themeModal').classList.remove('active');
}

// Notifications
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

// Profile Management
function updateUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('velonet-user'));
    if (userInfo) {
        document.getElementById('userName').textContent = userInfo.name;
        document.getElementById('userEmail').textContent = userInfo.email;
        document.getElementById('userAvatar').src = userInfo.picture;
        
        // Update profile section
        const profileName = document.getElementById('profileName');
        const profileAvatar = document.getElementById('profileAvatar');
        if (profileName) profileName.textContent = userInfo.name;
        if (profileAvatar) profileAvatar.src = userInfo.picture;
    }
}

function changeAvatar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const profileAvatar = document.getElementById('profileAvatar');
                const userAvatar = document.getElementById('userAvatar');
                if (profileAvatar) profileAvatar.src = e.target.result;
                if (userAvatar) userAvatar.src = e.target.result;
                showNotification('Foto de perfil atualizada!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to clicked menu item
    const clickedItem = event.target.closest('.menu-item');
    if (clickedItem) {
        clickedItem.classList.add('active');
    }
}

function logout() {
    if (confirm('Deseja realmente sair do sistema?')) {
        localStorage.removeItem('velonet-user');
        document.getElementById('mainApp').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
        showNotification('Logout realizado com sucesso!', 'success');
    }
}

// Form Handling
function setupFormHandlers() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Perfil atualizado com sucesso!', 'success');
        });
    }
}

// Charts
function initCharts() {
    // Performance Chart
    const desempenhoCtx = document.getElementById('desempenhoChart');
    if (desempenhoCtx) {
        new Chart(desempenhoCtx, {
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

    // Distribution Chart
    const distribuicaoCtx = document.getElementById('distribuicaoChart');
    if (distribuicaoCtx) {
        new Chart(distribuicaoCtx, {
            type: 'doughnut',
            data: {
                labels: ['Telefone', 'Tickets', 'Chat', 'Email'],
                datasets: [{
                    data: [47, 23, 15, 8],
                    backgroundColor: [
                        '#007AFF',
                        '#34C759',
                        '#FF9500',
                        '#FF3B30'
                    ]
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
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('velonet-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Check login status
    const userInfo = localStorage.getItem('velonet-user');
    if (userInfo) {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        updateUserInfo();
    }
    
    // Setup form handlers
    setupFormHandlers();
    
    // Initialize charts
    initCharts();
    
    console.log('✅ VeloNet Simple carregado com sucesso!');
}); 