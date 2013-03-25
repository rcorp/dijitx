define (['dojo/_base/declare', 'dijit/layout/ContentPane', 'dojo/dom-class'], function (declare, ContentPane, domClass) {
    return declare('dijitx.widget.layout.ContentPane', [ContentPane], {
        buildRendering: function () {
            this.inherited(arguments);
            domClass.add(this.domNode, 'dijitVisible');
        },
        hide : function () {
            domClass.replace (this.domNode, 'dijitHidden', 'dijitVisible');
        },
        show : function () {
            domClass.replace (this.domNode, 'dijitVisible', 'dijitHidden')
            this.resize();
        }
    })
})