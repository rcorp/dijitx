define(["dojo/_base/declare", "dojo/has", "dojo/dom", "dojo/dom-attr", "dijit/form/TextBox", "dojo/dom-construct", "dojox/image", "dijit/form/CheckBox","dgrid/selector", "put-selector/put"], function(
declare, has, dom, domAttr, TextBox, domConstruct, image, CheckBox, Selector, put) {
	/*
	 *	Row Filter plugin for dgrid
	 *	Originally contributed by RCorp(Ramanan Corporation, India) 2013-02-12
	 *  Dojo DGrid Extension with filtering and checkbox selection capability
	 *
	 *  A dGrid plugin that attaches dojo textboxes just header of the dGrid
	 *  to search and filter dGrids row(s) by entering some filterable string in the textbox
	 *  provided. Result of the values entered in each textboxes is retrieved
	 *  by quering store and filtered rows are displayed on the grid. If some rows
	 *  are selected by checking the checkbox then that particular rows will always remain
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

	return declare(null, {
		filterableTable:'',
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
			var colValue = (item[grid.filterColName] + "").toLowerCase();
			/**
			 * if atleast two characters inserted by user in each textbox then query the store
			 */
			if(filterableTextBoxValue != "" && filterableTextBoxValue.length >= 0) {
				if(Show == undefined) {
					/**
					 * match filter string with the content of the column
					 */
					if(colValue.indexOf(filterableTextBoxValue.toLowerCase()) != -1) {
						Show = true;
					} else {
						Show = false;
					}

					if(indexOfSelectedItemsOfGridArr.indexOf(item.id) != -1)
					{
						console.log('checked...',item.id)
						Show = true;
					}
				} else {
					/**
					 * Logically "And" the result of each successfull match
					 */
					Show = Show && colValue.indexOf(filterableTextBoxValue.toLowerCase()) != -1;
				}
			} else {
				//	console.log('empty textbox........................')
			}
			/**
			 * if all filtered string gets matched for each column only then show the particular row
			 */
			if(Show == true) {
				return true;
			} else if(Show == false) {
				return false;
			}

			/**
			 * initially show all the rows i.e when all filtered textboxes are empty or null
			 */
			return true;
		},
		addTextBoxToGridHeader: function(fieldLabel)
		{
			/**
			 * get Div tag (parent) of Grid's Header
			 * @type {DOM element}
			 */
			var headerNodeMainDiv = this.get('headerNode')

			/**
			 * get main Header Tag which is a table tag in this case
			 * @type {DOM element}
			 */
			var headerNode = headerNodeMainDiv.children[0];

			table = this.filterableTable.children[0];
			parentDiv = table.children[0]
			parentDiv.innerHTML = '';
			domConstruct.place(this.filterableTable,headerNode,'before');
			/**
			 * to set Delay between searches
			 * @type {Number}
			 */
			var timeoutId = 0;

			/**
			 * set placeHolder for each textbox
			 * @type {String}
			 */
			var placeHolder = 'filter by ' + fieldLabel;

			/**
			 * create a a parent div for each filter textbox
			 * id of the textbox's parent div ="textDiv_" + <column name>
			 * @type {Object}
			 */
			var newDivToPlaceTextBox = domConstruct.create("div", {
				id: "textDiv_" + fieldLabel
			}, parentDiv)

			/**
			 * create filter textbox
			 * @type {dijit}
			 */
			var myTextBox = new TextBox({
				/**
				 * name of the textbox="filter_" + <column name>
				 */
				name: "filter_" + fieldLabel,
				/**
				 * no or empty value!
				 */
				value: "",
				placeHolder: placeHolder,
				/**
				 * event on each change
				 */
				intermediateChanges: true
			}, newDivToPlaceTextBox);

			/**
			 * store this
			 * @type {Object}
			 */
			var This = this;

			myTextBox.watch("value", function(name, oldValue, newValue) {
				console.log(This.selection)
				indexOfSelectedItemsOfGridArr.splice(0);
				for(each in This.selection)
				{
					indexOfSelectedItemsOfGridArr.push(parseInt(each))
				}
				/**
				 * get columns name from the id of the textbox selected
				 */
				console.log(filterableTextBoxValue,this.id,'this.id',this.id.match(/_\w+/)[0].match(/[^_]\w+/)[0])
				filterableTextBoxValue = this.get("value");
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
					This.refresh();
					for(each in indexOfSelectedItemsOfGridArr)
					{
						This.select(indexOfSelectedItemsOfGridArr[each])
					}
				}, 300);

			});

		},
		/**
		 * override the Grid's renderHeader function
		 * @return {boolean}
		 */
		renderHeader: function() {
			/**
			 * instance of dGrid
			 * @type {grid}
			 */
			var grid = this

			/**
			 * set custom query function
			 */
			grid.query = this.setFilter;

			/**
			 * call parents renderHeader
			 */
			this.inherited(arguments);
			headerNode = this.headerNode

			var row = this.createFilterRowCells("th", function(th, column){
				var contentNode = column.headerNode = th;
				if(contentBoxSizing){
					// we're interested in the th, but we're passed the inner div
					th = th.parentNode;
				}
				var field = column.field;
				if(field){
					th.field = field;
				}
				// allow for custom header content manipulation
				if(column.renderHeaderCell){
					appendIfNode(contentNode, column.renderHeaderCell(contentNode));
				}else if(column.label || column.field){
					contentNode.appendChild(document.createTextNode(column.label || column.field));
				}
				if(column.sortable !== false && field && field != "_item"){
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
			this.addTextBoxToGridHeader(grid.filterFieldLabel);
		},
		createFilterRowCells: function(tag, each, subRows){
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
				tr,
				si, sl, i, l, // iterators
				subRow, column, id, extraClassName, cell, innerCell, colSpan, rowSpan; // used inside loops
			
			// Allow specification of custom/specific subRows, falling back to
			// those defined on the instance.
			subRows = subRows || this.subRows;
			for(si = 0, sl = subRows.length; si < sl; si++){
				subRow = subRows[si];
				// for single-subrow cases in modern browsers, TR can be skipped
				// http://jsperf.com/table-without-trs
				tr = put(tbody, "tr");
				if(subRow.className){
					put(tr, "." + subRow.className);
				}
				
				for(i = 0, l = subRow.length; i < l; i++){
					// iterate through the columns
					column = subRow[i];
					if(column.filterable)
					{
						id = column.id + '-filterable';
						extraClassName = column.className || (column.field && "field-" + column.field);
						cell = put(tag + (
								".dgrid-cell.dgrid-cell-padding" +
								(id ? ".dgrid-column-" + id : "") +
								(extraClassName ? "." + extraClassName : "")
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
			}
			return row;
		},
	});
});




						// var searchImageIcon = domConstruct.create("image", {
						// 	id: "imageDiv_SearchIcon",
						// 	src:"data:image/jpeg;base64,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",
						// 	class:'dijitEditorIcon'
						// }, newDivToPlaceImage);
