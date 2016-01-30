

//var con = require('./controller');
var path = require('path');

module.exports = function(app){
    app.get('*', function (req, res, next){
        //res.sendFile(path.resolve(__dirname, 'public/page', 'index.ejs'))
        //test by allen
        res.render('index');
    });
};
