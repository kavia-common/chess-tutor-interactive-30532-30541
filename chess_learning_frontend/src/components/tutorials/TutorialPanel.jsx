import { useEffect, useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export default function TutorialPanel({ lesson, engine, onAllowedMovesChange }) {
  /**
   * Side panel with steps, hints, and control actions. Communicates allowed moves.
   */
  const [stepIndex, setStepIndex] = useState(0);
  const steps = lesson?.steps || [];

  const currentStep = steps[stepIndex];
  const allowedPredicate = useMemo(() => {
    if (!currentStep) return undefined;
    const allowPairs = currentStep.allow || [];
    return (from, to) => {
      if (!allowPairs.length) return true;
      return allowPairs.some(([f, t]) => f === from && t === to);
    };
  }, [currentStep]);

  useEffect(() => {
    onAllowedMovesChange?.(allowedPredicate);
  }, [allowedPredicate, onAllowedMovesChange]);

  useEffect(() => {
    // Monitor history and auto-advance if the last move matched allowed move
    const last = engine.history[engine.history.length - 1];
    if (!last || !currentStep) return;
    const allowed = currentStep.allow || [];
    if (!allowed.length) return;
    const matched = allowed.some(([from, to]) => from === last.from && to === last.to);
    if (matched) {
      // Advance to next step after a short delay
      const t = setTimeout(() => {
        setStepIndex(i => Math.min(i + 1, steps.length - 1));
      }, 400);
      return () => clearTimeout(t);
    }
  }, [engine.history, currentStep, steps.length]);

  const resetLesson = () => {
    engine.reset(lesson?.initialFEN);
    setStepIndex(0);
  };

  const undo = () => engine.undo();

  return (
    <aside className="card panel" aria-label="Tutorial panel">
      <div className="panel-header">
        <div>
          <h3 className="title" style={{ margin: 0 }}>{lesson?.title || 'Free Play'}</h3>
          <p className="subtitle">{lesson?.description || 'Practice chess with move history and undo.'}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={undo} aria-label="Undo last move">↩ Undo</button>
          <button className="btn btn-secondary" onClick={resetLesson} aria-label="Reset lesson">⟲ Reset</button>
        </div>
      </div>

      {lesson && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <strong>Step {stepIndex + 1} / {steps.length}</strong>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div style={{ color: 'var(--ocean-muted)' }}>Hint</div>
            <div>{currentStep?.hint || 'Play any legal move.'}</div>
          </div>
        </div>
      )}

      <div>
        <h4 className="subtitle" style={{ marginTop: 12 }}>Move History</h4>
        <div className="card" style={{ padding: 12, maxHeight: 220, overflow: 'auto' }}>
          {engine.history.length === 0 ? (
            <div style={{ color: 'var(--ocean-muted)' }}>No moves yet.</div>
          ) : (
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {engine.history.map((m, i) => (
                <li key={`${m.from}-${m.to}-${i}`}>{`${m.piece?.toUpperCase?.() || m.piece} ${m.from}→${m.to}`}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </aside>
  );
}
