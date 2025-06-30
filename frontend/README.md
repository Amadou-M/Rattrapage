# Frontend - Jurassic Park Incident Tracker

## 🦕 Description
Interface utilisateur web pour la gestion des incidents du parc Jurassic Park.

## 🚀 Technologies
- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec variables CSS et Grid/Flexbox
- **JavaScript ES6+** - Logique applicative moderne
- **Font Awesome** - Icônes
- **API REST** - Communication avec le backend

## 🎨 Design
- **Thème sombre** inspiré de l'univers Jurassic Park
- **Couleurs principales** : Ambre (#f59e0b), Vert forêt (#065f46)
- **Interface responsive** adaptée mobile et desktop
- **Animations fluides** et micro-interactions
- **Design moderne** avec cartes et badges

## 📋 Fonctionnalités

### Dashboard
- Statistiques en temps réel
- Incidents critiques en évidence
- Incidents récents
- Indicateurs visuels de statut

### Gestion des incidents
- Liste complète avec filtres avancés
- Création et modification d'incidents
- Détail complet avec actions
- Changement de statut en un clic

### Filtres disponibles
- Recherche textuelle
- Statut (Ouvert, En cours, Résolu, Fermé)
- Sévérité (Critique, Élevée, Moyenne, Faible)
- Catégorie (Sécurité, Animal, Système, etc.)

## 🛠️ Installation

### Développement local
```bash
# Servir les fichiers statiques
python -m http.server 3000
# ou
npx serve -p 3000
```

### Configuration
Modifier l'URL de l'API dans `js/app.js` :
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 📱 Responsive Design
- **Mobile First** - Optimisé pour les petits écrans
- **Breakpoints** :
  - Mobile : < 768px
  - Tablet : 768px - 1024px
  - Desktop : > 1024px

## 🎯 Structure des fichiers
```
frontend/
├── public/
│   ├── index.html          # Page principale
│   ├── css/
│   │   └── style.css       # Styles CSS
│   └── js/
│       └── app.js          # Logique JavaScript
└── README.md
```

## 🔧 Fonctionnalités JavaScript

### Navigation SPA
- Gestion des vues sans rechargement
- Historique de navigation
- États de l'application

### API Integration
- Appels REST asynchrones
- Gestion des erreurs
- Loading states
- Toast notifications

### Filtrage dynamique
- Recherche en temps réel
- Filtres combinables
- Mise à jour instantanée

### Formulaires
- Validation côté client
- Soumission asynchrone
- Gestion des erreurs
- Reset automatique

## 🎨 Composants UI

### Cards
- Incidents cards avec hover effects
- Stats cards avec icônes
- Detail cards avec badges

### Modals
- Confirmation de suppression
- Messages d'erreur
- Loading overlay

### Forms
- Inputs stylisés
- Selects personnalisés
- Radio buttons pour niveaux d'urgence
- Validation visuelle

### Navigation
- Menu responsive
- Indicateur de statut système
- Active states

## 🔒 Sécurité
- Échappement des données utilisateur
- Validation côté client
- Gestion sécurisée des erreurs
- Protection XSS basique

## 🐳 Docker
```bash
# Build
docker build -t jurassic-frontend .

# Run
docker run -p 3000:80 jurassic-frontend
```

## 📊 Performance
- CSS optimisé avec variables
- JavaScript modulaire
- Images optimisées
- Lazy loading des données

## 🎯 Accessibilité
- Sémantique HTML5
- Contraste des couleurs respecté
- Navigation au clavier
- Labels appropriés

## 🔄 États de l'application
- **Loading** : Spinner pendant les requêtes
- **Empty** : Messages quand aucune donnée
- **Error** : Gestion des erreurs avec retry
- **Success** : Confirmations d'actions

## 📱 PWA Ready
Structure prête pour conversion en Progressive Web App :
- Service Worker ready
- Manifest.json ready
- Offline capabilities ready