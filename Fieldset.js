define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/Fieldset.html"], function(declare, domConstruct, query, WidgetBase, TemplatedMixin, template) {
	return declare([WidgetBase, TemplatedMixin], {
		//Some value to map legend of fieldset. 
		legend: '',
		id: '',
		//Some string value of class.
		customClass: '',
		templateString: template,
		postCreate: function() {
			this.inherited(arguments);
		},
		buildRendering: function() {
			this.inherited(arguments);
			if(!this.fieldsetNode) {
				// all widgets with descendants must set fieldsetNode
				this.fieldsetNode = this.domNode;
			}
		},
		addChild: function(widget, insertIndex) {
			var refNode = this.fieldsetNode.children[0];
			if(insertIndex && typeof insertIndex == "number") {
				var children = this.getChildren();
				if(children && children.length >= insertIndex) {
					refNode = children[insertIndex - 1].domNode;
					insertIndex = "after";
				}
			}
			domConstruct.place(widget.domNode, refNode, insertIndex);
			widget.startup();
		},
		removeChild: function( /*Widget|integer*/ widget) {
			if(typeof widget == "number") {
				widget = this.getChildren()[widget];
			}

			if(widget) {
				var node = widget.domNode;
				if(node && node.parentNode) {
					node.parentNode.removeChild(node); // detach but don't destroy
				}
			}
		},
		destroy: function() {
			delete this.fieldsetNode;
			this.inherited(arguments);
		}
	});
});