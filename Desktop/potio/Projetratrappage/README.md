# Jurassic Park Incident Tracker

## 🦕 Description
Système de gestion d'incidents pour le parc Jurassic Park avec architecture complète full-stack, containerisation Docker et déploiement Kubernetes sur AWS.

## 🏗️ Architecture
- **Frontend**: HTML/CSS/JavaScript vanilla
- **Backend**: Node.js avec Express
- **Base de données**: MySQL
- **Containerisation**: Docker & Docker Compose
- **Orchestration**: Kubernetes
- **Cloud**: AWS (EKS, RDS, S3)
- **CI/CD**: GitHub Actions

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- Docker & Docker Compose
- kubectl (pour Kubernetes)
- AWS CLI (pour déploiement cloud)

### Installation locale
```bash
# Cloner le projet
git clone <repo-url>
cd jurassic-park-incident-tracker

# Démarrer avec Docker Compose
docker-compose up -d

# Accéder à l'application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Base de données: localhost:3306
```

### Variables d'environnement
Copier `.env.example` vers `.env` et configurer:
```bash
cp .env.example .env
```

## 📁 Structure du projet
```
jurassic-park-incident-tracker/
├── backend/           # API Node.js
├── frontend/          # Interface utilisateur
├── docker/           # Fichiers Docker
├── k8s/              # Manifestes Kubernetes
├── aws/              # Configuration AWS
├── .github/workflows/ # CI/CD
└── docs/             # Documentation
```

## 🔧 Développement
Voir les README spécifiques dans chaque dossier pour les détails de développement.

## 🚀 Déploiement
- **Local**: Docker Compose
- **Production**: Kubernetes sur AWS EKS
- **CI/CD**: GitHub Actions automatisé

## 📊 Monitoring
- Logs centralisés
- Métriques de performance
- Alertes en temps réel

## 🔒 Sécurité
- Authentification JWT
- Chiffrement des données
- Audit des actions

## 📞 Support
Pour toute question, consulter la documentation dans `/docs/`