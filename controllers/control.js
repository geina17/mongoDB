var mail = require('express');
var rout = mail.Router();
var path = require('path');
var ask = require('request');
var hello = require('cheerio');

//import the comment an articles
var Comment = require('../models/comment.js');
var Article = require('../models/articles.js');
//index page render
rout.get('/', function (req, res) {
    //scrape data
    res.redirect('/scrape');
});
//articles page render
rout.get('/articles', function (req, res) {
    //query monogodb
    Article.find().sort({
            _id: -1
        })
        .populate('comments')
        .exec(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                var hbsObj = {
                    articles: doc
                }
                res.render('index'.hbsObj);
            }
        });
});
//web scrape route
rout.get('/scrape', function (req, res) {
    request('http://www.vogue.co.uk/topic/news/', function (error, response, html) {
        var $ = cheerio.load(html);
        //error handler
        var titleArray = [];
        //grabbing everything with the tag inner/ article
        $("article.inner").each(function (i, element) {
            var result = {};
            result.title = $(this).children('header').children('h2').text().trim() + '';
            result.link = 'http://www.vogue.co.uk/topic/news/' + $(this).children('header').children('h2').children('a').attr('href').trim();
            result.summary = $(this).children('div').text().trim() + '';
            if (result.title !== "" && result.summary !== '') {
                if (titleArray.imdexOf(result.title) == -1) {
                    titleArray.push(result.title);
                    article.count({
                        title: title
                    }, function (err, test) {
                        if (test == 0) {
                            var entry = new article(result);
                            entry.save(function (err, doc) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(doc);
                                }
                            });
                        } else {
                            console.log('redundant database content.not saved to DB.');
                        }
                    });
                } else {
                    console.log('redundant thread content.not saved to DB');
                }
            } else {
                console.log('empty content. not saved to DB.');
            }
        });
        res.redirect('/articles');
    });
});
//add a comment
rout.post('/add/comment/:id', function (req, res) {
    var artId = req.params.id;
    var commAuthor = req.body.name;
    var commContent = req.body.comment;
    var result = {
        author: commAuthor,
        content: commContent
    };
    var entry = new comment(result);
    entry.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            article.findOneAndUpdare({
                    '_id': artId
                }, {
                    $push: {
                        'comments': doc_id
                    }
                }, {
                    new: true
                })
                .exec(function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    });
});
rout.post('/remove/comment/:id', function (req, res) {
    var commId = req.params.id;
    Comment.findByIdAndRemove(commId, function (err, todo) {
        if (err) {
            console.log(err);
        } else {
            res.sendStatus(200);
        }
    });
});
module.exports = rout;