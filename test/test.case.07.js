// Test custom objects without prototype
(function() {

	function Custom( str )
	{
		this.ID = str;
	}

	var custom = new Custom("testID");
	custom.GetData = function(index) {
		return this.ID + ":" + index
	}

	test(['after', 'before', 'around'], 'custom objects without prototype', {target: custom, method: 'GetData' }, function() { 
		return custom.GetData(10);
	} ); 

})();

