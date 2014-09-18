define(['dojo/_base/declare', 
    'dojo/_base/lang', 
    'dojo/dom-construct', 
    'dojo/dom',
    'dojo/dom-style', 
    "dijit/_WidgetBase", 
    "dijit/_TemplatedMixin", 
    'dojo/html',
    "dojo/Deferred", 
    'dojo/text!./templates/AppTagWidgetTemplate.html',
    "dojo/domReady!"], function(declare, lang, domConstruct, dom, domStyle, WidgetBase, TemplatedMixin, html,Deferred, template) {
    return declare('AppTagWidget', [WidgetBase, TemplatedMixin], {
        //id for AspireWidget.
        id: '',
        //tag get by user and used by templete
        tag:'',
        style:'',
        //tag value set by user
        value:'',
        propertyDom:{},
        //Some string value of class.
        baseClass: 'appTagWidget',
        templateString: '',
        constructor: function(param) {
            attr='',
            this.id ='';
            this.createWidget();
        },
        createWidget: function() {
            this.templateString = template;
        },
        postCreate: function() {
            this.inherited(arguments);
        },
        buildRendering: function() {
           this.inherited(arguments);
            if (!this.widgetNode) {
                this.widgetNode = this.domNode;
            }
        },
        startup: function() {

           console.log('startup')
           // this.hreff = "href="+this.url;
           
          
             // summary:
            //      Call startup() on all children including non _Widget ones like dojo/dnd/Source objects

            // This starts all the widgets
            this.inherited(arguments);

            // And this catches stuff like dojo/dnd/Source
            if (this._contentSetter) {
                array.forEach(this._contentSetter.parseResults, function(obj) {
                    if (!obj._started && !obj._destroyed && lang.isFunction(obj.startup)) {
                        obj.startup();
                        obj._started = true;
                    }
                }, this);
            }
        },
        /**
         * funtion to get the value of the widget ie tag value
         */
        getValue: function(){
            return this.get('value');
        },
        _getValueAttr:function(value){
            this.value=value;
        },
        _setValueAttr:function(value){
            this.value=value;

            html.set(this.valueNode,this.value)
        },
        _getTagAttr:function(value){
            return this.tag;
        },
        _setTagAttr:function(value){
            this.tag=value;
        },_getIdAttr:function(value){
            return this.id;
        },
        _setIdAttr:function(value){
            this.id=value;
        },
         _setPropertyDomAttr:function(value){
            var _this=this;
            _this.propertyDom=value;
            for(each in value){
                _this.valueNode.setAttribute(each,value[each])
            }
        },
        _getPropertyDomAttr:function(){
            return this.propertyDom;
        },
         _setStyleAttr:function(value){
            var _this=this;
            _this.style=value;
            domStyle.set(this.parentNode,_this.style)
            /*for(each in value){
                _this.valueNode.setAttribute(each,value[each])
            }*/
        },
        _getStyleAttr:function(){
            return this.style;
        },
        /**
         * funtion to refresh the widget to effect the value same as startup
         */
        /*refresh: function() {

            html.set(this.valueNode, this.value)
            //this._set(this.tag,this.value)
        },*/
        getWidgetValue: function() {
            var result = this.getValue();
            return result;
        },
        /*addTag: function(tag, options, placeAt) {
            if ((typeof tag && typeof placeAt == "String") && (typeof options == 'Object')) {
                domConstruct(tag, options, placeAt)
            } else {
                console.log("error")
            }
        },*/
        addChild: function(widget, insertIndex) {
            var refNode = this.widgetNode.children[0];
            if (insertIndex && typeof insertIndex == "number") {
                var children = this.getChildren();
                if (children && children.length >= insertIndex) {
                    refNode = children[insertIndex - 1].domNode;
                    insertIndex = 'after';
                }
            }
            domConstruct.place(widget.domNode, refNode, insertIndex);
            widget.startup();
        },
        removeChild: function( /*Widget|integer*/ widget) {
            if (typeof widget == "number") {
                widget = this.getChildren()[widget];
            }

            if (widget) {
                var node = widget.domNode;
                if (node && node.parentNode) {
                    node.parentNode.removeChild(node); // detach but don't destroy
                }
            }
        },
        destroy: function() {
            delete this.widgetNode;
            this.inherited(arguments);
        }
    }) //End of Delcare
}) //End of Define
