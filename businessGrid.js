define(["dojo/_base/declare", "dgrid/OnDemandGrid", "dijit/form/Button", "dojo/aspect"],
function(declare, OnDemandGrid, Button, aspect){
	
	var businessGrid = declare(OnDemandGrid, {
		constructor: function() {
			var grid = this;
			this.newRowIdCounter=0;
			this.labelAddNew = 'Add New'
			this.addNewRowWidget = '';
			this._newlyAddedRowList = [];
			this.defaultVisible = 1;
			aspect.after(this, "renderHeader", function() {
				this.on('dgrid-refresh-complete',function() {
					console.log('after refresh')
					if(!grid.addNewRowWidget) {
						grid.createAddNewRowButton();
						for(var i=0;i<grid.defaultVisible;i++) {
							grid.addNewRowToGrid();
						}
					} else {
						grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
					}
					grid.newRowIdCounter = 0;
					for(var i=0;i<grid._newlyAddedRowList.length;i++) {
						grid.addNewRowToGrid(true);
					}
				})
			});
		},
		_getDefaultVisible: function() {
			return this.defaultVisible;
		},
		_setDefaultVisible: function(num) {
			this.defaultVisible = num;
		},
		_getLabelAddNew: function() {
			return this.labelAddNew;
		},
		_setLabelAddNew: function(label) {
			this.addNewRowWidget.set('label', label);
		},
		createAddNewRowButton: function() {
			this.addNewRowWidget = new Button({
				label:this.labelAddNew,
				grid:this
			});
			this.addNewRowWidget.on('click',function() {
				this.grid.addNewRowToGrid();
			});
			this.contentNode.appendChild(this.addNewRowWidget.domNode)
		},
		/**
		 * Trying to use same same function from grid and click evnt of add new Button
		 * @param {[type]} onRefresh [description]
		 */
		addNewRowToGrid: function(onRefresh) {
			// if evt.grid or grid itself
			var grid = this.grid||this;
			// if evt then use domNode directly else get widget from grid and then its domNode
			var refDomNode = (this.grid && this.domNode) || (this&&this.addNewRowWidget.domNode)
			var obj = {};
			for(each in grid.columns) {
				if(grid.columns[each].editor) {
					obj[grid.columns[each].field] = grid.columns[each].editor.superclass.value;
				} else {
					obj[grid.columns[each].field] = "";
				}
			}
			obj['id'] = ++grid.newRowIdCounter;
			grid.insertRow(obj, refDomNode.previousElementSibling.previousElementSibling, null, null, {});
			// if this function is called when on-refresh event occurs not by clicking
			// on addNewRowWdiget then do not push.
			if(onRefresh == undefined) {
				grid._newlyAddedRowList.push(obj);
			}
			grid.scrollTo({x:0,y:grid.contentNode.scrollHeight});
		}
	});
	return businessGrid;
});
