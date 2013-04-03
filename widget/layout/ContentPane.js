define (['dojo/_base/declare', 'dijit/layout/ContentPane', 'dojo/dom-class', 'dojo/window'], function (declare, ContentPane, domClass, win) {
    return declare('dijitx.widget.layout.ContentPane', [ContentPane], {
        buildRendering: function () {
            this.inherited(arguments);
            domClass.add(this.domNode, 'dijitVisible');
        },
        hide : function () {
            domClass.replace (this.domNode, 'dijitHidden', 'dijitVisible');
        },
        show : function (scrollIntoView) { 
            domClass.replace (this.domNode, 'dijitVisible', 'dijitHidden')
            this.resize();
            if (scrollIntoView) {
                win.scrollIntoView(this.domNode);
            }
        }
    })
})