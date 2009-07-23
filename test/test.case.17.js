// Test case for issue #7 - Advice on document functions
(function() {

	testcase("Test case for issue #7 - Advice on document functions", function() {

		var adviceInvoked = 0;
		var aspects = jQuery.aop.after( {target: document, method: 'getElementById' }, 
			function(result) { 
				adviceInvoked++;
			} 
		); 

		document.getElementById('sample');

		if (aspects.length > 0)
			for (var i in aspects)
				aspects[i].unweave();
		else
			aspects.unweave();

		assertAreEqual(1, adviceInvoked, "Advice was not invoked");

		document.getElementById('sample');

		assertAreEqual(1, adviceInvoked, "Advice could not be unweaved");

	});

})();

