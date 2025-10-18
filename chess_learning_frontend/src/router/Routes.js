import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Lessons from '../pages/Lessons';
import Play from '../pages/Play';

// PUBLIC_INTERFACE
export function AppRoutes() {
  /** Provides application routes: /, /lessons, /play */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}
