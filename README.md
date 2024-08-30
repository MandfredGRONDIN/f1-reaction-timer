# Projet Réaction Timer

Ce projet est un jeu de réaction qui mesure le temps de réaction des joueurs. Il affiche un compte à rebours, puis les joueurs doivent cliquer sur un bouton dès que possible pour arrêter le chronomètre. Le temps de réaction est ensuite enregistré et affiché.

## Fonctionnalités

-   **Compte à rebours dynamique** : Préparez-vous avant que le signal visuel n'apparaisse.
-   **Chronomètre précis** : Mesurez votre temps de réaction à la milliseconde près.
-   **Enregistrement des résultats** : Vos temps de réaction sont sauvegardés et accessibles depuis votre tableau de bord personnel.
-   **Interface utilisateur claire** : Navigation simple et intuitive.

## Installation

1. Clonez ce dépôt 
```
git clone https://github.com/MandfredGRONDIN/f1-reaction-timer.git
```
2. Accédez au dossier cloné en utilisant la commande `cd f1-reaction-timer`.

3. Créez un fichier .env comme le fichier .env.sample

4. Lancez le docker en utilisant la commande `docker-compose up --build`

5. Accédez à l'interface depuis l'adresse `http://localhost:3000/`

## Utilisation

**1. Inscription :**

-   Créez votre profil en accédant à la page d'inscription via le lien Register.

**2. Connexion :**

-   Connectez-vous avec vos identifiants en utilisant le lien Login.

**3. Tester votre temps de réaction :**

-   Accédez à la page Try the F1 Reaction Timer pour commencer le test.
-   Cliquez sur le bouton Start F1 Reaction Timer pour démarrer le compte à rebours.

**4. Mesurer votre réaction :**

-   Attendez que les quatre boutons passent au vert, puis cliquez sur Stop Timer dès que possible.

**5. Consulter vos scores :**

-   Retournez à l'accueil, puis accédez à la page View Your Reaction Times pour voir l'historique de vos temps de réaction enregistrés.
