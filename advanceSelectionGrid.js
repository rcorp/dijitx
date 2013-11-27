define(["dojo/_base/declare", "dojo/html", "dojo/topic", "dojo/has", "dojo/dom", "dojo/dom-attr", "dojo/dom-construct", "dijit/form/Button", "put-selector/put","dojo/on"], function(
declare, html, topic, has, dom, domAttr, domConstruct, Button, put, on) {
	/*
	 *	Advance Row Selection plugin for dgrid
	 *	Originally contributed by RCorp(Ramanan Corporation, India) 2013-11-27
	 *
	 */

	var invalidClassChars = /[^\._a-zA-Z0-9-]/g;
	var contentBoxSizing = has("ie") < 8 && !has("quirks");
	return declare(null, {
		constructor: function() {

		},
		/**
		 * override the Grid's renderHeader function
		 * @return {boolean}
		 */
		renderHeader: function() {
			this.inherited(arguments);
			console.log('extension')
			headerNode = this.headerNode

			var row = this.createButtonRowCells("th", function(th, column) {
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
					// appendIfNode(contentNode, column.renderHeaderCell(contentNode));
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

			var tBody = row.children[0];
			// first Cell
			this.addSelectAllButtonToGridHeader(tBody.children[0]);
			// second Cell
			this.addSelectNoneButtonToGridHeader(tBody.children[1]);
			// third Cell
			this.addSelectInverseButtonToGridHeader(tBody.children[2]);
			// place row on top of the hedader-node
			domConstruct.place(row, headerNode, 0);
		},
		createButtonRowCells: function(tag, each, subRows) {
			var columns = this.columns,
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
		addSelectAllButtonToGridHeader: function(parentDiv) {
			var _this = this;
			/**
			 * create filter textbox
			 * @type {dijit}
			 */
			var selectAll = new Button({
		        label:"Select All",
		    });
		    selectAll.on('click', function(evt) {
		    	_this.selectAll();
		    	topic.publish('dgrid/selectAll/button', evt)
		    })
		    parentDiv.appendChild(selectAll.domNode)
		},
		addSelectNoneButtonToGridHeader: function(parentDiv) {
			var _this = this;
			/**
			 * create filter textbox
			 * @type {dijit}
			 */
			var selectNone = new Button({
		        label:"Select None",
		    });
		    selectNone.on('click', function(evt) {
		    	_this.clearSelection();
		    })
		    parentDiv.appendChild(selectNone.domNode)
		},
		addSelectInverseButtonToGridHeader: function(parentDiv) {
			var _this = this;
			/**
			 * create filter textbox
			 * @type {dijit}
			 */
			var selectInverse = new Button({
		        label:"Select Inverse",
		    });
		    parentDiv.appendChild(selectInverse.domNode)
		}
	});
});
