// run the selenium server
// sudo java -jar selenium-server-standalone-2.37.0.jar
// run thge cmd commonr to run test 
// node node_modules/intern/bin/intern-runner config=dijitx/tests/AutofillCheckBox/functionalTest/autoFillCheckBox.js

define([
    'intern!object',
    'intern/chai!assert',
    'require',
    'dijit/registry'
], function (registerSuite, assert, require,dijitRegistry) {
    registerSuite({

         addNewRow: function () {
            // It takes the DOM node of Add New Row button which is undefined if we console it. 
            // It uses the clickElement() function to click on it.
             return this.remote
                 .get(require.toUrl('dgrid/test/editor_autosave.html'))
                 .elementById('dijit_form_Button_0')
                 .clickElement()
                 .end()
         },
         getterAndSetter: function(){
            // We can only use the DOM node and not the widget using elementById and also by dijitRegistry's
            // byId method thus we have made three buttons in html file so as to set, get and compare the set and
            // get values which changes the label of compare button to COMPARED if both are true.
            // We cannot use assert here as this DOM node is undefined so its value cannot be retrieved.
            return this.remote
                .get(require.toUrl('dgrid/test/editor_autosave.html'))
                .elementById('set')
                .clickElement()
                .end()
                .elementById('cmp')
                .clickElement()
                .end()
        }
    });
});
