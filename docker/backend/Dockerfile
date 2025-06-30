FROM node:18-alpine

LABEL maintainer="Jurassic Park IT Team"
LABEL description="Backend API pour Jurassic Park Incident Tracker"

WORKDIR /app

# Copier les fichiers de dépendances depuis le contexte (./backend)
COPY package*.json ./

# Installer les dépendances en production
RUN npm ci --only=production && npm cache clean --force

# Copier le code source depuis ./backend/src vers /app/src dans le container
COPY src ./src

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Changer la propriété des fichiers au nouvel utilisateur
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "src/index.js"]

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"
