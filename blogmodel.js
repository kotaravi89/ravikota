
// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var blogSchema = new Schema({

	home		: {type:String,default:''},
	ourProducts	: [],
	aboutUs		: {type:String,default:''},
	contactUs	: {type:String,default:''},
	title 		: {type:String,default:''},
	subTitle 	: {type:String,default:''},
	blogBody 	: {type:String,default:''},
	tags		: [],// name of tags in array
	created		: {type:Date, default:null},
	lastModified : {type:Date,default:null},
	authorInfo  :  {}, // information of author in form of obje-ct
	firstName	: {type:String,default:''},
	lastName	: {type:String,default:''},
	userName	: {type:String,default:''},
	passWord	: {type:String,default:''},
	address		: {type:String,default:''},
	mobile		: {type:Number,default:''},
	blogID		: {type:String,default:''},
	bodyhtml	: {type:String,default:''},
	imageURL	: {type:String,default:''}
});

mongoose.model('Blog',blogSchema);

var comments = new Schema({
	blogID		: {type:String,default:''},
	created		: {type:String,default:''},
	userName	:{type:String,default:''}
})

mongoose.model('comments',comments)