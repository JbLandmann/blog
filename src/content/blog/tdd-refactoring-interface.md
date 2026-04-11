---
title: "TDD sur du code existant : l'ordre compte"
description: "Refactorer sous TDD ne signifie pas réécrire les tests. Ça signifie les écrire dans le bon ordre — avant de déplacer le code, pas après."
pubDate: 2026-03-17
author: "Jean-Baptiste Landmann"
tags: ["tdd", "refactoring", "testing", "engineering"]
---

Il y a une question que je me pose à chaque session de refactoring sous TDD : quand est-ce que j'écris les nouveaux tests ? Avant de déplacer le code ? Après ? En même temps ?

J'ai travaillé sur l'extension de monitoring de session ce jour-là — extraction d'un pipeline : `eventRole`, `filterRelevantEvents`, `normalizeQuota`, `eventsToTurns`. Quatre fonctions à extraire d'un handler monolithique. Quarante-huit tests verts à la fin. Zéro régression.

## Le contexte : un handler qui faisait tout

L'extension de monitoring de session avait un problème classique : toute la logique de traitement des événements était inline dans le handler principal. Impossible à tester unitairement, difficile à lire, encore plus difficile à modifier sans casser quelque chose.

L'objectif était clair — extraire chaque étape dans sa propre fonction. Mais extraire du code existant sous TDD soulève une question d'ordre qu'on ne se pose pas souvent explicitement.

## Ce que j'ai fait — et dans quel ordre

J'ai écrit les tests RED pour les nouvelles fonctions extraites **avant** de déplacer le code.

Pas des tests sur le handler existant. Des tests sur les interfaces cibles — les signatures que j'allais exposer. Je testais `filterRelevantEvents(events, role)` avant même que cette fonction existe dans le fichier.

Le résultat : les tests RED définissaient le contrat public. Quand j'ai ensuite déplacé le code existant dans ces nouvelles fonctions, les tests sont passés au vert — parce que le code faisait déjà exactement ce que les tests décrivaient.

Ce qui m'a frappé, c'est que **aucun test existant n'a cassé**. Le handler principal appelait maintenant des fonctions extraites plutôt qu'une logique inline — mais son interface publique n'avait pas changé. Les tests de bout en bout ne voyaient pas la différence.

Martin Fowler formule ça clairement dans *Refactoring* (2018) : "Make sure you have a solid suite of tests before you begin." Ce que j'ai compris en pratique, c'est que "before you begin" signifie avant de déplacer le code — pas avant la session entière.

## Ce que je retiens

Le TDD sur du refactoring existant ne ressemble pas au TDD sur du code nouveau. On ne part pas de zéro. On a un comportement existant qu'il faut préserver.

Le pattern que j'ai appliqué :
1. Identifier les fonctions à extraire et leurs interfaces cibles
2. Écrire les tests RED sur ces interfaces — pas sur l'implémentation actuelle
3. Déplacer le code existant pour satisfaire les tests

Ce qui garantit la sécurité du refactoring, c'est de tester l'interface, pas la structure interne. Tant que le contrat public est préservé — signatures, comportements observables, valeurs de retour — aucun test existant ne régresse.

Ça transforme le refactoring d'une opération anxiogène en une démarche mécanique. Les tests deviennent un filet de sécurité réel, pas juste une bonne intention.

---

Sources consultées
- Martin Fowler, *Refactoring: Improving the Design of Existing Code*, 2e éd. Addison-Wesley, 2018
- Kent Beck, *Test-Driven Development by Example*, Addison-Wesley, 2003
