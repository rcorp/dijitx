// run the selenium server
// sudo java -jar selenium-server-standalone-2.37.0.jar
// run thge cmd commonr to run test 
// node node_modules/intern/bin/intern-runner config=dijitx/tests/AutofillCheckBox/functionalTest/autoFillCheckBox.js



define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'index',

        'firstName': function () {
            
            return this.remote
                .get(require.toUrl('dijitx/tests/AutofillCheckBox/test_AutofillCheckBox.html'))
                //.waitForElementByCssSelector('body.loaded', 5000)
                .elementById('firstname')
                .clickElement()
                    .type('Rcorp')
                    .end()
                .elementById('lastname')
                .clickElement()
                    .type('rcorp')
                    .end()
                .elementById('dateS')
                .clickElement()
                    .type('1/21/2014')
                    .end()
                .elementById('chk')
                    .clickElement()
                    .end()
                .elementById('fname')
                .getAttribute('value')
                .then(function (text) {
                    console.log(text,"--------------------------------------")
                    assert.strictEqual(text, 'Rcorp','Failed for first name');
                })
                .end()
                .elementById('lname')
                .getAttribute('value')
                .then(function (text) {
                    console.log(text,"--------------------------------------")
                    assert.strictEqual(text, 'rcorp','Failed for last name');
                })
                .end()
                .elementById('dateT')
                .getAttribute('value')
                .then(function (text) {
                    console.log(text,"--------------------------------------")
                    assert.strictEqual(text, '1/21/2014','Failed for date');
                }) 
                .end();
        }
    });
});
