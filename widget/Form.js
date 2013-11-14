define ([
    'dojo/_base/declare',
    "dojo/_base/array", // array.every array.filter array.forEach array.indexOf array.map
    'dijit/form/Form',
    'dojo/dom-class',
    'dojo/window',
    'dojo/_base/lang'
    ], function (declare, array, Form, domClass, win, lang) {
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
        },
        _getValueAttr: function(){
            // summary:
            //      Returns Object representing form values.   See description of `value` for details.
            // description:

            // The value is updated into this.value every time a child has an onChange event,
            // so in the common case this function could just return this.value.   However,
            // that wouldn't work when:
            //
            // 1. User presses return key to submit a form.  That doesn't fire an onchange event,
            // and even if it did it would come too late due to the defer(...) in _handleOnChange()
            //
            // 2. app for some reason calls this.get("value") while the user is typing into a
            // form field.   Not sure if that case needs to be supported or not.

            // get widget values
            var obj = { };
            array.forEach(this._getDescendantFormWidgets(), function(widget){
                var name = widget.name;
                if(!name || widget.disabled){ return; }

                // Single value widget (checkbox, radio, or plain <input> type widget)
                var value = widget.get('value');

                // Store widget's value(s) as a scalar, except for checkboxes which are automatically arrays
                if(typeof widget.checked == 'boolean'){
                    if(/Radio/.test(widget.declaredClass)){
                        // radio button
                        if(value !== false){
                            lang.setObject(name, value, obj);
                        }else{
                            // give radio widgets a default of null
                            value = lang.getObject(name, false, obj);
                            if(value === undefined){
                                lang.setObject(name, null, obj);
                            }
                        }
                    }else{
                        // checkbox/toggle button
                        var ary=lang.getObject(name, false, obj);
                        if(!ary){
                            ary=[];
                            lang.setObject(name, ary, obj);
                        }
                        if(value !== false){
                            ary.push(value);
                        }
                    }
                }else{
                    var prev=lang.getObject(name, false, obj);
                    if(typeof prev != "undefined"){
                        if(lang.isArray(prev)){
                            prev.push(value);
                        }else{
                            lang.setObject(name, [prev, value], obj);
                        }
                    }else{
                        console.log(widget.widget)
                        if(widget.widget == 'FilteringSelect') {
                            lang.setObject(widget.store.idProperty, value, obj);
                            // unique name
                            lang.setObject(name, widget.get('displayedValue'), obj);
                        } else {
                            // unique name
                            lang.setObject(name, value, obj);
                        }
                    }
                }
            });
            return obj;
        }
    })
})