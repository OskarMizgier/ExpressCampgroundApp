var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// ------------------------ROUTES -------------------------------
app.get('/', function (req, res){
	res.render('landing')
});


//Tel express to listen for requests - start server
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});