// Test introductions with method overriding
(function() {

	function Dog() {}
	Dog.prototype.bark = function() { 
		return 'bark';
	}
	
	var dog = new Dog();

	test(['after'], 'Issue #3', {target: dog, method: 'bark' }, function() { 
		return dog.bark();
	} ); 

})();
