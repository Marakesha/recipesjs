var async = require('async');
var path = require('path');

exports.check = function (req, res, next) {

    var sess = req.session;
    if (req.body.login == 'anna' && req.body.password == 'password') {
        sess.isadmin = 1;
        res.redirect('/recipeslist');

    }
    else {
        res.redirect('/');

    }


};
exports.view = function (req, res, next) {

    var sess = req.session;
    res.render(
        'admin',
        {
            title: "Admin area",
            isadmin: sess.isadmin,
        });

};
exports.reset = function (req, res, next) {

    var sess = req.session;
    sess.isadmin = 0;


    res.redirect('/');

};
