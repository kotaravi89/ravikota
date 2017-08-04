// import require modules
var express = require('express');
var app 	= express();
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

// defining configuration of database
var dbPath  = "mongodb://localhost/myblogapp";

//creating connection with mongoose database
db = mongoose.connect(dbPath);
mongoose.connection.once('open', function() {

	console.log("database connection of original file open success");

});

//include the model file
var Blog 	  = require('./blogmodel.js');
var blogModel =  mongoose.model('Blog');
//var comments  = require('./blogmodel.js');
var comment   = mongoose.model('comments');

// start myblogapp routes

app.get('/', function (req, res) {
  res.send("This is a blog application")
});

// API to create a signUp blog
app.post('/blog/signup',function(req, res){
	var myBlog = new blogModel({

		title 		: req.body.title,
		firstName	: req.body.firstName,
		lastName	: req.body.lastName,
		userName	: req.body.userName,
		passWord	: req.body.passWord,
		mobile		: req.body.mobile,
		address		: req.body.address
	});
	myBlog.save(function(error){
		if(error){
			console.log(error);
			res.send(error);
		}
		else{
			console.log(myBlog);
			res.send(myBlog);
		}
	});

});

//API to create a body blog
app.post('/blog/create',function(req,res){
	var blogCreate = new blogModel({

		title		: req.body.title,
		subTitle	: req.body.subTitle,
		blogBody	: req.body.blogBody,
		comments	: req.body.comments
	});
	blogCreate.save(function(error){
		if(error){
			console.log(error);
			res.send(error);
		}
		else{
			console.log(blogCreate);
			res.send(blogCreate);
		}
	});
});

// API for comments section
app.post('/blog/comments',function(req,res){
	var commentId = new comment({
		blogID		: req.body.blogID,
		created		: req.body.created,
		userName	: req.body.userName
	})
	var today = Date.now();
		commentId.created = today;
	commentId.save(function(error){
		if(error){
			console.log(error);
		}
		else{
			res.send(commentId);
		}
	});
});

//API to create a Header list bar
app.post('/blog/header',function(req,res){
	var header  = new blogModel({
		home		: req.body.home,
		ourProducts	: req.body.ourProducts,
		contactUs	: req.body.contactUs
	});
	header.save(function(error){
		if(error){
			console.log(error);
		}
		else{
			console.log(header);
			res.send(header);
		}
	});
});

//API to view all Blogs
app.get('/allblogs',function(req,res){
	 blogModel.find(function(error,result){
		if(error){
			console.log(error);
			res.send(error);
		}
		else{
			res.send(result);
		}
	});
});

//API to view particular blog
app.get('/allblogs/:id/',function(req,res){
	blogModel.findOne({'_id':req.params.id},function(error,result){
		if(error){
			console.log("error");
			res.send(error);
		}
		else{
			res.send(result);
		}
	});
});

//API to edit particular blog
app.put('/allblogs/:id/edit',function(req,res){
	var update = req.body;
	blogModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){

		if(err){
			console.log("error");
			res.send(err);
		}
		else{
			res.send(result)
		}
	});
});

//API to delete particular blog
app.post('/allblogs/:id/delete',function(req, res) {
	blogModel.remove({'_id':req.params.id},function(err,result){
		if(err){
			console.log("error");
			res.send(err)
		}
		else{
			res.send(result)
		}
	}); 
});

//server port adress
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
































