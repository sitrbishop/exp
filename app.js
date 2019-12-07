var express = require('express')
var __dirname = 'http://127.0.0.1:3000'
var app = express()
app.use(express.static('public'));
var handlebars = require('express3-handlebars')
.create({defaultLayout: 'main'})
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');


var fortunes = [
    "fuck you!",
    "you son of a bitch",
    "hhhhh",
    "this is not a dance"
]

app.get('/', function(req,res){
    res.render('home');
})
app.get('/about', function(req,res){
    
    var randomeFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about',{fortune:randomeFortune});
})
// 404 其实这家伙是个中间件 catch-all
app.use(function(req,res,next){
    res.status(404);
    res.render('404');
})

app.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500);
    res.render('500');
})

app.listen(3000, function(res,req){
    console.log('服务器已启动');
})