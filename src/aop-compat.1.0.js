/**
* jQuery AOP 1.0 Compatibility - Forces compatibility with jQuery AOP 1.0 by disabling regex matching on point-cut definitions.
* https://github.com/gonzalocasas/jquery-aop
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Version: 1.3
*/

(function() {
	jQuery.aop.setup( { regexMatch: false } );
})();
