// Setting up dojo in node.js environment
// (Most Important Settings)
// To Start Test you need to require this module
// in node.js environment using dojo settings.
// How to use dojo in node.js?
// http://dojotoolkit.org/documentation/tutorials/1.9/node/



// The module to "bootstrap"
// Path relaitve to baseUrl
var loadModule = "dojoAmdModules/requireNodeDojoAll";
 
// Configuration Object for Dojo Loader:
dojoConfig = {
    baseUrl: "src/", // Where we will put our packages
    async: 1, // We want to make sure we are using the "modern" loader
    hasCache: {
        "host-node": 1, // Ensure we "force" the loader into Node.js mode
        "dom": 0 // Ensure that none of the code assumes we have a DOM
    },
    // While it is possible to use config-tlmSiblingOfDojo to tell the
    // loader that your packages share the same root path as the loader,
    // this really isn't always a good idea and it is better to be
    // explicit about our package map.

    // Path relaitve to baseUrl
    packages: [{
        name: "dojo",
        location: "../../aspire/js/lib/dojo"
    },{
        name: "dojoAmdModules",
        location: "dojoAmdModules" //(Node + Dojo)
    }],
    // Why we need this?
    // require of node.js is diffrent than require of dojo. When 
    // we integrate dojo in node.js environment. node.js gets confuse which
    // require belongs to node and which to dojo.
    // So require Dojo AMD(Node + Dojo)
    // or node.js files written in dojo format As dependecy module
    deps: [ loadModule ] // And array of modules to load on "boot"
};
 
// Now load the Dojo loader
// Path relative to setNodeDojoEnvironment.js(Me or itself)
require("../aspire/js/lib/dojo/dojo.js");

