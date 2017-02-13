var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

var models_path = path.join(__dirname, '../models');
mongoose.connect('mongodb://localhost/2048');

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file);
	}
});
