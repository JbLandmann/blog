---
title: "Le vérificateur factuel : la niche entre fact-checker et éditeur"
description: "J'ai créé le vérificateur de claims pour transformer une idée brute en micro-article sourcé. Ce qui le distingue des skills existants et pourquoi cette niche méritait son propre composant."
pubDate: 2026-04-09
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "skills", "content"]
---

Quand on crée un skill, la première question n'est pas "comment le faire ?" mais "est-ce qu'il doit exister ?". J'avais déjà le curateur de sources (trouver et évaluer des sources) et le réviseur d'articles (améliorer un texte existant). Est-ce qu'un skill pour transformer une idée brute en article faisait double emploi ?

La réponse était non — et la distinction méritait d'être précise.

## Trois niches adjacentes

Le curateur de sources part de sources pour construire une liste de lecture. Il ne produit pas d'article — il produit une curation.

Le réviseur d'articles part d'un texte existant pour l'améliorer. La matière première est déjà là.

Le vérificateur de claims part d'une idée brute — une affirmation, un claim, parfois une simple question.Il n'y a pas de sources déjà identifiées, pas de texte à améliorer. Il faut d'abord vérifier si l'idée tient, puis la positionner, puis la structurer.

C'est un pipeline complet en 5 étapes : VERIFY (verdict 4 niveaux ✅⚠️❌❓), POSITION (angle + biais), CONTEXTUALIZE (quand/qui/pourquoi), STRUCTURE (Hook→Argument→Close), DELIVER (≤2000 chars + human gate).

## Les décisions de conception

**Contrainte dure ≤2000 chars** : enforced avec instruction de coupe explicite — couper l'argument d'abord, jamais les sources. La contrainte de longueur n'est pas esthétique, c'est une garantie de lisibilité pour un format micro-article.

**Minimum 1 source inline** : un micro-article non sourcé est une opinion, pas un article. La source peut être un lien, un nom d'auteur, un titre — mais elle doit être présente et vérifiable.

**Interdiction de superlatifs non sourcés** : "révolutionnaire", "sans précédent", "le meilleur" — interdits sans citation. Cette règle seule élimine une large portion du contenu marketing qui se glisse dans les articles générés.

**Gate humain en Step 5** : avant publication, l'humain valide l'angle et les sources. Le skill ne publie pas directement — il produit un draft qui attend une décision.

## Ce que je retiens

La distinction entre le curateur de sources, le réviseur d'articles et le vérificateur de claims repose sur la nature de la matière première :

- Sources → curation (le curateur de sources)
- Texte → amélioration (le réviseur d'articles)
- Idée → article (le vérificateur de claims)

Ces trois matières premières génèrent trois pipelines fondamentalement différents. Les regrouper dans un méga-skill "contenu" aurait créé un composant trop générique pour être précis.

Il m'a semblé que la règle générale est : un skill par type de matière première, pas un skill par domaine thématique. Le domaine peut être partagé — le pipeline, lui, doit rester distinct.

---

Sources consultées
- la définition du vérificateur de claims (93 lignes initiales)

