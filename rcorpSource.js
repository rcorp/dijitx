define(["../_base/array", "../_base/declare", "../_base/kernel", "../_base/lang", "../dom-class", "../dom-geometry", "../mouse", "../ready", "../topic", "./common", "./Selector", "./Manager", "dojo/dnd/Source"], function(array, declare, kernel, lang, domClass, domGeom, mouse, ready, topic, dnd, Selector, Manager, Source) {

	// module:
	//		dojo/dnd/rcorpSource
	/*=====
var __SourceArgs = {
	// summary:
	//		a dict of parameters for DnD Source configuration. Note that any
	//		property on Source elements may be configured, but this is the
	//		short-list
	// acceptFrom: Array?
	//		array of source to accept items to be dropped from.
=====*/

	// For back-compat, remove in 2.0.
	if(!kernel.isAsync) {
		ready(0, function() {
			var requires = ["dojo/dnd/AutoSource", "dojo/dnd/Target"];
			require(requires); // use indirection so modules not rolled into a build
		});
	}
	var Source = declare("onlyChangeOrderDnd", Source, {
		acceptFrom: [],
		onDropExternal: function(source, nodes, copy) {
			// summary:
			//		accept item dropped only if item from that source is acceptable.
			if(this.acceptFrom.indexOf(source.node.id) != -1) {
				this.inherited(arguments);
			} else {
				console.log('permission denied')
			}
		},
// var label = dojo.create("label", {for:"fieldId", innerHTML:"SomeText"}, cell)
// on(label,'click',function(evt){
// 	console.log('label clicked')
// })

		onMouseMove: function(e) {
			// summary:
			//		event processor for onmousemove
			// e: Event
			//		mouse event
			if(this.isDragging && this.targetState == "Disabled") {
				return;
			}
			Source.superclass.onMouseMove.call(this, e);
			var m = Manager.manager();
			if(!this.isDragging) {
				if(this.mouseDown && this.isSource && (Math.abs(e.pageX - this._lastX) > this.delay || Math.abs(e.pageY - this._lastY) > this.delay)) {
					var nodes = this.getSelectedNodes();
					if(nodes.length) {
						m.startDrag(this, nodes, this.copyState(dnd.getCopyKeyState(e), true));
					}
				}
			}
			if(this.isDragging) {
				// calculate before/after
				if(m.source) {
					if(this.acceptFrom.indexOf(m.source.node.id) != -1) {
						this.inherited(arguments);
					} else if(m.source.node.id == this.node.id) {
						this.inherited(arguments);
					} else {
						m.canDropFlag = false;
						m.copy = false;
						m.updateAvatar();
						console.log('permission denied')
					}

				}
				var before = false;
				if(this.current) {
					if(!this.targetBox || this.targetAnchor != this.current) {
						this.targetBox = domGeom.position(this.current, true);
					}
					if(this.horizontal) {
						// In LTR mode, the left part of the object means "before", but in RTL mode it means "after".
						before = (e.pageX - this.targetBox.x < this.targetBox.w / 2) == domGeom.isBodyLtr(this.current.ownerDocument);
					} else {
						before = (e.pageY - this.targetBox.y) < (this.targetBox.h / 2);
					}
				}
				if(this.current != this.targetAnchor || before != this.before) {
					this._markTargetAnchor(before);
					m.canDrop(!this.current || m.source != this || !(this.current.id in this.selection));
				}
			}
		},
	});

	return Source;

});