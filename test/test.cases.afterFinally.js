$(document).ready(function(){

	module("AfterFinally advices");

	test("Testing afterFinally advice with failing method", function() {
		expect(3);

		function Thing() {}
		
		Thing.prototype.failingMethod = function() { 
			throw 'Some error';
		}
		
		var aspects = jQuery.aop.afterFinally( {target: Thing, method: 'failingMethod' }, 
			function(result, exception) {
				ok(result == null, 'Result is null');
				same(exception, 'Some error', 'Exception matches thrown exception');
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

	test("Testing afterFinally advice with non-failing method runs and returns original value", function() {
		expect(3);

		function Thing() {}
		
		Thing.prototype.workingMethod = function() { 
			return 'Some value';
		}
		
		var aspects = jQuery.aop.afterFinally( {target: Thing, method: 'workingMethod' }, 
			function(result, exception) {
				same(result, 'Some value', 'Result matches');
				ok(exception == null, 'Exception is null');
				return result;
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

});
