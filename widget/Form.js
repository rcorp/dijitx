define (['dojo/_base/declare', 'dijit/form/Form', 'dojo/dom-class', 'dojo/window', 'dojo/_base/lang'], function (declare, Form, domClass, win, lang) {
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
        save: function(data, gridId) {
            if(data && gridId){
                var obj = {};
                var formData = this.get('value')
                delete formData[gridId]
                this.store.add(lang.mixin(data,formData));
            } else{
                var formData = [];
                formData.push(this.get('value'));
                this.store.add(formData);
            }
        }
    })
})