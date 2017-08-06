var Recipe = require('./recipe');
var async = require('async');
var path = require('path');
var fs = require('fs');
var paginate = require('express-paginate');
var chunks = require('array.chunk');
exports.list = function (req, res, next) {
    Recipe.paginate({}, {page: req.query.page, limit: req.query.limit}, function (err, result) {
        if (err) {
            return next(err);
        }

        var pageCount = result.pages;
        var itemCount = result.total;
        var currentPage = result.currentPage;

        res.format({
            html: function () {
                res.render('recipes', {
                    title: 'Recipes list',
                    recipes: result.docs,
                    pageCount: pageCount,
                    currentPage: req.query.page,
                    itemCount: itemCount,
                    pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
                });
            }
        });
    });
};
exports.one = function (req, res, next) {
    async.parallel({
        recipe: function (callback) {
            Recipe.findOne({_id: req.params.id}).exec(callback);
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }

        if (!results.recipe) {
            var notFound = new Error('Recipe ' + req.params.id + ' not found');

            notFound.status = 404;
            return next(notFound);
        }


        //  var breadcrumbs = [{ title: 'Vehicles', link: '/vehicles' }, { title: 'Vehicle', link: null }];

        res.render(
            'recipe',
            {
                title: results.recipe.recipe_title,
                recipe: results.recipe,
            });
    });
};
exports.one_edit = function (req, res, next) {
    async.parallel({
        recipe: function (callback) {
            Recipe.findOne({_id: req.params.id}).exec(callback);
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }

        if (!results.recipe) {
            var notFound = new Error('Recipe ' + req.params.id + ' not found');

            notFound.status = 404;
            return next(notFound);
        }


        //  var breadcrumbs = [{ title: 'Vehicles', link: '/vehicles' }, { title: 'Vehicle', link: null }];

        res.render(
            'recipe_edit',
            {
                title: results.recipe.recipe_title,
                recipe: results.recipe,
            });
    });
};
exports.one_update = function (req, res, next) {

    /*
    console.log(req.body);
    { title: 'wqeqwe',
        id: '5975c7aabd2ca0350ee65e5f',
        body: '<p>wqewqeqw</p>',
        ingr: 'asd:12\r\nffd:32' }*/
    var ingredients = req.body.ingr.split('\r\n');
    var ingredientparced = [];
    ingredients.forEach(function (item) {
        var aa=item.split(':');
        if(aa[0])ingredientparced.push({text:aa[0],amount:aa[1]});
    });



    if (req.body.id === 'new') {
        var recipe = new Recipe({
            recipe_title: req.body.title,
            recipe_body: req.body.body,
            ingredients: ingredientparced,
        }).save(function (err, recipe) {
            //  console.log(room.id);
            res.redirect('recipe/' + recipe.id);
        });

    }
    else {

        Recipe.findByIdAndUpdate(req.body.id, {
            $set: {
                recipe_title: req.body.title,
                recipe_body: req.body.body,
                ingredients: ingredientparced,
            }
        }, function () {
            res.redirect('recipe/' + req.body.id);
            //res.redirect('recipeslist');
        })
    }


}
exports.one_delete = function (req, res, next) {

    Recipe.findByIdAndRemove(req.params.id, function (err, recipe) {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        res.redirect('/recipeslist');
    });


}