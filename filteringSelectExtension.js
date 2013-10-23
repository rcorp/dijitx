define(["dojo/_base/declare"],
function(declare){
	
	return declare(null, {
		constructor: function() {
			console.log(this, 'filtering extension', this.id)
		},
		testFunc: function() {
			console.log('-----------', this,'testFunc called')
		}
	});
});
