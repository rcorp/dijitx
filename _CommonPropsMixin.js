define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojox/mobile/ListItem",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/_base/lang",
	"dojox/mobile/ProgressIndicator"
], function(array, declare, ListItem, domConstruct, domAttr, lang, ProgressIndicator){

	// module:
	//		dijitx/_CommonPropsMixin

	return declare(null, {
		_commonProps: {},

		emptyMessage: '',

		createListItem: function(/*Object*/item){
			// summary:
			//		Creates a list item widget.
			
			if (item){
				item = lang.mixin(this._commonProps, item);
			}
			var props = {};
			if(!item["label"]){
				props["label"] = item[this.labelProperty];
			}	

			for(var name in item){
				//Incase item is a filterfunction
				if (typeof item[name] == 'function'){
					
					//Execute the filter function and value of item
					//would be the return value of the function.
					props[(this.itemMap && this.itemMap[name]) || name] = item[name](item)
				}
				else {
					props[(this.itemMap && this.itemMap[name]) || name] = item[name];	
				}
			}
			var _listItem = new ListItem(props)
			if(this.get('iconNew')) {
				var _this = this;
				setTimeout(function() {
					var _dom = domConstruct.create('span')
					domAttr.set(_dom, 'class', _this.get('iconNew'))
					// console.log(_listItem.domNode.children[1])
					domConstruct.place(_dom, _listItem.domNode.children[1], "first")
				}, 100)
			}
			// console.log('image', _listItem)
			return _listItem;
		},

		progressIndicator : new ProgressIndicator(),

		refresh: function () {

			//Hide the List and start the loading screen
			this.domNode.style.visibility = "hidden";

			//Attach the Progress Indicator (Golu) to the List's parent via DOM
			this.getParent().domNode.appendChild(this.progressIndicator.domNode);
			this.progressIndicator.start();

			//Call the actual refresh function
			this.inherited(arguments);
		},

		onComplete: function () {
			var _this = this;
			
			//Remove the Progress Indicator
			this.progressIndicator.stop();

			//Show the list again!
			this.domNode.style.visibility = "visible";

			this.inherited(arguments)

			//If there are no children and an empty message is defined
			if ((this.getChildren().length == 0) && this.emptyMessage) {
				this.addChild(new ListItem({
					label: _this.emptyMessage
				}))
			}


		}
	});
});
