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
			// this.on('change', function() {
			// 	_this.showAddMore();
			// })
			// this.on('active', function() {
			// 	_this.showAddMore();
			// })
		},
		showAddMore:function() {
			this.addMoreButton.placeAt(this.domNode, 'after')
		},
		reset: function() {
			var obj = dojo.clone(this.query);
			obj[this.searchAttr] = '';
			obj[this.store.idProperty] = null;
			this.set('item', obj);
			this.item=null;
			this.textbox.value = "";
   			this.valueNode.value = "";
		},
		_openResultList: function(/*Object*/ results, /*Object*/ query, /*Object*/ options){
			var obj = {};
			for(each in query) {
				if(each.indexOf('_pk') != -1) {
					obj[each] = 0;
				} else {
					obj[each] = 'select';
				}
			}
			results.splice(0,0,obj);
			this.inherited(arguments);
		}
	});
});
