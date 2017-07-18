var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: 'Garden Spells: Home',
    text:"welcome to my website"
  });
});

router.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

router.get('/recipes', function(req, res){
    res.render('recipes', {
        title: 'Recipes',
        recipe:"all"
    });
});
router.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

module.exports = router;
