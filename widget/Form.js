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
        save: function(data, gridId) {
            var _this = this;
            if(data && gridId){
                var formData = this.get('value');
                delete formData[gridId]
                _this.store.add(lang.mixin(data,formData)).then(function(result){
                    _this.reset();
                });
            } else{
                var formData = [];
                formData.push(this.get('value'));
                _this.store.add(formData).then(function(result){
                    _this.reset();
                });
            }
        }
    })
})