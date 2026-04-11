---
title: "Les instructions d'un système évoluent plus lentement que la structure"
description: "Après la migration du vault vers le pattern Karpathy, vault-exchange.instructions.md pointait encore vers l'ancienne architecture. Ce que ça révèle sur la maintenance des instructions IA."
pubDate: 2026-04-09
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "instructions", "vault"]
---

Migrer un système, c'est changer le code, les fichiers, l'architecture. Ce qu'on oublie plus souvent : changer les instructions qui décrivent ce système. Elles restent correctes pour l'ancienne structure, incorrectes pour la nouvelle — et personne ne s'en aperçoit jusqu'à ce qu'un agent cherche dans un endroit qui n'existe plus.

J'ai mis à jour `vault-exchange.instructions.md` ce jour-là. La migration vers le pattern Karpathy (`raw/` + `wiki/`) avait eu lieu plusieurs sessions auparavant. Les instructions pointaient encore vers `_knowledge/` — une zone supprimée — et ne mentionnaient ni `raw/`, ni `wiki/`, ni le workflow de publication via l'agent de publication.

## Les 3 gaps identifiés

**Gap 1 — zone raw/** : la nouvelle zone source à consulter en premier n'était pas dans les instructions. Un agent lisant les instructions cherchait dans `_knowledge/` — inexistant — plutôt que dans `raw/`.

**Gap 2 — zone wiki/** : la zone de synthèse IA n'était pas mentionnée. Les articles produits par l'IA n'avaient pas de destination déclarée dans les instructions.

**Gap 3 — Publishing Workflow** : le trigger pour l'agent de publication n'était nulle part. Les agents improvisaient la publication plutôt que d'invoquer l'agent dédié.

Corrections appliquées : `raw/` ajouté comme zone source prioritaire, `wiki/` ajouté comme zone de synthèse, section "Publishing Workflow" ajoutée avec triggers explicites. Suppression de la directive obsolète "écrire dans `_knowledge/`" — remplacée par `wiki/`.

## Pourquoi ce décalage existait

Les instructions IA ont une propriété différente du code : elles ne cassent pas quand leur référent disparaît. Un lien mort dans du code génère une erreur. Une instruction qui référence une zone inexistante génère un comportement silencieusement incorrect — l'agent cherche, ne trouve pas, improvise.

Ce décalage est structurel : les instructions décrivent un système, mais elles ne sont pas couplées à ce système. Quand le système change, les instructions ne changent pas automatiquement.

La règle que j'ai formalisée : après chaque migration de vault (ou de tout système décrit par des instructions), mettre à jour les instructions dans le même commit. Pas dans un commit séparé "quand on aura le temps" — dans le même commit, comme partie intégrante de la migration.

## Ce que je retiens

Il m'a semblé que les instructions IA sont la documentation la plus critique d'un système AI. Ce sont les instructions qui guident le comportement des agents. Si elles sont désynchronisées, le comportement l'est aussi.

La règle du commit atomique (code + instructions dans le même commit) est la meilleure protection contre ce décalage. Elle rend la désynchronisation impossible par construction.

---

Sources consultées
- `.copilot/instructions/vault-exchange.instructions.md` — 3 gaps comblés

