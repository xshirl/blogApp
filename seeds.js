var mongoose = require('mongoose');

var Blog = require('./models/blog');
var Comment = require('./models/comment');

var data = [
	{
		title: "Almost Spring",
		image: "http://image.insider-journeys.com/japan/flowering-japanese-cherry-sakura_21.jpg",
		body: "Hello, it's almost spring!"
	},

	{
		title: "Valentine's Day",
		image:"http://chuckscafeburbank.com/wp-content/uploads/2019/01/Valentines-Day.jpg",
		body: "Today's Valentine's Day! Are you celebrating it with your special someone?"

	}
	
]
function seedDB() {
	Blog.remove({}, function(err) {
		if (err) {
			console.log(err);
			} console.log("removed blog entries");
		

	//add a few campgrounds
	data.forEach(function(seed) {
		Blog.create(seed, function(err, data) {
			if (err) {
				console.log(err) 
			} else {
				console.log("added a blog entry")
				Comment.create(
				{
					text: "Nice picture!",
					author: "eternalbliss"
				}, function (err, comment) {
					if (err) {
						console.log(err)
					} else{
					data.comments.push(comment);
					data.save()
					console.log("Added comment")
					}
				}

					)
			}
		})
	})

	})
	
}

module.exports = seedDB;