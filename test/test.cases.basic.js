$(document).ready(function(){

	module("Basic weaving");

	(function() {
		testAop('built-in objects', {target: String, method: 'indexOf' }, function() { 
			expect(6);
			return "test".indexOf('e'); 
		} ); 
	})();

	(function() {

		function Prototyped( str )
		{
			this.ID = str;
		}

		Prototyped.prototype.getID = function() {
			return this.ID;
		}

		testAop('custom objects with prototype and prototyped function', {target: Prototyped, method: 'getID' }, function() { 
			expect(6);
			var custom = new Prototyped("testID");
			return custom.getID();
		} ); 

	})();

	(function() {

		function PrototypedWithInstanceFunctions( str )
		{
			this.ID = str;
		}

		PrototypedWithInstanceFunctions.prototype.getID = function() {
			return this.ID;
		}

		var instance = new PrototypedWithInstanceFunctions("testID");

		instance.getIDInstance = function() {
			return this.ID;
		}

		testAop('custom objects with prototype but instance-function', {target: instance, method: 'getIDInstance' }, function() { 
			expect(6);
			return instance.getIDInstance();
		} ); 

	})();


	(function() {

		function Custom( str )
		{
			this.ID = str;
		}

		var custom = new Custom("testID");
		custom.GetData = function(index) {
			return this.ID + ":" + index
		}

		testAop('custom objects without prototype', {target: custom, method: 'GetData' }, function() { 
			expect(6);
			return custom.GetData(10);
		} ); 

	})();


	(function() {

		function Dog() {}
		Dog.prototype.bark = function() { 
			return 'bark';
		}
		
		var dog = new Dog();

		testAop('issue #3', ['after'], {target: dog, method: 'bark' }, function() { 
			expect(4);
			return dog.bark();
		} ); 

	})();


	test("Testing issue #2 - Around-advices allows argument manipulation (add)", function() {

		function Thing() {}
		
		Thing.prototype.doSomething = function() { 
			return Array.prototype.slice.call(arguments).join(',');
		}
		
		var aspects = jQuery.aop.around( {target: Thing, method: 'doSomething' }, 
			function(inv) { 
				inv.arguments[inv.arguments.length] = "extra-arg";
				return inv.proceed();
			} 
		); 

		var thing = new Thing();
		var result = thing.doSomething("arg1", "arg2", "arg3");

		if (aspects.length > 0)
			for (var i in aspects)
				aspects[i].unweave();
		else
			aspects.unweave();

		same("arg1,arg2,arg3,extra-arg", result, "Around-advices allows argument manipulation (add)");

	});



	test("Testing issue #2 - Around-advices allows argument manipulation (remove)", function() {

		function Thing() {}
		
		Thing.prototype.doSomething = function() { 
			return Array.prototype.slice.call(arguments).join(',');
		}
		
		var aspects = jQuery.aop.around( {target: Thing, method: 'doSomething' }, 
			function(inv) { 
				inv.arguments = inv.arguments.splice(inv.arguments.length-1, 1);
				return inv.proceed();
			} 
		); 

		var thing = new Thing();
		var result = thing.doSomething("arg1", "arg2", "arg3");

		if (aspects.length > 0)
			for (var i in aspects)
				aspects[i].unweave();
		else
			aspects.unweave();

		same("arg1,arg2", result, "Around-advices allows argument manipulation (remove)");

	});

	test("Testing issue #7 - Advice on document functions", function() {
		expect(1);

		var aspects = jQuery.aop.after( {target: document, method: 'getElementById' }, 
			function(result) { 
				ok(true, 'Advice invoked');
			} 
		); 

		document.getElementById('sample');

		if (aspects.length > 0)
			for (var i in aspects)
				aspects[i].unweave();
		else
			aspects.unweave();

		document.getElementById('sample');

	});


	test("Testing issue #8 - Advice works properly across frames and keeps proper scope on target", function() {
		expect(3);

		var container = document.createElement('div');
		$(container).html('<iframe id="testIssue8Iframe" name="testIssue8Iframe" width="100" height="100" style="display: none"></iframe>');
		$(document.body).append(container);

		var frame = $('#testIssue8Iframe')[0];

		frame.contentWindow.document.write("<html><head><script>window.SomeTestObject = { TestFunction: function() { return this.TestVariable + '1'; }, TestVariable: 120 };</script></head><body>jii</body></html>");

		var obj = frame.contentWindow.window.SomeTestObject;

		var aspects = jQuery.aop.after( {target: obj, method: 'TestFunction' }, 
			function(result) { 
				ok(true, 'Advice invoked');
				return result;
			} 
		); 

		var result = obj.TestFunction();

		if (aspects.length > 0)
			for (var i in aspects)
				aspects[i].unweave();
		else
			aspects.unweave();

		$(container).remove();

		same(result, '1201', "Result should contain the variable and the appended value");
		same(result, obj.TestFunction(), "Results should be the same after unweaving");


	});


	(function() {
		var obj = $('#qunit-header');
		testAop('advice on jQuery.get', {target: obj, method: 'get' }, function() { 
			expect(6);
			return obj.get(0).innerText; 
		} ); 
	})();


	(function() {
		var testFunction = (function(){
			var func = function(){};
			func.show = function(){ return 'test'; }
			return func;
		})();			

		testAop('issue #9 - Advice on functions as target', {target: testFunction, method: 'show' }, function() { 
			expect(6);

			return testFunction.show(); 
		} ); 
	})();

	(function() {
		var testFunction = (function(){
			var func = function(){};
			func.show = function(){ return 'test'; }
			func.show2 = function(){ return 'test'; }
			return func;
		})();			

		testAop('issue #9 - Advice on functions as target using regex', {target: testFunction, method: /show/ }, function() { 
			expect(9);

			return testFunction.show() + testFunction.show2(); 
		} ); 
	})();

});
