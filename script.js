/**
 * PEACECONNECT - BACK OFFICE SCRIPT
 * Gestion du dashboard, graphiques Chart.js, tableaux et modales
 */

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initNavigation();
    initCharts();
    initTables();
    initModal();
    initUserMenu();
    initSettings();
    loadDashboardData();
});

// ============================================
// SIDEBAR
// ============================================

/**
 * Initialise la sidebar avec toggle et responsive
 */
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainContent = document.getElementById('mainContent');

    // Toggle sidebar desktop
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Toggle sidebar mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Fermer sidebar mobile au clic sur overlay
    if (mainContent) {
        mainContent.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Initialise la navigation entre les sections
 */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.dashboard-section');
    const pageTitle = document.getElementById('pageTitle');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            // Mettre à jour les états actifs
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Afficher la section correspondante
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    
                    // Mettre à jour le titre de la page
                    if (pageTitle) {
                        const sectionNames = {
                            'dashboard': 'Dashboard',
                            'projets': 'Projets',
                            'utilisateurs': 'Utilisateurs',
                            'temoignages': 'Témoignages',
                            'statistiques': 'Statistiques',
                            'parametres': 'Paramètres'
                        };
                        pageTitle.textContent = sectionNames[targetSection] || 'Dashboard';
                    }

                    // Charger les données de la section si nécessaire
                    loadSectionData(targetSection);
                }
            });

            // Fermer la sidebar sur mobile
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
}

// ============================================
// CHARTS (Chart.js)
// ============================================

let projectsChart = null;
let categoriesChart = null;
let monthlyStatsChart = null;

/**
 * Initialise tous les graphiques
 */
function initCharts() {
    initProjectsChart();
    initCategoriesChart();
    initMonthlyStatsChart();
}

/**
 * Initialise le graphique d'évolution des projets
 */
function initProjectsChart() {
    const ctx = document.getElementById('projectsChart');
    if (!ctx) return;

    const filter = document.getElementById('projectsChartFilter');
    
    projectsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
                label: 'Projets créés',
                data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45],
                borderColor: '#1e3a8a',
                backgroundColor: 'rgba(30, 58, 138, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Projets terminés',
                data: [8, 12, 10, 18, 15, 22, 20, 25, 23, 30, 28, 35],
                borderColor: '#16a34a',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Mettre à jour le graphique selon le filtre
    if (filter) {
        filter.addEventListener('change', function() {
            // Ici, on pourrait charger de nouvelles données selon le filtre
            // Pour l'instant, on garde les mêmes données
            console.log('Filtre changé:', this.value);
        });
    }
}

/**
 * Initialise le graphique de répartition par catégorie
 */
function initCategoriesChart() {
    const ctx = document.getElementById('categoriesChart');
    if (!ctx) return;

    categoriesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Éducation', 'Communauté', 'Durabilité', 'Humanitaire'],
            datasets: [{
                data: [30, 25, 25, 20],
                backgroundColor: [
                    '#1e3a8a',
                    '#16a34a',
                    '#3b82f6',
                    '#f59e0b'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

/**
 * Initialise le graphique des statistiques mensuelles
 */
function initMonthlyStatsChart() {
    const ctx = document.getElementById('monthlyStatsChart');
    if (!ctx) return;

    monthlyStatsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Utilisateurs',
                data: [120, 190, 150, 250, 220, 300],
                backgroundColor: '#1e3a8a'
            }, {
                label: 'Projets',
                data: [12, 19, 15, 25, 22, 30],
                backgroundColor: '#16a34a'
            }, {
                label: 'Témoignages',
                data: [8, 12, 10, 18, 15, 22],
                backgroundColor: '#3b82f6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ============================================
// TABLES
// ============================================

/**
 * Initialise les tableaux avec données et interactions
 */
function initTables() {
    loadActivityTable();
    loadProjectsTable();
    loadUsersTable();
    loadTestimonialsTable();

    // Bouton d'actualisation
    const refreshBtn = document.getElementById('refreshTableBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            loadActivityTable();
        });
    }
}

/**
 * Charge les données de la table d'activité
 */
function loadActivityTable() {
    const tbody = document.getElementById('activityTableBody');
    if (!tbody) return;

    // Données d'exemple (à remplacer par un appel PHP/MySQL)
    const activities = [
        { id: 1, type: 'Projet', description: 'Nouveau projet créé: Éducation pour tous', user: 'Admin', date: '2025-01-10 14:30' },
        { id: 2, type: 'Utilisateur', description: 'Nouvel utilisateur inscrit', user: 'Système', date: '2025-01-10 13:15' },
        { id: 3, type: 'Témoignage', description: 'Témoignage approuvé', user: 'Modérateur', date: '2025-01-10 12:00' },
        { id: 4, type: 'Projet', description: 'Projet mis à jour: Projet Vert', user: 'Admin', date: '2025-01-10 11:45' },
        { id: 5, type: 'Utilisateur', description: 'Profil utilisateur modifié', user: 'Admin', date: '2025-01-10 10:20' }
    ];

    tbody.innerHTML = '';
    activities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${activity.id}</td>
            <td><span class="status-badge active">${activity.type}</span></td>
            <td>${activity.description}</td>
            <td>${activity.user}</td>
            <td>${activity.date}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view" onclick="showDetails(${activity.id}, 'activity')">Voir</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Charge les données de la table des projets
 */
function loadProjectsTable() {
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody) return;

    const projects = [
        { id: 1, name: 'Éducation pour tous', category: 'Éducation', status: 'Actif', budget: '€15,000', date: '2025-01-01' },
        { id: 2, name: 'Projet Vert', category: 'Durabilité', status: 'Actif', budget: '€25,000', date: '2024-12-15' },
        { id: 3, name: 'Aide Humanitaire', category: 'Humanitaire', status: 'En attente', budget: '€30,000', date: '2025-01-05' },
        { id: 4, name: 'Réseau Communautaire', category: 'Communauté', status: 'Actif', budget: '€10,000', date: '2024-11-20' }
    ];

    tbody.innerHTML = '';
    projects.forEach(project => {
        const row = document.createElement('tr');
        const statusClass = project.status === 'Actif' ? 'active' : 'pending';
        row.innerHTML = `
            <td>#${project.id}</td>
            <td>${project.name}</td>
            <td>${project.category}</td>
            <td><span class="status-badge ${statusClass}">${project.status}</span></td>
            <td>${project.budget}</td>
            <td>${project.date}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view" onclick="showDetails(${project.id}, 'project')">Voir</button>
                    <button class="action-btn edit" onclick="editItem(${project.id}, 'project')">Modifier</button>
                    <button class="action-btn delete" onclick="deleteItem(${project.id}, 'project')">Supprimer</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Charge les données de la table des utilisateurs
 */
function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    const users = [
        { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'Admin', status: 'Actif', date: '2024-01-15' },
        { id: 2, name: 'Marie Martin', email: 'marie@example.com', role: 'Modérateur', status: 'Actif', date: '2024-03-20' },
        { id: 3, name: 'Pierre Durand', email: 'pierre@example.com', role: 'Utilisateur', status: 'Actif', date: '2024-06-10' },
        { id: 4, name: 'Sophie Bernard', email: 'sophie@example.com', role: 'Utilisateur', status: 'Inactif', date: '2024-08-05' }
    ];

    tbody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        const statusClass = user.status === 'Actif' ? 'active' : 'inactive';
        row.innerHTML = `
            <td>#${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-badge ${statusClass}">${user.status}</span></td>
            <td>${user.date}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view" onclick="showDetails(${user.id}, 'user')">Voir</button>
                    <button class="action-btn edit" onclick="editItem(${user.id}, 'user')">Modifier</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Charge les données de la table des témoignages
 */
function loadTestimonialsTable() {
    const tbody = document.getElementById('testimonialsTableBody');
    if (!tbody) return;

    const testimonials = [
        { id: 1, author: 'Amina Mohamed', role: 'Directrice', content: 'PeaceConnect a transformé...', status: 'Approuvé', date: '2025-01-08' },
        { id: 2, author: 'Jean Dupont', role: 'Coordinateur', content: 'L\'approche collaborative...', status: 'Approuvé', date: '2025-01-05' },
        { id: 3, author: 'Sarah Kim', role: 'Responsable', content: 'Les projets durables...', status: 'En attente', date: '2025-01-10' }
    ];

    tbody.innerHTML = '';
    testimonials.forEach(testimonial => {
        const row = document.createElement('tr');
        const statusClass = testimonial.status === 'Approuvé' ? 'active' : 'pending';
        const shortContent = testimonial.content.length > 50 
            ? testimonial.content.substring(0, 50) + '...' 
            : testimonial.content;
        row.innerHTML = `
            <td>#${testimonial.id}</td>
            <td>${testimonial.author}</td>
            <td>${testimonial.role}</td>
            <td>${shortContent}</td>
            <td><span class="status-badge ${statusClass}">${testimonial.status}</span></td>
            <td>${testimonial.date}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view" onclick="showDetails(${testimonial.id}, 'testimonial')">Voir</button>
                    <button class="action-btn edit" onclick="editItem(${testimonial.id}, 'testimonial')">Modifier</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ============================================
// MODAL
// ============================================

/**
 * Initialise le système de modales
 */
function initModal() {
    const modal = document.getElementById('detailModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Affiche une modale avec les détails d'un élément
 */
function showDetails(id, type) {
    const modal = document.getElementById('detailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    if (!modal || !modalTitle || !modalBody) return;

    // Ici, on pourrait faire un appel PHP pour récupérer les détails
    // Pour l'instant, on affiche des données d'exemple
    let title = '';
    let content = '';
    let footer = '';

    switch(type) {
        case 'activity':
            title = `Activité #${id}`;
            content = `
                <p><strong>Type:</strong> Projet</p>
                <p><strong>Description:</strong> Nouveau projet créé: Éducation pour tous</p>
                <p><strong>Utilisateur:</strong> Admin</p>
                <p><strong>Date:</strong> 2025-01-10 14:30</p>
            `;
            break;
        case 'project':
            title = `Projet #${id}`;
            content = `
                <p><strong>Nom:</strong> Éducation pour tous</p>
                <p><strong>Catégorie:</strong> Éducation</p>
                <p><strong>Statut:</strong> Actif</p>
                <p><strong>Budget:</strong> €15,000</p>
                <p><strong>Date de début:</strong> 2025-01-01</p>
                <p><strong>Description:</strong> Projet visant à promouvoir l'éducation pour tous dans les communautés défavorisées.</p>
            `;
            footer = `
                <button class="btn btn-secondary" onclick="closeModal()">Fermer</button>
                <button class="btn btn-primary" onclick="editItem(${id}, 'project')">Modifier</button>
            `;
            break;
        case 'user':
            title = `Utilisateur #${id}`;
            content = `
                <p><strong>Nom:</strong> Jean Dupont</p>
                <p><strong>Email:</strong> jean@example.com</p>
                <p><strong>Rôle:</strong> Admin</p>
                <p><strong>Statut:</strong> Actif</p>
                <p><strong>Date d'inscription:</strong> 2024-01-15</p>
            `;
            footer = `
                <button class="btn btn-secondary" onclick="closeModal()">Fermer</button>
                <button class="btn btn-primary" onclick="editItem(${id}, 'user')">Modifier</button>
            `;
            break;
        case 'testimonial':
            title = `Témoignage #${id}`;
            content = `
                <p><strong>Auteur:</strong> Amina Mohamed</p>
                <p><strong>Rôle:</strong> Directrice, Association pour le Développement</p>
                <p><strong>Statut:</strong> Approuvé</p>
                <p><strong>Date:</strong> 2025-01-08</p>
                <p><strong>Contenu:</strong></p>
                <p style="font-style: italic; padding: 1rem; background: #f3f4f6; border-radius: 0.5rem;">
                    "PeaceConnect a transformé notre communauté. Grâce à leurs programmes éducatifs, nous avons pu sensibiliser plus de 500 personnes aux enjeux du développement durable."
                </p>
            `;
            footer = `
                <button class="btn btn-secondary" onclick="closeModal()">Fermer</button>
                <button class="btn btn-primary" onclick="editItem(${id}, 'testimonial')">Modifier</button>
            `;
            break;
    }

    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modalFooter.innerHTML = footer || `<button class="btn btn-secondary" onclick="closeModal()">Fermer</button>`;
    modal.classList.add('active');
}

/**
 * Ferme la modale
 */
function closeModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Édite un élément (à implémenter)
 */
function editItem(id, type) {
    closeModal();
    console.log(`Édition de ${type} #${id}`);
    // Ici, on pourrait ouvrir un formulaire d'édition
    alert(`Fonctionnalité d'édition à implémenter pour ${type} #${id}`);
}

/**
 * Supprime un élément (à implémenter)
 */
function deleteItem(id, type) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ce ${type} ?`)) {
        console.log(`Suppression de ${type} #${id}`);
        // Ici, on pourrait faire un appel PHP pour supprimer
        alert(`Fonctionnalité de suppression à implémenter pour ${type} #${id}`);
    }
}

// ============================================
// USER MENU
// ============================================

/**
 * Initialise le menu utilisateur
 */
function initUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutDropdown = document.getElementById('logoutDropdown');

    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        // Fermer le menu au clic ailleurs
        document.addEventListener('click', function() {
            userDropdown.classList.remove('active');
        });
    }

    // Gestion de la déconnexion
    function handleLogout() {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            // Ici, on pourrait faire un appel PHP pour déconnecter
            window.location.href = '../front-office/index.html';
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    if (logoutDropdown) {
        logoutDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
}

// ============================================
// SETTINGS
// ============================================

/**
 * Initialise le formulaire de paramètres
 */
function initSettings() {
    const settingsForm = document.getElementById('settingsForm');
    if (!settingsForm) return;

    settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Ici, on pourrait envoyer les données à un script PHP
        console.log('Paramètres à sauvegarder:', data);
        
        // Afficher un message de succès
        alert('Paramètres enregistrés avec succès !');
    });
}

// ============================================
// DATA LOADING
// ============================================

/**
 * Charge les données du dashboard
 */
function loadDashboardData() {
    // Mettre à jour les KPIs (pourrait être fait via PHP/MySQL)
    updateKPIs();
}

/**
 * Met à jour les KPIs
 */
function updateKPIs() {
    // Ici, on pourrait faire des appels PHP pour récupérer les vraies données
    // Pour l'instant, on garde les valeurs statiques du HTML
    console.log('KPIs chargés');
}

/**
 * Charge les données d'une section spécifique
 */
function loadSectionData(section) {
    switch(section) {
        case 'projets':
            loadProjectsTable();
            break;
        case 'utilisateurs':
            loadUsersTable();
            break;
        case 'temoignages':
            loadTestimonialsTable();
            break;
        case 'statistiques':
            // Recharger les graphiques si nécessaire
            break;
    }
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Exemple de fonction pour charger des données via PHP
 */
function loadDataFromPHP(endpoint, callback) {
    /*
    const xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            if (callback) callback(data);
        }
    };
    xhr.send();
    */
}

/**
 * Exemple de fonction pour envoyer des données via PHP
 */
function sendDataToPHP(endpoint, data, callback) {
    /*
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (callback) callback(response);
            }
        }
    };
    xhr.send(JSON.stringify(data));
    */
}

