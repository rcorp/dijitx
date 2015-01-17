define(["dojo/_base/declare"],function(declare){
	return declare(null, {
		refresh: function(manual){
			if(manual){
				this.inherited(arguments);
			}
		}
	});
});
