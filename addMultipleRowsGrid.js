define(["dojo/_base/lang","dojo/_base/declare", "dgrid/OnDemandGrid", "dojo/store/Memory","dojo/store/Observable","dijit/form/Button", "dojo/aspect","dojo/date","dgrid/editor", "put-selector/put"],
function(lang,declare, OnDemandGrid, Memory,Observable,Button, aspect,date,editor, put){
	/**
	* This grid places a Add New button after all the rows have been rendered which is used to add new rows into
	* the grid one at a time. This grid adds new rows using id's of each row instead of a counter	we used earlier
	* because then we cannot keep account of the deleted rows. We can use widgets with or without editor in 
	* columns of this grid.
	* It is mandatory to add dgrid/extensions/DijitRegistry to use this Grid.
	**/
	var businessGrid = declare(null, {
		constructor: function() {
			var grid = this;
			this.arrRowIds=[];
			this.labelAddNew = this.labelAddNew || 'Add New';
			// To check if the grid used in the form is addMultipleRowsGrid
			this.isMultipleGrid = true;
			this.addNewRowWidget = '';
			this.isAddNewButtonRequired = this.isAddNewButtonRequired && true;
			this._newlyAddedRowList = [];
			// By default one row should be visible in the grid.
			this.defaultVisible = this.defaultVisible || 1;
			// needed by external users
			aspect.after(this, "renderHeader", function() {
				this.on('dgrid-refresh-complete',function() {
					grid.renderOnRefresh();	
				})
			});
		},
		// if constructor doesn't work then call this function
		renderOnRefresh: function(){
			var grid= this;
			var len= grid.defaultVisible;
			grid.newRowIdCounter=0;
			this.value= [];
			grid.arrRowIds.splice(0);
			grid.contentNode.innerHTML = ""
			// The array containing id's of all the rows is cleared.
			// multiple refresh problem, if dirty is empty
			// then create default Rows else use dirty
			if(JSON.stringify(grid.dirty) == '{}') {
				if(this.isAddNewButtonRequired) {
					grid.createAddNewRowButton();
				}
				grid.newRowIdCounter=0;
				for(var i=0;i<len;i++) {
				 	grid.addNewRowToGrid(undefined, true);
				}
			}
			else{
				grid.newRowIdCounter = 0;
				var prevData = grid.objectToArray(grid.dirty)
				// Clears grid.dirty
				lang.setObject('dirty', {}, grid);
				grid.set('value',prevData);
			}

			if(this.isAddNewButtonRequired) {
				grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
			}
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
			return array;
		},

		/**
		* This function removes a row whose row id is sent as parameter in it. Then that row is removed from 
		* dirty and the array containing all the row id's as well.
		**/
		removeDirtyRow: function(id){
        	var grid=this;
        	var rowElement = this.row(id);
        	rowElement = rowElement.element || rowElement;
    		put(rowElement, "!");

        	var _idForRowIdToObject = grid.id + "-row-" + id
        	for(each in grid._rowIdToObject[_idForRowIdToObject]) {
        		if(each.indexOf(grid.store.idProperty) == -1) {
        			delete grid._rowIdToObject[_idForRowIdToObject][each]
        			if(grid._rowIdToObject[_idForRowIdToObject][each + "_id"]) {
        				delete grid._rowIdToObject[_idForRowIdToObject][each + "_id"];
        			}
        		}
        	}

        	delete this.dirty[id];
        	this.arrRowIds.splice(this.arrRowIds.indexOf(parseInt(id)),1)
		},

		/**
		* Setvalue function of grid takes an array of object as parameter and clears the grid, checks whether the parameter
		* is an array or not else gives an error message; if the parameter is valid then it makes the rows with the values 
		* given in parameter. And in the end appends the Add New button.		
		**/
		_setValue:function(value){
			this.cleanup();
			this.contentNode.innerHTML = "";
			this.arrRowIds.splice(0);
			this.newRowIdCounter=0;
			var grid = this;
			var columnNames=[];
			this.dirty={};
			if(lang.isArray(value)){
				for(eachColumn in grid.columns){
					columnNames.push(grid.columns[eachColumn].field)
				}
				for(var i=0; i<value.length;i++){
				 	this.addNewRowToGrid(value[i],true);
				}
				if(this.isAddNewButtonRequired) {
					grid.contentNode.appendChild(grid.addNewRowWidget.domNode)
				}
			}
			else{
				console.error("The values to be entered must be an array of objects")
			}
		},

		
		//Getvalue function gives all the values of rows that are present in dirty. It returns an array of objects.
		_getValue:function(){
			var arrayOfValues = [];
			var grid = this;
			var tempRowIdToObject = dojo.clone(grid._rowIdToObject)
			for(eachRow in tempRowIdToObject) {
				var rowId = eachRow.split('-row-')[1]
				var _obj = '';
				var canBeAdded = false;
				if(grid.dirty[rowId]) {
					// if all the fields in dirty object have _id it means
					// we have all defualts _pk value but no actual FilteringSelect
					// value. It means these changes are not done by user
					// then ignore it
					for(eachCol in grid.dirty[rowId]) {
						if(eachCol.indexOf("_id") == -1) {
							canBeAdded = true;
							break;
						}
					}
					_obj=grid.dirty[rowId]
				}

				if(eachRow.indexOf('new-') == -1){
					_obj[this.store.idProperty] = tempRowIdToObject[eachRow][this.store.idProperty]
					delete tempRowIdToObject[eachRow][grid.store.idProperty];
				} else {
					// Check if row is not a newly added row
					// and row has one column it means it is deleted by user
					// as suggetsed by backend developer and
					// we need to send it to backend set its flag "canBeAdded"
					// to true
					var _count =0;
					for(eachCol in tempRowIdToObject[eachRow]) {
						_count++
						if(_count>1) {
							break;
						}
					}
					if(_count >= 1) {
						canBeAdded = true;
					}
				}
				// Add obj if it can't be ignored means - we know that these
				// changes are done by user
				if(canBeAdded)  {
					var mixedObject = lang.mixin(tempRowIdToObject[eachRow], _obj)
					arrayOfValues.push(mixedObject);
				}
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
			if(this.isAddNewButtonRequired) {
				this.addNewRowWidget.set('label', label);
			}
		},

		/**
		 * Reset Grid data
		 */
		reset: function() {
			this.set('dirty', {})
			this.renderOnRefresh();
		},
		
		/**
		* createAddNewRowButton creates a Add New button which calls addNewRowGrid function to add new rows 
		* into the grid and after all the rows have been rendered this Add New button is placed.
		*/
		createAddNewRowButton: function() {
			if(this.addNewRowWidget == '') {
				this.addNewRowWidget = new Button({
					label:this.labelAddNew,
					grid:this
				});
				this.addNewRowWidget.on('click',function(){
					this.grid.addNewRowToGrid();
					this.grid.contentNode.appendChild(this.domNode)
				});
			}
		},
		
		/**
		 * Trying to use same function from grid and click event of add new Button
		 * @param {[type]} onRefresh [description]
		**/

		/**
		* We have kept newRowIdCounter because whenever we add a new row it should be added at the index pointed by 
		* newRowIdCounter but we also need an array arrRowIds to implement the case to delete the deleted row id from the
		* rows present in grid for reference to refresh the grid and retain all the rows already made.
		**/

		addNewRowToGrid: function(value, onRefresh) {
			// if evt.grid or grid itself
			var grid = this.grid||this;
			var refDomNode = grid.contentNode;
			var obj = {};

			// idProperty is used for using SocketStore
			// if idProperty is defined use value of id
			// property to make unique od for each row
			if(value && value[this.store.idProperty]) {
				obj[this.store.idProperty] = value[this.store.idProperty];
				this.arrRowIds.push(obj[this.store.idProperty]);
			} else{
				obj[this.store.idProperty || 'id'] = "new-" + ++grid.newRowIdCounter;
				this.arrRowIds.push(obj[this.store.idProperty || 'id']);
			}

			// on adding a new row its id is pushed in the arrRowIds array.
			if(value) {
				// if value is defined
				for(each in grid.columns) {
					if(grid.columns[each].editor){
						obj[grid.columns[each].field] = (value && value[grid.columns[each].field]) || (grid.columns[each].editorArgs && grid.columns[each].editorArgs.value) || '';
						if(value[grid.columns[each].field + "_id"]) {
							obj[grid.columns[each].field + "_id"] = (value && value[grid.columns[each].field + "_id"]);
						}
						//Dirty is updated evertime a new row is added with or without values.
						// grid.updateDirty(grid.newRowIdCounter,grid.columns[each].field,obj[grid.columns[each].field])
					}
					else if(grid.columns[each].editor && grid.columns[each].editor.superclass){
						obj[grid.columns[each].field] = (value && value[grid.columns[each].field]) || grid.columns[each].editor.superclass.value;
						// grid.updateDirty(grid.newRowIdCounter,grid.columns[each].field,obj[grid.columns[each].field])
					} else {
						obj[grid.columns[each].field] = (value && value[grid.columns[each].field]);
					}
				}
			} else {
				for(each in grid.columns) {
					if(grid.columns[each].editor){
						obj[grid.columns[each].field] = (value && value[grid.columns[each].field]) || (grid.columns[each].editorArgs && grid.columns[each].editorArgs.value) || '';
						// grid.updateDirty(grid.newRowIdCounter,grid.columns[each].field,obj[grid.columns[each].field])
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
