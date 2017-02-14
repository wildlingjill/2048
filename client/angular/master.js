
// Game logic code below

var grid = [[ 0, 0, 0, 0 ],
			[ 0, 0, 0, 0 ],
			[ 0, 0, 0, 0 ],
			[ 0, 0, 0, 0 ]];


var score = 0;

// function to check whether there are any empty spaces on the board
function isGridFull(arr){
	for (var y = 0; y < arr.length; y++) {
		if (arr[y].indexOf(0) !== -1){
			return false;
		}
	}
	return true;
}

// checks for game over
function gameOver(arr){
	if(!isGridFull(arr)){
		return false;
	} else {
		for (var y = 0; y < arr.length; y++){
			for (var x = 0; x < arr.length; x++) {

				var xSameValue = (x+1 < arr.length && arr[y][x] === arr[y][x+1]);
				var ySameValue = (y+1 < arr.length && arr[y][x] === arr[y+1][x]);

				if (xSameValue || ySameValue) {
					return false;
				}
			}
		}
	}
	alert("Game over!");
	return true;
}

// console logs 2D array in right format
function log(arr) {
	for (var i = 0; i < arr.length; i++){
		console.log(arr[i]);
	}
}


// generates a random number with math.random multiplied by n
function randomNum(n) {
	return Math.floor(Math.random() * n);
}


// checks a square at x and y coordinates, adds val to grid if that square's value is 0
function addToGrid(arr, val) {
	var y = randomNum(arr.length);
	var x = randomNum(arr.length);
	if (arr[y][x] === 0){
		arr[y][x] = val;
	} else {
		if(!isGridFull(arr)){
			addToGrid(arr, val);
		}
	}
}


// gives a 2 or 4 back to then add to the grid with addToGrid
function generate2or4() {
	var n = Math.floor(Math.random() * 2);
	if (n === 0) {
		n = 2;
	} else {
		n = 4;
	}
	return n;
}


// function to be called at start of game, to give 2 numbers at random squares on grid
function startUp(arr) {
	var startNum1 = generate2or4();
	var startNum2 = generate2or4();

	if (startNum1 === 4 && startNum2 === 4){
		startNum2 = 2;
	}

	addToGrid(arr, startNum1);
	addToGrid(arr, startNum2);

	log(arr);
	return arr;
}


// calling startup with the grid variable
startUp(grid);


function combine (a, b) {
	var x = a + b;
	score += x;
	if (x === 2048){
		alert("You win!");
		return x;
	} else {
		return x;
	}
}


// call function if left arrow key is pressed, shifts all values along to left as far as they will go
function leftPress (arr) {

	// for every element in each array
	for (var y = 0; y < arr.length; y++) {
		// variable to stop situations where e.g. [2, 2, 0, 4] gives [8, 0, 0, 0] instead of [4, 4, 0, 0]
		var stopAt = 0;

		for (var x = 0; x < arr.length; x++){

		// making _x so we don't lose the current value of x when shifting
			var _x = x;

			// only moving numbers that aren't equal to 0
			if (arr[y][_x] !== 0){

				// only move if current x index is not 0 and the number to the left is a zero
				while (_x > 0 && arr[y][_x-1] === 0) {

					// keep shifting left till you break out of the while loop
					arr[y][_x-1] = arr[y][_x];
					arr[y][_x] = 0;
					_x = _x-1;
				}

				// check if two numbers next to each other can be combined
				if (_x > stopAt && arr[y][_x-1] === arr[y][_x]) {

					arr[y][_x-1] = combine(arr[y][_x], arr[y][_x-1]);

					// set current _x array value to 0 so above loop can shift any numbers after this along
					arr[y][_x] = 0;

					// set stopAt value to stop concurrent combinations when shifting
					stopAt = _x;
				}
			}
		}
	}

	// add a new 2 or 4 to the grid in a random square
	addToGrid(arr, generate2or4());

	if (!gameOver(arr)) {
		// print new grid
		log(arr);
	}
}


function rightPress(arr) {

	// for every element in each array
	for (var y = 0; y < arr.length; y++) {

		// variable to stop situations where e.g. [2, 2, 0, 4] gives [8, 0, 0, 0] instead of [4, 4, 0, 0]
		var stopAt = arr.length-1;

		for (var x = arr.length-1; x >= 0; x--){

		// making _x so we don't lose the current value of x when shifting
			var _x = x;

			// only moving numbers that aren't equal to 0
			if (arr[y][_x] !== 0){

				// only move if current x index is less than the length of the array and the number to the right is a zero
				while (_x < arr[y].length-1 && arr[y][_x+1] === 0) {

					// keep shifting right till you break out of the while loop
					arr[y][_x+1] = arr[y][_x];
					arr[y][_x] = 0;
					_x = _x+1;
				}

				// check if two numbers next to each other can be combined
				if (_x < stopAt && arr[y][_x+1] === arr[y][_x]) {

					arr[y][_x+1] = combine(arr[y][_x], arr[y][_x+1]);

					// set current _x array value to 0 so above loop can shift any numbers after this along
					arr[y][_x] = 0;

					// set stopAt value to stop concurrent combinations when shifting
					stopAt = _x;
				}
			}
		}
	}

	// add a new 2 or 4 to the grid in a random square
	addToGrid(arr, generate2or4());

	if (!gameOver(arr)) {
		// print new grid
		log(arr);
	}
}


function upPress(arr) {

	// for every element in each array
	for (var x = 0; x < arr.length; x++){

		// variable to stop situations where e.g. [2, 2, 0, 4] gives [8, 0, 0, 0] instead of [4, 4, 0, 0]
		var stopAt = 0;

		for (var y = 0; y < arr.length; y++) {

		// making _y so we don't lose the current value of y when shifting
			var _y = y;

			// only moving numbers that aren't equal to 0
			if (arr[_y][x] !== 0){

				// only move if current y index is not 0 and the number to the top is a zero
				while (_y > 0 && arr[_y-1][x] === 0) {

					// keep shifting up till you break out of the while loop
					arr[_y-1][x] = arr[_y][x];
					arr[_y][x] = 0;
					_y = _y-1;
				}

				// check if two numbers next to each other can be combined
				if (_y > stopAt && arr[_y-1][x] === arr[_y][x]) {

					arr[_y-1][x] = combine(arr[_y][x], arr[_y-1][x]);

					// set current _y array value to 0 so above loop can shift any numbers after this up
					arr[_y][x] = 0;

					// set stopAt value to stop concurrent combinations when shifting
					stopAt = _y;
				}
			}
		}
	}

	// add a new 2 or 4 to the grid in a random square
	addToGrid(arr, generate2or4());

	if (!gameOver(arr)) {
		// print new grid
		log(arr);
	}
}


function downPress(arr){

	// for every element in each array
	for (var x = 0; x < arr.length; x++){

		// variable to stop situations where e.g. [2, 2, 0, 4] gives [8, 0, 0, 0] instead of [4, 4, 0, 0]
		var stopAt = arr.length-1;

		for (var y = arr.length-1; y >= 0; y--) {

		// making _y so we don't lose the current value of y when shifting
			var _y = y;

			// only moving numbers that aren't equal to 0
			if (arr[_y][x] !== 0){

				// only move if current y index is less than the length of the array and the number to the bottom is a zero
				while (_y < arr.length-1 && arr[_y+1][x] === 0) {

					// keep shifting down till you break out of the while loop
					arr[_y+1][x] = arr[_y][x];
					arr[_y][x] = 0;
					_y = _y+1;
				}

				// check if two numbers next to each other can be combined
				if (_y < stopAt && arr[_y+1][x] === arr[_y][x]) {

					arr[_y+1][x] = combine(arr[_y][x], arr[_y+1][x]);

					// set current _y array value to 0 so above loop can shift any numbers after this down
					arr[_y][x] = 0;

					// set stopAt value to stop concurrent combinations when shifting
					stopAt = _y;
				}
			}
		}
	}

	// add a new 2 or 4 to the grid in a random square
	addToGrid(arr, generate2or4());

	if (!gameOver(arr)) {
		// print new grid
		log(arr);
	}
}


// Angular code below

var app = angular.module('app', ['ngRoute']);


app.config(function ($routeProvider) {
	$routeProvider

	.when('/',{
		templateUrl: 'static/partials/game.html',
		controller: 'gameController'
	})

	.otherwise({
		redirectTo: '/'
	});
});


app.controller('gameController', function($scope, $routeParams, $location) {

	$scope.grid = grid;
	$scope.score = score;

	$scope.startUp = function() {
		$scope.grid = [[ 0, 0, 0, 0 ],
					[ 0, 0, 0, 0 ],
					[ 0, 0, 0, 0 ],
					[ 0, 0, 0, 0 ]];
		startUp($scope.grid);
		$scope.score = 0;
		score = 0;
	}

	$scope.getScore = function() {
   		return score;
	}


	$scope.leftPress = function() {
		leftPress($scope.grid);
		$scope.score = $scope.getScore();
	}

	$scope.rightPress = function() {
		rightPress($scope.grid);
		$scope.score = $scope.getScore();
	}

	$scope.upPress = function() {
		upPress($scope.grid);
		$scope.score = $scope.getScore();
	}

	$scope.downPress = function() {
		downPress($scope.grid);
		$scope.score = $scope.getScore();
	}

	$scope.checkkey = function(event) {
		if (event.keyCode == 38) {
	        console.log("up arrow");
			$scope.upPress($scope.grid);
		} else if (event.keyCode == 39){
			console.log("right arrow");
			$scope.rightPress($scope.grid);
		} else if (event.keyCode == 40){
			console.log("down arrow");
			$scope.downPress($scope.grid);
		} else if (event.keyCode == 37){
			console.log("left arrow");
			$scope.leftPress($scope.grid);
		}
	}

});
