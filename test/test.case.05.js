// Test global functions invoked with "call" on a custom objects with prototype
(function() {

	window.TestFunction1 = function(index) 
	{
		return this.ID + ".." + index;
	}

	function Prototyped( str )
	{
		this.ID = str;
	}

	Prototyped.prototype.getID = function() {
		return this.ID;
	}

	test(['after', 'before', 'around'], 'global functions invoked with "call" on a custom objects with prototype', {target: window, method: 'TestFunction1' }, function() { 
		var custom = new Prototyped("testID");
		return TestFunction1.call(custom, 10);
	} ); 

	window.TestFunction1 = null;

})();
