define([/*'dojo',
    'dijit',*/
    'dojo/_base/declare', 
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
    "dojo/domReady!"], function(/*dojo, dijit,*/ declare, lang, domConstruct, dom, WidgetBase, TemplatedMixin, Player,PlayButton,VolumeButton,ProgressSlider,Status,FLVideo, Deferred, template) {
    return declare('AudioVideoWidget', [WidgetBase, TemplatedMixin], {
        //id for AspireWidget.
        id: '',
        //tag value set by user
        mediaUrl:'',
        type:'',
        media:'',
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
            this.createPlayer();
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
              controlType:"progress"
            }); 
            
            var volumeButton = new VolumeButton({
                id:this.id+'_VolumeButton',
                controlType:"volume"
            });
            
            var playButton = new PlayButton({
                id:this.id+'_PlayButton',
                controlType:"play"
            });
            
            this.player = new Player({
                id:this.id+'_Player',        
                playerWidth: "100%"
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
            this.media=media;

            this.playContainer.appendChild(playButton.domNode);
            this.controlsBottom.appendChild(volumeButton.domNode);
            this.statusContainer.appendChild(status.domNode);
            //for progress or slider bar 
            this.progressContainer.appendChild(progressSlider.domNode);
            this.mediaNode = this.media.domNode;
            this.playerScreen.appendChild(this.media.domNode);
            
            progressSlider.setMedia(this.media, this.player);
            playButton.setMedia(this.media, this.player);
            volumeButton.setMedia(this.media, this.player);
            status.setMedia(this.media, this.player);
            
            
        },

       
        startup: function() {


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
        // play: function(/* String? */newUrl){
        //     // summary:
        //     //      Plays the video. If an url is passed in, plays the new link.
        //     this.media.isPlaying = true;
        //     this.media.isStopped = false;
        //     this.media.flashMedia.doPlay(this.media._normalizeUrl(newUrl));
        // },
       
         _setMediaUrlAttr:function(value){
            this.mediaUrl=value;
           // this.play(this.mediaUrl);
            //console.log('this--',this)
            //console.log('this.media--',this.media)
            //this.media.play(this.mediaUrl)
           //console.log("uurrll",value)//this.media.set('mediaUrl',this.mediaUrl)
        }, 


        getValue: function(){
            return this.get('value');
        },
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
