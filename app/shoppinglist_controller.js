//var Recipe = require('./recipe');
var async = require('async');
var path = require('path');

exports.addtolist = function (req, res, next) {

    var sess = req.session;
    sess.ingredients = sess.ingredients || [];

    //put to session
    for (i = 0; i < Object.keys(req.body).length; i++) {
        var aa = req.body["ingr" + i].split(':');
        sess.ingredients.push({text: aa[0], amount: aa[1]});
    }

    //remove duplicates
    var ingr_recal = {};
    sess.ingredients.forEach(function (ingredient) {
        var text = ingredient.text;
        var amount = ingredient.amount;

        if (ingr_recal[text]) {
            ingr_recal[text] = parseInt(ingr_recal[text]) + parseInt(amount)
        }
        else {
            ingr_recal[text] = amount;
        }
        //replace with recalculated
        sess.ingredients = [];
        Object.keys(ingr_recal).forEach(key => {
            sess.ingredients.push({text: key, amount: ingr_recal[key]});
        });

    });
    res.render(
        'shoppinglist',
        {
            title: "Shopping list",
            ingredients: sess.ingredients,
        });

};
exports.view = function (req, res, next) {

    var sess = req.session;
    sess.ingredients = sess.ingredients || [];


    res.render(
        'shoppinglist',
        {
            title: "Shopping list",
            ingredients: sess.ingredients,
        });

};
exports.reset = function (req, res, next) {

    var sess = req.session;
    sess.ingredients = [];


    res.redirect('/addtoshopping');

};
