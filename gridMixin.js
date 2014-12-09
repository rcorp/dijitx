define(["dojo/_base/lang","dojo/_base/declare", "dgrid/OnDemandGrid", "dojo/store/Memory","dojo/store/Observable","dijit/form/Button", "dojo/aspect","dojo/date","dgrid/editor", "put-selector/put"],
function(lang,declare, OnDemandGrid, Memory,Observable,Button, aspect,date,editor, put){
	var businessGrid = declare(null, {
		constructor:function() {
			var grid = this;
		},
		_getSelectedRowsData: function() {
			var _selection = this.get('selection')
			var _rows = [];
			for(eachRowId in _selection) {
				_rows.push(this.row(eachRowId).data)
			}
			return _rows;
		}
	});
	return businessGrid;
});
