function testAop(title, includedTests, pointcut, testFunction, setupFunction)
{
	// Default to after/before/around if nothing is defined
	if (!jQuery.isArray(includedTests)) {
		setupFunction = testFunction;
		testFunction = pointcut;
		pointcut = includedTests;
		includedTests = ['after', 'before', 'around'];
	}

	test("Testing " + title, function() {

		if (setupFunction)
		{
			setupFunction();
		}

		var weavedAspects = [];
		var invokeCounter = 0;
		var aspectCounter = 0;

		if (jQuery.inArray('before', includedTests) > -1)
		{
			weavedAspects[weavedAspects.length] = jQuery.aop.before( pointcut, function() { 
				invokeCounter++;
				ok(true, "Executing <i>Before</i> " + arguments[arguments.length-1] + " (" + pointcut.method + ") on '" + this + "'");
			} );
		}
		
		if (jQuery.inArray('after', includedTests) > -1)
		{
			weavedAspects[weavedAspects.length] = jQuery.aop.after ( pointcut, function(result, method) { 
				invokeCounter++;
				ok(true, "Executing <i>After</i> " + method + " (" + pointcut.method + ") on '" + this + "' was '" + result); 
				return result; 
			} );
		}
		
		if (jQuery.inArray('around', includedTests) > -1)
		{
			weavedAspects[weavedAspects.length] = jQuery.aop.around( pointcut, function(invocation) { 
				invokeCounter++;
				var result = invocation.proceed(); 
				ok(true, "Executing <i>Around</i> " + invocation.method  + " (" + pointcut.method + ") on '" + this + "' was '" + result + "'"); 
				return result; 
			} );
		}

		if (jQuery.inArray('introduction', includedTests) > -1)
		{
			weavedAspects[weavedAspects.length] = jQuery.aop.introduction( pointcut, function(invocation) { 
				ok(true, "Executing <i>Introduction</i> " + pointcut.method  + " on: '" + this + "'"); 
				invokeCounter++;
				return 'introduction method executed';
			} );
		}

		// Count the number of aspects found during weaving
		for (var i = 0; i < weavedAspects.length; i++) 
		{
			aspectCounter += (weavedAspects[i].length > 0) ? weavedAspects[i].length : 1;
		}

		var returnValue = testFunction();

		for (var i = (weavedAspects.length-1); i >= 0; i--) 
		{
			if (weavedAspects[i].length > 0)
			{
				for (var j in weavedAspects[i])
					weavedAspects[i][j].unweave();
			} 
			else
			{
				weavedAspects[i].unweave();
			}
		}

		var unweavedReturn = testFunction();

		same(unweavedReturn, returnValue, "Results should be the same before and after unweaving");
		same(invokeCounter, aspectCounter, "Aspects executed should match aspects weaved");

	});

}