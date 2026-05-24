import './ModeSelect.css'

/**
 * Static list of all supported game modes.
 * Set `available: false` for modes that are not yet implemented —
 * they will be rendered as disabled cards with a "Coming Soon" badge.
 */
const MODES = [
  {
    id: 'normal',
    label: 'Normal',
    icon: '👥',
    desc: '2 players on same device',
    available: true,
  },
  {
    id: 'ai',
    label: 'vs AI',
    icon: '🤖',
    desc: 'Play against computer',
    available: false,
  },
  {
    id: 'online',
    label: 'Online',
    icon: '🌐',
    desc: 'Shareable link · real-time sync',
    available: false,
  },
]

/**
 * ModeSelect screen — shown before a game starts.
 *
 * @param {{ onSelect: (modeId: string) => void }} props
 *   onSelect  Called with the chosen mode id when the user clicks an available card.
 */
function ModeSelect({ onSelect }) {
  return (
    <div className="mode-select">
      <p className="mode-select__subtitle">Choose a game mode to start</p>
      <div className="mode-select__cards">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={`mode-card${!m.available ? ' mode-card--disabled' : ''}`}
            // Unavailable modes are visually disabled; clicking them does nothing
            onClick={() => m.available && onSelect(m.id)}
            disabled={!m.available}
          >
            <span className="mode-card__icon">{m.icon}</span>
            <span className="mode-card__label">{m.label}</span>
            <span className="mode-card__desc">{m.desc}</span>
            {!m.available && (
              <span className="mode-card__badge">Coming Soon</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ModeSelect
