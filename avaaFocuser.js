define(["dojo/_base/array"],function(array){
	var avaaUi = {
		exceptionWidgetList:[],
		addExceptionWidget:function(widgetName){
			avaaUi.exceptionWidgetList.push(widgetName);
			console.log(avaaUi.exceptionWidgetList);
		},
		removeExceptionWidget:function(widgetName){
			var index = avaaUi.exceptionWidgetList.indexOf(widgetName); 
			if (index !== -1) {
			    var deleteElement = avaaUi.exceptionWidgetList.splice(index, 1);
			    console.log(deleteElement);
			} else {
				console.log(widgetName+" is not found in list")
			}
		},
		mapCssProperties:function (overlayerElement,id){
		    var body = document.getElementsByTagName("body")[0]
		    var activeElement = document.activeElement;
		    var activeElementWidget = dijit.getEnclosingWidget(activeElement);
		    var activeElementWidgetDomNode=activeElementWidget.domNode;
		    
		    if(JSON.stringify(avaaUi.exceptionWidgetList)!='[]'){
		    	array.forEach(avaaUi.exceptionWidgetList,function(exceptionWidget){
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

		        overlayerElement.style.position = 'absolute';
		        overlayerElement.style.border = '2px solid blue';
		        overlayerElement.style.borderTop = '0px';
		        overlayerElement.style.top = ((activeDomStyleProperty.top + scrollTop)+((activeDomStyleProperty.height - 2)/2)) + 'px';
		        overlayerElement.style.left = ((activeDomStyleProperty.left + scrollLeft)-1) + 'px';
		        overlayerElement.style.width = ((activeDomStyleProperty.width - 2)) + 'px';
		        overlayerElement.style.height = ((activeDomStyleProperty.height - 2)/2) + 'px';
		        overlayerElement.style.zIndex = 10000;
		        overlayerElement.style.transition = "all 200ms ease"; 
		    }
		    body.appendChild(overlayerElement)
		},
		uiFocus:function(overlayerDiv,id){
			document.addEventListener("focus",function(){
			    avaaUi.mapCssProperties(overlayerDiv, id);       
			},true)
		},
		uiResize:function(overlayerDiv,id){
			window.addEventListener("resize",function(){
			    avaaUi.mapCssProperties(overlayerDiv,id)       
			},true)
		},
		makeOverLayer:function(id){
			var overlayerDiv = document.createElement("div")
			avaaUi.uiFocus(overlayerDiv,id);
			avaaUi.uiResize(overlayerDiv,id);
		}
	} 
	return avaaUi;
});