# Contexte — publication d'un article

Ce projet publie des articles via la collection `blog` d'Astro.

## Emplacement d'un article

- Créer ou modifier un fichier dans `src/content/blog/`
- Le nom du fichier devient le `slug` public de l'article
- URL publique attendue : `/blog/<slug>/`

## Frontmatter attendu

Chaque article doit respecter le schema défini dans `src/content/config.ts` :

```md
---
title: Mon titre
description: Résumé court pour la liste, le SEO et le flux RSS
pubDate: 2026-04-11
updatedDate: 2026-04-12 # optionnel
author: Jean-Baptiste Landmann # optionnel, valeur par défaut déjà définie
image:
  src: /blog/meta_img.png # optionnel
  alt: Description de l'image
tags:
  - ai
  - automation
draft: false
---
```

## Règles de publication

- `draft: true` => l'article reste hors liste, hors RSS et hors pages publiées
- `draft: false` => l'article est inclus sur la page d'accueil, dans le flux RSS et dans le build statique
- Le filtrage des brouillons passe par `getPublishedPosts()` dans `src/lib/content.ts`

## Vérifications locales

Avant publication :

1. Ajouter ou mettre à jour l'article dans `src/content/blog/`
2. Lancer `npm run build`
3. Lancer `npm exec vitest run`
4. Vérifier visuellement le rendu avec `npm run preview`

## Déploiement

- Le site est généré statiquement avec Astro
- Le déploiement se fait depuis `main`
- D'après le README du projet : **push sur `main` => GitHub Actions build + deploy automatique**

## Effets automatiques

Quand un article publié est ajouté :

- il apparaît dans la liste d'articles de la page d'accueil
- il est exposé dans `rss.xml`
- il est inclus dans le sitemap
- ses métadonnées SEO sont générées pendant le build
