define(["dojo/_base/declare", "dgrid/OnDemandGrid", "dijit/form/Button", "dojo/aspect", "put-selector/put", "dojo/has", "dgrid/util/misc"],
function(declare, OnDemandGrid, Button, aspect, put, has, miscUtil){
	function byId(id){
		return document.getElementById(id);
	}
	var invalidClassChars = /[^\._a-zA-Z0-9-]/g;
	var contentBoxSizing = has("ie") < 8 && !has("quirks");
	function defaultRenderCell(object, data, td, options){
		if(this.formatter){
			// Support formatter, with or without formatterScope
			var formatter = this.formatter,
				formatterScope = this.grid.formatterScope;
			td.innerHTML = typeof formatter === "string" && formatterScope ?
				formatterScope[formatter](data, object) : this.formatter(data, object);
		}else if(data != null){
			td.appendChild(document.createTextNode(data)); 
		}
	}
	function appendIfNode(parent, subNode){
		if(subNode && subNode.nodeType){
			parent.appendChild(subNode);
		}
	}
	var oddClass = "dgrid-row-odd",
		evenClass = "dgrid-row-even",
		scrollbarWidth, scrollbarHeight;
	
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
		_setExtraColumns: function(columns){
			this._destroyColumns();
			// reset instance variables
			this.subRows = null;
			this.extraColumns = columns;
			// re-run logic
			this._updateColumns();
		},
		_configExtraColumns: function(prefix, rowColumns){
			// configure the current column
			var subRow = [],
				isArray = rowColumns instanceof Array;
			
			function configColumn(column, columnId){
				if(typeof column == "string"){
					rowColumns[columnId] = column = {label:column};
				}
				if(!isArray && !column.field){
					column.field = columnId;
				}
				columnId = column.id = column.id || (isNaN(columnId) ? columnId : (prefix + columnId));
				if(isArray){ this.extraColumns[columnId] = column; }
				
				// allow further base configuration in subclasses
				if(this._configColumn){
					this._configColumn(column, columnId, rowColumns, prefix);
				}
				
				// add grid reference to each column object for potential use by plugins
				column.grid = this;
				if(typeof column.init === "function"){ column.init(); }
				
				subRow.push(column); // make sure it can be iterated on
			}
			miscUtil.each(rowColumns, configColumn, this);
			return isArray ? rowColumns : subRow;
		},
		configStructure: function(){
			this.inherited(arguments);
			var subExtraRows = this.subExtraRows,
				extraColumns = this._extraColumns = this.extraColumns;
			
			if(subExtraRows){
				// Process subExtraRows, which will in turn populate the this.columns object
				for(var i = 0; i < subExtraRows.length; i++){
					subExtraRows[i] = this._configExtraColumns(i + "-", subExtraRows[i]);
				}
			}else{
				this.subExtraRows = [this._configExtraColumns("", extraColumns)];
			}
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
		},
		addNewExtraRowToGrid: function(onRefresh) {
			var grid = this.grid||this;
			var refDomNode = (this.grid && this.domNode) || (this&&this.addNewRowWidget.domNode)
			var obj = {};
			for(each in grid.extraColumns) {
				if(grid.extraColumns[each].editor) {
					obj[grid.extraColumns[each].field] = grid.extraColumns[each].editor.superclass.value;
				} else {
					obj[grid.extraColumns[each].field] = "";
				}
			}
			console.log(obj);
			obj['id'] = ++grid.newRowIdCounter;

			grid.insertExtraRow(obj, grid.contentNode, null, null, {});
			if(onRefresh == undefined) {
				grid._newlyAddedRowList.push(obj);
			}
			grid.scrollTo({x:0,y:grid.contentNode.scrollHeight});
		},
		insertExtraRow: function(object, parent, beforeNode, i, options){
			// summary:
			//		Creates a single row in the grid.
			
			// Include parentId within row identifier if one was specified in options.
			// (This is used by tree to allow the same object to appear under
			// multiple parents.)
			var parentId = options.parentId,
				id = this.id + "-row-" + (parentId ? parentId + "-" : "") + 
					((this.store && this.store.getIdentity) ? 
						this.store.getIdentity(object) : this._autoId++),
				row = byId(id),
				previousRow = row && row.previousSibling;
			console.log(id);
			console.log(object);
			if(row){// if it existed elsewhere in the DOM, we will remove it, so we can recreate it
				this.removeRow(row);
			}

			row = this.renderExtraRow(object, options);
			row.className = (row.className || "") + " ui-state-default dgrid-row " + (i % 2 == 1 ? oddClass : evenClass);
			// get the row id for easy retrieval
			this._rowIdToObject[row.id = id] = object;
			parent.insertBefore(row, beforeNode || null);
			if(previousRow){
				// in this case, we are pulling the row from another location in the grid, and we need to readjust the rowIndices from the point it was removed
				this.adjustRowIndices(previousRow);
			}
			row.rowIndex = i;
			return row;
		},
		renderExtraRow: function(object, options){
			var self = this;
			var row = this.createExtraRowCells("td", function(td, column){
				var data = object;
				console.log(column)
				// Support get function or field property (similar to DataGrid)
				if(column.get){
					data = column.get(object);
				}else if("field" in column && column.field != "_item"){
					data = data[column.field];
				}
				
				if(column.renderCell){
					// A column can provide a renderCell method to do its own DOM manipulation,
					// event handling, etc.
					appendIfNode(td, column.renderCell(object, data, td, options));
				}else{
					defaultRenderCell.call(column, object, data, td, options);
				}
			}, options && options.subRows, object);
			// row gets a wrapper div for a couple reasons:
			//	1. So that one can set a fixed height on rows (heights can't be set on <table>'s AFAICT)
			// 2. So that outline style can be set on a row when it is focused, and Safari's outline style is broken on <table>
			return put("div[role=row]>", row);
		},
		createExtraRowCells: function(tag, each, subRows, object){
			// summary:
			//		Generates the grid for each row (used by renderHeader and and renderRow)
			var row = put("table.dgrid-row-table[role=presentation]"),
				cellNavigation = this.cellNavigation,
				// IE < 9 needs an explicit tbody; other browsers do not
				tbody = (has("ie") < 9 || has("quirks")) ? put(row, "tbody") : row,
				tr,
				si, sl, i, l, // iterators
				subRow, column, id, extraClasses, className,
				cell, innerCell, colSpan, rowSpan; // used inside loops
			
			// Allow specification of custom/specific subRows, falling back to
			// those defined on the instance.
			subRows = subRows || this.subExtraRows;
			console.log(subRows)
			for(si = 0, sl = subRows.length; si < sl; si++){
				subRow = subRows[si];
			console.log(subRow)
				// for single-subrow cases in modern browsers, TR can be skipped
				// http://jsperf.com/table-without-trs
				tr = put(tbody, "tr");
				if(subRow.className){
					put(tr, "." + subRow.className);
				}

				for(i in subRow){
					console.log(i)
					// iterate through the columns
					column = subRow[i];
					id = column.id;

					extraClasses = column.field ? ".field-" + column.field : "";
					className = typeof column.className === "function" ?
						column.className(object) : column.className;
					if(className){
						extraClasses += "." + className;
					}

					cell = put(tag + (
							".dgrid-cell.dgrid-cell-padding" +
							(id ? ".dgrid-column-" + id : "") +
							extraClasses.replace(/ +/g, ".")
						).replace(invalidClassChars,"-") +
						"[role=" + (tag === "th" ? "columnheader" : "gridcell") + "]");
					cell.columnId = id;
					if(contentBoxSizing){
						// The browser (IE7-) does not support box-sizing: border-box, so we emulate it with a padding div
						innerCell = put(cell, "!dgrid-cell-padding div.dgrid-cell-padding");// remove the dgrid-cell-padding, and create a child with that class
						cell.contents = innerCell;
					}else{
						innerCell = cell;
					}
					colSpan = column.colSpan;
					if(colSpan){
						cell.colSpan = colSpan;
					}
					rowSpan = column.rowSpan;
					if(rowSpan){
						cell.rowSpan = rowSpan;
					}
					each(innerCell, column);
					// add the td to the tr at the end for better performance
					tr.appendChild(cell);
				}
			}
			return row;
		}
	});
	// expose appendIfNode and default implementation of renderCell,
	// e.g. for use by column plugins
	businessGrid.appendIfNode = appendIfNode;
	businessGrid.defaultRenderCell = defaultRenderCell;
	
	return businessGrid;
});
