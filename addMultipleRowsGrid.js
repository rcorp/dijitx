define(["dojo/_base/lang","dojo/_base/declare", "dgrid/OnDemandGrid", "dijit/form/Button", "dojo/aspect","dojo/date"],
function(lang,declare, OnDemandGrid, Button, aspect,date){
	
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
						grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
					}
					grid.newRowIdCounter = 0;
					for(var i=0;i<grid._newlyAddedRowList.length;i++) {
						grid.addNewRowToGrid(undefined, true);
					}
					grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
				})
			});
		},

		
		_setValue:function(value){
			this.cleanup();
			this.contentNode.innerHTML = "";
			grid.newRowIdCounter=0;
			if(lang.isArray(value)){
				for(eachRow in value){
					this.addNewRowToGrid(value[eachRow]);
				}
				grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
			}
			else{
				alert("The values to be entered must be an array of objects")
			}
		},
		_getValue:function(){
			var arrayOfValues = [];
			for(eachRow in grid.dirty){
				arrayOfValues.push(grid.dirty[eachRow]);
			}
			return arrayOfValues;
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
				this.grid.contentNode.appendChild(this.domNode)
			});
		},
		/**
		 * Trying to use same function from grid and click evnt of add new Button
		 * @param {[type]} onRefresh [description]
		 */
		addNewRowToGrid: function(value, onRefresh) {
			// if evt.grid or grid itself
			var grid = this.grid||this;
			// if evt then use domNode directly else get widget from grid and then its domNode
			//refDomNode = (this.grid && this.domNode) || (this&&this.addNewRowWidget.domNode) || grid.contentNode
			var refDomNode = grid.contentNode;
			var obj = {};
			obj['id'] = ++grid.newRowIdCounter;
			if(value) {
				for(each in grid.columns) {
					if(grid.columns[each].editor){
						obj[grid.columns[each].field] = (value && value[grid.columns[each].field]) || (grid.columns[each].editorArgs && grid.columns[each].editorArgs.value) || '';
						grid.updateDirty(grid.newRowIdCounter,grid.columns[each].field,obj[grid.columns[each].field])
					}
					else if(grid.columns[each].editor && grid.columns[each].editor.superclass){
						obj[grid.columns[each].field] = (value && value[grid.columns[each].field]) || grid.columns[each].editor.superclass.value;
						grid.updateDirty(grid.newRowIdCounter,grid.columns[each].field,obj[grid.columns[each].field])
					}
				}
			} else {
				for(each in grid.columns) {
					if(grid.columns[each].editor){
						obj[grid.columns[each].field] = (value && value[grid.columns[each].field]) || (grid.columns[each].editorArgs && grid.columns[each].editorArgs.value) || '';
						grid.updateDirty(grid.newRowIdCounter,grid.columns[each].field,obj[grid.columns[each].field])
					}
				}
			}
			
			if(refDomNode.previousElementSibling==null){
				grid.insertRow(obj,refDomNode, null, null, {});	
			}
			else{
				grid.insertRow(obj, refDomNode.previousElementSibling.previousElementSibling, null, null, {});
			}
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
