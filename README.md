# CORRUPT
### Fitness Tracker App

Structured Workout System
React Native · Zustand · Offline-First Architecture

---

## Overview

Fitness Tracker App is a structured workout tracking system engineered around a layered training architecture:

Split → Day → Template → Workout → Exercise → Set

Instead of treating workouts as flat logs, the system separates planning, execution, and weekly performance tracking into distinct layers. The result is a scalable structure that supports complex training splits while maintaining clean state boundaries and offline-first reliability.

The product emphasizes:
	•	Structural clarity over ad-hoc logging
	•	Separation of planning and execution
	•	Modular state architecture
	•	Offline-first persistence strategy

The architecture was intentionally rebuilt to support long-term extensibility (analytics, syncing, large exercise libraries) without compromising UI performance.

---

## Core Concept

The app introduces a layered training model:

• Splits define weekly training structure
• Days organize workouts within a split
• Templates define reusable workout blueprints
• Workouts represent executed training sessions
• Exercises contain structured movement definitions
• Sets capture granular performance data

This separation prevents execution data from mutating planning structures and enables flexible weekly progress tracking.

---

## Key Features

• Configurable splits and days with multi-workout templates
• Weekly progress engine with dynamic dashboard goals
• Grouped dashboard widgets (hydration, supplements, active workout)
• Modular Zustand stores for domain isolation
• Offline-first architecture

---

## Persistence Strategy (In Progress)

The system is designed for hybrid storage:

WatermelonDB
Large relational datasets:
	•	Exercises
	•	Workout history
	•	Templates
	•	Split structures
	•	Sets

MMKV
Lightweight and frequently accessed data:
	•	Settings
	•	Active workout session
	•	UI preferences
	•	Cached summaries

This approach balances performance with scalability.

---

## Tech Stack
	•	React Native￼ + TypeScript
	•	Expo￼
	•	Zustand￼ for state management
	•	WatermelonDB (planned integration)
	•	MMKV (planned integration)

---

## Getting Started


### 1. Clone the repository

```bash
git clone https://github.com/Luka-Prokic/2CORRUPT.git
```

### 2. Install dependencies

```bash
npm install
```
or

```bash
yarn install
```

### 3. Run

```bash
npx expo start
```

