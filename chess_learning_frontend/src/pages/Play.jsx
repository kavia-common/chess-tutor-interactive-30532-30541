import { useEffect, useMemo, useState } from 'react';
import ChessBoard from '../components/chess/ChessBoard';
import TutorialPanel from '../components/tutorials/TutorialPanel';
import { getLessonById } from '../state/tutorials/lessons';
import { useChessEngine } from '../hooks/useChessEngine';

function useQuery() {
  return useMemo(() => new URLSearchParams(window.location.search), []);
}

// PUBLIC_INTERFACE
export default function Play() {
  const query = useQuery();
  const lessonId = query.get('lessonId') || '';
  const lesson = getLessonById(lessonId);
  const engine = useChessEngine(lesson?.initialFEN);
  const [allowedMoves, setAllowedMoves] = useState();

  // If lesson changes, reset to its initial FEN
  useEffect(() => {
    engine.reset(lesson?.initialFEN);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  return (
    <section className="layout">
      <div>
        <ChessBoard engine={engine} allowedMoves={allowedMoves} />
      </div>
      <TutorialPanel lesson={lesson} engine={engine} onAllowedMovesChange={setAllowedMoves} />
    </section>
  );
}
