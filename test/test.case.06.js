// Test global functions invoked with "call" on a custom objects without prototype
(function() {

	window.TestFunction2 = function(index) 
	{
		return this.ID + ".." + index;
	}

	function Custom( str )
	{
		this.ID = str;
	}

	test(['after', 'before', 'around'], 'global functions invoked with "call" on a custom objects without prototype', {target: window, method: 'TestFunction2' }, function() { 
		var custom = new Custom("testID");
		return TestFunction2.call(custom, 10);
	} );

	window.TestFunction2 = null;

})();
