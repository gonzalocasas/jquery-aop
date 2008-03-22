// Test built-in objects
(function() {
	test(['after', 'before', 'around'], 'built-in objects', {target: String, method: 'indexOf' }, function() { 
		return "test".indexOf('e'); 
	} ); 
})();

