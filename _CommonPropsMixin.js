define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojox/mobile/ListItem",
	"dojo/_base/lang"
], function(array, declare, ListItem, lang){

	// module:
	//		dijitx/_CommonPropsMixin

	return declare("dijitx._CommonPropsMixin", {
		_commonProps: {},

		createListItem: function(/*Object*/item){
			// summary:
			//		Creates a list item widget.
			lang.mixin(item, this._commonProps);
			var props = {};
			if(!item["label"]){
				props["label"] = item[this.labelProperty];
			}

			for(var name in item){
				if (typeof item[name] == 'function'){
					props[(this.itemMap && this.itemMap[name]) || name] = item[name](item)
				}
				props[(this.itemMap && this.itemMap[name]) || name] = item[name];
			}
			return new ListItem(props);
		}
	});
});
