define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojox/mobile/ListItem",
	"dojo/_base/lang"
], function(array, declare, ListItem, lang){

	// module:
	//		dijitx/_CommonPropsMixin

	return declare(null, {
		_commonProps: {},

		createListItem: function(/*Object*/item){
			// summary:
			//		Creates a list item widget.
			
			if (item){
				item = lang.mixin(this._commonProps, item);
			}
			console.log ('item is', item);
			var props = {};
			if(!item["label"]){
				props["label"] = item[this.labelProperty];
			}	

			for(var name in item){
				if (typeof item[name] == 'function'){
					//props[(this.itemMap && this.itemMap[name]) || name] = item[name](item)
				}
				else {
					props[(this.itemMap && this.itemMap[name]) || name] = item[name];	
				}
			}
			return new ListItem(props);
		}
	});
});
