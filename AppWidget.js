define(
['dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom',
    'dijit/_WidgetBase', 
    'dijit/_TemplatedMixin',
    'dojo/html',
    'dojo/text!./templates/AppWidgetTemplate.html'
],function(declare, lang, domConstruct,dom,WidgetBase, TemplatedMixin,html,template){
   return declare('AppWidget',[WidgetBase, TemplatedMixin],{
        //id for AspireWidget.
        id: '',
        //Some string value of class.
        

        
        baseClass:'myWidget',
        tag:'',
        templateString: '',
        constructor:function(tag,id){
            this.tag=tag;
            this.id=id;
            this.createWidget();
        },
        createWidget:function(){
            this.templateString=template;
        },

        postCreate: function() {
            this.inherited(arguments);
        },
        buildRendering: function() {
            this.inherited(arguments);
            if(!this.widgetNode) {
                this.widgetNode = this.domNode;
            }
        },
        startup: function(){
            // summary:
            //      Call startup() on all children including non _Widget ones like dojo/dnd/Source objects

            // This starts all the widgets
            this.inherited(arguments);

            // And this catches stuff like dojo/dnd/Source
            if(this._contentSetter){
                array.forEach(this._contentSetter.parseResults, function(obj){
                    if(!obj._started && !obj._destroyed && lang.isFunction(obj.startup)){
                        obj.startup();
                        obj._started = true;
                    }
                }, this);
            }
        },
        set:function(value){
            html.set(dom.byId(this.domNode), value)
            this._set(attr,value);
        },
        getWidgetValue:function(){
            var result=this.getValue();
            return result;
        },
        addTag:function(tag,options,placeAt){
            if((typeof tag && typeof placeAt=='String')&&(typeof options=='Object')){
               domConstruct(tag,options,placeAt)
            } else {
                console.log('error')
            }   
        },
        addChild: function(widget, insertIndex) {
            var refNode = this.widgetNode.children[0];
            if(insertIndex && typeof insertIndex == 'number') {
                var children = this.getChildren();
                if(children && children.length >= insertIndex) {
                    refNode = children[insertIndex - 1].domNode;
                    insertIndex = 'after';
                }
            }
            domConstruct.place(widget.domNode, refNode, insertIndex);
            widget.startup();
        },
        removeChild: function( /*Widget|integer*/ widget) {
            if(typeof widget == 'number') {
                widget = this.getChildren()[widget];
            }

            if(widget) {
                var node = widget.domNode;
                if(node && node.parentNode) {
                    node.parentNode.removeChild(node); // detach but don't destroy
                }
            }
        },
        destroy: function() {
            delete this.widgetNode;
            this.inherited(arguments);
        }
    })//End of Delcare
})//End of Define