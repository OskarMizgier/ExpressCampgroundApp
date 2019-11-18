//Express server and body parser
var express = require('express');
var app 	= express();
var bodyParser= require('body-parser');

//Adding mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});


//Schema Setup Mongoose
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
})

var Campground = mongoose.model('Campground', campgroundSchema);
// Schema setup done
//Create a new -------------------------------------------- 
// Campground.create({name: 'Mateusz', 
// 				   image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
// 				  }, function (err, campground){
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log ('Newly created CAMPGROUND!')
// 		console.log(campground)
// 	}
// });

// --------------------------------------------

	// var campGrounds = [
	// 	{name: 'Oskar', image: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'},
	// 	{name: 'Mateusz', image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'},
	// 	{name: 'Michal', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'},
	// 	{name: 'Lukasz', image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'},
	// ]


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// ------------------------ROUTES -------------------------------
app.get('/', function (req, res){
	res.render('landing')
});

app.get('/campgrounds', function (req, res){
	//Get all campgrounds from DB
	Campground.find({}, function (err, allCampgrounds){
		if(err){
			console.log(err)
		} else {
			res.render('campgrounds', {campgrounds: allCampgrounds})
		}
	})
	
	//res.render('campgrounds', {campGrounds: campGrounds})
})

app.get('/campgrounds/new', function (req, res){
	res.render('new')
})

app.post('/campgrounds', function (req, res){
	var formName = req.body.name
	var imageUrl = req.body.image
	var newCampGround = {name: formName, image: imageUrl}
	Campground.create(newCampGround, function(err, newlyCreated){
		if(err){
			console.log(err)
		} else {
			res.redirect('/campgrounds')
		}
	})
	
	// campGrounds.push(newCampGround)
	// Get data from form and add to campgrounds arr
	//redirect back to campgrounds page
	//res.redirect('/campgrounds')
})


//Tel express to listen for requests - start server
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});