define(["dojo/_base/lang","dojo/_base/declare", "dgrid/OnDemandGrid", "dijit/form/Button", "dojo/aspect","dojo/date","dgrid/editor"],
function(lang,declare, OnDemandGrid, Button, aspect,date,editor){
	/**
	* This grid places a Add New button after all the rows have been rendered which is used to add new rows into
	* the grid one at a time. This grid adds new rows using id's of each row instead of a counter	we used earlier
	* because then we cannot keep account of the deleted rows. We can use widgets with or without editor in 
	* columns of this grid.
	**/
	var businessGrid = declare(OnDemandGrid, {
		constructor: function() {
			var grid = this;
			rowId=[];
			this.newRowIdCounter=0;
			this.labelAddNew = 'Add New'
			this.addNewRowWidget = '';
			this._newlyAddedRowList = [];
			this.defaultVisible = 1;
			// By default 1 row should be visible in the grid.
			var index=0;
			aspect.after(this, "renderHeader", function() {
				this.on('dgrid-refresh-complete',function() {
					console.log('after refresh')
					var len= grid.defaultVisible || rowId.length;
					rowId.splice(0);
					// The array containing id's of all the rows is cleared.
					if(!grid.addNewRowWidget) {
						grid.createAddNewRowButton();
						grid.newRowIdCounter=0;
						for(var i=0;i<len;i++) {
						 	grid.addNewRowToGrid(undefined, true);
						}
						grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
					}
					else{
						grid.newRowIdCounter = 0;
						var prevData = grid.objectToArray(grid.dirty)
						lang.setObject('dirty', {}, grid);
						// Clears grid.dirty
						grid.set('value',prevData);
					grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
				}
				})
			});
		},

		/**
		* This function converts an object that is passed as a parameter into an equivalent array of objects 
		* used to give parameter to setValue function.
		**/
		objectToArray: function(object){
			var array=[];
			for(each in object){
				array.push(object[each]);	

			}
			console.log("array",array)
			return array;
		},

		/**
		* This function removes a row whose row and its id is sent as parameter in it. Then that row is removed from 
		* dirty and the array containing all the row id's as well.
		**/
		removeRowOnButtonClick: function(row,id){
        	grid.removeRow(row)
        	delete grid.dirty[id];
        	rowId.splice(rowId.indexOf(parseInt(id)),1)
		},

		/**
		* Set value function of grid takes an array of object as parameter and clears the grid, checks whether the parameter
		* is an array or not else gives an error message; if the parameter is valid then it makes the rows with the values 
		* given in parameter. And in the end appends the Add New button.		
		**/
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
				 	this.addNewRowToGrid(value[i],true);
				 }
				grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
			}
			else{
				console.error("The values to be entered must be an array of objects")
			}
		},

		
		//Get value function gives all the values of rows that are present in dirty. And returns an array of objects.
		
		_getValue:function(){
			var arrayOfValues = [];
			for(eachRow in grid.dirty){
				arrayOfValues.push(grid.dirty[eachRow]);
			}
			return arrayOfValues;
		},

		
		//_getDefaultVisible function tells the number of rows that are visible by default in the grid at onLoad event.
		
		_getDefaultVisible: function() {
			return this.defaultVisible;
		},

		/**
		* _setDefaultVisible function is used to set the value of defaultly visible rows with the value specified in
		* the parameter
		**/

		_setDefaultVisible: function(num) {
			this.defaultVisible = num;
		},

		//_getLabelAddNew function is used to get the label for the Add New button used to add new rows into the grid.

		_getLabelAddNew: function() {
			return this.labelAddNew;
		},
		
		/**
		* _setLabelAddNew function is used to set the value of label Add New button to add new rows in the grid with the 
		* value in the parameter
		**/

		_setLabelAddNew: function(label) {
			this.addNewRowWidget.set('label', label);
		},
		
		/**
		* createAddNewRowButton creates a Add New button which calls addNewRowGrid function to add new rows 
		* into the grid and after all the rows have been rendered this Add New button is placed.
		*/

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
		**/

		/**
		* We have kept newRowIdCounter because whenever we add a new row it should be added at the index pointed by 
		* newRowIdCounter but we also need an array rowId to implement the case to delete the deleted row id from the
		* rows present in grid for reference to refresh the grid and retain all the rows already made.
		**/

		addNewRowToGrid: function(value, onRefresh) {
			// if evt.grid or grid itself
			var grid = this.grid||this;
			// if evt then use domNode directly else get widget from grid and then its domNode
			//refDomNode = (this.grid && this.domNode) || (this&&this.addNewRowWidget.domNode) || grid.contentNode
			var refDomNode = grid.contentNode;
			var obj = {};
			obj['id'] = ++grid.newRowIdCounter;
			rowId.push(obj['id']);
			// on adding a new row its id is pushed in the rowId array.
			if(value) {
				// if value is defined
				for(each in grid.columns) {
					if(grid.columns[each].editor){
						obj[grid.columns[each].field] = (value && value[grid.columns[each].field]) || (grid.columns[each].editorArgs && grid.columns[each].editorArgs.value) || '';
						//Dirty is updated evertime a new row is added with or without values.
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

			//InsertRow function si called to add a new row into the grid.
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
