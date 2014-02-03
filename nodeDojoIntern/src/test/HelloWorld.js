define([
    'intern!object',
    'intern/chai!assert',
    // Require Main erver.js file in root directory
    'intern/dojo/node!../../setNodeDojoEnvironment'
], function (registerSuite, assert, server) {
    registerSuite({
        name: 'async demo',
        'async test': function () {
            // Again Require Dojo AMD module(Node + Dojo) for testing
            require([ "src/app/HelloWorld" ], function(HelloWorld){
            	var test = new HelloWorld()
            	 assert.strictEqual(test.greet(), 'Hello, world!');
            });
        }
    });
});
