define(["dojo/_base/declare", "dojox/mobile/SimpleDialog", "dojo/dom-construct"], 
	function(declare, SimpleDialog, domConstruct){
	return declare(null, SimpleDialog, {
		_cover: '',
		_covers: [],
		addCover: function(){
			// summary:
			//		Adds the transparent DIV cover.
			if(!this._cover){
				if (this._covers.length){
					var zIndex = this._covers[this._covers.length-1].style.zIndex
				}
				else{
					var zIndex = 99;
				}

				this._cover = domConstruct.create("div", {
					className: "mblSimpleDialogCover",
					id: this.id + 'Cover',
					style:{
						zIndex: zIndex + 2
					}
				}, win.body());
				this.domNode.style.zIndex = zIndex + 3;
				this._covers.push(this._cover)
			}else{
				this._cover.style.display = "";
			}

			if(has("windows-theme")) {
				// Hack to prevent interaction with elements placed under cover div.
				this.own(on(this._cover[0], touch.press, function() {}));
			}
		},
		removeCover: function(){
			// summary:
			//		Removes the transparent DIV cover.
			this._cover.style.display = "none";
		}
	})
})