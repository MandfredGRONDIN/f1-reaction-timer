# Utiliser une image Node.js officielle comme image parent
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Installer un serveur web pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port que l'application utilise
EXPOSE 3000

# Définir la commande par défaut pour démarrer l'application
CMD ["serve", "-s", "build"]
