/**
* jQuery AOP 1.0 Compatibility - Forces compatibility with jQuery AOP 1.0 by disabling regex matching on point-cut definitions.
* http://jquery-aop.googlecode.com/
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Version: 1.2
*/

(function() {
	jQuery.aop.setup( { regexMatch: false } );
})();
