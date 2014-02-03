// Require All Dojo AMD modules(Node + Dojo) for testing
require([
    "dojo/node!fs",
    "require"
], function(fs, require){
	require([ "src/app/HelloWorld" ], function(HelloWorld){
	});
});