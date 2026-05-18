# Movies — Application mobile Films & Séries

## Réalisé par Godefroy HANOT

## Description
Movies est une application mobile développée avec React Native, Expo et TypeScript permettant de consulter un catalogue de films et séries, de gérer ses favoris et de soumettre des recommandations.

## Fonctionnalités réalisées
- **Écran d'accueil** : Statistiques (Total, Films, Séries, Favoris) et navigation rapide.
- **Catalogue** : Liste complète avec recherche (titre, genre, créateur, tags) et filtres (type, genre).
- **Tri** : Possibilité de trier le catalogue par note ou par année (Bonus).
- **Écran Détail** : Informations complètes, résumé et gestion des favoris.
- **Gestion des Favoris** : Ajout/retrait via le bouton coeur, écran dédié "Mes Favoris" et compteur sur l'accueil.
- **Formulaire de Recommandation** : Formulaire complet avec validation (titre, type, genre, année, note, commentaire).

## Installation et lancement
1. Installation des dépendances :
   ```bash
   npm install
   ```
2. Lancement de l'application :
   ```bash
   npx expo start
   ```

## Difficultés rencontrées
- La gestion de l'état global des favoris sans utiliser de librairie externe (Redux/Zustand) a été résolue en utilisant le **React Context API**, ce qui permet de synchroniser les favoris entre le catalogue, les détails et l'écran des favoris.
- Mise en place d'une recherche multi-critères performante utilisant `useMemo`.

## Bonus réalisés
- Tri par note ou année dans le catalogue.
- Compteur de favoris en temps réel sur l'accueil.
- Design soigné avec ombres et badges.
- **Thème Sombre / Clair** : Support complet du mode sombre avec bascule manuelle.

