define(["dojo/_base/declare", "dojo/dom", "dojo/dom-construct", "dojo/on", "dojo/query", "dojo/store/Memory", "dijit/form/FilteringSelect", "dojo/text!dijit/form/templates/DropDownBox.html"], 
	function(declare, dom, domConstruct, on, query, Memory, FilteringSelect, template){
		return declare('dijitx.widget.MultiTagBox', FilteringSelect, {

			postion: 'above',
			//templateString: template + '<div id="itemHolder"></div>'
			buildRendering: function(){
				this.inherited(arguments);
				//console.log(this)
				var itemHolder = domConstruct.create('div', {
					id:'itemHolder',
					style: 'background-color: whitesmoke; height: 100px; width: 100%; position: relative;'
				}, this.domNode);

				if(this.postion = 'above'){
					domConstruct.place(itemHolder, this.domNode, 'first');
				}else{
					domConstruct.place(itemHolder, this.domNode, 'last');
				}

				var unique=0;

				on(this, 'change', function(){
					var val = dijit.byId('stateSelect').value.trim()
					if(val==""){

					}else{
						var selectedName = domConstruct.create('div', {
							'class':'selected-item',
							style: 'background-color: lightblue; height: 21px; width: 80px; float: right; margin-top: -0.5px; margin-right: 10px; position: relative;',
							id:'selected-item-id_'+unique,
							innerHTML: this.displayedValue
						},'itemHolder');

						var destroyButton = domConstruct.create('div',{
							'class': 'itm-dstry',
							style: 'position: relative; float: right; margin-top: -6px; margin-right: 3px; font-size: 18px; cursor: pointer;',
							id: 'itm-dstry-id_'+unique,
							innerHTML: '<b>x</b>'
						},selectedName);
						dijit.byId('stateSelect').set('value', '');

						query(".itm-dstry").on('click',function(){
							var id = this.id.split('_')[1]
							var slectedNameId = dom.byId('selected-item-id_'+id);
							domConstruct.destroy(slectedNameId)
						})

						unique++;

					}
					

				})

}
});
})