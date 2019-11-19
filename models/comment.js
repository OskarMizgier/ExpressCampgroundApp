var mongoose = require('mongoose');

//Schema Setup Mongoose
var CommentSchema = new mongoose.Schema({
	text: String,
	author: String,
})

module.exports = mongoose.model('Comment', CommentSchema);