import { useCallback, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';

/**
 * PUBLIC_INTERFACE
 */
export function useChessEngine(initialFEN) {
  /** Hook managing chess state, legal moves, move/undo/reset and status */
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(() => {
    const g = gameRef.current;
    if (initialFEN) {
      try { g.load(initialFEN); } catch { /* ignore invalid */ }
    }
    return g.fen();
  });
  const [history, setHistory] = useState([]);
  const [lastMove, setLastMove] = useState(null);

  const reset = useCallback((fenStr) => {
    const g = new Chess();
    if (fenStr) {
      try { g.load(fenStr); } catch { /* ignore */ }
    }
    gameRef.current = g;
    setFen(g.fen());
    setHistory([]);
    setLastMove(null);
  }, []);

  const undo = useCallback(() => {
    const g = gameRef.current;
    const m = g.undo();
    if (m) {
      setFen(g.fen());
      setHistory(g.history({ verbose: true }));
      setLastMove(null);
    }
  }, []);

  const movesFor = useCallback((square) => {
    const g = gameRef.current;
    return g.moves({ square, verbose: true });
  }, []);

  const move = useCallback((from, to, promotion) => {
    const g = gameRef.current;
    const res = g.move({ from, to, promotion });
    if (res) {
      setFen(g.fen());
      setHistory(g.history({ verbose: true }));
      setLastMove({ from: res.from, to: res.to });
      return true;
    }
    return false;
  }, []);

  const turn = useMemo(() => (gameRef.current.turn()), [fen]);
  const inCheck = useMemo(() => gameRef.current.inCheck?.() || gameRef.current.in_check?.(), [fen]);
  const gameOver = useMemo(() => gameRef.current.isGameOver?.() || gameRef.current.is_game_over?.(), [fen]);
  const status = useMemo(() => {
    const g = gameRef.current;
    if (g.isCheckmate?.() || g.is_checkmate?.()) return 'checkmate';
    if (g.isStalemate?.() || g.is_stalemate?.()) return 'stalemate';
    if (g.isThreefoldRepetition?.() || g.is_threefold_repetition?.()) return 'threefold';
    if (g.isInsufficientMaterial?.() || g.is_insufficient_material?.()) return 'material';
    if (g.isDraw?.() || g.is_draw?.()) return 'draw';
    if (g.inCheck?.() || g.in_check?.()) return 'check';
    return 'active';
  }, [fen]);

  const board = useMemo(() => gameRef.current.board(), [fen]);

  return {
    fen,
    board,
    history,
    lastMove,
    turn,
    inCheck,
    status,
    move,
    undo,
    reset,
    movesFor,
    gameRef,
  };
}
