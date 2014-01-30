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
				if(this.sourceId && this.targetId && this.compareArrayLength(this.sourceId, this.targetId)) {
					for(var index = 0; index < this.sourceId.length; index++) {
						var prefillValue = registry.byId(this.sourceId[index]).getValue();
						registry.byId(this.targetId[index]).setValue(prefillValue);
					}
				}
				else {
					console.error("sourceId and targetId are not of equal length.")
				}
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
		},
		buildRendering: function() {
			this.inherited(arguments);
			if(!this.prefillcheckboxNode) {
				this.prefillcheckboxNode = this.domNode;
			}
		},
		destroy: function() {
			delete this.prefillcheckboxNode;
			this.inherited(arguments);
		},
		_setSourceIdAttr:function(value){
			var check = this.isInstanceArray(value);
			if(check){
				this.sourceId = value;
			}
			else {
				console.error("sourceId passed is not a valid type of Array")
			}
		},
		_setTargetIdAttr:function(value){
			var check = this.isInstanceArray(value);
			if(check){
				this.targetId = value;
			}
			else {
				console.error("targetId passed is not a valid type of Array")
			}
		},
		isInstanceArray:function(arr){
			return (arr instanceof Array);
		},
		compareArrayLength:function(sourceIdArr, targetIdArr){
			if(this.isInstanceArray(sourceIdArr) && this.isInstanceArray(targetIdArr)){
				if(sourceIdArr.length==targetIdArr.length){
					
					return true;
				}
				else{
					return false;
				}
			}
			else {
				return false;
			}
		},
		_getSourceIdAttr:function(){
			return(this.sourceId);
		},
		_getSourceIdAttr:function(){
			return(this.sourceId); 
		},

	});
});