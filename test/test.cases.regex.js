$(document).ready(function(){

	module("Weaving with regex");

	(function() {

		function Prototyped( str )
		{
			this.ID = str;
		}

		Prototyped.prototype.getID = function() {
			return this.ID;
		}

		Prototyped.prototype.getIDSecond = function() {
			return this.ID + "(bis)";
		}

		testAop('custom objects with prototype and prototyped function using regex', {target: Prototyped, method: 'getI' }, function() { 
			expect(8);
			var custom = new Prototyped("testID");
			return custom.getID() + " - " + custom.getIDSecond();
		} ); 
	})();

	(function() {

		testAop('global functions with regex match', {target: window, method: /Get(\d+)/ }, function() { 
			expect(14);
			return Get1() + Get2() + Get3() + Get4() + Get() + GetString();
		}, function() {

			window.Get1 = function() 
			{
				return "1";
			}

			window.Get2 = function() 
			{
				return "2";
			}

			window.Get3 = function() 
			{
				return "3";
			}

			window.Get4 = function() 
			{
				return "4";
			}

			window.Get = function() 
			{
				return "-";
			}

			window.GetString = function() 
			{
				return "empty";
			}

		}); 

	})();

});
