define(["dojo/_base/declare", "dojo/has", "dojo/dom", "dojo/dom-attr", "dijit/form/TextBox", "dojo/dom-construct", "dojox/image", "dijit/form/CheckBox","dgrid/selector"], function(
declare, has, dom, domAttr, TextBox, domConstruct, image, CheckBox, Selector) {
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
	var AllColumnTextBoxValue = {};
	/**
	 * index of all selected rows in dGrid
	 * @type {Array}
	 */
	var indexOfSelectedItemsOfGridArr = [];

	return declare(null, {
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
				var colValue = (item[grid.filterColName] + "").toLowerCase();
				/**
				 * if atleast two characters inserted by user in each textbox then query the store
				 */
				if(AllColumnTextBoxValue[each] != "" && AllColumnTextBoxValue[each].length >= 0) {
					if(Show == undefined) {
						/**
						 * match filter string with the content of the column
						 */
						if(colValue.indexOf(AllColumnTextBoxValue[each].toLowerCase()) != -1) {
							Show = true;
						} else {
							Show = false;
						}
						if(indexOfSelectedItemsOfGridArr.indexOf(item.id) != -1)
						{
							Show = true;
						}
					} else {
						/**
						 * Logically "And" the result of each successfull match
						 */
						Show = Show && colValue.indexOf(AllColumnTextBoxValue[each].toLowerCase()) != -1;
					}
				} else {
					//	empty textbox........................
				}
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
		addTextBoxToGridHeader: function(table, parentDiv, fieldLabel)
		{

			domConstruct.place(parentDiv,table);

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
				indexOfSelectedItemsOfGridArr.splice(0);
				for(each in This.selection)
				{
					indexOfSelectedItemsOfGridArr.push(parseInt(each))
				}
				/**
				 * get columns name from the id of the textbox selected
				 */
				AllColumnTextBoxValue[this.id] = this.get("value");
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
					grid.refresh();
					for(each in indexOfSelectedItemsOfGridArr)
					{
						This.select(each)
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
				 * call parents renderHeader
				 */
				this.inherited(arguments);

				/**
				 * set custom query function
				 */
				grid.query = this.setFilter;

				/**
				 * get Div tag (parent) of Grid's Header
				 * @type {DOM element}
				 */
				var headerNodeMainDiv = grid.get('headerNode')

				/**
				 * get main Header Tag which is a table tag in this case
				 * @type {DOM element}
				 */
				var headerNode = headerNodeMainDiv.children[0];

				/**
				 * clone table tag
				 * @type {DOM element}
				 */
				var cloneTable = dojo.clone(headerNode)

				/**
				 * change cloneTable's id
				 */
				domAttr.set(cloneTable, 'id', 'filterTable')

				/**
				 * counter for each row/child in cloneTable
				 * @type {Number}
				 */
				var count = 0;

				/**
				 * process each column in grid
				 */

				var gridHeaderRow = dojo.clone(cloneTable.children[0]);
				var gridRowColumn = dojo.clone(gridHeaderRow.children[1])
				gridRowColumn.innerHTML = '';
				cloneTable.innerHTML = '';
				gridHeaderRow.innerHTML = '';
				/**
				 * place filterTable before the grid header node
				 */
				domConstruct.place(cloneTable, headerNode, 'before')
				domConstruct.place(gridHeaderRow,cloneTable);

				var gridHeaderCheckBoxRow = dojo.clone(gridHeaderRow);
				domConstruct.place(gridHeaderCheckBoxRow,cloneTable);

				this.addTextBoxToGridHeader(gridHeaderRow,dojo.clone(gridRowColumn),grid.filterFieldLabel);

			}
		},

	});
});
