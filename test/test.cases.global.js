$(document).ready(function(){

	module("Weaving global functions");

	(function() {

		function Prototyped( str )
		{
			this.ID = str;
		}

		Prototyped.prototype.getID = function() {
			return this.ID;
		}

		testAop('global functions invoked with "call" on a custom objects with prototype', {target: window, method: 'TestFunction1' }, function() { 
			expect(5);

			var custom = new Prototyped("testID");
			return TestFunction1.call(custom, 10);

		}, function() { 
			window.TestFunction1 = function(index) 
			{
				return this.ID + ".." + index;
			}
		} ); 

	})();


	(function() {

		function Custom( str )
		{
			this.ID = str;
		}

		testAop('global functions invoked with "call" on a custom objects without prototype', {target: window, method: 'TestFunction2' }, function() { 
			expect(5);
			var custom = new Custom("testID");
			return TestFunction2.call(custom, 10);
		}, function() {
			window.TestFunction2 = function(index) 
			{
				return this.ID + ".." + index;
			}
		} );

	})();


	(function() {

		testAop('global functions', {target: window, method: 'MinDate' }, function() { 
			expect(5);
			return MinDate(105);
		}, function() {
			window.MinDate = function(index) 
			{
				return ( new Date(0) ) + " TEST " + index;
			}
		}); 

	})();


	(function() {

		testAop('global functions with "eval()"', {target: window, method: 'MinDate' }, function() { 
			expect(5);
			return eval("MinDate(105)");
		}, function() {
			window.MinDate = function(index) 
			{
				return ( new Date(0) ) + " TEST " + index;
			}
		}); 

	})();

	test("Testing issue #4 - Weaving nonexistent global functions does not throw", function() {

		var exceptionThrown = false;
		try
		{
			jQuery.aop.after( {target: window, method: 'doesNotExists' }, function() { } ); 
		}
		catch (e)
		{
			exceptionThrown = true;
		}

		ok(exceptionThrown == false, "Weaving nonexistent global functions should not throw exception");

	});

});
