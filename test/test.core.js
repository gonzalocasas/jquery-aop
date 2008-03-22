window.TestResults = [];

function test( includedTests, title, pointcut, testFunction )
{

	log("<b>Weaving " + title + "</b>");
	log();

	var weavedAspects = [];
	var invokeCounter = 0;
	var aspectCounter = 0;

	if (jQuery.inArray('before', includedTests) > -1)
	{
		weavedAspects[weavedAspects.length] = jQuery.aop.before( pointcut, function() { 
			invokeCounter++;
			log("<font color='green'>Executing <i>Before</i> " + arguments[arguments.length-1] + " (" + pointcut.method + ") on</font> '" + this + "'"); 
		} );
	}
	
	if (jQuery.inArray('after', includedTests) > -1)
	{
		weavedAspects[weavedAspects.length] = jQuery.aop.after ( pointcut, function(result, method) { 
			invokeCounter++;
			log("<font color='green'>Executing <i>After</i> " + method + " (" + pointcut.method + ") on</font> '" + this + "' <font color='green'>was</font> '" + result + "'</font>"); 
			return result; 
		} );
	}
	
	if (jQuery.inArray('around', includedTests) > -1)
	{
		weavedAspects[weavedAspects.length] = jQuery.aop.around( pointcut, function(invocation) { 
			log("<font color='green'>Executing <i>Around</i> " + invocation.method + " (" + pointcut.method + ") begin:</font> '" + this + "'"); 
			invokeCounter++;
			var result = invocation.proceed(); 
			log("<font color='green'>Executing <i>Around</i> " + invocation.method  + " (" + pointcut.method + ") end:</font> '" + result + "'"); 
			return result; 
		} );
	}

	if (jQuery.inArray('introduction', includedTests) > -1)
	{
		weavedAspects[weavedAspects.length] = jQuery.aop.introduction( pointcut, function(invocation) { 
			log("<font color='green'>Executing <i>Introduction</i> " + pointcut.method  + " on:</font> '" + this + "'"); 
			invokeCounter++;
			return 'introduction method executed';
		} );
	}

	// Count the number of aspects found during weaving
	for (var i = 0; i < weavedAspects.length; i++) 
	{
		aspectCounter += (weavedAspects[i].length > 0) ? weavedAspects[i].length : 1;
	}

	log("Trying " + title + "...");

	var returnValue = testFunction();

	log("Result: <pre>" + returnValue + "</pre>");

	log("Unweaving " + title + "...");

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

	log("Retrying unweaved functions...");

	var unweavedReturn = testFunction();

	log("Result: <pre>" + unweavedReturn + "</pre>");

	var succeeded = (unweavedReturn == returnValue && invokeCounter == aspectCounter);

	var color = succeeded ? 'green' : 'red';
	var message = "<font color='" + color + "'><b>Results " + 
		(succeeded ? 'match' : 'do not match') + " (" + aspectCounter + " aspects weaved" +
		(succeeded ? "" : " but " + invokeCounter + " aspects executed") +
		")</b></font>";
	
	log(message);

	window.TestResults[window.TestResults.length] = {Succeeded: succeeded, Title: title};

	log("<hr>");

}

function results()
{
	var summary = { Succeeded: 0, Failed: 0, Text: '' };

	for (var i in window.TestResults)
	{
		if (window.TestResults[i].Succeeded == true)
		{
			summary.Succeeded++;
		}
		else
		{
			summary.Failed++;
			summary.Text += "  Title: " + window.TestResults[i].Title + "\n";
		}
	}

	if (summary.Failed > 0)
	{
		alert("Passed: " + summary.Succeeded + "\nFailed: " + summary.Failed + "\nFailed tests:\n" + summary.Text);
	}

	log("<b>Successful tests: " + summary.Succeeded + ", failed tests: " + summary.Failed + "</b>");

}

// log message
function log(str) {
	if (document.getElementById("console") == null)
	{
		var console = document.createElement("SPAN");
		console.id = "console";
		document.body.appendChild(console);
	}
	document.getElementById("console").innerHTML += (typeof(str) == 'undefined' ? '' : str) + "<br/>";
}