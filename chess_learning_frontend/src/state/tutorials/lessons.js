export const lessons = [
  {
    id: 'opening-basics',
    title: 'Opening Basics',
    description: 'Control the center and develop your pieces efficiently.',
    initialFEN: undefined,
    steps: [
      { id: 'e4', hint: 'Play e4 to control the center.', allow: [['e2', 'e4']] },
      { id: 'Nf3', hint: 'Develop a knight to f3.', allow: [['g1', 'f3']] },
    ],
  },
  {
    id: 'mate-in-one',
    title: 'Mate in One',
    description: 'Find a quick checkmate pattern.',
    initialFEN: 'r1bqkbnr/pppp1ppp/2n5/4p3/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3',
    steps: [
      { id: 'Nxe5', hint: 'Capture on e5 with a knight.', allow: [['f3','e5']] },
    ],
  },
  {
    id: 'basic-tactics',
    title: 'Basic Tactics',
    description: 'Forks and pins introduction.',
    initialFEN: 'rnbqkbnr/ppp2ppp/8/3pp3/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3',
    steps: [
      { id: 'Nxe5', hint: 'Knight can attack queen and piece.', allow: [['f3','e5']] },
      { id: 'Qxd5', hint: 'Recover the pawn with the queen.', allow: [['d1','d5']] },
    ],
  },
  {
    id: 'castle-safety',
    title: 'Castle for Safety',
    description: 'Get your king to safety early.',
    initialFEN: 'rnbqkbnr/pppppppp/8/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 1',
    steps: [
      { id: '...Nc6', hint: 'Black develops a knight.', allow: [] },
      { id: 'Bc4', hint: 'Develop your bishop to c4 to prepare castling.', allow: [['f1','c4']] },
      { id: 'O-O', hint: 'Castle kingside.', allow: [['e1','g1']] },
    ],
  },
  {
    id: 'endgame-mate',
    title: 'Basic Checkmate',
    description: 'Deliver mate with queen and king.',
    initialFEN: '8/8/8/8/8/8/4K3/3kQ3 w - - 0 1',
    steps: [
      { id: 'Qe2+', hint: 'Use checks to drive the king.', allow: [['e1','e2']] },
      { id: 'Qd2+', hint: 'Keep checking with the queen.', allow: [['e2','d2']] },
      { id: 'Qd1#', hint: 'Mate on d1.', allow: [['d2','d1']] },
    ],
  },
];

// PUBLIC_INTERFACE
export function getLessonById(id) {
  /** Returns a lesson object for given id */
  return lessons.find(l => l.id === id);
}
