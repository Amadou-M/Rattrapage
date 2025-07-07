FROM nginx:alpine

# Métadonnées
LABEL maintainer="Jurassic Park IT Team"
LABEL description="Frontend pour Jurassic Park Incident Tracker"

# Copier les fichiers statiques
COPY frontend/public /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port
EXPOSE 80

# Commande de démarrage (par défaut de nginx:alpine)
CMD ["nginx", "-g", "daemon off;"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1