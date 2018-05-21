//depen
var mail =require('express');
var mango =require('mongojs');
var ask =require('request');
var parser =require('body-parser');
var hello =require('cheerio');

//initalizing express
var app = express();

app.use(express.static('public'));

//data base info
var dbUrl = 'fashiondb';
var collec =['trending'];

var db =mango(dbUrl,collec);

db.on('error',function(error){
    console.log('database error',error);
});

app.get('/all',function(req,res){
    db.trending.find({},function(error,data){
        if(error){
            console.log(error);
        }else{
            res.json(data);
        }
    });
});

app.get('/scrape',function(req,ress){
    request('http://www.double3xposure.com/',function(error,res,html){
        var $ = hello.load(html);
    });
    $('h2.c-entry-box--compact__title').each(function(i,element){
        var link =$(element).children().attr('herf');
        var title = $(element).children().text();
        db.trending.insert({
            'title':title,
            'link':link
        },
        {
            upsert:true
        },
        function(err,inserted){
            if(err){
                console.log(err);
            }else{
                console.log(insterted);
            }
        });
    });
    res.send('scrape complete');
    res.end();
});

//listen on port 8080
app.listen(8080,function(){
    console.log('app runncing on port 8080');
});