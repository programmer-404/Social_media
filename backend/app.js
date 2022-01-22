const express = require('express');
const app = express();
const routes = require("./routes.js")
var port = 8000
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");

    next();
});

app.use(function (req, res, next) {
    let apiKey = req.get('apiKey')
    if (apiKey !== "akshayApi") {
        res.json({
            status: false,
            message: "you are not Authorised to access Api"
        });
    } else {
        next()
    }
})


app.use('/', routes);
app.listen(port);
console.log('The magic happens on port ' + port + ' Date: ' + Date());