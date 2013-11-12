define ([
    'dojo/_base/declare',
    'dijit/form/Form',
    'dojo/dom-class',
    'dojo/window',
    'dojo/_base/lang'
    ], function (declare, Form, domClass, win, lang) {
    return declare('dijitx.widget.Form', [Form], {
        buildRendering: function () {
            this.inherited(arguments);
            domClass.add(this.domNode, 'dijitVisible');
        },
        hide: function () {
            domClass.replace (this.domNode, 'dijitHidden', 'dijitVisible');
        },
        show: function (scrollToView) { 
            domClass.replace (this.domNode, 'dijitVisible', 'dijitHidden')
            this.resize();
            if (scrollToView) {
                win.scrollToView(this.domNode);
            }
        },
        save: function(data) {
            var _this = this;
            this.store.add(data).then(function(result){
                _this.reset();
            });
        }
    })
})