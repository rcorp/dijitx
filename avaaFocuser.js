define(["dojo/_base/array","dojo/dom-style"],function(array, domStyle){
	var avaaUi = {
		exceptionWidgetList:[],
		addExceptionWidget:function(widgetName){
			var _this = this;
			_this.exceptionWidgetList.push(widgetName);
		},
		removeExceptionWidget:function(widgetName){
			var _this = this;
			var index = _this.exceptionWidgetList.indexOf(widgetName); 
			if (index !== -1) {
			    var deleteElement = _this.exceptionWidgetList.splice(index, 1);
			}
		},
		// St css properties for focuser.
		mapCssProperties:function (overlayerElement,id){
			var _this = this;
		    var body = document.getElementsByTagName("body")[0]
		    var activeElement = document.activeElement;
		    var activeElementWidget = dijit.getEnclosingWidget(activeElement);
		    var activeElementWidgetDomNode=activeElementWidget.domNode;
		    
		    if(JSON.stringify(_this.exceptionWidgetList)!='[]'){
		    	array.forEach(_this.exceptionWidgetList,function(exceptionWidget){
					if(activeElementWidget.widget == exceptionWidget){
					    activeElementWidgetDomNode = activeElement;
					}
		    	})	
		    } else {
		        activeElementWidgetDomNode = activeElementWidget.domNode;   
		    }

		    overlayerElement.setAttribute("id", id);

		    var activeDomStyleProperties = activeElementWidgetDomNode.getClientRects();

		    for (var i = 0; i != activeDomStyleProperties.length; i++) {
		        var activeDomStyleProperty = activeDomStyleProperties[i];
		        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		        var overlayerElementTop = ((activeDomStyleProperty.top + scrollTop)+((activeDomStyleProperty.height - 2)/2)) + 'px';
		        var overlayerElementLeft = ((activeDomStyleProperty.left + scrollLeft)-1) + 'px';
		        var overlayerElementWidth = ((activeDomStyleProperty.width - 2)) + 'px';
		        var overlayerElementHeight = ((activeDomStyleProperty.height - 2)/2) + 'px';
		        
		        domStyle.set(overlayerElement, "top", overlayerElementTop);
		        domStyle.set(overlayerElement, "left", overlayerElementLeft);
		        domStyle.set(overlayerElement, "width", overlayerElementWidth);
		        domStyle.set(overlayerElement, "height", overlayerElementHeight);

		        domStyle.set(overlayerElement, "position", 'absolute');
		        domStyle.set(overlayerElement, "border", '2px solid blue');
		        domStyle.set(overlayerElement, "borderTop", '0px');
		        domStyle.set(overlayerElement, "zIndex", 10000);
		        domStyle.set(overlayerElement, "transition", "all 200ms ease"); 
		    }
		    body.appendChild(overlayerElement)
		},
		// Apply focuser on page.
		uiFocus:function(overlayerDiv,id){
			var _this = this;
			document.addEventListener("focus",function(){
			    _this.mapCssProperties(overlayerDiv, id);       
			},true)
		},
		// Adjust focuser on resize event.
		uiResize:function(overlayerDiv,id){
			var _this = this;
			window.addEventListener("resize",function(){
			    _this.mapCssProperties(overlayerDiv,id)       
			},true)
		},
		// ONly function to call, which will create a resizable focuser.
		makeOverLayer:function(id){
			var _this = this;
			var overlayerDiv = document.createElement("div")
			_this.uiFocus(overlayerDiv,id);
			_this.uiResize(overlayerDiv,id);
		}
	} 
	return avaaUi;
});