import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Home() {
  return (
    <section className="card" style={{ padding: 24 }}>
      <h1 className="title" style={{ marginTop: 0 }}>Welcome to Ocean Chess Tutor</h1>
      <p className="subtitle">
        Learn chess through interactive lessons and a clean, modern interface.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="btn" to="/lessons">Browse Lessons</Link>
        <Link className="btn btn-secondary" to="/play">Start Playing</Link>
      </div>
    </section>
  );
}
