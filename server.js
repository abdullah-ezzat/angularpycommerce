const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/angularpycommerce'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/angularprojectnew/index.html'));});
app.listen(process.env.PORT || 8080);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });