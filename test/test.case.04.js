// Test custom objects with prototype but instance-function
(function() {

	function PrototypedWithInstanceFunctions( str )
	{
		this.ID = str;
	}

	PrototypedWithInstanceFunctions.prototype.getID = function() {
		return this.ID;
	}

	var instance = new PrototypedWithInstanceFunctions("testID");

	instance.getIDInstance = function() {
		return this.ID;
	}

	test(['after', 'before', 'around'], 'custom objects with prototype but instance-function', {target: instance, method: 'getIDInstance' }, function() { 
		return instance.getIDInstance();
	} ); 

})();
