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
        save: function(data) {
            if(data){
                var formData = this.get('value')
                for(var each in formData){
                    for(var i = 0; i < data.length; i++){
                        if(each != 'undefined')
                            lang.setObject(each, formData[each], data[i]);
                    }
                }
                this.store.add(data);
            } else{
                var formData = [];
                formData.push(this.get('value'));
                this.store.add(formData);
            }
        }
    })
})