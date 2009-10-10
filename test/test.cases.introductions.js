$(document).ready(function(){

	module("Weaving introductions");

	(function() {

		var executionCount = 0;

		testAop('introductions without method overriding', ['introduction'], {target: String, method: 'divide' }, function() { 
			expect(3);
			try
			{
				"test".divide();
				executionCount++;
			}
			catch (e)
			{
				if (executionCount != 1)
					return "Introduction failed";
			}
			return "OK";
		} ); 

	})();

	(function() {

		testAop('introductions with method overriding', ['introduction'], {target: String, method: 'indexOf' }, function() { 
			expect(3);
			var result = null;
			result = "test".indexOf('s');
			if (result == 'introduction method executed')
				return 2;
			else
				return result;
		} ); 

	})();

});
