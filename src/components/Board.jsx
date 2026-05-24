import './Board.css'

/**
 * Board renders the 3×3 Tic Tac Toe grid.
 *
 * Each cell is a <button> so it is keyboard-accessible by default.
 * Cells are disabled once filled or when the game has ended (disabled prop).
 * Winning cells receive the `cell--win` class for a highlight animation.
 *
 * @param {{
 *   board:       (string|null)[],  // Flat array of 9 cells — 'X', 'O', or null
 *   winLine:     number[],         // Indices of the three winning cells ([] if none)
 *   onCellClick: (idx: number) => void,
 *   disabled:    boolean           // True when the game has ended
 * }} props
 */
function Board({ board, winLine, onCellClick, disabled }) {
  return (
    <div className="board">
      {board.map((cell, idx) => (
        <button
          key={idx}
          className={[
            'cell',
            cell ? `cell--${cell.toLowerCase()}` : '', // 'cell--x' or 'cell--o'
            winLine.includes(idx) ? 'cell--win' : '',  // highlight winning cells
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onCellClick(idx)}
          disabled={disabled || !!cell}
          aria-label={cell ?? `Cell ${idx + 1}`}
        >
          {cell}
        </button>
      ))}
    </div>
  )
}

export default Board
