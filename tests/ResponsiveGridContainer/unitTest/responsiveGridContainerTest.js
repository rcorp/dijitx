// COMMOND TO RUN ON BROWSER
// OPEN CHEOME 
// THEN TYPE 
// http://localhost/aspire/js/lib/node_modules/intern/client.html?config=dijitx/tests/AutofillCheckBox/unitTest/autoFillCheckBox

define([
    'intern!object',
    'intern/chai!assert',
    'dijitx/ResponsiveGridContainer',
    "dojo/dom",
    "dijit/form/TextBox",
    "dijit/form/NumberSpinner",
    "dojo/query"
], function (registerSuite, assert, ResponsiveGridContainer,dom,TextBox,NumberSpinner,query) {
    query('body')[0].id="body";
    var responsivegrid = new ResponsiveGridContainer({cols:3, id:"asd"},query('body')[0].id);
    var textBox1=new TextBox({label:"Name"});
    var textBox2=new TextBox({label:"DOB"});
    var numberSpinner1=new NumberSpinner({title:"Age",value:"20"});
    responsivegrid.addChild(textBox1);
    responsivegrid.addChild(textBox2);
    responsivegrid.addChild(numberSpinner1);
    responsivegrid.startup();
    console.log(dom.byId("asd-col-md0").className)
    
    console.log("ededee")
    registerSuite({
        name :"wsde",
        LayoutCheck: function () {
            console.log("call")
            var flag=false;
            /*if(dom.byId("asd-col-md0").className=="asd-col-md4"){
                flag=true;
            }*/
            console.log(flag,"1111")
            assert.isTrue(flag,'Grid is not Responsive');
        }        
    });
});


