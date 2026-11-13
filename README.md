# Cin-Track

Application web qui permet de parcourir un catalogue de films et séries, de rechercher, filtrer, paginer et sauvegarder ses favoris.

**Démo :** [https://cin-track-five.vercel.app/]  
**Repo :** [https://github.com/lyasi06/Cin-Track]

---

## Fonctionnalités

- Récupération des données depuis une API JSON
- Affichage des cards (image, titre, année, type)
- Recherche par titre
- Filtre par type (Film / Série)
- Pagination (8 titres par page)
- Modal avec détails (genres, description, réalisateurs, pays, durée/saisons)
- Ajout / retrait de favoris (sans doublon)
- Persistance des favoris avec `localStorage`
- Compteur de films et séries favoris
- Interface responsive (Tailwind CSS)

---
## Comment ça marche
1. Au chargement, api.js récupère les données de l'API.

2. ui.js affiche les cards dans la grille.

3. La recherche et le filtre sont appliqués dans cet ordre : recherche → filtre → pagination.

4. Un clic sur une card ouvre la modal avec tous les détails.

5. Un clic sur le cœur ajoute ou retire le titre des favoris.

6. Les favoris sont sauvegardés dans localStorage et restent après actualisation.

7. La sidebar affiche les favoris avec un compteur de films et de séri

---

## Technologies utilisées

| Technologie | Usage |
|---|---|
| **HTML5** | Structure de la page |
| **Tailwind CSS** | Styling et responsive |
| **JavaScript (ES6 modules)** | Logique applicative |
| **Fetch API** | Récupération des données |
| **localStorage** | Sauvegarde des favoris |

---

## API utilisée
1. Les données proviennent de :
[https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json]

---

## Ressources & documentation
1. MDN Web Docs — fetch, localStorage, Array methods

2. Tailwind CSS — tailwindcss.com/docs

3. YouTube — chaînes et tutoriels sur JavaScript / fetch / modules ES6

4. Google — recherches ponctuelles pour résoudre des bugs

5. Stack Overflow — solutions à des erreurs rencontrées

## Auteur
[ABDERRAHMANE LYASI].
