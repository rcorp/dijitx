define (['dojo/_base/declare', 'dijit/layout/TabContainer', 'dojo/dom-class', "dojo/topic",
 "dojo/when", "dijit/registry"], function (declare, TabContainer, domClass, topic, when, registry) {
    return declare('dijitx.widget.TabContainerExtended', [TabContainer], {
        buildRendering: function () {
            this.inherited(arguments);
        },
        selectChild: function(/*dijit/_WidgetBase|String*/ page, /*Boolean*/ animate){
            // console.log("this in StackContainer",this)
            // // summary:
            // //      Show the given widget (which must be one of my children)
            // // page:
            // //      Reference to child widget or id of child widget

            // var d;

            // page = registry.byId(page);

            // if(this.selectedChildWidget != page){
            //     // Deselect old page and select new one
            //     d = this._transition(page, this.selectedChildWidget, animate);
            //     this._set("selectedChildWidget", page);
            //     topic.publish(this.id + "-selectChild", page);  // publish

            //     if(this.persist){
            //         cookie(this.id + "_selectedChild", this.selectedChildWidget.id);
            //     }
            // }

            // // d may be null, or a scalar like true.  Return a promise in all cases
            // return when(d || true);     // Promise
        },
        extendedSelectChild: function(/*dijit/_WidgetBase|String*/ page, /*Boolean*/ animate){
            // summary:
            //      Show the given widget (which must be one of my children)
            // page:
            //      Reference to child widget or id of child widget

            var d;

            page = registry.byId(page);

            if(this.selectedChildWidget != page){
                // Deselect old page and select new one
                d = this._transition(page, this.selectedChildWidget, animate);
                this._set("selectedChildWidget", page);
                topic.publish(this.id + "-selectChild", page);  // publish

                if(this.persist){
                    cookie(this.id + "_selectedChild", this.selectedChildWidget.id);
                }
            }

            // d may be null, or a scalar like true.  Return a promise in all cases
            return when(d || true);     // Promise
        }
    })
})