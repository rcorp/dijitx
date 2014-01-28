// COMMOND TO RUN ON BROWSER
// OPEN CHEOME 
// THEN TYPE 
// http://localhost/aspire/js/lib/node_modules/intern/client.html?config=dijitx/tests/AutofillCheckBox/unitTest/autoFillCheckBox

define([
    'intern!object',
    'intern/chai!assert',
    'dijitx/AutofillCheckBox'
], function (registerSuite, assert, AutofillCheckBox) {
    var source = ['first','second'];
    var autoFill = new AutofillCheckBox();
    registerSuite({
        name: 'Check AutofillCheckBox Widget',

        SourceIdIsArray: function () {
            source = ['first','second'];
            assert.isTrue(autoFill.isInstanceArray(source),'passed when sourceId is type of array');
        },
        SourceIdIsString: function () {
            source = 'second';
            assert.isFalse(autoFill.isInstanceArray(source),'not passed when sourceId is type of string')
        },
        SourceIdIsNumber: function () {
            source = 96
            assert.isFalse(autoFill.isInstanceArray(source),'not passed when sourceId is type of number')
        },
        SourceIdIsObject: function () {
            source = {'asdas':'sdgfsdgsd'}
            assert.isFalse(autoFill.isInstanceArray(source),'not passed when sourceId is type of object')
        }
    });
});