import LessonsList from '../components/tutorials/LessonsList';
import { lessons } from '../state/tutorials/lessons';

// PUBLIC_INTERFACE
export default function Lessons() {
  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <h2 className="title">Lessons</h2>
      <LessonsList lessons={lessons} />
    </section>
  );
}
