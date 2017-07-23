#! /usr/bin/env node

console.log('This script populates a some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
//var Book = require('./models/book')
// var Author = require('./models/author')
// var Genre = require('./models/genre')
// var BookInstance = require('./models/bookinstance')
var Recipe = require('./app/recipe')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


var recipes = []

// function authorCreate(first_name, family_name, d_birth, d_death, cb) {
//   authordetail = {first_name:first_name , family_name: family_name }
//   if (d_birth != false) authordetail.date_of_birth = d_birth
//   if (d_death != false) authordetail.date_of_death = d_death

//   var author = new Author(authordetail);

//   author.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New Author: ' + author);
//     authors.push(author)
//     cb(null, author)
//   }  );
// }

// function genreCreate(name, cb) {
//   var genre = new Genre({ name: name });

//   genre.save(function (err) {
//     if (err) {
//       cb(err, null);
//       return;
//     }
//     console.log('New Genre: ' + genre);
//     genres.push(genre)
//     cb(null, genre);
//   }   );
// }

// function bookCreate(title, summary, isbn, author, genre, cb) {
//   bookdetail = {
//     title: title,
//     summary: summary,
//     author: author,
//     isbn: isbn
//   }
//   if (genre != false) bookdetail.genre = genre

//   var book = new Book(bookdetail);
//   book.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New Book: ' + book);
//     books.push(book)
//     cb(null, book)
//   }  );
// }


// function bookInstanceCreate(book, imprint, due_back, status, cb) {
//   bookinstancedetail = {
//     book: book,
//     imprint: imprint
//   }
//   if (due_back != false) bookinstancedetail.due_back = due_back
//   if (status != false) bookinstancedetail.status = status

//   var bookinstance = new BookInstance(bookinstancedetail);
//   bookinstance.save(function (err) {
//     if (err) {
//       console.log('ERROR CREATING BookInstance: ' + bookinstance);
//       cb(err, null)
//       return
//     }
//     console.log('New BookInstance: ' + bookinstance);
//     bookinstances.push(bookinstance)
//     cb(null, book)
//   }  );
// }

function recipeCreate(recipe_title, recipe_body, recipe_added, recipe_updated) {
    recipedetail = {
        recipe_title: recipe_title,
        recipe_body: recipe_body,
        recipe_added: recipe_added,
        recipe_updated: recipe_updated,

    }

    var recipe = new Recipe(recipedetail);
    recipe.save(function (err) {
        if (err) {
            console.log('ERROR CREATING recipe: ' + recipe);
            cb(err, null)
            return
        }
        console.log('New recipe: ' + recipe);
        recipe.push(recipe)
    }  );
}


// function createGenreAuthors(cb) {
//     async.parallel([
//         function(callback) {
//           authorCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
//         },
//         function(callback) {
//           authorCreate('Ben', 'Bova', '1932-11-8', false, callback);
//         },
//         function(callback) {
//           authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
//         },
//         function(callback) {
//           authorCreate('Bob', 'Billings', false, false, callback);
//         },
//         function(callback) {
//           authorCreate('Jim', 'Jones', '1971-12-16', false, callback);
//         },
//         function(callback) {
//           genreCreate("Fantasy", callback);
//         },
//         function(callback) {
//           genreCreate("Science Fiction", callback);
//         },
//         function(callback) {
//           genreCreate("French Poetry", callback);
//         },
//         ],
//         // optional callback
//         cb);
// }

// function createBooks(cb) {
//     async.parallel([
//         function(callback) {
//           bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0], [genres[0],], callback);
//         },
//         function(callback) {
//           bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0], [genres[0],], callback);
//         },
//         function(callback) {
//           bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [genres[0],], callback);
//         },
//         function(callback) {
//           bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [genres[1],], callback);
//         },
//         function(callback) {
//           bookCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1], [genres[1],], callback);
//         },
//         function(callback) {
//           bookCreate('Test Book 1', 'Summary of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], callback);
//         },
//         function(callback) {
//           bookCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', authors[4], false, callback)
//         }
//         ],
//         // optional callback
//         cb);
// }

// function createBookInstances(cb) {
//     async.parallel([
//         function(callback) {
//           bookInstanceCreate(books[0], 'London Gollancz, 2014.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[1], ' Gollancz, 2011.', false, 'Loaned', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[2], ' Gollancz, 2015.', false, false, callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[0], 'Imprint XXX2', false, false, callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[1], 'Imprint XXX3', false, false, callback)
//         }
//         ],
//         // optional callback
//         cb);
// }

function createRecipes(cb) {
    async.parallel([
            function(callback) {
                recipeCreate('Roasted Vegetable Soup', '<p><img src="data:image/jpeg;base64,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" alt="" vspace="0" hspace="0" border="0" style="border:0px solid black; height:320px; margin-bottom:0px; margin-left:0px; margin-right:0px; margin-top:0px; width:320px" /></p><p>Ingredients</p><p>3 large carrots, peeled and coarsely chopped<br />3 stalks celery, coarsely chopped<br />1 large onion, coarsely chopped<br />1 tablespoon extra-virgin olive oil<br />8 cloves garlic, chopped<br />4 cups water<br />1/4 cup dried mushroom pieces (Italian porcini, if possible)<br />1/4 teaspoon dried&nbsp;thyme<br />Salt, and black or red pepper to taste</p><p>Instructions</p><p>1. Preheat oven to 500 degrees. Place the carrots, celery and onion in a small (8&times;8-inch) nonstick pan or dish with the olive oil. Toss to coat the vegetables. Bake for 10 minutes.</p><p>2. Remove pan from oven, add the garlic, and toss again. Bake for another 10-15 minutes until the vegetables are browned.</p><p>3. Remove pan from oven, add 1 cup of water and stir to loosen any vegetables that may be stuck. Pour this into a pot with the remaining ingredients. Bring to a boil, reduce heat, cover, and simmer for 30 minutes.</p><p>4. Season to taste with salt, and black or red pepper, and serve or use as the base for other soups, stews or pasta dishes.</p>', new Date,new Date, callback)
            },
            // function(callback) {
            //     vehicleCreate('61d9a357-8b52-436e-a21b-017f7a99de3e', 'Honda', 'Odyssey', 2004, '2350cc, Petrol', '5 Door, Station Wagon', 91314, 5740, 'Silver', 'Beige, 7 Seats (Fabric)', 'Tiptronic, FWD', 4, new Date, '1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19', callback)
            // },
            // function(callback) {
            //     vehicleCreate('0db3d76c-96bd-4cd7-a7d3-0337bd6af1a9', 'BMW', '320i', 2006, '1990cc, Petrol', '4 Door, Sedan', 95431, 9945, 'Brown', 'Black, 5 Seats (Fabric)', 'Tiptronic, RWD', 3.5, new Date, '1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18', callback)
            // },
            // function(callback) {
            //     vehicleCreate('24b72f3c-fc40-4dae-8244-0348f4f788da', 'Nissan', 'Lafesta', 2008, '1990cc, Petrol', '4 Door, People Movers', 63514, 7250, 'Silver', 'Black, 7 Seats (Fabric)', 'Tiptronic, FWD', 4.5, new Date, '1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18', callback)
            // }
        ],
        cb);
}



async.series([
        // createGenreAuthors,
        // createBooks,
        // createBookInstances,
        createRecipes
    ],
// optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('BOOKInstances: '+bookinstances);

        }
        //All done, disconnect from database
        mongoose.connection.close();
    });




