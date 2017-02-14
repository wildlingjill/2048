// get the http module:
var http = require("http");

// path needed for the path.join in the res.sendFile function
var path = require("path");

// requires and instantiates an express server
var express = require("express");
var app = express();

// serves html file with get request and res.sendFile
app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, "../../client", "index.html"));
});

// creates a url called static and mounts the client folder under that url
app.use('/static', express.static(path.join(__dirname, '../../client')));

// tells server to listen on port 6789
app.listen(6789);
