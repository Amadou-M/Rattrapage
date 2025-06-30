FROM nginx:alpine

LABEL maintainer="Jurassic Park IT Team"
LABEL description="Frontend pour Jurassic Park Incident Tracker"

# Copier les fichiers statiques (depuis ./frontend/public)
COPY public /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1
