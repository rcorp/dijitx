define(["dojo/_base/lang","dojo/_base/declare", "dojo/dom-class", "dojo/dom-construct", 
		"dojo/_base/array", "dojo/dom-prop", "dojo/dom-style", "dijit/_WidgetBase", "dijit/layout/_LayoutWidget","dojo/domReady!"],
function(lang,declare, domClass, domConstruct, arrayUtil, domProp, domStyle, _WidgetBase, _LayoutWidget){

// summary:
	// A container that lays out its child widgets in a responsive grid layout.
	// description:
	// The ResponsiveGridContainer lays out child widgets in a responsive grid layout.
	// Each widget can specify a "label" or a "title" parameter.
	// The number of columns is configured using the "cols" attribute.
	// example:
	// <div dojoType="dijitx.ResponsiveContainer" cols="3>
	// <div dojoType="dijit.form.TextInput" value="John" label="First Name:"></div>
	// <div dojoType="dijit.form.CheckBox" label="Is Student?:"></div>
	// <div dojoType="dojox.form.DateTextBox" label="Date Of Birth:"></div>
	// </div>
var ResponsiveGridContainer = declare("ResponsiveGridContainer", _LayoutWidget, {

	// Specifies the number of columns in the grid layout.
	cols: 12,

	// customClass: String
	// A CSS class that will be applied to child elements.  For example, if
	// the class is "myClass", the table will have "myClass-table" applied to it,
	// each label TD will have "myClass-labelCell" applied, and each
	// widget TD will have "myClass-valueCell" applied.
	customClass: "",

	constructor: function(){
		this.inherited(arguments);
		this.rows = [];
	},
	
	postCreate: function(){
		this.inherited(arguments);
		this._children = [];
	
		// If the orientation, customClass or cols attributes are changed,
		// layout the widgets again.	
		this.connect(this, "set", function(name, value){
			if(value && (name == "orientation" || name == "customClass" || name == "cols")) {
				this.layout();
			}
		});
	},

	startup: function() {
		if(this._started) {
			return;
		}
		this.inherited(arguments);
		if(this._initialized) {
			return;
		}
		var children = this.getChildren();
		if(children.length < 1) {
			return;
		}
		this._initialized = true;

		domClass.add(this.domNode, "dijitTableLayout");
		
		// Call startup on all child widgets
		arrayUtil.forEach(children, function(child){
			if(!child.started && !child._started) {
				child.startup();
			}
		});
		this.layout();
		this.resize();
	},

	resize: function(){

		// summary:
		// Resizes all children.  This widget itself
		// does not resize, as it takes up 100% of the
		// available width.
		arrayUtil.forEach(this.getChildren(), function(child){
			if(typeof child.resize == "function") {
				child.resize();
			}
		});
	},

	// summary:
	// Lays out the child widgets.
	layout: function(){
		if(!this._initialized){
			return;
		}
		var children = this.getChildren();
		var childIds = {};
		var _this = this;
		function addCustomClass(node, type, count) {
			if(_this.customClass != "") {
				var lowerCaseClass = _this.customClass+ "-" + (type || node.tagName.toLowerCase());
				domClass.add(node, lowerCaseClass);
				if(arguments.length > 2) {
					domClass.add(node, lowerCaseClass + "-" + count);
				}
			}
		}

		// Find any new children that have been added since the last layout() call
		arrayUtil.forEach(this._children, lang.hitch(this, function(child){
			childIds[child.id] = child;
		}));

		arrayUtil.forEach(children, lang.hitch(this, function(child, index){
			if(!childIds[child.id]) {
				
				// Add pre-existing children to the start of the array
				this._children.push(child);
			}
		}));

		//Create a parent container div within which new rows along with the responsive columns will be added and
		//add this parent container div to the existing domNode
		var containerDiv = domConstruct.create("div",{ 
			"class":"container-fluid"
		});
		this.domNode.appendChild(containerDiv);
		this.rows.push(domConstruct.create("div", {
			"class":"row"
		}, containerDiv));
		
		arrayUtil.forEach(this._children, lang.hitch(this, function(child, index){
			
			//Checks if a new row should be added or not; it is added if the number of rows made so far does not equal the row index
			var remainingRows = child.rows - this.rows.length;
			if(remainingRows > 0){
				for (var i = 0; i < remainingRows; i++){
					this.rows.push(domConstruct.create("div", {
						"class":"row"
					}, containerDiv))					
				}			
			}

			//In each row add responsive columns
			var columnRow = domConstruct.create("div", {
				"class": child.cols || ("col-md-" + this.cols),
				"id": this.id + "-col-md-" + index
			}, this.rows[child.rows - 1]);

			columnRow.appendChild(child.domNode);

		}));
		
		if(this.containerDiv)	 {
			this.containerDiv.parentNode.removeChild(this.table);
		}

		// Refresh the layout of any child widgets, allowing them to resize
		// to their new parent.
		arrayUtil.forEach(children, function(child){
			if(typeof child.layout == "function") {
				child.layout();
			}
		});
		this.resize();
	},
	
	// summary:
	// Destroys all the widgets inside this.containerNode,
	// but not this widget itself
	destroyDescendants: function(/*Boolean*/ preserveDom){
		arrayUtil.forEach(this._children, function(child){ child.destroyRecursive(preserveDom); });
	}
});

	// summary:
	// Properties to be set on children of TableContainer
ResponsiveGridContainer.ChildWidgetProperties = {
	cols: '',
	rows: 0
};

// Add to widget base for benefit of parser.
lang.extend(_WidgetBase, /*===== {} || =====*/ ResponsiveGridContainer.ChildWidgetProperties);

return ResponsiveGridContainer;
});
