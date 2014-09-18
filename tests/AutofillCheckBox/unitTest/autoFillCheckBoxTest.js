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
        },
        TargetIdIsArray: function () {
            target = ['first','second'];
            assert.isTrue(autoFill.isInstanceArray(target),'passed when targetId is type of array');
        },
        TargetIdIsString: function () {
            target = 'second';
            assert.isFalse(autoFill.isInstanceArray(target),'not passed when targetId is type of string')
        },
        TargetIdIsNumber: function () {
            target = 96
            assert.isFalse(autoFill.isInstanceArray(target),'not passed when targetId is type of number')
        },
        TargetIdIsObject: function () {
            target = {'asdas':'sdgfsdgsd'}
            assert.isFalse(autoFill.isInstanceArray(target),'not passed when targetId is type of object')
        },
        SameLength: function () {
            target = ['asdas','sdgfsdgsd'];
            source= ['asdagbfvnvs','sdgfsdgsd'];
            assert.isTrue(autoFill.compareArrayLength(source,target),'Length not same')
        },
        UnequalLength: function () {
            target = ['asdas','sdgfsdgsd'];
            source= ['sdgfsdgsd'];
            assert.isTrue(autoFill.compareArrayLength(source,target),'Length not same')
        }
    });
});