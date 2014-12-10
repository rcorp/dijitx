define(['dojo/_base/declare', 'dojo/_base/lang', 'dojo/dom-construct', 'dojo/dom', 'dojo/dom-style', 'dijit/_WidgetBase', 'dojo/html', 'dojo/domReady!'], 
    function(declare, lang, domConstruct, dom, domStyle, _WidgetBase, html) {
    return declare('dijitx.widget.TagWidget', _WidgetBase, {
        
        //The HTML Tag
        tag: 'div',
        
        value:'',

        hasValue: true,
        
        baseClass: 'dijitTagWidget',
        constructor: function(params, srcNodeRef) {
            var _this = this;   
            this.inherited(arguments);            
        },
        buildRendering: function () {
            this.domNode = domConstruct.create(this.tag);
            this.inherited(arguments);
        },
        _setValueAttr: function (value) {
            if (this.hasValue){
                this.domNode.innerHTML = value;
            }
        },
        _getValueAttr: function (value) {
            return this.hasValue ? this.domNode.innerHTML : undefined;
        },
        _setHasValueAttr: function (hasValue){
            if (!hasValue){
                this.set('value', undefined);
                delete this.value;
            }
        }
    })
})
