// Test introductions without method overriding
(function() {

	var executionCount = 0;

	test(['introduction'], 'introductions without method overriding', {target: String, method: 'divide' }, function() { 
		try
		{
			"test".divide();
			executionCount++;
		}
		catch (e)
		{
			if (executionCount == 1)
				log("Introduction not found, the aspect has been unweaved properly");
			else
				return "Introduction failed";
		}
		return "OK";
	} ); 

})();
