---
title: "Construire un écosystème AI : principes agentiques en pratique"
description: "Comment j'ai structuré un workspace d'outils AI autour de 8 principes agentiques — retour d'expérience sur la création de skills, agents et guardrails pour Copilot CLI."
pubDate: 2026-03-17
author: "Jean-Baptiste Landmann"
tags: ["ai", "copilot-cli", "agentic", "automation"]
---

L'explosion des outils AI a créé un paradoxe intéressant : plus on dispose de capacités, plus il devient difficile de les orchestrer efficacement. Après plusieurs semaines à construire un écosystème de skills et d'agents pour GitHub Copilot CLI, voici les principes qui ont émergé.

## Le problème : des capacités sans coordination

Un LLM peut générer du code, écrire de la documentation, analyser des logs — mais sans structure, chaque session repart de zéro. Les prompts se répètent, les conventions se perdent, les décisions passées sont oubliées.

## 8 principes agentiques

En s'inspirant des travaux d'Anthropic sur la conception d'agents efficaces, j'ai formalisé 8 critères pondérés :

1. **SIMP** (Simplicité) — La solution la plus simple qui fonctionne
2. **TRNS** (Transparence) — Chaque décision doit être explicable
3. **ACI** (Interface claire) — Triggers précis, pas d'ambiguïté
4. **COMP** (Composabilité) — Des briques qui se combinent
5. **GTRUTH** (Vérité terrain) — Mesurer, ne pas supposer
6. **SEP** (Séparation) — Diagnostic ≠ action, logique ≠ wiring
7. **EVAL** (Évaluation) — Chaque composant est auditable
8. **GUARD** (Guardrails) — Des limites claires pour les opérations risquées

## En pratique : l'extension session-health

L'extension `session-health` illustre ces principes. Elle surveille la consommation de contexte et de quota en temps réel.

**Architecture** : logique pure (`health.mjs`) → wiring testable (`extension-config.mjs`) → point d'entrée (`extension.mjs`). Zéro dépendance entre couches.

**TDD** : 48 tests couvrent chaque fonction extraite. Les tests ont été écrits *avant* le refactoring — phase RED, puis GREEN, puis audit.

**Audit formalisé** : un agent `formulation-tester` évalue chaque composant sur les 8 critères. Score initial : 88/100. Après 3 corrections ciblées : 91.5/100.

## La leçon clé

> Être plus compétent, c'est mieux faire face aux situations nouvelles. Apprendre par cœur des réponses, c'est autre chose.

Les meilleurs skills ne sont pas ceux qui listent des réponses possibles — ce sont ceux qui enseignent des **principes** applicables à des situations inédites. 13 lignes de principes valent mieux que 185 lignes de cas mémorisés.

## Ce qui vient ensuite

- Un système de journal de bord automatisé pour la traçabilité
- Un pipeline de publication LinkedIn basé sur des articles vérifiés
- Un framework d'optimisation de prompts (autoresearch)

L'objectif n'est pas d'automatiser pour automatiser — c'est de construire des outils qui rendent l'humain plus efficace dans sa prise de décision.
