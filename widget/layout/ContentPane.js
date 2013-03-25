define (['dojo/_base/declare', 'dijit/layout/ContentPane', 'dojo/dom-class'], function (declare, ContentPane, domClass) {
    return declare('dijitx.widget.layout.ContentPane', [ContentPane], {
        constructor: {
            this.inherited(arguments);
            domClass.add(this.domnode, 'dijitVisible');
        },
        hide : function () {
            domClass.replace (this.domNode, 'dijitVisible', 'dijitHidden')
        },

        show : function () {
            domClass.replace (this.domNode, 'dijitHidden', 'dijitVisible');
            this.resize();
        }
    })
})