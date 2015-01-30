define(["dojo/_base/lang","dojo/_base/declare", "dgrid/OnDemandGrid", "dojo/store/Memory","dojo/store/Observable","dijit/form/Button", "dojo/aspect","dojo/date","dgrid/editor", "put-selector/put", "dojo/on"],
function(lang,declare, OnDemandGrid, Memory,Observable,Button, aspect,date,editor, put, on){
	var businessGrid = declare(null, {
		constructor:function() {
			var grid = this;
			aspect.after(this, "renderHeader", function() {
				grid.on('dgrid-refresh-complete',function(response) {
					if(response && response.results && response.results.then) {
						response.results.then(function(trs) {
							if(trs.length > 0) {
								on.emit(grid.domNode,'dgrid-datachange','')
							} else {
								on.emit(grid.domNode,'dgrid-noDataMessage', grid.noDataMessage)
							}
						})
					}
				})
			});
		},
		_getRowIdToObject:function() {
			return this._rowIdToObject
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
