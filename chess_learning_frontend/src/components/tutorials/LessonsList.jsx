import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function LessonsList({ lessons }) {
  /** Displays a grid of lesson cards linking to Play with lessonId */
  return (
    <div className="list">
      {lessons.map(lesson => (
        <div className="lesson-card card" key={lesson.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, background: 'var(--ocean-amber)', borderRadius: 2 }} />
            <h3 style={{ margin: 0 }}>{lesson.title}</h3>
          </div>
          <p className="subtitle" style={{ margin: 0 }}>{lesson.description}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <Link className="btn" to={`/play?lessonId=${encodeURIComponent(lesson.id)}`} aria-label={`Start lesson ${lesson.title}`}>Start Lesson</Link>
            <Link className="btn btn-secondary" to="/play" aria-label="Open play page">Free Play</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
