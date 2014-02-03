// To Start Test you need to require this module
// in node.js environment using dojo settings.
// How to use dojo in node.js?
// http://dojotoolkit.org/documentation/tutorials/1.9/node/
define([
		"dojo/_base/declare",
], function(declare) {
	return declare(null, {
		constructor: function(id) {
			console.log("Hello Constructor")
		},
		greet: function (name) {
			var name = name || 'world';

			return 'Hello, ' + name + '!';
		}
	});
});