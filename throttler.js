define([], function() {
    var throttle = function(cb, wait, thisObj) {
        // summary: 
        //      Create a function that will only execute once per `wait` periods.
        // description:
        //      Create a function that will only execute once per `wait` periods
        //      from last execution when called repeatedly. Useful for preventing excessive
        //      calculations in rapidly firing events, such as window.resize, node.mousemove
        //      and so on.
        // cb: Function
        //      The callback to fire. 
        // wait: Integer
        //      time to delay before allowing cb to call again. 
        // thisObj: Object?
        //      Optional execution context
        var canrun = true;
        return function() {
            if (!canrun) return;
            canrun = false;
            cb.apply(thisObj || cb, arguments);
            setTimeout(function() {
                canrun = true;
            }, wait);
        }
    }

    var debounce = function(cb, wait, thisObj) {
        // summary: 
        //      Create a function that will only execute after `wait` milliseconds
        // description: 
        //      Create a function that will only execute after `wait` milliseconds
        //      of repeated execution. Useful for delaying some event action slightly to allow
        //      for rapidly-firing events such as window.resize, node.mousemove and so on. 
        // cb: Function
        //      A callback to fire. Like hitch() and partial(), arguments passed to the 
        //      returned function curry along to the original callback. 
        // wait: Integer
        //      Time to spend caching executions before actually executing. 
        // thisObj: Object?
        //      Optional execution context. 
        var timer;
        return function() {
            if (timer) clearTimeout(timer);
            var a = arguments;
            timer = setTimeout(function() {
                cb.apply(thisObj || cb, a);
            }, wait);
        }
    };

    var throttler = {
        throttle: throttle,
        debounce: debounce
    }

    return throttler;
})