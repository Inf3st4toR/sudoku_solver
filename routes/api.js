'use strict';

const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();

module.exports = function (app) {

  app.route('/api/check')
  .post((req, res) => {
    
    //Validation
    const {puzzle, coordinate, value} = req.body;
    if (!puzzle || !coordinate || !value) res.json({ error: 'Required field(s) missing' });
    const validation = solver.validate(req.body.puzzle);
    if (!validation.isValid) return { error: validation.error };
    if (!/^[1-9]$/.test(value)) return { error: 'Invalid value' };
    const match = coordinate.match(/^([A-I])([1-9])$/);
    if (!match) return { error: 'Invalid coordinate' };
    else {
      const letterToNumber = (letter) => letter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
      const row = letterToNumber(match[1]);
      const column = match[2];
    }
  });
    
  app.route('/api/solve')
  .post((req, res) => {
    if (!req.body.puzzle) res.json({ error: 'Required field missing' });
    const result = solver.solve(req.body.puzzle);

    if (result.error) res.json({error: result.error});
    else if (result.success) res.json({ solution: result.success });
    else res.json({error: "Unknown error occurred"});
  });
};
