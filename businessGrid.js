define(["dojo/_base/declare", "dgrid/OnDemandGrid", "dijit/form/Button", "dojo/aspect"],
function(declare, OnDemandGrid, Button, aspect){
	
	var businessGrid = declare(OnDemandGrid, {
		constructor: function() {
			var grid = this;
			this.newRowIdCounter=0;
			this.labelAddNew = 'Add New'
			this.addNewRowWidget = '';
			this._newlyAddedRowList = [];
			aspect.after(this, "renderHeader", function() {
				this.on('dgrid-refresh-complete',function() {
					console.log('after refresh')
					if(!grid.addNewRowWidget) {
						grid.createAddNewRowButton();
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
		addNewRowToGrid: function(onRefresh) {
			var grid = this.grid||this;
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
			if(onRefresh == undefined) {
				grid._newlyAddedRowList.push(obj);
			}
			grid.scrollTo({x:0,y:grid.contentNode.scrollHeight});
		}
	});
	return businessGrid;
});
