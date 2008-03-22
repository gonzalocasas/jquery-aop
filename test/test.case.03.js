// Test custom objects with prototype and prototyped function using regex
(function() {

	function Prototyped( str )
	{
		this.ID = str;
	}

	Prototyped.prototype.getID = function() {
		return this.ID;
	}

	Prototyped.prototype.getIDSecond = function() {
		return this.ID + "(bis)";
	}

	test(['after', 'before', 'around'], 'custom objects with prototype and prototyped function using regex', {target: Prototyped, method: 'getI' }, function() { 
		var custom = new Prototyped("testID");
		return custom.getID() + " - " + custom.getIDSecond();
	} ); 
})();
