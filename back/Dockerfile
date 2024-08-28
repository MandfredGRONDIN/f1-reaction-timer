# Utiliser une image officielle de Node.js comme image de base
FROM node:20

# Créer un répertoire de travail pour l'application
WORKDIR /usr/src/app

# Copier les fichiers de package et package-lock
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 5001

# Définir la commande pour démarrer l'application
CMD [ "npm", "start" ]
