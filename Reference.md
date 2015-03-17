# Introduction

Using jQuery AOP plugin is very easy, just include the `.js` file in your code and add advices to your methods with a single call.

# API Reference

### Add an advice before a method

```
before( Map pointcut, Function advice ) returns Array<Function>
```

> Creates an advice **before** the defined point-cut. The advice will be executed before the point-cut method but cannot modify the behavior of the method, or prevent its execution. This function returns an array of weaved aspects (Function).

##### Parameters

  * `pointcut` Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
    * `target` Target object to be weaved.
    * `method` Name of the function to be weaved. Regex are supported, but not on built-in objects.

  * `advice` Function containing the code that will get called before the execution of the point-cut.

##### Samples

```

jQuery.aop.before( {target: window, method: 'MyGlobalMethod'}, 
  function() { 
    alert('About to execute MyGlobalMethod'); 
  }
);

```

```

jQuery.aop.before( {target: window, method: /My/}, 
  function() { 
    alert('About to execute one of my global methods'); 
  }
);

```

```

jQuery.aop.before( {target: String, method: 'indexOf'}, 
  function(index) { 
    alert('About to execute String.indexOf on: ' + this); 
  }
);

```

### Add an advice after a method

```
after( Map pointcut, Function advice ) returns Array<Function>
```

> Creates an advice **after** the defined point-cut. The advice will be executed after the point-cut method has completed execution successfully, and will receive one parameter with the result of the execution. This function returns an array of weaved aspects (Function).

##### Parameters

  * `pointcut` Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
    * `target` Target object to be weaved.
    * `method` Name of the function to be weaved. Regex are supported, but not on built-in objects.

  * `advice` Function containing the code that will get called after the execution of the point-cut. It receives one parameter with the result of the point-cut's execution. The function can choose to return this same value or a different one.

##### Samples

```

jQuery.aop.after( {target: window, method: 'MyGlobalMethod'}, 
  function(result) { 
    alert('Returned: ' + result); 
    return result;
  } 
);

```

```

jQuery.aop.after( {target: String, method: 'indexOf'}, 
  function(index) { 
    alert('Result found at: ' + index + ' on:' + this); 
    return index;
  }
);

```

### Add an advice after a method throws an exception ###
_New in version 1.3_

```
afterThrow( Map pointcut, Function advice ) returns Array<Function>
```

> Creates an advice **after** the defined point-cut **only for unhandled exceptions**. The advice will be executed after the point-cut method only if the execution failed and an exception has been thrown. It will receive one parameter with the exception thrown by the point-cut method. This function returns an array of weaved aspects (Function).

##### Parameters

  * `pointcut` Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
    * `target` Target object to be weaved.
    * `method` Name of the function to be weaved. Regex are supported, but not on built-in objects.

  * `advice` Function containing the code that will get called after the execution of the point-cut. It receives one parameter with the exception thrown by the point-cut method.

##### Samples

```

jQuery.aop.afterThrow( {target: String, method: 'indexOf'}, 
  function(exception) {
    alert('Unhandled exception: ' + exception);
    return -1;
  }
);

```

```

jQuery.aop.afterThrow( {target: calculator, method: 'Calculate'},
  function(exception) {
    console.log('Unhandled exception: ' + exception);
    throw exception;
  }
);

```

### Add an advice after a method regardless of the results
_New in version 1.3_

```
afterFinally( Map pointcut, Function advice ) returns Array<Function>
```

> Creates an advice **after** the defined point-cut. The advice will be executed after the point-cut method **regardless of its success or failure**, and it will receive two parameters: one with the result of a successful execution or null, and another one with the exception thrown or null. This function returns an array of weaved aspects (Function).

##### Parameters

  * `pointcut` Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
    * `target` Target object to be weaved.
    * `method` Name of the function to be weaved. Regex are supported, but not on built-in objects.

  * `advice` Function containing the code that will get called after the execution of the point-cut regardless of its success or failure. It receives two parameters, the first one with the result of a successful execution or null, and the second one with the exception or null.

##### Samples

```

jQuery.aop.afterFinally( {target: window, method: 'MyGlobalMethod'}, 
  function(result, exception) {
    if (exception == null)
      return 'Returned: ' + result;
    else
      return 'Unhandled exception: ' + exception;
  }
);

```

### Add an advice around a method

```
around( Map pointcut, Function advice ) returns Array<Function>
```

> Creates an advice **around** the defined point-cut. This type of advice can control the point-cut method execution by calling the functions `.proceed()` on the `invocation` object, and also, can modify the arguments collection before sending them to the function call. This function returns an array of weaved aspects (Function).

##### Parameters

  * `pointcut` Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
    * `target` Target object to be weaved.
    * `method` Name of the function to be weaved. Regex are supported, but not on built-in objects.

  * `advice` Function containing the code that will get called around the execution of the point-cut. This advice will be called with one argument containing one function `.proceed()`, the collection of arguments `.arguments`, and the matched method name `.method`.

##### Samples

```

jQuery.aop.around( {target: window, method: 'MyGlobalMethod'}, 
  function(invocation) {
    alert('# of Arguments: ' + invocation.arguments.length); 
    return invocation.proceed(); 
  }
);

```

```

jQuery.aop.around( {target: String, method: 'indexOf'}, 
  function(invocation) { 
    alert('Searching: ' + invocation.arguments[0] + ' on: ' + this); 
    return invocation.proceed(); 
  }
);

```

```

jQuery.aop.around( {target: window, method: /Get(\d+)/}, 
  function(invocation) {
    alert('Executing method ' + invocation.method); 
    return invocation.proceed(); 
  }
);

```

### Add a new method using introductions
_New in version 1.1_

```
introduction( Map pointcut, Function advice ) returns Array<Function>
```

> Creates an **introduction** on the defined point-cut. This type of advice replaces any existing methods with the same name. To restore them, just unweave it. This function returns an array with only one weaved aspect (Function).

##### Parameters

  * `pointcut` Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
    * `target` Target object to be weaved.
    * `method` Name of the function to be weaved.

  * `advice` Function containing the code that will be executed on the point-cut.

##### Samples

```

jQuery.aop.introduction( {target: String, method: 'log'}, 
  function() { 
    alert('Console: ' + this);
  }
);

```

### Removing advices

```
fn.unweave();
```

> Advices can be removed after being applied. Just keep a reference to the return values of the function used to add the advice, and invoke the `unweave()` method.

##### Samples

```

var advices = jQuery.aop.after( {target: String, method: 'indexOf'}, 
  function(index) { 
    alert('Result found at: ' + index + ' on:' + this); 
  }
);

// Remove the advice
advices[0].unweave();

```