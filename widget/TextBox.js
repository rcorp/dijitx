require(['dojo/_base/lang', 'dojo/_base/declare', 'dijit/form/TextBox', 'dojo/dom-class'], function (lang, declare, TextBox, domClass) {
	TextBox.extend({
		//Adds a dijitValueFilled CSS Class for textboxes whose values are filled.
		//Removes it when values are empty again
		//Instead of creating our own event, we have simply hooked up to
		//_updatePlaceHolder which is called on value change and keystrokes.
		_updatePlaceHolder: function() {
			this.textbox.value ? domClass.add(this.domNode, 'dijitValueFilled'): domClass.remove(this.domNode, 'dijitValueFilled');
			this.inherited(arguments);
		}
	});
})