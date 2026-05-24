import { useState, useCallback } from 'react'
import Board from './Board.jsx'
import Players from './players.jsx'
import './Game.css'

/**
 * All eight lines that win a 3×3 Tic Tac Toe game.
 * Each entry is a triple of flat cell indices (0–8), laid out as:
 *
 *   0 | 1 | 2
 *   ---------
 *   3 | 4 | 5
 *   ---------
 *   6 | 7 | 8
 */
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
]

/**
 * Checks whether the current board state has a winner or is a draw.
 *
 * @param {(string|null)[]} board  Flat array of 9 cells ('X', 'O', or null).
 * @returns {{ winner: string, line: number[] } | null}
 *   winner  'X', 'O', or 'draw'
 *   line    Cell indices that form the winning line (empty array for draws).
 *   Returns null when the game is still in progress.
 */
function checkResult(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }
    }
  }
  // All cells filled but no winner → draw
  if (board.every((cell) => cell !== null)) return { winner: 'draw', line: [] }
  return null
}

/**
 * Game component — owns all game state for a single match session.
 *
 * State:
 *   board        Flat array of 9 cells representing the grid.
 *   current      Whose turn it is: 'X' or 'O'.
 *   result       null while playing; { winner, line } when the game ends.
 *   scores       Cumulative wins per symbol plus draw count.
 *   playerNames  Display names editable by each player.
 *
 * @param {{ mode: string, onBack: () => void }} props
 *   mode    The selected game mode (currently only 'normal' is implemented).
 *   onBack  Callback to return to the ModeSelect screen.
 */
function Game({ onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [current, setCurrent] = useState('X')
  const [result, setResult] = useState(null)
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })
  const [playerNames, setPlayerNames] = useState({ X: 'Player 1', O: 'Player 2' })

  /**
   * Handles a cell click:
   *  1. Ignores clicks on already-filled cells or after the game ends.
   *  2. Places the current player's mark.
   *  3. Checks for a win/draw and updates state accordingly.
   *  4. Switches turn to the other player if the game continues.
   */
  const handleCellClick = useCallback(
    (idx) => {
      if (board[idx] || result) return
      const next = [...board]
      next[idx] = current
      const res = checkResult(next)
      setBoard(next)
      if (res) {
        setResult(res)
        setScores((s) =>
          res.winner === 'draw'
            ? { ...s, draw: s.draw + 1 }
            : { ...s, [res.winner]: s[res.winner] + 1 }
        )
      } else {
        setCurrent((c) => (c === 'X' ? 'O' : 'X'))
      }
    },
    [board, current, result]
  )

  // Reset the board for a new round; scores and names are preserved
  const handleRematch = () => {
    setBoard(Array(9).fill(null))
    setCurrent('X')
    setResult(null)
  }

  // Update one player's display name in-place
  const handleRename = (symbol, name) => {
    setPlayerNames((n) => ({ ...n, [symbol]: name }))
  }

  // True once at least one move has been made (used to show the Reset button)
  const hasMoves = board.some((cell) => cell !== null)

  // Human-readable status shown below the player strip
  const statusMsg = result
    ? result.winner === 'draw'
      ? "It's a draw!"
      : `${playerNames[result.winner]} wins! 🎉`
    : `${playerNames[current]}'s turn  (${current})`

  return (
    <div className="game">
      <Players
        playerNames={playerNames}
        current={current}
        result={result}
        scores={scores}
        onRename={handleRename}
      />
      <p className={`game__status${result ? ' game__status--result' : ''}`}>
        {statusMsg}
      </p>
      <Board
        board={board}
        winLine={result?.line ?? []}
        onCellClick={handleCellClick}
        disabled={!!result}
      />
      <div className="game__actions">
        {result ? (
          // Game over — offer a full rematch
          <button className="btn btn--primary" onClick={handleRematch}>
            Rematch
          </button>
        ) : hasMoves && (
          // Mid-game — let either player bail out without it counting as a loss
          <button className="btn btn--warning" onClick={handleRematch}>
            Reset
          </button>
        )}
        <button className="btn btn--ghost" onClick={onBack}>
          ← Menu
        </button>
      </div>
    </div>
  )
}

export default Game
