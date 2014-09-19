define([
	"dojo/_base/declare",
	"dojox/mobile/EdgeToEdgeStoreList",
	"../_CommonPropsMixin"
], function(declare, EdgeToEdgeStoreList, _CommonPropsMixin){

	// module:
	//		dijitx/widget/EdgeToEdgeStoreListCommonProps

	return declare("dijitx.widget.EdgeToEdgeStoreListCommonProps", [EdgeToEdgeStoreList, _CommonPropsMixin],{
		// summary:
		//		A dojo/store-enabled version of EdgeToEdgeList.
		// description:
		//		EdgeToEdgeStoreList is an enhanced version of EdgeToEdgeList. It
		//		can generate ListItems according to the given dojo/store store.
	});
});
