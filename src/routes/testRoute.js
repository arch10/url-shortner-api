const router = require('express').Router();

//test route
router.get('/', (req, res, next) => {
  res.status(200).send({
    message: 'Hello World!'
  });
});

router.get('/:name', (req, res, next) => {
  const name = req.params.name;
  res.status(200).send({
    message: `Hello ${name}!`
  });
});

module.exports = router;
