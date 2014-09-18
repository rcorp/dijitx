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
    return declare('LabelWidget', [WidgetBase, TemplatedMixin], {
        //id for AspireWidget.
        id: '',
        //tag get by user and used by templete
        tag:'',
        //tag value set by user
        value:'',
        propertyDom:{},
        idProperty:'',
        displayedValue:'',
        //Some string value of class.
        baseClass: 'labelWidget',
        templateString: '',
        constructor: function() {
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
            this.valueNode.setAttribute('style',"display:block")
        },
        /**
         * funtion to get the value of the widget ie tag value
         */
        getValue: function(){
            return this.value;
        },
       /* _getValueAttr:function(value){
            console.log(value)
            return this.value;
        },*/
        _setValueAttr:function(value){
            this.value=value;
            
        },
        _setDisplayedValueAttr:function(value){
            this.displayedValue=value;
            console.log(this.displayedValue)
            html.set(this.valueNode,this.displayedValue)
            console.log(this.displayedValue)
        },
        reset: function() {
            // this.set('displayedValue',"")
            // this.set('value',"")
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
