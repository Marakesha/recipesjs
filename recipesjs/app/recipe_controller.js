var Recipe = require('./recipe');
var async = require('async');
var path = require('path');
var fs = require('fs');
var paginate = require('express-paginate');
var chunks = require('array.chunk');
exports.list = function(req, res, next) {
    Recipe.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, result) {
        if (err) { return next(err); }

        var pageCount = result.pages;
        var itemCount = result.total;
        var currentPage = result.currentPage;

        res.format({
            html: function() {
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
