// Test global functions with regex match
(function() {

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

	test(['after', 'before', 'around'], 'global functions with regex match', {target: window, method: /Get(\d+)/ }, function() { 
		return Get1() + Get2() + Get3() + Get4() + Get() + GetString();
	} ); 

	window.Get1 = null;
	window.Get2 = null;
	window.Get3 = null;
	window.Get4 = null;
	window.Get = null;
	window.GetString = null;

})();
