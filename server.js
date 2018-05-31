//depen
var mail = require('express');
// var mango = require('mongojs');
var ask = require('request');
var parser = require('body-parser');
var hello = require('cheerio');
var handle = require('express-handlebars');
var riki = require('mongoose');
var freeman = require('morgan');

//initalizing express for debugging
var app = mail();

app.use(freeman('dev'));
app.use(parser.urlencoded({
    extended: false
}));

//serve static content
app.use(mail.static(process.cwd() + '/public'));

//handlebars
app.engine('handlebars', handle({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//databas config w mongoose
//connect to local database
if (process.env.Node_Env == 'production') {
    riki.connect('monobd://heroku_');
} else {
    riki.connect('monobd://localhost/fashion-scraper');
}
var db = riki.connection;

//show mongoose errors
db.on('error', function (err) {
    // console.log('mongoose error:'+ err);
});

//once logged into db thro mongoose log sucess
db.once('open', function () {
    console.log('mongoose connection successful');
});

//import the comment and article models
var comment = require('./models/comment.js');
var article = require('./models/articles.js');

//import routes/controllers
var router = require('./controllers/control.js');
app.use('/', router);

//launch app
var dock = process.env.PORT || 3000;
app.listen(dock, function () {
    console.log('running on port:' + dock);
});

// //data base info
// var dbUrl = 'fashiondb';
// var collec = ['trending'];

// var db = mango(dbUrl, collec);

// db.on('error', function (error) {
//     console.log('database error', error);
// });

// app.get('/all', function (req, res) {
//     db.trending.find({}, function (error, data) {
//         if (error) {
//             console.log(error);
//         } else {
//             res.json(data);
//         }
//     });
// });

// app.get('/scrape', function (req, ress) {
//     request('http://www.double3xposure.com/', function (error, res, html) {
//         var $ = hello.load(html);
//     });
//     $('h2.c-entry-box--compact__title').each(function (i, element) {
//         var link = $(element).children().attr('herf');
//         var title = $(element).children().text();
//         db.trending.insert({
//             'title': title,
//             'link': link
//         },
//             {
//                 upsert: true
//             },
//             function (err, inserted) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(insterted);
//                 }
//             });
//     });
//     res.send('scrape complete');
//     res.end();
// });

// //listen on port 8080
// app.listen(8080, function () {
//     console.log('app runncing on port 8080');
// });