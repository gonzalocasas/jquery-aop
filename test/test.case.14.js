// Test weaving on a global function that does not exist
(function() {

	testcase("Test case for issue #4 - Weaving nonexistent global functions does not throw", function() {

		var exceptionThrown = false;
		try
		{
			jQuery.aop.after( {target: window, method: 'doesNotExists' }, function() { } ); 
		}
		catch (e)
		{
			exceptionThrown = true;
		}

		assert(exceptionThrown == false, "Weaving nonexistent global functions should not throw exception");

	});

})();

