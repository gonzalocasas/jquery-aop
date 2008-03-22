// Test custom objects with prototype and prototyped function
(function() {

	function Prototyped( str )
	{
		this.ID = str;
	}

	Prototyped.prototype.getID = function() {
		return this.ID;
	}

	test(['after', 'before', 'around'], 'custom objects with prototype and prototyped function', {target: Prototyped, method: 'getID' }, function() { 
		var custom = new Prototyped("testID");
		return custom.getID();
	} ); 
})();
