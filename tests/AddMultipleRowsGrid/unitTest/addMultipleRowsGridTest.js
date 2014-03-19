// COMMOND TO RUN ON BROWSER
// OPEN CHEOME 
// THEN TYPE 
// http://localhost/aspire/js/lib/node_modules/intern/client.html?config=dijitx/tests/AddMultipleRowsGrid/unitTest/addMultipleRowsGrid

define([
    'intern!object',
    'intern/chai!assert',
    'dijitx/addMultipleRowsGrid'
], function (registerSuite, assert, addMultipleRowsGrid) {
    
    registerSuite({
        ObjectToArrayFunction: function () {
            var input={
                1:{
                    name:"Richa",
                    age:"21"
                },
                2:{
                    name:"Raghav",
                    age:"25"
                }
            };
            var expOpt = [
                {
                    name:"Richa",
                    age:"21"
                },       
                {
                    name:"Raghav",
                    age:"25"
                }
            ];
            var grid = new addMultipleRowsGrid();
            var output= grid.objectToArray(input);
            console.log(output);
            console.log(expOpt)
            assert.strictEqual(JSON.stringify(output), JSON.stringify(expOpt), "Output as expected");
        }
    });
});
