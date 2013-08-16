define(['dojo/_base/declare', 
    'dojo/_base/lang', 
    'dojo/dom-construct', 
    'dojo/dom', 
    "dijit/_WidgetBase", 
    "dijit/_TemplatedMixin", 
    'dojox/av/widget/Player',
    'dojox/av/widget/PlayButton',
    'dojox/av/widget/VolumeButton',
    'dojox/av/widget/ProgressSlider',
    'dojox/av/widget/Status',
    'dojox/av/FLVideo',
    "dojo/Deferred", 
    'dojo/text!./templates/AuidoVideoWidgetTemplate.html',
    "dojo/domReady!"], function(declare, lang, domConstruct, dom, WidgetBase, TemplatedMixin, Player,PlayButton,VolumeButton,ProgressSlider,Status,FLVideo, Deferred, template) {
    return declare('AudioVideoWidget', [WidgetBase, TemplatedMixin], {
        //id for AspireWidget.
        id: '',
        //tag value set by user
        mediaUrl:'',
        type:'',
        //Some string value of class.
        baseClass: 'AudioVideoWidget',
        templateString: '',
        constructor: function() {
            this.id ='';
            this.createWidget();
        },
        createWidget: function() {
            this.templateString = template;
        },
        postCreate: function() {0
            this.inherited(arguments);
        },
        buildRendering: function() {
           this.inherited(arguments);
            if (!this.widgetNode) {
                this.widgetNode = this.domNode;
            }
        },

        createPlayer: function(){
            var status = new Status({
                id:this.id+'_Status',
                controlType:"status"  
            });

            var progressSlider = new ProgressSlider({
              id:this.id+'_ProgressSlider',
              controlType:"play"
            }); 
            
            var volumeButton = new VolumeButton({
                id:this.id+'_VolumeButton',
                controlType:"volume"
            });
            
            var playButton = new PlayButton({
                id:this.id+'_PlayButton',
                controlType:"play"
            });
            

            var media = new FLVideo({
                initialVolume:.7,
                controlType:'video',
                mediaUrl:this.mediaUrl,
                autoPlay:true,
                isDebug:"false",
                allowFullScreen:this.allowFullScreen|| false,
                id:this.id+'_Video'
            });

            var player = new Player({
                id:this.id+'_Player',        
                playerWidth: "100%"
            });

            // player.addChild(media);
            // player.addChild(progressSlider);
            // player.addChild(status);
            // player.addChild(playButton);
            // player.addChild(volumeButton);
            var playerDomNode = player.domNode;
            this.domNode.appendChild(playerDomNode)
            playerDomNode.appendChild(media.domNode);
            playerDomNode.appendChild(playButton.domNode);
            playerDomNode.appendChild(volumeButton.domNode);
            playerDomNode.appendChild(progressSlider.domNode);
            playerDomNode.appendChild(status.domNode);
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
        },
        /**
         * funtion to get the value of the widget ie tag value
         */
        getValue: function(){
            return this.get('value');
        },
        /*_getValueAttr:function(value){
            this.value=value;
        },
        _setValueAttr:function(value){
            this.value=value;
            html.set(this.valueNode,value)
        },*/
        /**
         * funtion to refresh the widget to effect the value same as startup
         */
        /*refresh: function() {

            html.set(this.valueNode, this.value)
            //this._set(this.tag,this.value)
        },*/
        /*getWidgetValue: function() {
            var result = this.getValue();
            return result;
        },*/
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
