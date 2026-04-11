---
title: "Quand un guardrail devient une bombe à retardement"
description: "J'ai migré un hook de sécurité inline vers un script externe. Pas par préférence esthétique — par nécessité. Ce que ça m'a appris sur la maintenabilité des guardrails dans un écosystème AI."
pubDate: 2026-03-26
author: "Jean-Baptiste Landmann"
tags: ["ai", "security", "guardrails", "copilot-cli", "agentic"]
---

Il y a des décisions qu'on prend par principe. Et d'autres qu'on prend parce qu'on n'a plus le choix.

J'avais ajouté un hook `preToolUse` sur `web_fetch` pour bloquer les URLs hors-allowlist. L'idée : empêcher un agent de fetcher n'importe quelle URL externe, et se protéger contre l'injection de prompts via contenu distant. Simple, nécessaire.

Au départ, la logique tenait dans le JSON de configuration. Quelques dizaines de caractères, un test regex, un `approve`/`block`. Ça fonctionnait.

## Le moment où l'inline devient un piège

La complexité a augmenté progressivement. Sous-domaines à autoriser. Cas de fallback si l'URL est invalide. Logique différente selon que l'outil est `web_fetch` ou un appel shell.

À chaque ajout, j'ai dû échapper des guillemets dans du JSON, dans une chaîne PowerShell, dans un hook qui s'exécute dans un contexte dont je ne contrôle pas entièrement l'interpréteur. Le résultat : un one-liner de 400 caractères impossible à lire, et une variable nommée `$input` qui s'est révélée réservée en PowerShell — le script s'exécutait sans erreur, mais ne faisait rien.

Ce n'est pas un bug facilement détectable. C'est le pire type : silencieux, cohérent en apparence, défaillant en pratique.

## Ce que j'ai changé — et pourquoi ça tient

J'ai migré la logique dans des scripts externes — un `.ps1` pour Windows, un `.sh` pour les environnements Unix. Le fichier de configuration ne contient plus qu'une référence courte vers ces scripts.

```json
{
  "preToolUse": {
    "script": ".github/hooks/scripts/pre-tool-use.ps1"
  }
}
```

La config déclare *quoi* surveiller. Le script sait *comment* le faire. Cette frontière de responsabilité n'est pas nouvelle — c'est le principe de séparation des préoccupations, formulé par Dijkstra en 1974 : "nothing is gained by tackling various aspects simultaneously."

Ce qui change concrètement : le script est testable en isolation. Je peux lui passer une URL et observer la sortie sans relancer un agent complet. Je peux le lire. Je peux l'auditer.

## Ce que je retiens

Un guardrail qu'on ne peut plus lire est un guardrail qu'on ne peut plus maintenir. Et un guardrail qu'on ne peut plus maintenir, on finit par le commenter, le contourner, ou l'ignorer.

Il me semble que la sécurité dans un écosystème AI suit la même courbe que partout ailleurs : elle tient tant qu'elle reste simple à comprendre. Dès qu'elle devient opaque — même pour une bonne raison — elle commence à se dégrader.

La migration vers des scripts externes n'était pas une refactorisation esthétique. C'était la condition pour que ce guardrail reste honnête.

---

Sources consultées
- en.wikipedia.org/wiki/Separation_of_concerns — principe SoC, Dijkstra 1974
