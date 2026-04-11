---
title: "Routing > orchestrateur-workers : quand un seul agent suffit"
description: "J'ai fusionné les modes Single et Batch dans l'agent de capitalisation via un pattern Routing. Ce que ça m'a appris sur la frontière entre routing et orchestration."
pubDate: 2026-04-10
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "architecture", "agents"]
---

Le lendemain d'une migration architecturale, j'ai défait ce que j'avais fait la veille. Pas parce que l'architecture C (orchestrateur + workers) était incorrecte — mais parce qu'elle était inutilement complexe pour ce cas précis.

J'ai supprimé l'agent batch dédié et fusionné les modes Single et Batch dans l'agent de capitalisation via un pattern Routing.

## Le test qui a déclenché la révision

Le test que j'applique pour justifier deux composants séparés : "Si je modifie la logique de traitement, dois-je modifier les deux fichiers ?"

Pour l'architecture C, la réponse était oui. Le pipeline par entrée (extraction de claim → le vérificateur factuel → le composant de mise en forme → dépôt) était présent dans les deux agents — non factorisé. Réponse "oui" → duplication → un seul composant.

## Le pattern Routing

Un seul agent, deux modes : Mode Detection en tête du fichier (date/slug/description → SINGLE ; "tout le logbook"/batch → BATCH), puis les deux modes partagent le même Pipeline par entrée factorisé en section commune.

Ce que le Routing apporte que l'orchestrateur n'apportait pas : pas de double maintenance, pas de synchronisation entre fichiers, pipeline modifiable en un seul endroit.

Ce que l'orchestrateur apportait et que le Routing conserve : la gate humaine unique en mode Batch (présentée une fois, pas pour chaque entrée), le summary final, la boucle de progression.

## Quand l'orchestrateur reste justifié

La distinction que j'ai dégagée de cette session :

**Routing** : les sous-tâches sont identiques ou très proches. Le même pipeline s'applique, seul le contexte de départ change. Un seul composant avec une logique de branchement.

**Orchestrateur-workers** : les sous-tâches sont fondamentalement différentes — soit en type d'opération, soit en domaine de compétence. Un agent expert par sous-tâche, coordonnés par un orchestrateur.

Pour cet agent, les sous-tâches étaient identiques : Single et Batch exécutaient le même pipeline. L'orchestrateur n'ajoutait que de la complexité structurelle.

## Ce que je retiens

Il y a quelque chose d'inconfortable dans le fait de défaire une décision architecturale le jour suivant. Mais c'est exactement ce que le test "dois-je modifier les deux fichiers ?" est censé révéler.

Il m'a semblé que la valeur d'un critère de décision explicite n'est pas dans sa sophistication, mais dans sa capacité à trancher rapidement sur un cas concret. Un test en une phrase qui prend 10 secondes vaut plus qu'une analyse architecturale qui prend une heure.

Et parfois, la meilleure décision architecturale est celle qu'on peut défaire proprement le lendemain.

---

Sources consultées
- la configuration de l'agent de capitalisation — 124 lignes, pattern Routing
- `ai-vault/_review/guide-decisions-architecturales-agents.md`
- Anthropic, "Building Effective Agents" — workflows vs agents

