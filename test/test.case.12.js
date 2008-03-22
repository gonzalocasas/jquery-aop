// Test introductions with method overriding
(function() {

	test(['introduction'], 'introductions with method overriding', {target: String, method: 'indexOf' }, function() { 
		var result = null;
		result = "test".indexOf('s');
		if (result == 'introduction method executed')
			return 2;
		else
			return result;
	} ); 

})();
