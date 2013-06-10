define(["dojo/_base/declare", "dojo/html", "dojo/has", "dojo/dom", "dojo/dom-attr", "dijit/form/TextBox", "dojo/dom-construct", "dojox/image", "dijit/form/Button", "dgrid/selector", "put-selector/put","dojo/on"], function(
declare, html, has, dom, domAttr, TextBox, domConstruct, image, Button, Selector, put, on) {
	/*
	 *	Row Filter plugin for dgrid
	 *	Originally contributed by RCorp(Ramanan Corporation, India) 2013-02-12
	 *  Dojo DGrid Extension with filtering and Button selection capability
	 *
	 *  A dGrid plugin that attaches dojo textboxes just header of the dGrid
	 *  to search and filter dGrids row(s) by entering some filterable string in the textbox
	 *  provided. Result of the values entered in each textboxes is retrieved
	 *  by quering store and filtered rows are displayed on the grid. If some rows
	 *  are selected by checking the Button then that particular rows will always remain
	 *  even if the filtering string is not macthed with it.
	 *
	 *  This filter is based on one column set by user as a filtering column.
	 *
	 */

	/**
	 * object to store values of each textbox.
	 * @type {Object}
	 */
	var filterableTextBoxValue = '';
	var indexOfSelectedItemsOfGridArr = [];
	var invalidClassChars = /[^\._a-zA-Z0-9-]/g;
	var contentBoxSizing = has("ie") < 8 && !has("quirks");
	var headerTableNode = '';
	var allWidgetsIdArr = [];
	var grid = '';
	var AllColumnTextBoxValue = '';
	var currentColName = '';
	var filteredRows = [];
	return declare(null, {
		filterableTable: '',
		constructor: function() {
			this.allColumnTextBoxValue = {}
		},
		/**
		 * filter's rows of dGrid.
		 * @param {object} item  single row of dGrid
		 * @param {number} index index of this single row in Array of Rows
		 * @param {array} items all rows of dGrid
		 * @return {boolean}
		 */
		setFilter: function(item, index, items) {
			/**
			 * check value of each textbox
			 * @type {boolean}
			 * @default {undefined}
			 */
			var Show = undefined;

			for(each in AllColumnTextBoxValue) {
				//console.log(each,'each', AllColumnTextBoxValue[each],item)
				var colValue = (item[each.split('*****')[0]] + "").toLowerCase();
				/**
				 * if atleast two characters inserted by user in each textbox then query the store
				 */
				if(AllColumnTextBoxValue[each] != "" && AllColumnTextBoxValue[each].length >= 1) {
					if(Show == undefined) {
						/**
						 * match filter string with the content of the column
						 */
						if(colValue.indexOf(AllColumnTextBoxValue[each].toLowerCase()) != -1) {
							if(filteredRows.indexOf(item) == -1) {
								filteredRows.push(item)
							}
							Show = true;
						} else {
							Show = false;
						}
					} else {
						/**
						 * Logically "And" the result of each successfull match
						 */
						Show = Show && colValue.indexOf(AllColumnTextBoxValue[each].toLowerCase()) != -1;
					}
				} else {
					//	//console.log('empty textbox........................')
				}
			}
			if(indexOfSelectedItemsOfGridArr.indexOf(item.id) != -1) {
				// console.log(filteredRows.indexOf(item))
				if(filteredRows.indexOf(item) == -1) {
					filteredRows.push(item)
				}
				Show = true;
			}
			/**
			 * if all filtered string gets matched for each column only then show the particular row
			 */
			//console.log('show', Show, item)
			if(Show == true) {
				if(filteredRows.indexOf(item) == -1) {
					filteredRows.push(item)
				}
				return true;
			} else if(Show == false) {
				return false;
			}
			/**
			 * initially show all the rows i.e when all filtered textboxes are empty or null
			 */
			return true;
		},
		addTextBoxToGridHeader: function(table, column, indexCell, fieldLabel) {
			//console.log('addTextBoxToGridHeader',table)
			// parentRow = table.children[0];
			tbody = table.children[0];
			// console.log('tbody is :', tbody)
			row = tbody.children[0];
			parentDiv = row.children[indexCell]
			// console.log('row')
			//console.log(row.children[indexCell].innerHTML)
			html.set(row.children[indexCell],'')
			// parentDiv.innerHTML = '';
			// domConstruct.place(headerNode, headerNodeMainDiv, 'before');
			/**
			 * to set Delay between searches
			 * @type {Number}
			 */
			var timeoutId = 0;

			/**
			 * set placeHolder for each textbox
			 * @type {String}
			 */
			var placeHolder = 'Search By ' + column.id;

			if(allWidgetsIdArr.indexOf(this.id + '_' + column.id + "*****_textDiv_" + fieldLabel) == -1)
			{
				allWidgetsIdArr.push(this.id + '_' + column.id + "*****_textDiv_" + fieldLabel);
				/**
				 * create a a parent div for each filter textbox
				 * id of the textbox's parent div ="textDiv_" + <column name>
				 * @type {Object}
				 */
				var newDivToPlaceTextBox = '';
				if(dom.byId(this.id + '_' + column.id + "*****_textDiv_" + fieldLabel) == undefined ||  dom.byId(this.id + "*****_textDiv_" + fieldLabel) == null)
				{
					newDivToPlaceTextBox = domConstruct.create("div", {
						id: this.id + '_' + column.id + "*****_textDiv_" + fieldLabel,
					}, parentDiv)				
				}
				/**
				 * create filter textbox
				 * @type {dijit}
				 */
				var myTextBox = new TextBox({
					/**
					 * name of the textbox="filter_" + <column name>
					 */
					name: this.id + '_' + column.id + "_filter_textDiv_" + fieldLabel,
					value: "",
					placeHolder: placeHolder,
					/**
					 * event on each change
					 */
					intermediateChanges: true
				}, newDivToPlaceTextBox);
				myTextBox.set('currentColName', column.id)
				/**
				 * store this
				 * @type {Object}
				 */
				var This = this;
				This.allColumnTextBoxValue[column.id] = '';

				myTextBox.watch("value", function(name, oldValue, newValue) {
					//console.log(This.selection,'This.selection')
					currentColName = this.get('currentColName');
					indexOfSelectedItemsOfGridArr.splice(0);
					for(each in This.selection) {
						indexOfSelectedItemsOfGridArr.push(each)
					}
					/**
					 * get columns name from the id of the textbox selected
					 */
					// //console.log(filterableTextBoxValue, this.id, 'this.id', this.id.match(/_\w+/)[0].match(/[^_]\w+/)[0])
					// filterableTextBoxValue = this.get("value");
					/**
					 * get columns name from the id of the textbox selected
					 */
					This.allColumnTextBoxValue[currentColName] = this.get("value");
					AllColumnTextBoxValue = This.allColumnTextBoxValue;
					if(timeoutId) {
						clearTimeout(timeoutId);
						timeoutId = null;
					};

					/**
					 * add delay
					 * @param  {function} function to set delay
					 * @param  {integer} 300 is delay value in ms
					 */
					timeoutId = setTimeout(function() {
						//console.log('b4 refresh')
						This.refresh();
						//console.log('after refresh')
						for(each in indexOfSelectedItemsOfGridArr) {
							This.select(indexOfSelectedItemsOfGridArr[each])
						}
					}, 300);

				});

			}

		},
		getFilteredRows : function () {
			return filteredRows
		},
		addSelectAllButtonToGridHeader: function(parentRow) {

			table = parentRow.children[0];
			var tBody = table.children[0]
			var parentDiv = tBody.children[0]
			html.set(parentDiv,'');

			// console.log('button parent div', parentDiv, parentRow)
			if(allWidgetsIdArr.indexOf(this.id + "_ButtonDiv_SelectAll") == -1)
			{
				allWidgetsIdArr.push(this.id + "_ButtonDiv_SelectAll")	
				/**
				 * create a a parent div for each filter textbox
				 * id of the textbox's parent div ="textDiv_" + <column name>
				 * @type {Object}
				 */
				var newDivToPlaceButton = domConstruct.create("div", {
					id: this.id + "_ButtonDiv_SelectAll"
				}, parentDiv)
				var This = this;
				/**
				 * create filter textbox
				 * @type {dijit}
				 */
				var myButton = new Button({
				        name:  "selectAll_Button",
				        checked: false,
				        label:"Select All",
				        onClick: function(){
				        	indexOfSelectedItemsOfGridArr.splice(0);
				        	var rows = This.getFilteredRows();
				        	if(rows.length == 0) {
				        		rows = This.store.data;
				        	}
			        		for(var i=0;i<rows.length;i++)
			        		{
			        			if(!This.isSelected(rows[i]))
			        			{
			        				This.select(rows[i]);
			        				indexOfSelectedItemsOfGridArr.push(rows[i].id)
			        			}
			        		}
				        }
				    }, newDivToPlaceButton);
			}
		},
		addSelectInverseButtonToGridHeader: function(parentRow) {

			table = parentRow.children[0];
			var tBody = table.children[0]
			var parentDiv = tBody.children[1]
			html.set(parentDiv,'');

			if(allWidgetsIdArr.indexOf(this.id + "_ButtonDiv_SelectInverse") == -1)
			{
				allWidgetsIdArr.push(this.id + "_ButtonDiv_SelectInverse")	

				/**
				 * create a a parent div for each filter textbox
				 * id of the textbox's parent div ="textDiv_" + <column name>
				 * @type {Object}
				 */
				var newDivToPlaceButton = domConstruct.create("div", {
					id: this.id + "_ButtonDiv_SelectInverse"
				}, parentDiv)

				/**
				 * create filter textbox
				 * @type {dijit}
				 */
				var This = this;
				var myButton = new Button({
				        name: "selectInverse_Button",
				        label:"Select Inverse",
				        checked: false,
				        onClick: function(){
			        			// console.log(rows.length)
				        	var rows = This.getFilteredRows();
				        	if(rows.length == 0) {
				        		rows = This.store.data;
				        	}
			        		for(var i=0;i<rows.length;i++)
			        		{
					        	indexOfSelectedItemsOfGridArr.splice(0);
			        			if(This.isSelected(rows[i]))
			        			{
			        				// console.log('deselect',i)
			        				This.deselect(rows[i],0,false);
			        			}
			        			else
			        			{
			        				// console.log('select',i)
			        				This.select(rows[i]);
			        				indexOfSelectedItemsOfGridArr.push(rows[i].id);
			        			}
			        		}
				        }
				    }, newDivToPlaceButton);
			}
		},
		addSelectNoneButtonToGridHeader: function(parentRow) {

			table = parentRow.children[0];
			var tBody = table.children[0]
			var parentDiv = tBody.children[2]
			html.set(parentDiv,'');

			if(allWidgetsIdArr.indexOf(this.id + "_ButtonDiv_SelectNone") == -1)
			{
				allWidgetsIdArr.push(this.id + "_ButtonDiv_SelectNone")	

				/**
				 * create a a parent div for each filter textbox
				 * id of the textbox's parent div ="textDiv_" + <column name>
				 * @type {Object}
				 */
				var newDivToPlaceButton = domConstruct.create("div", {
					id: this.id + "_ButtonDiv_SelectNone"
				}, parentDiv)

				var This = this;
				/**
				 * create filter textbox
				 * @type {dijit}
				 */
				var myButton = new Button({
				        name: "selectNone_Button",
				        label:"Select None",
				        checked: false,
				        onClick: function(){
				        	var rows = This.getFilteredRows();
				        	if(rows.length == 0) {
				        		rows = This.store.data;
				        	}
			        		for(var i=0;i<rows.length;i++)
			        		{
					        	indexOfSelectedItemsOfGridArr.splice(0);
			        			if(This.isSelected(rows[i]))
			        			{
			        				This.deselect(rows[i])
			        			}
			        		}
				        }
				    }, newDivToPlaceButton);
			}
		},
		/**
		 * override the Grid's renderHeader function
		 * @return {boolean}
		 */
		renderHeaderX: function() {
			/**
			 * instance of dGrid
			 * @type {grid}
			 */
			grid = this

			/**
			 * set custom query function
			 */
			grid.query = this.setFilter;

			/**
			 * call parents renderHeader
			 */
			this.inherited(arguments);
			headerNode = this.headerNode

			var row = this.createFilterRowCells("th", function(th, column) {
				var contentNode = column.headerNode = th;
				if(contentBoxSizing) {
					// we're interested in the th, but we're passed the inner div
					th = th.parentNode;
				}
				var field = column.field;
				if(field) {
					th.field = field;
				}
				// allow for custom header content manipulation
				if(column.renderHeaderCell) {
					appendIfNode(contentNode, column.renderHeaderCell(contentNode));
				} else if(column.label || column.field) {
					contentNode.appendChild(document.createTextNode(column.label || column.field));
				}
				if(column.sortable !== false && field && field != "_item") {
					th.sortable = true;
					th.className += " dgrid-sortable";
				}
			}, this.subRows && this.subRows.headerRows);

			row.id = this.id + "-header-filterable";
			this._rowIdToObject[row.id = this.id + "-header-filterable"] = this.columns;
			headerNode.appendChild(row);
			this.filterableTable = row;
							/**
			 * add filter textbox to grid
			 */
//			this.addTextBoxToGridHeader(grid.filterFieldLabel);
			// this.addTextBoxToGridHeader(row, grid.filterFieldLabel);
			var indexCell = 0;
			for(each in this.columns) {
				//console.log(this.columns,each)
				this.addTextBoxToGridHeader(row, this.columns[each], indexCell, each);
				indexCell++;
			}
			if(this.advanceSelection)
			{
				row = this.createButtonRowCells("th", function(th, column) {
					var contentNode = column.headerNode = th;
					if(contentBoxSizing) {
						// we're interested in the th, but we're passed the inner div
						th = th.parentNode;
					}
					var field = column.field;
					if(field) {
						th.field = field;
					}
					// allow for custom header content manipulation
					if(column.renderHeaderCell) {
						appendIfNode(contentNode, column.renderHeaderCell(contentNode));
					} else if(column.label || column.field) {
						contentNode.appendChild(document.createTextNode(column.label || column.field));
					}
					if(column.sortable !== false && field && field != "_item") {
						th.sortable = true;
						th.className += " dgrid-sortable";
					}
				}, this.subRows && this.subRows.headerRows);

				row.id = this.id + "-header-filterable";
				this._rowIdToObject[row.id = this.id + "-header-filterable"] = this.columns;
				headerNode.appendChild(row);

				this.addSelectAllButtonToGridHeader(row);
				this.addSelectInverseButtonToGridHeader(row);
				this.addSelectNoneButtonToGridHeader(row);
				domConstruct.place(row, headerNode, 0);
			}
		},
		createFilterRowCells: function(tag, each, subRows) {
			var
			grid = this,
				columns = this.columns,
				headerNode = this.headerNode,
				i = headerNode.childNodes.length;

			headerNode.setAttribute("role", "row");
			// summary:
			//		Generates the grid for each row (used by renderHeader and and renderRow)
			var row = put("table.dgrid-row-table[role=presentation]"),
				cellNavigation = this.cellNavigation,
				// IE < 9 needs an explicit tbody; other browsers do not
				tbody = (has("ie") < 9 || has("quirks")) ? put(row, "tbody") : row,
				tr, si, sl, i, l, // iterators
				subRow, column, id, extraClassName, cell, innerCell, colSpan, rowSpan; // used inside loops
			// Allow specification of custom/specific subRows, falling back to
			// those defined on the instance.
			subRows = subRows || this.subRows;
			for(si = 0, sl = subRows.length; si < sl; si++) {
				subRow = subRows[si];
				// for single-subrow cases in modern browsers, TR can be skipped
				// http://jsperf.com/table-without-trs
				tr = put(tbody, "tr");
				if(subRow.className) {
					put(tr, "." + subRow.className);
				}

				for(i = 0, l = subRow.length; i < l; i++) {
					// iterate through the columns
					column = subRow[i];
					if(column) {
						this.filterColName = column.id
						// console.log('filterable....')
						id = column.id + '-filterable';
						extraClassName = column.className || (column.field && "field-" + column.field);
						cell = put(tag + (".dgrid-cell.dgrid-cell-padding" + (id ? ".dgrid-column-" + id : "") + (extraClassName ? "." + extraClassName : "")).replace(invalidClassChars, "-") + "[role=" + (tag === "th" ? "columnheader" : "gridcell") + "]");
						cell.columnId = id;
						if(contentBoxSizing) {
							// The browser (IE7-) does not support box-sizing: border-box, so we emulate it with a padding div
							innerCell = put(cell, "!dgrid-cell-padding div.dgrid-cell-padding"); // remove the dgrid-cell-padding, and create a child with that class
							cell.contents = innerCell;
						} else {
							innerCell = cell;
						}
						colSpan = column.colSpan;
						if(colSpan) {
							cell.colSpan = colSpan;
						}
						rowSpan = column.rowSpan;
						if(rowSpan) {
							cell.rowSpan = rowSpan;
						}
						each(innerCell, column);
						// console.log('tr cell',cell)
						// add the td to the tr at the end for better performance
						tr.appendChild(cell);
					}
				}
			}
			// console.log('createFilterRowCells', row, tr)
			return row;
		},
		createButtonRowCells: function(tag, each, subRows) {
			var
			grid = this,
				columns = this.columns,
				headerNode = this.headerNode,
				i = headerNode.childNodes.length;

			headerNode.setAttribute("role", "row");
			// summary:
			//		Generates the grid for each row (used by renderHeader and and renderRow)
			var row = put("table.dgrid-row-table[role=presentation]"),
				cellNavigation = this.cellNavigation,
				// IE < 9 needs an explicit tbody; other browsers do not
				tbody = (has("ie") < 9 || has("quirks")) ? put(row, "tbody") : row,
				tr, si, sl, i, l, // iterators
				subRow, column, id, extraClassName, cell, innerCell, colSpan, rowSpan; // used inside loops
			// Allow specification of custom/specific subRows, falling back to
			// those defined on the instance.
			subRows = subRows || this.subRows;

			tr = put(tbody, "tr");
			id = 'test' + '-filterable';
			// // add the td to the tr at the end for better performance
			tr.appendChild(this.addButton(tag, "selectAll"));
			tr.appendChild(this.addButton(tag, "selectInverse"));
			tr.appendChild(this.addButton(tag, "selectNone"));
			return row;
		},
		addButton: function(tag, id) {
			var cell = put(tag + (".dgrid-cell.dgrid-cell-padding" + (id ? ".dgrid-column-" + id : "")).replace(invalidClassChars, "-") + "[role=" + (tag === "th" ? "columnheader" : "gridcell") + "]");
			cell.id = id + '_Button_Cell';
			if(contentBoxSizing) {
				// The browser (IE7-) does not support box-sizing: border-box, so we emulate it with a padding div
				innerCell = put(cell, "!dgrid-cell-padding div.dgrid-cell-padding"); // remove the dgrid-cell-padding, and create a child with that class
				cell.contents = innerCell;
			} else {
				innerCell = cell;
			}
			return cell;
		},
	});
});
