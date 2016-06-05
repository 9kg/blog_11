var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var DB = require('./db/db');

app.listen(3001);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin','*');
    next();
});
router.get('/query',(req,res,next) => {
    DB.query(function(data){
        res.json(data);
    });
});

router.post('/insert',(req,res,next) => {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var name = req.body.name;
    var content = req.body.content;
    DB.insert(name, content, ip, function(data){
        res.json(data);
    });
});

app.use('/message',router);

module.exports = app;