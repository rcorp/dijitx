define(["dojo/_base/lang","dojo/_base/declare", "dgrid/OnDemandGrid", "dijit/form/Button", "dojo/aspect","dojo/date","dgrid/editor"],
function(lang,declare, OnDemandGrid, Button, aspect,date,editor){
	
	var businessGrid = declare(OnDemandGrid, {
		constructor: function() {
			var grid = this;
			rowId=[];
			this.newRowIdCounter=0;
			this.labelAddNew = 'Add New'
			this.addNewRowWidget = '';
			this._newlyAddedRowList = [];
			this.defaultVisible = 1;
			var index=0;
			aspect.after(this, "renderHeader", function() {
				this.on('dgrid-refresh-complete',function() {
					console.log('after refresh')
					var len= grid.defaultVisible || rowId.length;
					rowId.splice(0);
					if(!grid.addNewRowWidget) {
						grid.createAddNewRowButton();
						grid.newRowIdCounter=0;
						for(var i=0;i<len;i++) {
						 	//grid.set('value',undefined)
						 	grid.addNewRowToGrid(undefined, true);
						}
						grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
					}
					else{
						grid.newRowIdCounter = 0;
						var prevData = grid.objectToArray(grid.dirty)
						lang.setObject('dirty', {}, grid);
						grid.set('value',prevData);
					grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
				}
				})
			});
		},

		objectToArray: function(object){
			var array=[];
			for(each in object){
				array.push(object[each]);	

			}
			console.log("array",array)
			return array;
		},
		removeRowOnButtonClick: function(row,id){
        	grid.removeRow(row)
        	console.log("Selected Row Removed")
        	delete grid.dirty[id];
        	console.log(rowId.indexOf(parseInt(id)))
        	rowId.splice(rowId.indexOf(parseInt(id)),1)
        	console.log(rowId)
		},

		addRemoveRowColumn: function(){
//			var cancelButtonColumn = 
//							{ label: "Slider", field: "floatNum", editor: Button, canEdit:true, editOn:undefined, editorArgs:{
//								label:"Remove"
//							}}
//
//			var currentColumns = grid.get('columns');
//			console.log(currentColumns);
//			currentColumns.push(cancelButtonColumn);
//			grid.set('columns',currentColumns);
	},
		
		_setValue:function(value){
			this.cleanup();
			this.contentNode.innerHTML = "";
			rowId.splice(0);
			grid.newRowIdCounter=0;
			var columnNames=[];
			if(lang.isArray(value)){
				for(eachColumn in grid.columns){
					columnNames.push(grid.columns[eachColumn].field)
				}
				for(var i=0; i<value.length;i++){
				 	// for(eachRow in value[i]){
				 	// 	for(var j=0;j<columnNames.length;j++){
				 	// 		if(eachRow==columnNames[j]){
				 				this.addNewRowToGrid(value[i],true);
				 	// 		}
				 	// 	}
				 	// }
				 }
				grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
			}
			else{
				console.error("The values to be entered must be an array of objects")
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
			this.addNewRowWidget.on('click',function(){
				this.grid.addNewRowToGrid();
				this.grid.contentNode.appendChild(this.domNode)
			});
		},
		/**
		 * Trying to use same function from grid and click evnt of add new Button
		 * @param {[type]} onRefresh [description]
		 */

		 /* We have kept newRowIdCounter because whenever we add a new row it should be added at the index pointed by 
		 	newRowIdCounter but we also need an array rowId to implement the case to delete the deleted row id from the
		 	rows present in grid for reference to refresh the grid and retain all the rows already made.
		 */

		addNewRowToGrid: function(value, onRefresh) {
			// if evt.grid or grid itself
			var grid = this.grid||this;
			// if evt then use domNode directly else get widget from grid and then its domNode
			//refDomNode = (this.grid && this.domNode) || (this&&this.addNewRowWidget.domNode) || grid.contentNode
			var refDomNode = grid.contentNode;
			obj = {};
			obj['id'] = ++grid.newRowIdCounter;
			console.log(rowId);
			console.log(obj['id'])
			rowId.push(obj['id']);
			console.log(rowId);
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
