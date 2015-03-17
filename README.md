jQuery plugin to add features of aspect-oriented programming (AOP) to jQuery.

# Introduction #

jQuery AOP is a very small plugin that adds [AOP](http://en.wikipedia.org/wiki/Aspect-oriented_programming) features to javascript. It allows to add [advices](http://en.wikipedia.org/wiki/Advice_in_aspect-oriented_programming) (_Before_, _After_, _After Throw_, _After Finally_, _Around_ and _Introduction_) to any global or instance object.

# Features #

  * Allows to add _Before_, _After_, _After Throw_, _After Finally_, _Around_ and _Introduction_ advices.
  * Allows to define point-cuts using regex to match multiple methods.
  * Works with global function and object methods.
  * Advices can be removed after being applied.
  * **Just 1091 bytes!** (Packed and Gzipped)
  * Integrated into jQuery.

# Quick Start #

Starting with jQuery AOP is really easy!

```

jQuery.aop.before( {target: String, method: 'replace'}, 
  function(regex, newString) { 
    alert("About to replace string '" + this + "' with '" + newString + "' using regEx '" + regex + "'");
  }
);

```

More samples on [Reference](Reference.md) ...

# What is new on 1.3? #

The latest release of jQuery AOP includes:
  * Support **after throw** and **after finally** advices
  * some bug fixes

No breaking changes from 1.2.

# What is new on 1.2? #

This is a bug fix release, solving some minor issues reported. No breaking changes from 1.1.

# What is new on 1.1? #

The latest release of jQuery AOP includes two new features:
  * Support for **introductions**
  * and support for **regex matching** of method names!

The new regex matching support breaks compatibility with the previous version because now the weaving methods return an array of functions instead of just one function.

But don't worry! You can revert to the old behavior if you need to: more details on [BackwardsCompatibility](BackwardsCompatibility.md)...!