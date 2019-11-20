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
var methodOverride = require('method-override')
var flash = require('connect-flash');

//Remove all campgrounds each time we restart the server
// seedDB();
//Adding mongoose
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://altuzz:Magister66@cluster0-tpep3.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
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
app.use(methodOverride('_method'));
app.use(flash());



app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

//Middleware to pass Currentuser to all routes
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
	  res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
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
app.get('/campgrounds/:id',isLoggedIn, function (req, res){
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
	 var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author:author}
	Campground.create(newCampground, function(err, newlyCreated){
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
           console.log(err) 
           res.redirect("/campgrounds");
       } else {
		   //Add username and id to comment
		   
		   //save comment
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
			    //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
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
	res.render('login', {message: req.flash('error')})
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
	req.flash('success', 'You have been successfully logged out')
   res.redirect("/campgrounds");
});

//ISLOGGEDIN
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash('error', 'Please login first')
    res.redirect("/login");
}

//Tel express to listen for requests - start server
.listen(process.env.PORT || 5000, function (){
	console.log('App is running!')
})