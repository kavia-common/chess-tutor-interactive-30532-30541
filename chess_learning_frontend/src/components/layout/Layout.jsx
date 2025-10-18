export default function Layout({ children }) {
  /** Main container layout providing padding and max width */
  return (
    <main className="container" role="main">
      {children}
    </main>
  );
}
