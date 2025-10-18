import { useMemo, useState } from 'react';
import Square from './Square';

// Helper to map 2D array board() to coordinates
function toCoord(fileIndex, rankIndex) {
  return `${String.fromCharCode(97 + fileIndex)}${8 - rankIndex}`;
}

// PUBLIC_INTERFACE
export default function ChessBoard({ engine, allowedMoves }) {
  /**
   * Interactive chessboard using engine hook.
   * allowedMoves: optional predicate (from, to) => boolean to restrict moves per lesson step.
   */
  const { board, movesFor, move, lastMove, inCheck, gameRef } = engine;
  const [selected, setSelected] = useState(null);
  const [legalTargets, setLegalTargets] = useState([]);

  const isCheckSquare = useMemo(() => {
    if (!inCheck) return null;
    // find king square of side to move
    const turn = gameRef.current.turn();
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const piece = board[r][f];
        if (piece && piece.type === 'k' && piece.color === turn) {
          return toCoord(f, r);
        }
      }
    }
    return null;
  }, [board, inCheck, gameRef]);

  const handleSquareClick = (fileIndex, rankIndex) => {
    const coord = toCoord(fileIndex, rankIndex);
    const piece = board[rankIndex][fileIndex];

    if (selected) {
      // Attempt a move
      const from = selected;
      const to = coord;
      const isAllowed = allowedMoves ? allowedMoves(from, to) : true;
      if (isAllowed) {
        const ok = move(from, to);
        if (ok) {
          setSelected(null);
          setLegalTargets([]);
          return;
        }
      }
      // If failed, treat as re-select if there's a piece of current turn
      if (piece) {
        setSelected(coord);
        const options = movesFor(coord).map(m => m.to);
        setLegalTargets(options);
      } else {
        setSelected(null);
        setLegalTargets([]);
      }
    } else {
      // select
      if (piece) {
        setSelected(coord);
        const options = movesFor(coord).map(m => m.to);
        setLegalTargets(options);
      }
    }
  };

  return (
    <div className="board-wrap card" aria-label="Chessboard container">
      <div className="board" role="grid" aria-label="Chessboard">
        {board.map((rank, rankIndex) =>
          rank.map((piece, fileIndex) => {
            const isLight = (fileIndex + rankIndex) % 2 === 0;
            const coord = toCoord(fileIndex, rankIndex);
            const isSelected = selected === coord;
            const isLegalTarget = legalTargets.includes(coord);
            const isLastMove =
              lastMove && (lastMove.from === coord || lastMove.to === coord);
            const isCheck = isCheckSquare === coord;

            return (
              <Square
                key={coord}
                fileIndex={fileIndex}
                rankIndex={rankIndex}
                piece={piece}
                isLight={isLight}
                isSelected={isSelected}
                isLegalTarget={isLegalTarget}
                isLastMove={isLastMove}
                isCheck={isCheck}
                onClick={() => handleSquareClick(fileIndex, rankIndex)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
