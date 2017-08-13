var express = require('express');
var router = express.Router();
var recipe_controller = require('../app/recipe_controller');
var shoppinglist_controller = require('../app/shoppinglist_controller');
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
router.get('/recipecreate', function(req, res){
    res.render('recipe_edit', {
        title: 'Create',
        recipe: {
            _id: "new",
            ingredients:[{
                text:'product',
                amount:1
            }]
        }
    });
});

router.post('/shoppinglistreset',shoppinglist_controller.reset);
router.post('/addtoshopping',shoppinglist_controller.addtolist);
router.get('/addtoshopping',shoppinglist_controller.view);

router.get('/recipeslist',recipe_controller.list);

/* GET request for one recipe */
router.get('/recipe/:id', recipe_controller.one);
/* GET request for one recipe */
router.get('/recipe_delete/:id', recipe_controller.one_delete);

/* GET request for one recipe */
router.get('/recipe_edit/:id', recipe_controller.one_edit);
// router.post('/edit', recipe_controller.one);
router.post('/edit', function(req, res) {
    //console.log(req.body);
    recipe_controller.one_update(req, res);

});

router.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

module.exports = router;
