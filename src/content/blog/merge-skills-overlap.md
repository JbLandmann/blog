---
title: "Quand fusionner deux skills : la règle des 70%"
description: "J'ai fusionné un skill redondant dans le créateur de contenu après un audit d'overlap à 70%. Ce que cette fusion révèle sur les critères de consolidation d'un écosystème AI."
pubDate: 2026-03-18
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "skills", "architecture"]
---

Six skills d'écriture dans l'écosystème. Est-ce que c'est trop ? La réponse n'est pas dans le nombre — elle est dans les matrices d'overlap.

J'ai mandaté l'agent architecte pour analyser les 6 writer skills : le rédacteur de blog, le créateur de contenu LinkedIn, le rédacteur de commentaires LinkedIn, le transformateur d'articles, le rédacteur de cours, et l'agent de logbook. Une question précise : quels pairs partagent suffisamment de logique pour mériter une fusion ?

## L'analyse d'overlap

Le résultat était clair sur un seul pair : le transformateur d'articles ↔ le créateur de contenu LinkedIn à **70% d'overlap**. Format de sortie identique, rubrique de scoring partagée, règles de sécurité identiques. Deux skills qui produisaient exactement le même type d'output avec des variations mineures de déclencheur.

Tous les autres pairs : moins de 15% d'overlap. Le rédacteur de blog et le rédacteur de cours ? Zéro structure partagée — l'un produit des articles réflexifs en markdown Astro, l'autre produit des modules pédagogiques avec objectifs Bloom.Même s'ils "écrivent tous les deux", leurs domaines sont fondamentalement différents.

## Ce que j'ai fait — et ce que j'ai rejeté

J'ai fusionné le transformateur d'articles dans le créateur de contenu LinkedIn : section "Article Transformation" ajoutée (~120 lignes), routing dual-mode, deux rubriques de scoring. 247→419 lignes. Validé par l'ingénieur de prompts (89/100) puis le validateur de formulations (93.5/100).

J'ai explicitement rejeté deux alternatives :

**Le méga-skill écrivain** : fusionner tous les skills d'écriture en un seul composant. Rejeté pour context bloat — 900 lignes pour écrire un commentaire LinkedIn de 3 phrases, et une description router qui s'effondre sur elle-même.

**La fusion par paires de domaine** : fusionner le rédacteur de blog et le rédacteur de cours. Rejeté parce que leur overlap structurel est nul — fusionner c'est créer de la confusion, pas simplifier.

Le transformateur d'articles a été supprimé entièrement — dossier effacé, références cross-écosystème mises à jour dans 6 fichiers.

## Ce que je retiens

La règle que j'ai dégagée de cette session : **70% d'overlap = merge obligatoire. <15% = domaines distincts, ne pas toucher.**

Ce qui est trompeur avec les skills d'écriture, c'est qu'ils semblent similaires en surface (ils "écrivent"). La question n'est pas "est-ce qu'ils font la même chose ?" mais "est-ce qu'ils ont la même logique interne ?" — format de sortie, processus de validation, règles de sécurité, scoring.

Un méga-skill répondrait à la question "est-ce qu'ils écrivent ?" par Oui et fusionnerait tout. Un écosystème bien structuré répond à la question "est-ce que leur logique interne est identique ?" et ne fusionne que ce qui doit l'être.

Il m'a semblé que c'est la distinction qui compte : fusionner pour simplifier la logique, pas pour réduire le nombre de fichiers.

---

Sources consultées
- `WRITER_SKILLS_CONSOLIDATION_ANALYSIS.md` — analyse architecte
- la définition du créateur de contenu LinkedIn — validation par le validateur de formulations à 93.5/100

