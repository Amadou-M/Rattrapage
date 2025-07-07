// Configuration de l'API
const API_BASE_URL = 'http://localhost:5000/api';

// État de l'application
let currentView = 'dashboard';
let incidents = [];
let filteredIncidents = [];
let currentIncident = null;
let editingIncident = null;

// Éléments DOM
const views = {
  dashboard: document.getElementById('dashboard-view'),
  incidents: document.getElementById('incidents-view'),
  form: document.getElementById('form-view'),
  detail: document.getElementById('detail-view')
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  loadIncidents();
});

// Initialisation
function initializeApp() {
  showView('dashboard');
  updateNavigation();
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = e.currentTarget.dataset.view;
      navigateTo(view);
    });
  });

  // Filtres
  document.getElementById('search-filter').addEventListener('input', applyFilters);
  document.getElementById('status-filter').addEventListener('change', applyFilters);
  document.getElementById('severity-filter').addEventListener('change', applyFilters);
  document.getElementById('category-filter').addEventListener('change', applyFilters);

  // Formulaire
  document.getElementById('incident-form').addEventListener('submit', handleFormSubmit);
  document.getElementById('form-close').addEventListener('click', () => navigateTo('incidents'));
  document.getElementById('form-cancel').addEventListener('click', () => navigateTo('incidents'));

  // Détail
  document.getElementById('detail-back').addEventListener('click', () => navigateTo('incidents'));
  document.getElementById('detail-edit').addEventListener('click', handleEditIncident);
  document.getElementById('detail-delete').addEventListener('click', handleDeleteIncident);

  // Modal
  document.getElementById('confirm-cancel').addEventListener('click', hideConfirmModal);
  document.getElementById('confirm-ok').addEventListener('click', confirmAction);
}

// Navigation
function navigateTo(view) {
  currentView = view;
  showView(view);
  updateNavigation();

  if (view === 'create') {
    editingIncident = null;
    resetForm();
    document.getElementById('form-title').innerHTML = '<i class="fas fa-plus"></i> Nouvel Incident';
  } else if (view === 'incidents') {
    applyFilters();
  }
}

function showView(viewName) {
  Object.values(views).forEach(view => view.classList.remove('active'));
  if (views[viewName]) {
    views[viewName].classList.add('active');
  }
}

function updateNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.view === currentView) {
      link.classList.add('active');
    }
  });
}

// API Calls
async function apiCall(endpoint, options = {}) {
  showLoading();
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur API');
    }

    return data;
  } catch (error) {
    console.error('Erreur API:', error);
    showToast(error.message || 'Erreur de connexion', 'error');
    throw error;
  } finally {
    hideLoading();
  }
}

// Chargement des données
async function loadIncidents() {
  try {
    const response = await apiCall('/incidents');
    incidents = response.data || [];
    filteredIncidents = [...incidents];
    updateDashboard();
    renderIncidentsList();
  } catch (error) {
    console.error('Erreur lors du chargement des incidents:', error);
  }
}

async function loadStats() {
  try {
    const response = await apiCall('/incidents/stats');
    return response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error);
    return { total: 0, open: 0, critical: 0, resolvedToday: 0 };
  }
}

// Dashboard
async function updateDashboard() {
  const stats = await loadStats();
  
  document.getElementById('critical-count').textContent = stats.critical || 0;
  document.getElementById('open-count').textContent = stats.open || 0;
  document.getElementById('resolved-count').textContent = stats.resolvedToday || 0;
  document.getElementById('total-count').textContent = stats.total || 0;

  renderRecentIncidents();
}

function renderRecentIncidents() {
  const container = document.getElementById('recent-incidents-list');
  const recentIncidents = incidents
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (recentIncidents.length === 0) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><h3>Aucun incident récent</h3></div>';
    return;
  }

  container.innerHTML = recentIncidents.map(incident => `
    <div class="incident-card" onclick="viewIncident(${incident.id})">
      <div class="incident-header">
        <div>
          <div class="incident-title">${incident.title}</div>
          <div class="incident-meta">
            <span><i class="fas fa-map-marker-alt"></i> ${incident.location}</span>
            <span><i class="fas fa-clock"></i> ${formatDate(incident.createdAt)}</span>
          </div>
        </div>
        <div class="incident-badges">
          <span class="badge severity-${incident.severity.toLowerCase()}">${incident.severity}</span>
          <span class="badge status-${incident.status.toLowerCase()}">${formatStatus(incident.status)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Liste des incidents
function renderIncidentsList() {
  const container = document.getElementById('incidents-list');
  const countElement = document.getElementById('incident-count');
  
  countElement.textContent = `${filteredIncidents.length} incident${filteredIncidents.length > 1 ? 's' : ''}`;

  if (filteredIncidents.length === 0) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><h3>Aucun incident trouvé</h3><p>Essayez de modifier vos critères de recherche</p></div>';
    return;
  }

  container.innerHTML = filteredIncidents.map(incident => `
    <div class="incident-card" onclick="viewIncident(${incident.id})">
      <div class="incident-header">
        <div style="flex: 1;">
          <div class="incident-title">${incident.title}</div>
          <div class="incident-description">${incident.description}</div>
          <div class="incident-meta">
            <span><i class="fas fa-map-marker-alt"></i> ${incident.location}</span>
            <span><i class="fas fa-user"></i> ${incident.assignedTo}</span>
            <span><i class="fas fa-clock"></i> ${formatDate(incident.createdAt)}</span>
          </div>
        </div>
        <div class="incident-badges">
          <span class="badge severity-${incident.severity.toLowerCase()}">${incident.severity}</span>
          <span class="badge status-${incident.status.toLowerCase()}">${formatStatus(incident.status)}</span>
          <span class="badge" style="background-color: var(--info-color);">Niveau ${incident.emergencyLevel}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Filtres
function applyFilters() {
  const search = document.getElementById('search-filter').value.toLowerCase();
  const status = document.getElementById('status-filter').value;
  const severity = document.getElementById('severity-filter').value;
  const category = document.getElementById('category-filter').value;

  filteredIncidents = incidents.filter(incident => {
    const matchesSearch = !search || 
      incident.title.toLowerCase().includes(search) || 
      incident.description.toLowerCase().includes(search);
    const matchesStatus = !status || incident.status === status;
    const matchesSeverity = !severity || incident.severity === severity;
    const matchesCategory = !category || incident.category === category;

    return matchesSearch && matchesStatus && matchesSeverity && matchesCategory;
  });

  renderIncidentsList();
}

// Formulaire
function resetForm() {
  document.getElementById('incident-form').reset();
  document.querySelector('input[name="emergencyLevel"][value="3"]').checked = true;
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const incidentData = {
    title: formData.get('title'),
    description: formData.get('description'),
    severity: formData.get('severity'),
    category: formData.get('category'),
    location: formData.get('location'),
    assignedTo: formData.get('assignedTo'),
    emergencyLevel: parseInt(formData.get('emergencyLevel'))
  };

  try {
    if (editingIncident) {
      await apiCall(`/incidents/${editingIncident.id}`, {
        method: 'PUT',
        body: JSON.stringify(incidentData)
      });
      showToast('Incident mis à jour avec succès', 'success');
    } else {
      await apiCall('/incidents', {
        method: 'POST',
        body: JSON.stringify(incidentData)
      });
      showToast('Incident créé avec succès', 'success');
    }

    await loadIncidents();
    navigateTo('incidents');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
}

// Détail d'incident
function viewIncident(id) {
  currentIncident = incidents.find(i => i.id == id);
  if (!currentIncident) return;

  renderIncidentDetail();
  showView('detail');
  currentView = 'detail';
}

function renderIncidentDetail() {
  if (!currentIncident) return;

  const container = document.getElementById('incident-detail');
  container.innerHTML = `
    <div class="detail-title">${currentIncident.title}</div>
    <div class="detail-badges">
      <span class="badge severity-${currentIncident.severity.toLowerCase()}">${currentIncident.severity}</span>
      <span class="badge status-${currentIncident.status.toLowerCase()}">${formatStatus(currentIncident.status)}</span>
      <span class="badge" style="background-color: var(--secondary-color);">${currentIncident.category}</span>
      <span class="badge" style="background-color: var(--info-color);">Niveau ${currentIncident.emergencyLevel}</span>
    </div>
    
    <div class="detail-content">
      <div class="detail-description">
        <h3>Description</h3>
        <p>${currentIncident.description}</p>
      </div>
      
      <div class="detail-info">
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <div>
            <strong>Localisation</strong><br>
            ${currentIncident.location}
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-user"></i>
          <div>
            <strong>Assigné à</strong><br>
            ${currentIncident.assignedTo}
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-user-circle"></i>
          <div>
            <strong>Rapporté par</strong><br>
            ${currentIncident.reportedBy}
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-calendar"></i>
          <div>
            <strong>Créé le</strong><br>
            ${formatDate(currentIncident.createdAt)}
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-clock"></i>
          <div>
            <strong>Mis à jour le</strong><br>
            ${formatDate(currentIncident.updatedAt)}
          </div>
        </div>
      </div>
    </div>

    <div class="status-actions">
      <h3><i class="fas fa-tasks"></i> Changer le statut</h3>
      <div class="status-buttons">
        ${['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map(status => `
          <button class="status-btn badge status-${status.toLowerCase()} ${currentIncident.status === status ? 'active' : ''}" 
                  onclick="updateIncidentStatus('${status}')">
            ${formatStatus(status)}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function handleEditIncident() {
  if (!currentIncident) return;
  
  editingIncident = currentIncident;
  populateForm(currentIncident);
  document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Modifier l\'incident';
  showView('form');
  currentView = 'form';
}

function populateForm(incident) {
  document.getElementById('title').value = incident.title;
  document.getElementById('description').value = incident.description;
  document.getElementById('severity').value = incident.severity;
  document.getElementById('category').value = incident.category;
  document.getElementById('location').value = incident.location;
  document.getElementById('assignedTo').value = incident.assignedTo;
  document.querySelector(`input[name="emergencyLevel"][value="${incident.emergencyLevel}"]`).checked = true;
}

async function updateIncidentStatus(status) {
  if (!currentIncident) return;

  try {
    await apiCall(`/incidents/${currentIncident.id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });

    currentIncident.status = status;
    await loadIncidents();
    renderIncidentDetail();
    showToast('Statut mis à jour avec succès', 'success');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
  }
}

// Suppression
function handleDeleteIncident() {
  if (!currentIncident) return;
  
  showConfirmModal(
    'Êtes-vous sûr de vouloir supprimer cet incident ? Cette action est irréversible.',
    () => deleteIncident(currentIncident.id)
  );
}

async function deleteIncident(id) {
  try {
    await apiCall(`/incidents/${id}`, { method: 'DELETE' });
    await loadIncidents();
    navigateTo('incidents');
    showToast('Incident supprimé avec succès', 'success');
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  }
}

// Modal de confirmation
let confirmCallback = null;

function showConfirmModal(message, callback) {
  document.getElementById('confirm-message').textContent = message;
  document.getElementById('confirm-modal').classList.add('active');
  confirmCallback = callback;
}

function hideConfirmModal() {
  document.getElementById('confirm-modal').classList.remove('active');
  confirmCallback = null;
}

function confirmAction() {
  if (confirmCallback) {
    confirmCallback();
  }
  hideConfirmModal();
}

// Loading
function showLoading() {
  document.getElementById('loading').classList.add('active');
}

function hideLoading() {
  document.getElementById('loading').classList.remove('active');
}

// Toast notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  document.getElementById('toast-container').appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// Utilitaires
function formatDate(dateString) {
  return new Date(dateString).toLocaleString('fr-FR');
}

function formatStatus(status) {
  const statusMap = {
    'OPEN': 'Ouvert',
    'IN_PROGRESS': 'En cours',
    'RESOLVED': 'Résolu',
    'CLOSED': 'Fermé'
  };
  return statusMap[status] || status;
}

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
  console.error('Erreur JavaScript:', e.error);
  showToast('Une erreur inattendue s\'est produite', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Promise rejetée:', e.reason);
  showToast('Erreur de connexion au serveur', 'error');
});