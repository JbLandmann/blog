---
title: "L'évaluateur de production IA : évaluer le travail AI, pas l'écosystème ni le code"
description: "J'ai créé l'évaluateur de production IA pour une niche précise : mesurer la qualité du travail AI cumulé sur un projet. Ce qui le distingue des outils d'évaluation existants."
pubDate: 2026-04-03
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "skills", "evaluation"]
---

J'avais déjà deux outils d'évaluation dans l'écosystème quand j'ai créé cet évaluateur de production IA. Ce n'était pas de la redondance — c'était une niche distincte que ni l'un ni l'autre ne couvrait.

L'auditeur d'écosystème évalue l'écosystème lui-même : les skills, les agents, les instructions, les hooks. L'outil de revue de code évalue le code : qualité, dette technique, maintenabilité. Aucun des deux ne répondait à la question : "Le travail AI que j'ai accumulé sur ce projet est-il bon ?"

## La distinction qui compte

"Évaluer le travail AI cumulé" signifie quelque chose de précis : regarder les outputs produits au fil des sessions — code livré, décisions prises, problèmes résolus — et mesurer leur qualité globale.

Ce n'est pas la même chose qu'évaluer le code résultant (l'outil de revue de code fait ça). C'est évaluer la chaîne : est-ce que les bonnes décisions ont été prises ? Est-ce que les livrables sont complets et cohérents ? Est-ce que le travail a eu l'impact attendu ?

Le skill charge les évaluations précédentes pour continuité — il ne repart pas de zéro à chaque session. Les tendances sont visibles : est-ce que la qualité s'améliore ? Est-ce qu'un type d'output est systématiquement faible ?

## Le framework de scoring

Six dimensions, pondérées par phase projet :

- **Correctness** (25%) : le travail fait-il ce qu'il était censé faire ?
- **Completeness** (20%) : tous les aspects du problème ont-ils été adressés ?
- **Consistency** (15%) : les décisions sont-elles cohérentes entre elles ?
- **Craft** (15%) : la qualité d'exécution est-elle au niveau ?
- **Impact** (15%) : le travail a-t-il produit le résultat attendu ?
- **Communication** (10%) : les décisions sont-elles documentées et transmissibles ?

Le scoring est hybride : l'IA propose, l'humain valide. Les dimensions et leurs poids sont adaptables selon la phase — en début de projet, Correctness et Completeness dominent ; en fin de projet, Impact et Communication prennent plus de poids.

Le skill a été validé par le validateur de formulations à 93/100 avec trois améliorations appliquées : input validation, sources manquantes visibles, threshold gate.

## Ce que je retiens

Ce qui m'a guidé dans la conception, c'est la règle de non-duplication. Avant de créer un skill, la question est : est-ce qu'un skill existant couvre déjà ce besoin ? Pas en surface ("il évalue quelque chose") mais en substance ("il évalue cette chose précise, avec ce processus, pour cet utilisateur").

Cet évaluateur de production IA a trouvé sa place parce que la niche était réelle et non couverte. Un quatrième outil d'évaluation qui aurait répété la logique de l'auditeur d'écosystème ou de l'outil de revue de code n'aurait eu aucune valeur.

Il me semble que la clarté sur la niche est la décision de conception la plus importante pour un skill — avant la structure, avant le format, avant les contraintes. Si la niche n'est pas claire, le skill finit soit inutilisé, soit confondu avec un autre.

---

Sources consultées
- la définition de l'évaluateur de production IA (104 lignes)
- la référence de l'évaluateur de production IA (215 lignes)
- Score du validateur de formulations : 93/100

