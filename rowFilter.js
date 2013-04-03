define(["dojo/_base/declare", "dojo/has", "dojo/dom", "dojo/dom-attr", "dijit/form/TextBox", "dojo/dom-construct"], function(
declare, has, dom, domAttr, TextBox, domConstruct) {
	/*
	 *	Row Filter plugin for dgrid
	 *	Originally contributed by RCorp(Ramanan Corporation, India) 2013-01-2
	 *
	 *  A dGrid plugin that attaches dojo textboxes just above each column of the dGrid
	 *  to search and filter dGrids row(s) by entering some filterable string in the textboxes
	 *  provided. Logically AND operation result of the values entered in each textboxes is
	 *  performed by quering store and only filtered rows are displayed on the grid.
	 *
	 *	A dGrid plugin that attaches a menu to a dgrid, along with a way of opening it,
	 *	that will allow you to show and hide columns.  A few caveats:
	 *
	 */

	/**
	 * object to store values of each textbox.
	 *
	 * eg: Lets take a grid having three columns and three textboxes for filtering of each column
	 * Let's take columns as col1, col2, col3.
	 *
	 * when a new textbox is created for a column a new field is aded to the object "AllColumnTextBoxValue"
	 * as name of the column which will store the value entered by the user to filter grid as...
	 *
	 * AllColumnTextBoxValue[col1] = '', AllColumnTextBoxValue[col2] = '' etc.
	 *
	 * whenever watch gets triggered on particular textbox, column name is extracted from its id and
	 * its value is added to this Object "AllColumnTextBoxValue" as...
	 *
	 * AllColumnTextBoxValue[<column name>] = this.get("value")
	 *
	 * dummy data entries by user:
	 * AllColumnTextBoxValue[col1] = "va"		//"va" of "valueDummy" for col1
	 * AllColumnTextBoxValue[col2] = "textD"	//"te" of "textDummy" for col2
	 *
	 * @type {Object}
	 */
	var AllColumnTextBoxValue = {}

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
				var colValue = (item[each] + "").toLowerCase();
				/**
				 * if atleast two characters inserted by user in each textbox then query the store
				 */
				if(AllColumnTextBoxValue[each] != "" && AllColumnTextBoxValue[each].length >= 2) {
					if(Show == undefined) {
						/**
						 * match filter string with the content of the column
						 */
						if(colValue.indexOf(AllColumnTextBoxValue[each].toLowerCase()) != -1) {
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
					//	console.log('empty textbox........................')
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
			 * to set Delay between searches
			 * @type {Number}
			 */
			var timeoutId = 0;

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

			for(each in grid.columns) {
				/**
				 * place filterTable before the grid header node
				 */
				domConstruct.place(cloneTable, headerNode, 'before')
				/**
				 * set placeHolder for each textbox
				 * @type {String}
				 */
				var placeHolder = 'filter by ' + each;
				/**
				 * clear innerHTML of each row in filterTable
				 */
				cloneTable.children[count].innerHTML = null;

				/**
				 * create a a parent div for each filter textbox
				 * id of the textbox's parent div ="textDiv_" + <column name>
				 * @type {Object}
				 */
				var newDivToPlaceTextBox = domConstruct.create("div", {
					id: "textDiv_" + each
				}, cloneTable.children[count])

				/**
				 * incremenet counter to get next column
				 */
				count++;

				/**
				 * create filter textbox
				 * @type {dijit}
				 */
				var myTextBox = new dijit.form.TextBox({
					/**
					 * name of the textbox="filter_" + <column name>
					 */
					name: "filter_" + each,
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
				 * make a field in object with the name of column (fetched from each) given in grid's
				 * structure which willstore the value entered by the user in the textbox placed above
				 * the column (each) as a filtering value. Initially value entered by the user is empty
				 */
				AllColumnTextBoxValue[each] = '';
				/**
				 * store this
				 * @type {Object}
				 */
				var This = this;

				/**
				 * set a watch on each textbox which gets trigger whenever there is a change in the value
				 * of the textbox
				 * @param  {string} name
				 * @param  {String} oldValue  textbox previous value
				 * @param  {String} newValue  textbox new value
				 */
				myTextBox.watch("value", function(name, oldValue, newValue) {

					/**
					 * get columns name from the id of the textbox selected
					 */
					AllColumnTextBoxValue[this.id.match(/_\w+/)[0].match(/[^_]\w+/)[0]] = this.get("value");
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
					}, 300);
				});

			}
		},

	});
});