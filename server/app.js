var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({
    extended: true
}));



//modules
var testModule = require("./modules/testModule.js");
console.log("Hi there! :) ");
console.log(testModule.test("app.js: testing module connection"));



//routes
var testRoute = require("./routes/testRoute.js");
app.use('/testRoute', testRoute);


app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('server is running on port', app.get('port'));

});
