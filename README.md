# Tic Tac Toe

A modern Tic Tac Toe game built with **React 19** + **Vite**.

## Game Modes

| Mode | Status | Description |
|------|--------|-------------|
|  Normal | Live | 2 players on the same device |
|  vs AI | Coming Soon | Play against a computer opponent |
|  Online | Coming Soon | Real-time multiplayer via shareable link |

## Features (Normal Mode)

- **Editable player names** -> click the ? icon on any player card to rename
- **Turn indicator** -> active player card is highlighted
- **Win detection** -> winning line is highlighted on the board
- **Draw detection** -> full board with no winner is handled
- **Score tracking** -> wins and draws persist across rematches
- **Rematch** -> restart the board while keeping names and scores
- **Light / Dark mode** -> respects system color scheme

## Project Structure

```
src/
+-- App.jsx                  # Mode router
+-- App.css
+-- index.css                # Global CSS variables (light/dark)
+-- components/
    +-- ModeSelect.jsx        # Mode selection screen
    +-- ModeSelect.css
    +-- Game.jsx              # Game logic & state
    +-- Game.css
    +-- Board.jsx             # 3*3 grid
    +-- Board.css
    +-- Players.jsx           # Player cards with inline rename
    +-- Players.css
```

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- [React 19](https://react.dev)
- [Vite 8](https://vite.dev)
- CSS custom properties for theming (no external UI library)
