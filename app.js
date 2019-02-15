var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var mongoose = require('mongoose');
var expressSanitizer = require('express-sanitizer')

var Blog = require("./models/blog")
var seedDb = require('./seeds');

seedDb();

mongoose.connect("mongodb://localhost/blog_app", {
	useNewUrlParser: true
});

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));



// Blog.create({
// 	c
// })


//RESTful routes

app.get("/", function(req, res) {
	res.redirect("/blogs");
})

app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log(err)
		} else {
			res.render("index", {blogs: blogs})
		}
})
})

app.get("/blogs/new", function(req, res) {
	res.render("new");
})

app.post("/blogs", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.create(req.body.blog, function(err, newBlog){
		if (err) {
			res.render("new")
		} else {
			res.redirect("/blogs");
		}
	})
})

app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog){
		if (err) {
			res.redirect('/blogs')
		} else {
			res.render("edit", {blog: foundBlog})
		}
	})
	
})

app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
		if (err) {
			res.redirect('/blogs')
		} else {
			res.render("show", {blog: foundBlog})
		}
	})
})



app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if (err) {
			res.redirect('/blogs')
		} else{
			res.redirect("/blogs/" + req.params.id)
		}
	})
})

//Delete route

app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/blogs')
		} else {
			res.redirect("/blogs")
		}
	})
	
})

var PORT = 3000;

app.listen(PORT, function() {
	console.log("Server is running")
})