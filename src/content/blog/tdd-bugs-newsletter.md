---
title: "5 phases TDD, 10 corrections, 0 régression : ce que l'ordre révèle"
description: "381 tests verts, 0 régression. Ce que le TDD en phases séquentielles apporte sur un correctif multi-points — et ce que les tests RED rendent visible avant même la première ligne de code."
pubDate: 2026-03-18
author: "Jean-Baptiste Landmann"
tags: ["tdd", "testing", "engineering", "newsletter"]
---

Dix bugs dans une application, c'est rarement dix problèmes indépendants. Souvent c'est une accumulation — des décisions prises à des moments différents, avec des contextes différents, qui finissent par se contredire.

J'ai corrigé dix bugs dans le projet newsletter ce jour-là. Pas en une passe, pas en ordre de sévérité, mais en cinq phases TDD séquentielles. Le résultat : 381 tests verts, 0 régression, 216 insertions, 46 suppressions.

## Les dix bugs — et pourquoi l'ordre comptait

Les bugs couvraient des couches différentes : counts client-side faux (LIMIT 50 hardcodé), calendrier cassé (array vs map dans les slots), bouton image stub, pipeline dupliqué (double `startPipelineRun`), filtre phantom 'draft', trois handlers sans error handling, toast mensonger.

L'ordre naïf aurait été de corriger par sévérité — les plus critiques d'abord. J'ai choisi un ordre différent : par couche, avec dépendances explicites.

Cinq phases :
1. **count+filter** — corriger les données affichées (fondation)
2. **calendar** — corriger le calendrier (dépend de la couche données)
3. **error handling** — ajouter les guards manquants
4. **image wiring** — connecter le bouton image au pipeline réel
5. **pipeline dedup** — supprimer le double appel

Chaque phase : tests RED d'abord, puis code minimal GREEN, puis nettoyage.

## Ce que le TDD a rendu visible

Deux surprises de la session.

La première : le test RED du calendrier m'a forcé à définir précisément ce qu'est un "slot disponible" — une définition qui n'avait jamais été explicitée dans le code. Le bug `array vs map` était un symptôme. L'absence de définition formelle était la cause. TDD m'a amené à la poser.

La deuxième : en écrivant le test RED pour `pipeline dedup`, j'ai découvert 16 entrées fantômes dans la base de données — des duplicates et des données de test qui polluaient les résultats réels. Un test générique ne les aurait pas détectées. Le test RED les a rendues visibles parce qu'il attendait exactement 1 résultat, pas "au moins 1" — cette précision était la clé.

## Ce que je retiens

Le TDD en phases séquentielles sur un correctif multi-points n'est pas juste une discipline de test — c'est un outil de compréhension.

Chaque phase oblige à comprendre la couche avant d'en corriger une autre. Les tests RED ne se contentent pas de vérifier un comportement — ils forcent à formuler explicitement le comportement attendu, ce qui révèle souvent que ce comportement n'avait jamais été formulé.

C'est là que le TDD apporte le plus sur du code existant : pas dans la sécurité des tests verts, mais dans la clarté que les tests RED imposent avant même d'écrire une ligne de code correctif.

---

Sources consultées
- [Martin Fowler — Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Agile Alliance — TDD Glossary](https://www.agilealliance.org/glossary/tdd/)

