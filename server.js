var express = require("express");
var app = express();
var db = require('riak-js').getClient({host: "127.0.0.1", port: "10018"});

/* serves main page */
app.get("/", function(req, res) {
	res.sendfile('EventCalendar.html')
});

app.get("/demo_test.txt", function(req, res) {
	res.send("Ajax works");
});
 
app.post("/addEvent", function(req, res) { 
	
	console.log(JSON.stringify(req));
	
	//var tmp = JSON.parse(req);
	db.save('conferences', 'nodeconf', req);
	/*db.get('conferences', 'nodeconf',
		function(err, data) {
			if (err) console.log("test");
			else console.log("Found the conference:" +
				(data.fname));
		});*/
	//db.remove('conferences', 'nodeconf');
	//console.log(req);
	res.send(JSON.stringify('OK'));
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){ 
	res.sendfile( __dirname + req.params[0]); 
});
 
var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
