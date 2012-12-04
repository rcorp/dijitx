define(["dojo/_base/declare", "dojo/dom", "dojo/dom-construct", "dojo/dom-form", "dojo/query", "dijit/registry", "dijit/form/CheckBox", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/AutofillCheckBox.html"], function(declare, dom, domConstruct, domForm, query, registry, CheckBox, WidgetBase, TemplatedMixin, template) {
	return declare([CheckBox, WidgetBase, TemplatedMixin], {
		//Some string value of class.
		customClass: '',
		templateString: template,
		// id of checkbox.
		id: '',
		//Array of ids of all fields to get their value.
		sourceId: [],
		//Array of ids of all fiels in which value is set.
		targetId: [],
		onChange: function(evt) {
			if(this.checked == true) {
				if(this.sourceId && this.targetId && this.sourceId.length == this.targetId.length) {
					for(var index = 0; index < this.sourceId.length; index++) {
						var prefillValue = registry.byId(this.sourceId[index]).getValue();
						registry.byId(this.targetId[index]).setValue(prefillValue);
					}
				};
			} else {
				if(this.targetId && this.sourceId.length == this.targetId.length) {
					for(var index = 0; index < this.targetId.length; index++) {
						//Reset all fields.
						registry.byId(this.targetId[index]).setValue(' ');
					}
				};
			}
		},
		postCreate: function() {
			this.inherited(arguments);
			if(this.id) {
				this.count++;
			}
		},
		buildRendering: function() {
			this.inherited(arguments);
			if(!this.prefillcheckboxNode) {
				this.prefillcheckboxNode = this.domNode;
			}
			this.count = 0;
			this.id = 'prefillcheckbox_' + this.count;
		},
		destroy: function() {
			delete this.prefillcheckboxNode;
			this.inherited(arguments);
		}
	});
});