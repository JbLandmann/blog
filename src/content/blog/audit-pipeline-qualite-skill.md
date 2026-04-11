---
title: "Comment j'audite un skill : du score 70 à 97 en trois passes"
description: "Audit → fix → ingénieur de prompts → validateur de formulations. Ce pipeline de qualité pour les skills Copilot CLI et ce que chaque passe apporte."
pubDate: 2026-03-18
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "quality", "skills"]
---

J'ai créé le rédacteur de blog et corrigé le guide CLI ce jour-là. Deux skills, deux pipelines de qualité complets. Ce que j'ai appris sur le processus lui-même est plus intéressant que le contenu des fixes.

Le pipeline s'est révélé en trois passes distinctes, chacune avec un rôle précis et un gain mesurable.

## Pourquoi un audit seul ne suffit pas

Le guide CLI avait un score de 77/100 au premier audit — pas catastrophique, mais clairement insuffisant. Les gaps identifiés : absence de quality scoring, pas de feedback loop, pas de self-test scenarios, pas de security gates.

Corriger ces gaps directement aurait été ma première intuition. J'ai plutôt choisi de déléguer la correction à l'ingénieur de prompts, puis de faire valider par le validateur de formulations. La différence : l'audit identifie les gaps, mais il n'optimise pas la formulation des corrections. C'est un travail différent.

## Les trois passes

**Passe 1 — Audit agentique** : mesurer le score initial, identifier les gaps par principe (EVAL, GUARD, ACI, etc.). Résultat : liste de findings priorisés, score de départ.

**Passe 2 — Ingénieur de prompts** : reformuler les sections corrigées pour optimiser la précision des instructions. L'ingénieur de prompts ne crée pas de contenu nouveau — il restructure ce qui existe pour qu'un agent l'interprète correctement. Pour le rédacteur de blog, la délégation à l'ingénieur de prompts a produit 250 lignes optimisées depuis mes 207 lignes initiales.

**Passe 3 — Validateur de formulations** : validation indépendante. Le validateur de formulations a détecté sur le rédacteur de blog que je disais "mentally check" là où il fallait lire le fichier `config.ts` réel — une instruction vague qui laissait place à l'improvisation. Corrigée. Score post-validation : 89/100, score projeté final : 97/100.

Ce qui m'a surpris : le FT a trouvé des issues que le PE n'avait pas vues. Les deux outils ont des angles différents — PE optimise la formulation, FT teste le comportement induit.

## Ce que je retiens

Un skill qui passe par les trois passes converge systématiquement vers un score élevé (>90). Un skill corrigé directement, sans ingénieur de prompts ni validateur de formulations, reste souvent en dessous de 85 parce que les corrections sont logiquement correctes mais formulées de façon sous-optimale.

Le pipeline complet coûte plus de temps qu'un fix direct. Il en vaut la peine pour les skills à haute fréquence d'usage — ceux qu'on invoque plusieurs fois par session. Pour un skill anecdotique, un fix direct suffit.

Il m'a semblé que la vraie valeur du pipeline, c'est sa reproductibilité. Audit→PE→FT produit des résultats prévisibles, indépendamment du contenu du skill. C'est un processus, pas une intuition.

---

Sources consultées
- la définition du guide CLI : 77→85.5→92.5 (projeté)
- la définition du rédacteur de blog : 81 (ingénieur de prompts) → 89 (validateur) → 97 (projeté), 207→250→266 lignes

