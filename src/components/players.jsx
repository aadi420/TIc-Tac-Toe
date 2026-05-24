import { useState } from 'react'
import './Players.css'

/**
 * PlayerCard displays a single player's symbol, editable name, and score.
 *
 * Clicking the player name switches it into an inline edit input.
 * The edit is committed on Enter or blur, and cancelled on Escape.
 *
 * @param {{
 *   symbol:   string,              // 'X' or 'O'
 *   name:     string,              // Current display name
 *   score:    number,              // Win count for this player
 *   isActive: boolean,             // True when it is this player's turn
 *   isWinner: boolean,             // True when this player just won
 *   onRename: (symbol, name) => void
 * }} props
 */
function PlayerCard({ symbol, name, score, isActive, isWinner, onRename }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState(name) // working copy while editing

  // Save the edited name (fall back to previous name if input is blank)
  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed) onRename(symbol, trimmed)
    else setDraft(name)
    setEditing(false)
  }

  return (
    <div
      className={[
        'player-card',
        isActive ? 'player-card--active' : '',
        isWinner ? 'player-card--winner' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={`player-symbol player-symbol--${symbol.toLowerCase()}`}>
        {symbol}
      </span>
      <div className="player-card__info">
        {editing ? (
          <input
            className="player-card__input"
            value={draft}
            autoFocus
            maxLength={20}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit()
              if (e.key === 'Escape') { setDraft(name); setEditing(false) }
            }}
          />
        ) : (
          <button
            className="player-card__name"
            title="Click to rename"
            onClick={() => { setDraft(name); setEditing(true) }}
          >
            {name}
            <span className="player-card__edit-icon">✎</span>
          </button>
        )}
        <span className="player-card__score">{score}</span>
      </div>
    </div>
  )
}

/**
 * Players renders both player cards side-by-side with a VS divider.
 * Also shows a running draw counter once at least one draw has occurred.
 *
 * @param {{
 *   playerNames: { X: string, O: string },
 *   current:     string,                   // 'X' or 'O' — whose turn it is
 *   result:      { winner: string, line: number[] } | null,
 *   scores:      { X: number, O: number, draw: number },
 *   onRename:    (symbol: string, name: string) => void
 * }} props
 */
function Players({ playerNames, current, result, scores, onRename }) {
  return (
    <div className="players">
      <PlayerCard
        symbol="X"
        name={playerNames.X}
        score={scores.X}
        isActive={!result && current === 'X'}
        isWinner={result?.winner === 'X'}
        onRename={onRename}
      />
      <div className="players__divider">
        {scores.draw > 0 && (
          <span className="players__draws">
            {scores.draw} draw{scores.draw !== 1 ? 's' : ''}
          </span>
        )}
        <span className="players__vs">VS</span>
      </div>
      <PlayerCard
        symbol="O"
        name={playerNames.O}
        score={scores.O}
        isActive={!result && current === 'O'}
        isWinner={result?.winner === 'O'}
        onRename={onRename}
      />
    </div>
  )
}

export default Players
