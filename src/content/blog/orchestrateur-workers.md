---
title: "Orchestrateur thin + workers bornés : le pattern pour les batchs prédictibles"
description: "J'ai migré d'un skill monolithique vers une architecture orchestrateur+workers pour le traitement en lot des entrées logbook. Pourquoi cette architecture gagne sur les N itérations indépendantes."
pubDate: 2026-04-10
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "architecture", "agents"]
---

Il y a trois façons d'architecturer un pipeline batch dans un système AI : un skill avec un mode flag, deux skills séparés, ou un orchestrateur avec des workers. J'ai analysé les trois — et la décision s'est appuyée sur les sources Anthropic "Building Effective Agents".

J'ai migré l'architecture de l'agent de traitement en lot de l'architecture B (skill séparé) vers l'architecture C (orchestrateur + workers) ce jour-là. Un choix qui allait être révisé le lendemain — mais qui m'a appris quelque chose sur les critères qui comptent.

## Les trois architectures et leurs défauts

**Architecture A — mode flag sur agent existant** : l'agent de capitalisation avec un paramètre `--batch`. Rejeté pour une raison précise : contexte non borné. En mode batch, l'agent accumule le contexte de toutes les entrées traitées dans la même fenêtre. Pour 30 entrées, le contexte devient rapidement ingérable.

**Architecture B — skill séparé** : un agent de traitement en lot dédié comme skill distinct avec son propre pipeline. Rejeté parce que c'est de la duplication — les deux skills avaient le même pipeline de traitement par entrée. Modifier la logique d'extraction de claim requérait de modifier deux fichiers.

**Architecture C — orchestrateur + workers** : un agent orchestrateur thin (DISCOVER → FILTER → GATE → LOOP) qui invoque l'agent de capitalisation comme worker pour chaque entrée. Le worker traite une entrée, produit son output, ferme son contexte. L'orchestrateur passe à l'entrée suivante.

## Pourquoi l'architecture C gagnait (à ce stade)

Deux avantages concrets.

**Contexte borné par worker** : chaque worker traite une entrée dans son propre contexte. À la fin du worker, ce contexte est libéré. L'orchestrateur ne s'alourdit pas avec l'historique des entrées précédentes.

**DRY** : la logique de traitement par entrée est dans un seul composant (le worker). L'orchestrateur est thin — il ne connaît pas la logique de traitement, seulement la logique de séquençage.

Le traitement est séquentiel, pas parallèle. La raison : éviter les collisions sur le fichier de tracking. Deux workers parallèles qui écrivent dans le même JSON peuvent corrompre son état.

## Ce que je retiens

L'insight des sources Anthropic que j'ai appliqué ici : la distinction workflows/agents. Un pipeline avec N itérations prédictibles et indépendantes est un workflow — il n'a pas besoin d'un agent dynamique. L'orchestrateur thin + workers est l'implémentation correcte de ce pattern.

Ce n'est pas une décision d'élégance architecturale. C'est une décision de robustesse : contexte borné = moins de risques de dégradation sur les longues exécutions.

Il me semble que cette règle — contexte borné par unité de travail — est l'une des plus importantes dans la conception de pipelines batch AI.

---

Sources consultées
- Anthropic, "Building Effective Agents" — anthropic.com/engineering/building-effective-agents
- la configuration de l'agent de traitement en lot — architecture C
- la configuration de l'agent de capitalisation — worker

