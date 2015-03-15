# Upgrading to jQuery AOP 1.3 #

If you are currently using jQuery AOP 1.0 and want to upgrade to 1.3 without changing your existing code, there is available a little javascript file that you can use to revert the behavior of the plugin to the one from the previous version.

All you need to do is include `aop-compat.1.0.js` (or the minified version `aop-compat.1.0.min.js`) in your HTML and that's it!

This will disable regular expression matching but will allow a smooth upgrade to the new version.

### Sample ###

```
   <html>
    <head>
      <script src="jquery.js"></script>
      <script src="aop.js"></script>
      <script src="aop-compat.1.0.js"></script>
    </head>
   </html>
```