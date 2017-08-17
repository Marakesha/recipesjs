var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var mongoosePaginate = require('mongoose-paginate');
var getSlug = require('speakingurl');
var chunks = require('array.chunk');

var Schema = mongoose.Schema;

var RecipeSchema = Schema({
    recipe_title: {type: String, required: true},
    recipe_body: {type: String, required: true},
    recipe_added: {type: Date},
    recipe_updated: {type: Date},
    ingredients: [{
        text: String,
        amount:Number,
    }]
    });

RecipeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Recipe', RecipeSchema);