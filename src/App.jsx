import { useState, useEffect } from 'react'
import './App.css'
import ModeSelect from './components/ModeSelect.jsx'
import Game from './components/Game.jsx'

/**
 * Root component.
 * Holds the selected game mode in state and acts as a simple router:
 *   - null  → show the ModeSelect screen
 *   - 'normal' | 'ai' | 'online' → show the Game screen for that mode
 *
 * Also owns the light/dark theme toggle. The chosen theme is written to
 * `document.documentElement` as a `data-theme` attribute so CSS variables
 * can respond to it without JavaScript.
 */
function App() {
  // null means no mode chosen yet (i.e. we are on the menu screen)
  const [mode, setMode] = useState(null)

  // Initialise from the OS preference; user can override with the toggle
  const [theme, setTheme] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  // Keep the HTML attribute in sync so CSS variables react immediately
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tic Tac Toe</h1>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      {mode === null ? (
        // Show mode-selection cards until the user picks one
        <ModeSelect onSelect={setMode} />
      ) : (
        // Pass the chosen mode down; onBack resets to the menu
        <Game mode={mode} onBack={() => setMode(null)} />
      )}
    </div>
  )
}

export default App
