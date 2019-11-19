//Express server and body parser
var express = require('express');
var app 	= express();
var bodyParser= require('body-parser');
var Campground = require('./models/campground')
var seedDB = require('./seeds');
var Comment = require('./models/comment');

//Remove all campgrounds each time we restart the server
seedDB();
//Adding mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});



app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))





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
			res.render('index', {campgrounds: allCampgrounds})
		}
	})
	
	//res.render('campgrounds', {campGrounds: campGrounds})
})

	app.get('/campgrounds/new', function (req, res){
	res.render('new')
})

	//Show more info about campground
app.get('/campgrounds/:id', function (req, res){
		Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground){
			if(err){
				console.log(err);
			} else {
				console.log(foundCampground)
				res.render('show', {campground: foundCampground})
			}
		})
})


app.post('/campgrounds', function (req, res){
	var formName = req.body.name
	var imageUrl = req.body.image
	var CampDescription = req.body.description
	var newCampGround = {name: formName, image: imageUrl, description: CampDescription}
	Campground.create(newCampGround, function(err, newlyCreated){
		if(err){
			console.log(err)
		} else {
			res.redirect('/campgrounds')
		}
	})
});

app.post("/campgrounds/:id", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);git 
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});


//Tel express to listen for requests - start server
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});