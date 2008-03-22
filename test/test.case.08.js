// Test global functions
(function() {

	window.MinDate = function(index) 
	{
		return ( new Date(0) ) + " TEST " + index;
	}

	test(['after', 'before', 'around'], 'global functions', {target: window, method: 'MinDate' }, function() { 
		return MinDate(105);
	} ); 

	window.MinDate = null;

})();
