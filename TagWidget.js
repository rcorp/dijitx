define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/Fieldset.html"], function(declare, domConstruct, query, WidgetBase, TemplatedMixin, template) {
	return declare([WidgetBase, TemplatedMixin], {
		tag: 'div',
		templateString: '',
		postCreate: function() {
			this.inherited(arguments);
		},
		buildRendering: function() {
			this.inherited(arguments);
		}
	});
});