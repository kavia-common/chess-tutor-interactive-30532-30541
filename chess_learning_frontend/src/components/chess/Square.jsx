const unicodePieces = {
  p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
  P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔',
};

// PUBLIC_INTERFACE
export default function Square({
  fileIndex,
  rankIndex,
  piece,
  isLight,
  isSelected,
  isLegalTarget,
  isLastMove,
  isCheck,
  onClick,
}) {
  /** Board square with piece rendering and highlights */
  const coords = `${String.fromCharCode(97 + fileIndex)}${8 - rankIndex}`;

  const classes = [
    'square',
    isLight ? 'light' : 'dark',
    isSelected ? 'highlight' : '',
    isLastMove ? 'lastmove' : '',
    isCheck ? 'check' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="button"
      aria-label={`Square ${coords}${piece ? ` with ${piece.color === 'w' ? 'white' : 'black'} ${piece.type}` : ''}`}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(); }}
    >
      {isLegalTarget && !piece && <div className="move-dot" aria-hidden="true" />}
      {piece && <span aria-hidden="true" style={{ lineHeight: 1 }}>{unicodePieces[piece.color === 'w' ? piece.type.toUpperCase() : piece.type]}</span>}
    </div>
  );
}
