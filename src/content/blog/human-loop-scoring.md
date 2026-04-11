---
title: "Human-in-the-loop scoring : évaluer sans déléguer le jugement"
description: "J'ai créé un agent de comparaison de versions autonome avec validation humaine. Ce que ce pattern révèle sur l'évaluation qualitative dans un pipeline AI."
pubDate: 2026-04-09
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "agents", "evaluation"]
---

Évaluer la qualité d'un output AI est un problème difficile. Un agent peut scorer automatiquement — mais son jugement est lui-même potentiellement biaisé. Un humain peut valider — mais il perd l'avantage de l'automatisation.

J'ai créé cet agent de comparaison de versions ce jour-là, un agent qui combine les deux : exécution autonome sur les 5 dimensions d'évaluation, puis gate humaine pour valider les scores avant synthèse.

## Ce que l'agent fait

Le pipeline en 5 étapes : LOAD (v1+v2+prompt) → EXECUTE (exécution in-context) → AI SCORE (5 dimensions D1-D5, justification par note) → HUMAN GATE (scores utilisateur) → SYNTHESIZE (ce qui change, recommandation).

Deux composants structurels accompagnent l'agent : `rubric.md` (grille réutilisable D1-D5) et `results/template.md` (format standardisé AI+human+synthèse).

**In-context execution** : l'agent applique les instructions du fichier de définition mentalement sur le même prompt — il ne swape pas physiquement les fichiers. Ce qui est testé : la qualité des instructions, pas l'infrastructure. Le script d'intégration reste disponible comme fallback pour des tests d'intégration complets.

## La décision clé : où placer la gate humaine

J'aurais pu demander à l'humain de valider en Step 1 (choix des dimensions à évaluer) ou en Step 5 (validation de la recommandation finale). J'ai choisi Step 4 — après le scoring AI, avant la synthèse.

La raison : en Step 4, l'humain voit les scores proposés par l'agent sur chaque dimension. Il peut les valider, les ajuster, ou les rejeter. La synthèse finale intègre alors les deux jugements — pas seulement celui de l'agent.

Si la gate était en Step 5, l'humain ne verrait que la recommandation finale — pas les scores intermédiaires qui l'ont produite. Ce serait une validation de surface, pas une validation de fond.

## Ce que le pattern révèle

Human-in-the-loop scoring est applicable à tout pipeline d'évaluation qualitative : comparer deux versions d'un document, évaluer deux approches d'architecture, noter la qualité de deux réponses.

Le pattern fonctionne parce qu'il sépare ce que l'agent fait bien (traiter et structurer beaucoup d'information rapidement) de ce que l'humain fait bien (juger la qualité sur des dimensions qui requièrent du contexte et de l'expérience).

Ce n'est pas un compromis — c'est une composition. L'agent ne remplace pas le jugement humain. Il le prépare.

Il m'a semblé que c'est l'une des architectures les plus intéressantes à explorer dans les systèmes AI : pas l'automatisation totale, pas la supervision totale, mais la composition précise des deux selon ce que chacun fait mieux.

---

Sources consultées
- la configuration de l'agent de comparaison de versions — commit `4e07150`
- `~/.copilot/version_test/rubric.md`
- `~/.copilot/version_test/results/template.md`

