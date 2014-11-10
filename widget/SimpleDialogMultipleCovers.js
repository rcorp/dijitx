define(["dojo/_base/declare", "dojox/mobile/SimpleDialog", "dojo/dom-construct", "dojo/_base/window"], 
	function(declare, SimpleDialog, domConstruct, win){
	return declare('dijitx.widget.SimpleDialogMultipleCovers', SimpleDialog, {
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
		},
		removeCover: function(){
			//Remove the cover from the array
			this._covers.splice(this._covers.indexOf(this._cover), 1);
			// summary:
			//		Removes the transparent DIV cover.
			domConstruct.destroy(this._cover);
			this._cover = '';
		}
	})
})