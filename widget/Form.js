define (['dojo/_base/declare', 'dijit/form/Form', 'dojo/dom-class', 'dojo/window'], function (declare, Form, domClass, win) {
    return declare('dijitx.widget.Form', [Form], {
        buildRendering: function () {
            this.inherited(arguments);
            domClass.add(this.domNode, 'dijitVisible');
        },
        hide : function () {
            domClass.replace (this.domNode, 'dijitHidden', 'dijitVisible');
        },
        show : function (scrollToView) { 
            domClass.replace (this.domNode, 'dijitVisible', 'dijitHidden')
            this.resize();
            if (scrollToView) {
                win.scrollToView(this.domNode);
            }
        },
        save:function() {
            this.store.add(this.get('value'));
        }
    })
})