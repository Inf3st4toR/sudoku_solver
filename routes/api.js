'use strict';

const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();

module.exports = function (app) {

  app.route('/api/check')
  .post((req, res) => {
    let row, column, gridVal;

    //Validation
    const {puzzle, coordinate, value} = req.body;
    if (!puzzle || !coordinate || !value) return res.json({ error: 'Required field(s) missing' });
    const validation = solver.validate(req.body.puzzle);
    if (!validation.isValid) return res.json({ error: validation.error });
    if (!/^[1-9]$/.test(value)) return res.json({ error: 'Invalid value' });
    const match = coordinate.match(/^([A-I])([1-9])$/);
    if (!match) return res.json({ error: 'Invalid coordinate' });
    else {
      const letterToNumber = (letter) => letter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
      row = parseInt(letterToNumber(match[1]), 10);
      column = parseInt((match[2]), 10);
      gridVal = puzzle[((row-1)*9 + (column-1))];
    }

    //Resolve check
    const conflict = [];
    if (!solver.checkRowPlacement(puzzle, row, column, value).valid) conflict.push("row");
    if (!solver.checkColPlacement(puzzle, row, column, value).valid) conflict.push("column");
    if (!solver.checkRegionPlacement(puzzle, row, column, value).valid) conflict.push("region");
    if (gridVal === ".") {
      if (conflict.length === 0) return res.json({valid: true});
      else return res.json({valid: false, conflict: conflict});
    }
    else {
      if (gridVal === value) return res.json({valid: true});
      else return res.json({valid: false, conflict: conflict});
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
