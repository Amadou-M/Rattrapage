# Backend API - Jurassic Park Incident Tracker

## 🦕 Description
API REST Node.js pour la gestion des incidents du parc Jurassic Park.

## 🚀 Technologies
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Base de données**: MySQL 8.0
- **Authentification**: JWT
- **Validation**: express-validator
- **Sécurité**: Helmet, CORS, Rate Limiting

## 📋 Prérequis
- Node.js 18+
- MySQL 8.0+
- npm ou yarn

## 🛠️ Installation

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration
Copier `.env.example` vers `.env` et configurer:
```bash
cp .env.example .env
```

### 3. Base de données
```bash
# Créer la base de données
mysql -u root -p < database/init.sql
```

### 4. Démarrage
```bash
# Développement
npm run dev

# Production
npm start
```

## 📚 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `GET /api/auth/verify` - Vérification du token

### Incidents
- `GET /api/incidents` - Liste des incidents (avec filtres)
- `GET /api/incidents/:id` - Détail d'un incident
- `POST /api/incidents` - Créer un incident (auth requis)
- `PUT /api/incidents/:id` - Modifier un incident (auth requis)
- `PATCH /api/incidents/:id/status` - Changer le statut (auth requis)
- `DELETE /api/incidents/:id` - Supprimer un incident (auth requis)
- `GET /api/incidents/stats` - Statistiques du dashboard

### Santé
- `GET /health` - Status de l'API

## 🔐 Authentification
L'API utilise JWT pour l'authentification. Inclure le token dans l'en-tête:
```
Authorization: Bearer <token>
```

### Utilisateurs de test
- **admin** / admin123 (Administrateur)
- **muldoon** / admin123 (Sécurité)
- **arnold** / admin123 (Maintenance)
- **sattler** / admin123 (Médical)

## 📊 Filtres disponibles
- `status`: OPEN, IN_PROGRESS, RESOLVED, CLOSED
- `severity`: LOW, MEDIUM, HIGH, CRITICAL
- `category`: SECURITY, ANIMAL, SYSTEM, WEATHER, MEDICAL, OTHER
- `location`: Recherche partielle
- `assignedTo`: Recherche partielle
- `search`: Recherche dans titre et description

## 🧪 Tests
```bash
npm test
```

## 📝 Logs
Les logs sont affichés dans la console avec Morgan en mode `combined`.

## 🔒 Sécurité
- Helmet pour les en-têtes de sécurité
- CORS configuré
- Rate limiting (100 req/15min par IP)
- Validation des données d'entrée
- Hachage des mots de passe avec bcrypt

## 🐳 Docker
```bash
# Build
docker build -t jurassic-backend .

# Run
docker run -p 5000:5000 jurassic-backend
```