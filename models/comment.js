var mongoose = require('mongoose');

//Schema Setup Mongoose
var CommentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String,
	}
})

module.exports = mongoose.model('Comment', CommentSchema);