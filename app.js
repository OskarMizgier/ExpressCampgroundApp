//Express server and body parser
var express = require('express');
var app 	= express();
var bodyParser= require('body-parser');
var Campground = require('./models/campground')
var seedDB = require('./seeds');
var Comment = require('./models/comment');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user')

//Remove all campgrounds each time we restart the server
seedDB();
//Adding mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(require('express-session')({
	secret: 'Tygryszak',
	resave: false,
	saveUninitialized: false
}))

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());



app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

//Middleware to pass Currentuser to all routes
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});



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
			res.render('index', {campgrounds: allCampgrounds, currentUser: req.user})
		}
	})
	
	//res.render('campgrounds', {campGrounds: campGrounds})
})

	app.get('/campgrounds/new',isLoggedIn, function (req, res){
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


app.post('/campgrounds', isLoggedIn, function (req, res){
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

//===============================================
// AUTH ROUTES
app.get('/register', function (req, res){
	res.render('register')
});

//HANDLE REGISTER
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

//LOGIN FORM
app.get('/login', function (req, res){
	res.render('login')
})
//HANDLE LOGIN
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

//ISLOGGEDIN
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//Tel express to listen for requests - start server
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});