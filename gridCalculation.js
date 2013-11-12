define(["dojo/_base/declare", "dojo/_base/array"], 
	function(declare, Deferred, arrayUtil) {

	return declare(null, {
		constructor: function() {

		},
		getRowIdObject : function () {
			return this._rowIdToObject;
		},
		setTotalSum : function(value) {
			this.set('totalSum', value)
		}
	});
});
