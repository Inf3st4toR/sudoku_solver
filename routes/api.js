'use strict';

const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();

module.exports = function (app) {

  app.route('/api/check')
    .post((req, res) => {

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
