$(document).ready(function(){

	module("AfterThrow advices");

	test("Testing afterThrow advice with failing method", function() {
		expect(2);

		function Thing() {}
		
		Thing.prototype.failingMethod = function() { 
			throw 'Some error';
		}
		
		var aspects = jQuery.aop.afterThrow( {target: Thing, method: 'failingMethod' }, 
			function(exception) {
				ok(true, 'AfterThrow advice invoked');
				return 1;
			} 
		); 

		var thing = new Thing();
		try {
			thing.failingMethod();
		} catch (e) {}


		if (aspects.length > 0)
			for (var i in aspects)
				aspects[i].unweave();
		else
			aspects.unweave();

		ok(true, 'Execution successful');

	});

	test("Testing afterThrow advice with non-failing method does not run and returns original value", function() {
		expect(1);

		function Thing() {}
		
		Thing.prototype.workingMethod = function() { 
			return 'Some value';
		}
		
		var aspects = jQuery.aop.afterThrow( {target: Thing, method: 'workingMethod' }, 
			function(exception) {
				ok(false, 'This should not be executed');
				return 1;
			} 
		); 

		var thing = new Thing();
		var result = thing.workingMethod();

		if (aspects.length > 0)
			for (var i in aspects)
				aspects[i].unweave();
		else
			aspects.unweave();

		same(result, 'Some value', 'Result matches');

	});

	test("Testing afterThrow advice gets the exception as parameter", function() {
		expect(2);

		function Thing() {}
		
		Thing.prototype.failingMethod = function() { 
			throw 'Some error';
		}
		
		var aspects = jQuery.aop.afterThrow( {target: Thing, method: 'failingMethod' }, 
			function(exception) {
				same(exception, 'Some error', 'AfterThrow should get the exception as parameter');
				return 1;
			} 
		); 

		var thing = new Thing();
		try {
			thing.failingMethod();
		} catch (e) {}


		if (aspects.length > 0)
			for (var i in aspects)
				aspects[i].unweave();
		else
			aspects.unweave();

		ok(true, 'Execution successful');

	});


	test("Testing afterThrow advice can re-throw exception to the calling code", function() {
		expect(2);

		function Thing() {}
		
		Thing.prototype.failingMethod = function() { 
			throw 'Some error';
		}
		
		var aspects = jQuery.aop.afterThrow( {target: Thing, method: 'failingMethod' }, 
			function(exception) {
				same(exception, 'Some error', 'AfterThrow advice invoked with correct exception');
				throw exception;
			} 
		); 

		var thing = new Thing();
		var exceptionThrown = null
		try {
			thing.failingMethod();
		} catch (e) {
			exceptionThrown = e;
		}


		if (aspects.length > 0)
			for (var i in aspects)
				aspects[i].unweave();
		else
			aspects.unweave();

		same(exceptionThrown, 'Some error', 'Original exception re-thrown');

	});

});
