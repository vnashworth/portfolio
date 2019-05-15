var express = require('express');
var router = express.Router();

const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

/* GET home page. */
let user = "Victoria"

console.log(`Hello, ${ user }!`);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Victoria Nishimoto Ashworth' });
});

module.exports = router;
