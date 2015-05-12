define(["dojo/_base/declare"],function(declare){
	return declare(null, {
		refresh: function(manual){
			if(manual){
				return this.inherited(arguments);
			}
		}
	});
});
