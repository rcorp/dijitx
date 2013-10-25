define(["dojo/_base/declare",
 "dijit/form/Button"],
function(declare, Button){
	
	return declare(null, {
		addMoreButton:'',
		postCreate: function(){
			// Overrides `dijit/_TemplatedMixin/buildRendering`

			this.inherited(arguments);
			this.addMoreButton = new Button({
				label:'+'
			});
			var _this = this;
			this.on('change', function() {
				_this.showAddMore();
			})
			this.on('active', function() {
				_this.showAddMore();
			})
		},
		showAddMore:function() {
			this.addMoreButton.placeAt(this.domNode, 'after')
		}
	});
});
