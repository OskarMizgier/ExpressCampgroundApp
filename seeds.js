var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment')




var data = [
	{
		name: 'Paris',
		image: 'https://images.unsplash.com/photo-1562380144-11338becc38e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},	
		{
		name: 'London',
		image: 'https://images.unsplash.com/photo-1561731857-c5ed4e052d0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1877&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},	
		{
		name: 'New York',
		image: 'https://images.unsplash.com/photo-1470805453991-a1b8c719cc70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},	
		{
		name: 'Praha',
		image: 'https://images.unsplash.com/photo-1488682371245-58436e0dc611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1780&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},	
]


// function seedDB(){
// 	// Remove all campgrounds
// 	Campground.deleteMany({}, function (err){
// 		if(err){
// 			console.log(err)
// 		}
// 		console.log('Removed the Campgrounds')
// 		//Add a few campgrounds
// 			data.forEach(function(seed){
// 		Campground.create(seed, function (err, campground){
// 			if (err){
// 				console.log(err)
// 			} else {
// 				console.log('Added campground!')
// 				//Create a new comment
// 				Comment.create({
// 					text: 'This place is great, but I wish there was internet',
// 					author: 'Homer'
// 				}, function (err, comment){
// 					if(err){
// 						console.log(err)
// 					} else {
// 						campground.comments.push(comment);
// 					campground.save();
// 						console.log('Created new comment')
// 					}
// 				})
// 			}
// 		})
// 	})
// 	})
	
// 	//Add a few comments
// }

//module.exports = seedDB;