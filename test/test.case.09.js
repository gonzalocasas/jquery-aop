// Test global functions with "eval()"
(function() {

	window.MinDate = function(index) 
	{
		return ( new Date(0) ) + " TEST " + index;
	}

	test(['after', 'before', 'around'], 'global functions with "eval()"', {target: window, method: 'MinDate' }, function() { 
		return eval("MinDate(105)");
	} ); 

	window.MinDate = null; 

})();
