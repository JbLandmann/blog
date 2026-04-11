---
title: "Tracking JSON + filesystem : la redondance qui évite les doublons"
description: "L'agent de traitement en lot cross-référence un fichier JSON et deux dossiers filesystem pour détecter les entrées déjà traitées. Pourquoi cette redondance est intentionnelle."
pubDate: 2026-04-10
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "skills", "batch"]
---

Dans un pipeline batch, la question critique est : comment savoir ce qui a déjà été traité ? Un simple fichier de tracking semble suffisant. Mais un fichier peut être perdu, corrompu, ou absent lors d'une première exécution.

J'ai conçu le tracking de cet agent de traitement en lot avec une redondance intentionnelle : un fichier JSON (le registre de suivi) cross-référencé avec deux sources filesystem (`_review/` et `blog/`).

## Le problème que la redondance résout

Un fichier JSON de tracking a un cycle de vie différent du contenu qu'il référence. Il peut être absent (première exécution), corrompu (écriture partielle), ou perdu (nettoyage involontaire). Dans ces cas, un système qui dépend exclusivement du JSON traitera à nouveau des entrées déjà traitées — et créera des doublons.

La redondance avec le filesystem : même si le JSON est absent ou corrompu, les fichiers déjà produits dans `_review/` et les articles dans `blog/` sont là. En croisant les slugs et titres, le pipeline peut reconstruire la liste des entrées traitées depuis le filesystem seul.

Ce n'est pas une garantie parfaite — un nom de fichier ambigu peut créer un faux négatif. Mais c'est une protection suffisante pour les cas d'échec les plus courants.

## L'architecture du FILTER

Trois sources croisées :

1. **Le registre de suivi** : liste des entrées traitées avec ID, header logbook, fichier review créé, timestamp
2. **`_review/` glob** : slugs des fichiers existants — toute correspondance = potentiellement traité
3. **`blog/` frontmatter title** : correspondances sur le titre — toute correspondance = traité et publié

La priorité va au JSON (source primaire), puis au filesystem si le JSON est absent ou partial.

En cas de corruption du JSON : le recréer depuis zéro en scannant `_review/` + `blog/`. Ce n'est pas parfait mais c'est opérationnel.

## Ce que je retiens

La décision de ne pas persister les IDs dans le JSON seul était consciente. Deux patterns m'ont guidé.

**Premier** : les systèmes de tracking qui dépendent d'une seule source de vérité créent un single point of failure. La redondance contrôlée (JSON + filesystem) est préférable à la fragilité.

**Second** : le filesystem est toujours là. Le JSON peut disparaître. En ancrant une partie du tracking dans le filesystem — via les noms de fichiers produits — le système est résilient à la perte de son état explicite.

Il m'a semblé que c'est une règle générale pour les pipelines batch avec état persistant : toujours avoir une source de vérité filesystem en plus d'une source de vérité structurée. Les deux ensemble sont plus robustes que chacune seule.

---

Sources consultées
- la définition du composant de traitement en lot
- le registre de suivi — fichier de tracking créé lors de la première exécution

