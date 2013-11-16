define([
	"dojo/_base/declare",
    "dojo/topic",
	], 
	function(declare, topic) {

	return declare(null, {
		constructor: function() {

		},
		setRowIdObject : function (obj) {
			this._rowIdToObject = obj;
		},
		getRowIdObject : function () {
			return this._rowIdToObject;
		},
		setTotalSum : function(value) {
			console.warn("deprecating  setTotalSum instead use set('totalSUm')")
			// this.set('totalSum', value)
		},
        _getTotalSum: function(){
        	return this.totalSum;
        },
        _setTotalSum: function(totalSum){
        	this.totalSum = totalSum;
        	console.log('grid/' + this.id + '/totalSum/set', 'published')
        	topic.publish('grid/' + this.id + '/totalSum/set', this.totalSum);
        },
	});
});
