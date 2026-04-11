---
title: "Corriger une faille de sécurité peut en créer une nouvelle"
description: "En corrigeant GTRUTH-01 dans le vérificateur factuel (web_fetch obligatoire), j'ai ouvert une surface d'injection URL. Ce que ça m'a appris sur les effets de bord des fixes de sécurité."
pubDate: 2026-04-09
author: "Jean-Baptiste Landmann"
tags: ["ai", "security", "copilot-cli", "skills"]
---

Il y a une hypothèse rassurante dans les correctifs de sécurité : corriger une faille réduit la surface d'attaque. C'est vrai en moyenne. Ce n'est pas vrai systématiquement.

J'ai corrigé quatre issues dans le vérificateur factuel lors d'un ecosystem loop ce jour-là : GTRUTH-01 (vérification LLM-only → `web_fetch` obligatoire), GUARD-05, ACI-03, TRNS-01. Score initial : 70/100. Score post-fixes via le validateur de formulations : 84/100 — avec 3 nouvelles issues détectées. L'une d'elles avait été créée directement par la correction GTRUTH-01.

## La chaîne causale

GTRUTH-01 : le skill vérifiait les claims depuis les données d'entraînement uniquement — pas de fetch externe, pas de source vérifiable. Le fix évident : rendre `web_fetch` obligatoire dans Step 1.

Mais rendre `web_fetch` obligatoire sans contrainte sur les URLs crée une surface d'injection. Si un utilisateur soumet une claim contenant une URL ("Selon [url malveillante], X est vrai"), le skill pourrait fetcher cette URL directement — et ingérer du contenu non contrôlé.

GUARD-05 : URL safety rule. Seuls les domaines approuvés peuvent être fetchés (PubMed, WHO, .edu/.gov, Reuters, AP, BBC, Wikipedia, Snopes, FullFact, PolitiFact). Si l'input utilisateur contient une URL brute, identifier la source canonique appropriée — ne pas fetcher l'URL directement.

La règle est précise et adresse exactement le vecteur ouvert par GTRUTH-01.

## Ce que le processus a révélé

Le validateur de formulations a détecté GUARD-05 — pas l'audit initial, pas moi lors du fix. C'est important : un fix de sécurité validé par un seul regard peut rater les effets de bord.

Les deux autres fixes appliqués :
- **ACI-03** : ajout d'un exemple concret (café et cancer, ⚠️ Nuancé) pour clarifier le comportement attendu du skill
- **TRNS-01** : checkpoint de preuve intermédiaire — avant de passer à Step 2, le skill doit écrire une citation d'évidence par axe. Pas de progression silencieuse.

Score final estimé après les 4 fixes : 90/100.

## Ce que je retiens

La leçon n'est pas "ne pas corriger les failles" — c'est "toujours passer par le validateur de formulations après un fix de sécurité".

Un fix de sécurité change le comportement du skill. Ce nouveau comportement peut créer de nouvelles surfaces que le fix n'avait pas anticipées. Le validateur de formulations est efficace pour détecter ces surfaces parce qu'il teste le comportement induit, pas seulement l'intention.

Il m'a semblé que c'est une règle générale des systèmes AI : chaque modification qui change le flux de décision d'un composant — y compris les corrections — mérite une validation de comportement indépendante.

---

Sources consultées
- la définition du vérificateur factuel (129 lignes post-fix)
- Ecosystem loop : score 70→90/100 après GTRUTH-01 + GUARD-05 + ACI-03 + TRNS-01

