const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Gasper API- Let us start changing the way we fuel!');
});

module.exports = router;
