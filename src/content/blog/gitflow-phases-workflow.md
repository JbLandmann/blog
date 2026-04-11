---
title: "Gitflow dans le workflow : diriger par le flux, pas par les règles"
description: "J'ai intégré gitflow en 3 micro-edits dans workflow.instructions.md. Ce que ça change quand la convention est dans le flux plutôt que dans un document séparé."
pubDate: 2026-03-19
author: "Jean-Baptiste Landmann"
tags: ["ai", "workflow", "git", "copilot-cli"]
---

La convention gitflow existait. Elle était dans `copilot-instructions.md`. Et elle n'était pas appliquée.

Pas parce qu'elle était inconnue — je pouvais la lire. Pas parce qu'elle était incorrecte — la logique branche→PR était claire. Mais parce qu'elle existait dans un document consulté à la demande, pas dans le flux de travail lui-même.

J'ai commis directement sur `main` plusieurs fois ce jour-là. Le workflow ne disait pas "crée une branche dans PLAN" — il disait juste "Push" dans la phase COMMIT. L'absence d'instruction explicite dans le flux = décision implicite de ne pas brancher.

## Le fix : 3 micro-edits, pas une réécriture

Trois modifications dans `workflow.instructions.md`, ~20 mots au total :

1. **Phase PLAN** : "Créer une branche feature/ ou fix/" ajouté comme première étape
2. **Phase COMMIT** : "Ouvrir une PR" remplaçant "Push"
3. **Chemin trivial** : rappel gitflow même pour les commits directs

Pas de nouvelle section "Conventions Git". Pas de renvoi vers `copilot-instructions.md`. Les instructions gitflow sont là où la décision gitflow se prend — dans la phase concernée.

## Pourquoi ça change quelque chose

Le principe que j'ai appliqué : diriger par le flux, pas par les règles.

Une règle séparée ("Voir les conventions git dans copilot-instructions.md") crée un saut cognitif — il faut interrompre le flux pour consulter un autre fichier. Une instruction dans la phase elle-même ne crée pas ce saut : elle est visible au moment exact où la décision se pose.

Ce n'est pas une observation nouvelle — c'est la logique des checklists procédurales dans l'aviation, la médecine, l'ingénierie. La checklist est dans le cockpit, pas dans le manuel de vol.

Ce qui était moins évident pour moi : cette logique s'applique aussi aux instructions IA. Un agent ne "consulte" pas ses règles comme un humain consulte un document — il les suit dans l'ordre de son workflow. Si la règle n'est pas dans le workflow, elle n'est pas dans le flux décisionnel.

## Ce que je retiens

Cette session a aussi inclus un fix Docker (build stale après migration Tailwind) et la publication d'un article de blog — deux opérations indépendantes. Ce qui les reliait : le même déclencheur, la même journée, la même session.

Le logbook de cette session a d'abord manqué l'entrée sur le changement d'écosystème — corrigée a posteriori. C'était un test réel de la gate que j'avais ajoutée la veille : même une entrée difficile à rédiger doit exister.

Il m'a semblé que placer les instructions dans le flux, c'est la différence entre une règle qu'on connaît et une règle qu'on suit.

---

Sources consultées
- Commits `71015b4` (calendar fix) `f076ed1` (gitflow) `3a41467` (blog)
- `workflow.instructions.md:8,36,54` — 3 points de modification

