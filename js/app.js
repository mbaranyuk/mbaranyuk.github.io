'use strict';

angular.module('empeekApp', [])
.controller('MainCtrl', function ($scope) {
    $scope.items = [];

    $scope.setSelected = function(index) {
		$scope.activeItem = index;
	}

    $scope.loadItems = function() {
    	var items = JSON.parse(localStorage.getItem('EmpeekItems'));
    	$scope.items = items !== null ? items : [];
    };

    $scope.addItem = function() {
    	if (!$scope.itemText) return;

    	$scope.items.push({text: $scope.itemText, comments: []});
    	saveItems($scope.items);
    	$scope.itemText = '';
    };

    $scope.deleteItem = function(i) {
    	if ( (i < 0) || (i >= $scope.items.length) ) return;

    	$scope.items.splice(i, 1);
    	saveItems($scope.items);
    	$scope.activeItem = -1;
    };

    $scope.addComment = function(event) {
    	if(event.keyCode == 13) {   // '13' is the key code for enter
	        $scope.items[$scope.activeItem].comments.push($scope.commentText);
	    	$scope.commentText = '';

			saveItems($scope.items);	    	
	    }
    };

    var saveItems = function(items) {
    	localStorage.setItem('EmpeekItems', JSON.stringify(items));
    };
});

