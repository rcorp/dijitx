define(["dojo/_base/declare", "dgrid/OnDemandGrid", "dijit/form/Button", "dojo/aspect"],
function(declare, OnDemandGrid, Button, aspect){
	
	var businessGrid = declare(OnDemandGrid, {
		constructor: function() {
			var grid = this;
			this.newRowIdCounter=0;
			this.labelAddNew = 'Add New'
			this.addNewRowWidget = '';
			aspect.after(this, "renderHeader", function() {
				this.on('dgrid-refresh-complete',function() {
					grid.createAddNewRowButton();
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
			this.addNewRowWidget.on('click',this.addNewRowToGrid);
			this.contentNode.appendChild(this.addNewRowWidget.domNode)
		},
		addNewRowToGrid: function() {
			console.log(this, 'click')
			var grid = this.grid;
			var obj = {}
			for(each in grid.columns) {
				if(grid.columns[each].editor) {
					obj[grid.columns[each].field] = grid.columns[each].editor.superclass.value;
				} else {
					obj[grid.columns[each].field] = "";
				}
			}
			obj['id'] = ++grid.newRowIdCounter;
			for(each in obj) {
				grid.updateDirty(obj['id'],each,obj[each]);
			}
			grid.insertRow(obj, this.domNode.previousElementSibling.previousElementSibling, null, null, {});
			grid.store.add(obj);
			grid.scrollTo({x:0,y:grid.contentNode.scrollHeight});
		}
	});
	return businessGrid;
});
