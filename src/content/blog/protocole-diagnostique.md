---
title: "Un protocole de diagnostic : ce qui change quand on formalise la méthode"
description: "J'ai créé diagnostic.instructions.md après un score D01 de 2/5 en intelligence diagnostique. Ce que ce protocole change concrètement en session."
pubDate: 2026-03-18
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "diagnostic", "workflow"]
---

Un diagnostic ad-hoc, c'est ce qu'on fait quand on n'a pas de protocole. On cherche une piste, on la teste, on en cherche une autre. C'est séquentiel, non reproductible, et souvent efficace dans les cas simples. Dans les cas complexes, c'est là que ça déraille.

J'avais un score D01 (Intelligence Diagnostique) de 2/5 dans mon évaluation de compétences. Pas parce que les diagnostics échouaient — parce qu'ils étaient aléatoires. Aucune instruction ne guidait la méthode. Le workflow avait un Quality Circuit pour VERIFY, mais rien pour quand VERIFY échoue.

## Ce qui manquait

Le problème avec un diagnostic sans protocole, c'est qu'il est invisible après coup. On ne peut pas l'auditer, on ne peut pas l'améliorer, on ne peut pas transmettre la méthode à une session future.

J'avais trois gaps concrets : pas de croisement multi-sources systématique (je testais une hypothèse à la fois), pas de budget de tool calls (je pouvais explorer indéfiniment), pas de séparation entre "rapporter" et "décider" (le diagnostic contenait souvent déjà la solution recommandée).

Ce dernier point est subtil. Un protocole diagnostique doit rapporter, pas décider. La décision appartient à l'humain — ou à une phase suivante. Quand le diagnostic contient déjà la recommandation, il crée un biais de confirmation : on cherche les preuves qui valident la solution plutôt que les preuves qui valident le problème.

## Ce que j'ai construit

`diagnostic.instructions.md` en 112 lignes, `applyTo: "**"`. Sept corrections post-audit appliquées : feedback loop explicite, budget 5 tool calls, confidence H/M/L calibrée avec critères, live observation en read-only, layer rationale, seuils quantifiés, persistance dans `plan.md`.

Le principe directeur : principes > énumérations. Pas une liste de "que faire en cas de X", mais des règles applicables à toute situation de diagnostic.

Test comportemental post-implémentation : l'agent a suivi le protocole — template de cohérence, ≥3 sources croisées, output structuré. Évaluation : 15/15 critères passés.

## Ce que je retiens

Ce qui m'a le plus surpris, c'est à quel point le score D01 a changé sans que le contenu des diagnostics change radicalement. Le protocole n'a pas rendu les diagnostics plus intelligents — il les a rendus reproductibles.

Un diagnostic reproductible peut être audité. Un diagnostic auditable peut être amélioré. C'est la différence entre une compétence et une procédure — la procédure peut s'améliorer indépendamment du praticien.

Il me semble que formaliser une méthode de diagnostic est l'un des investissements les plus sous-estimés dans un système AI. On optimise les outputs, on affine les prompts, on mesure les scores — mais si la méthode de diagnostic reste ad-hoc, on ne peut pas savoir ce qu'on optimise vraiment.

---

Sources consultées
- Commit `e5fcd4a` — `.github/instructions/diagnostic.instructions.md`
- `projects/competence-projection/` — baseline D01 2/5, évaluation 15/15 critères

