/** @module aspire-core/graph-core */

define(['dojo/_base/declare',
	"dojo/_base/array",
	"dojo/dom-construct",
	'dojo/store/Memory',
	'dojo/store/Observable',
	'dojox/charting/StoreSeries',
	"dojox/charting/action2d/MoveSlice",
	"dojox/charting/widget/SelectableLegend",
	"dojox/charting/action2d/Tooltip",
	"dojox/charting/action2d/Magnify",
	"dojox/charting/widget/Legend",
	"dojox/charting/action2d/Highlight",
/*Graphs*/
"dojox/charting/Chart",
	"dojox/charting/widget/Chart",
	"dojox/charting/axis2d/Default",
	"dojox/charting/plot2d/Default",
//	"dojox/charting/plot2d/Bubble",
"dojox/charting/plot2d/Areas",
	"dojox/charting/plot2d/Markers",
	"dojox/charting/plot2d/MarkersOnly",
	"dojox/charting/plot2d/StackedLines",
	"dojox/charting/plot2d/StackedAreas",
	"dojox/charting/plot2d/Bars",
	"dojox/charting/plot2d/ClusteredBars",
	"dojox/charting/plot2d/StackedBars",
	"dojox/charting/plot2d/ClusteredColumns",
	"dojox/charting/plot2d/StackedColumns",
	"dojox/charting/plot2d/Grid",
	"dojox/charting/plot2d/Candlesticks",
	"dojox/charting/plot2d/OHLC",
	"dojox/charting/plot2d/Scatter",
/*Themes*/
"dojox/charting/themes/Adobebricks",
	"dojox/charting/themes/Algae",
	"dojox/charting/themes/Bahamation",
	"dojox/charting/themes/BlueDusk",
	"dojox/charting/themes/Charged",
	"dojox/charting/themes/Chris",
	"dojox/charting/themes/Claro",
	"dojox/charting/themes/common",
	"dojox/charting/themes/CubanShirts",
	"dojox/charting/themes/Desert",
	"dojox/charting/themes/Distinctive",
	"dojox/charting/themes/Dollar",
	"dojox/charting/themes/Electric",
	"dojox/charting/themes/gradientGenerator",
	"dojox/charting/themes/Grasshopper",
	"dojox/charting/themes/Grasslands",
	"dojox/charting/themes/GreySkies",
	"dojox/charting/themes/Harmony",
	"dojox/charting/themes/IndigoNation",
	"dojox/charting/themes/Ireland",
	"dojox/charting/themes/Julie",
	"dojox/charting/themes/MiamiNice",
	"dojox/charting/themes/Midwest",
	"dojox/charting/themes/Minty",
	"dojox/charting/themes/PrimaryColors",
	"dojox/charting/themes/PurpleRain",
	"dojox/charting/themes/Renkoo",
	"dojox/charting/themes/RoyalPurples",
	"dojox/charting/themes/SageToLime",
	"dojox/charting/themes/Shrooms",
	"dojox/charting/themes/ThreeD",
	"dojox/charting/themes/Tom",
	"dojox/charting/themes/Tufte",
	"dojox/charting/themes/WatersEdge",
	"dojox/charting/themes/Wetland",
/*Event*/
"dojox/charting/action2d/MouseZoomAndPan",
/*Highlighter*/

/*Mouse Indicator*/
"dojox/charting/action2d/MouseIndicator",
/*ToolTip*/


"dojox/charting/action2d/Shake",

/*Store*/
"aspire/core/SocketStore",

"dojo/request/xhr",
	"dojo/domReady!"], function(declare, array, domConstruct, Memory, Observable, StoreSeries, MoveSlice, SelectableLegend, ToolTip,
Magnify, Legend, HighLighter, Chart, WidgetChart, Axis2D, plotDefault, Areas, Markers, MarkersOnly, StackedLines,
StackedAreas, Bars, ClusteredBars, StackedBars, ClusteredColumns, StackedColumns, Grid, Candlesticks, OHLC, Scatter, Adobebricks,
Algae, Bahamation, BlueDusk, Charged, Chris, Claro, common, cubanShirts, Desert, Distinctive, Dollar, Electric, gradientGenerator,
Grasshopper, Grasslands, GreySkies, Harmony, IndigoNation, Ireland, Julie, MiamiNice, Midwest, Minty, PrimaryColors, PurpleRain,
Renkoo, RoyalPurples, SageToLime, Shrooms, ThreeD, Tom, Tufte, WatersEdge, Wetland, MouseZoomAndPan, MouseIndicator, Shake, SocketStore, xhr) {

	/**
	 * @class  GraphCore
	 */
	return declare('Graph', [WidgetChart /*,Chart*/ ], {
		constructor: function() {

			// all graph types:
			//this._graphTypesArr = ["ClusteredColumns", "Areas", "StackedAreas", "Markers", "MarkersOnly", "StackedLines", "Candlesticks", "OHLC", "Columns", "StackedColumns", "ClusteredColumns", "Bars", "StackedBars", "ClusteredBars", "Grid", "Scatter", "Default", ];

			//all graph themes
			this._themes = [Adobebricks, Algae, Bahamation, BlueDusk, Charged, Chris, Claro, common, cubanShirts, Desert, Distinctive, Dollar, Electric, gradientGenerator, Grasshopper, Grasslands, GreySkies, Harmony, IndigoNation, Ireland, Julie, MiamiNice, Midwest, Minty, PrimaryColors, PurpleRain, Renkoo, RoyalPurples, SageToLime, Shrooms, ThreeD, Tom, Tufte, WatersEdge, Wetland];

			// graph options:
			this._graphOptions = {
				type: 'Default',
				tension: 'X',
				markers: true
			};

			// axis options:
			this._axisOptions = {};

			//Series options:
			this._seriesOptions = {};

			this._name = 'default';

			//graph properties flag
			this._mouse_zoom_set = false;
			this._highlighter_set = false;
			this._mouse_indicator_set = false;
			this._tooltip_set = false;
			this._magnify_set = false;
			this._selectable_legend_set = false;
			this._shake_set = false;
			this._axisNamesArr = [];
			this._moveSliceSet = false;
			this._legendSet = false;
			this._parentDiv;
			this.store;
			this.datas;
			this.labelX;
			this.labelY;
			this.addSeriesType;

			//Markers type constant
			this.SERIES_MARKERS = {
				X: "m-3,-3 l6,6 m0,-6 l-6,6",
				CROSS: "m0,-3 l0,6 m-3,-3 l6,0",
				CIRCLE: "m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",
				SQUARE: "m-3,-3 l0,6 6,0 0,-6 z",
				DIAMOND: "m0,-3 l3,3 -3,3 -3,-3 z",
				TRIANGLE: "m-3,3 l3,-6 3,6 z",
				TRIANGLE_INVERTED: "m-3,-3 l3,6 3,-6 z"
			}
			//this.mouseZoom = new MouseZoomAndPan(this);
		},

		setChartParent: function(parentDiv) {
			this._parentDiv = parentDiv;
		},
		getStore: function() {
			console.log("store  *** ",this.store)
			return this.store;
		},
		_setGraphTheme: function( /*String*/ theme) {
			this.chart.setTheme(theme);
			this._highlighter_set = false;
			//this.chart.render();
		},
		setShake: function() {
			if (!this._shake_set) {
				new Shake(this.chart, "default");
				this._shake_set = true;
				this.chart.render();
			} else {
				console.log('already Set');
			}
		},
		setSelectableLegend: function() {
			if (!this._selectable_legend_set) {
				new SelectableLegend({
					chart: this.chart
				}, "barsLegend");
				this._selectable_legend_set = true;
				this.chart.render();
			} else {
				console.log('already Set');
			}
			this.chart.render();
		},
		setMagnify: function( /*number*/ magnifyScale) {
			if (magnifyScale) {
				if (!this._magnify_set) {
					new Magnify(this.chart, '', {
						scale: magnifyScale
					});
					this._magnify_set = true;
					this.chart.render();
				} else {
					console.log('already Set');
				}
			} else {
				if (!this._magnify_set) {
					new Magnify(this.chart, 'default');
					this._magnify_set = true;
					this.chart.render();
				} else {
					console.log('already Set');
				}
			}
		},
		setToolTip: function() {
			console.log("toototototo", ToolTip)
			if (!this._tooltip_set) {
				new ToolTip(this.chart, "default");
				this._tooltip_set = true;
				this.chart.render();
			} else {
				console.log('already Set');
			}
		},
		setMoveSlice: function() {
			if (!this._moveSliceSet) {
				new MoveSlice(this.chart, "default");
				this._moveSliceSet = true;
				this.chart.render();
			} else {
				console.log('already Set');
			}
		},
		setMouseIndicator: function( /*String*/ seriesName,/*Boolean*/ value ) {
			if (!this._mouse_indicator_set) {
				new MouseIndicator(this.chart, "default", {
					series: seriesName,
					mouseOver: value || false
				})
				this._mouse_indicator_set = true;
			} else {
				console.log('already Set');
			}
		},
		setMouseZoomAndPan: function(axis) {
			if (!this._mouse_zoom_set) {
				new MouseZoomAndPan(this.chart, "default", {
					axis: axis
				})
				this._mouse_zoom_set = true;
			} else {
				console.log('already Set');
			}
		},
		setHighLighter: function() {
			if (!this._highlighter_set) {
				new HighLighter(this.chart, "default")
				this._highlighter_set = true;
			} else {
				console.log('already Set');
			}
			this.chart.render()
		},
		setLegend: function() {
			console.log("123", this._parentDiv)
			if (!this._legendSet) {
				var legendDiv = domConstruct.create('div', {
					id: dijit.registry.getUniqueId('jas')
				}, this.domNode)
				//domConstruct.place(legendDiv /*widgetChartDiv*/,this._parentDiv.domNode)
				//this._parentDiv.addChild(legendDiv)
				console.log("147", legendDiv)
				new Legend({
					chart: this.chart
				}, legendDiv);
				this._legendSet = true;
			} else {
				console.log('already Set');
			}
			this.chart.render()

		}, // /*/*setMagnify: function( /*String*/ theme) {
		// 	if(!this._magnify_set) {
		// 		new Magnify(this.chart, "default");
		// 		this._magnify_set = true;
		// 		this.chart.render();
		// 	} else {
		// 		console.log('already Set');
		// 	}
		// },*/*/
		setTextFont: function( /*String*/ name, /*String*/ font) {
			if (["Pie"].indexOf(this._graphOptions.type) != -1) {
				this._graphOptions.font = font || this._graphOptions.font;
				this.addGraph(name);
				this._highlighter_set = false;
			} else {
				console.log("Font not supported by:", this._graphOptions.type);
			}
		},
		setFontColor: function( /*String*/ name, /*String*/ fontColor) {
			if (["Pie"].indexOf(this._graphOptions.type) != -1) {
				this._graphOptions.fontColor = fontColor || this._graphOptions.fontColor;
				this.addGraph(name);
				this._highlighter_set = false;
			} else {
				console.log("FontColor not supported by:", this._graphOptions.type);
			}
		},
		setLabelStyle: function( /*String*/ name, /*String*/ style) {
			if (["Pie"].indexOf(this._graphOptions.type) != -1) {
				this._graphOptions.labelStyle = style || this._graphOptions.labelStyle;
				this.addGraph(name);
				this._highlighter_set = false;
			} else {
				console.log("LabelWriting not supported by:", this._graphOptions.type);
			}
		},
		setLabelWiring: function( /*String*/ name, /*String*/ labelWiringColor) {
			if (["Pie"].indexOf(this._graphOptions.type) != -1) {
				this._graphOptions.labelWiring = labelWiringColor || this._graphOptions.labelWiring;
				this.addGraph(name);
				this._highlighter_set = false;
			} else {
				console.log("LabelWriting not supported by:", this._graphOptions.type);
			}
		},
		setStartAngle: function( /*String*/ name, /*String*/ startAngle) {
			if (["Pie"].indexOf(this._graphOptions.type) != -1) {
				this._graphOptions.startAngle = startAngle || this._graphOptions.startAngle;
				this.addGraph(name);
				this._highlighter_set = false;
			} else {
				console.log("Angle not supported by:", this._graphOptions.type);
			}
		},
		setRadius: function( /*String*/ name, /*String*/ radius) {
			if (["Pie"].indexOf(this._graphOptions.type) != -1) {
				this._graphOptions.radius = radius || this._graphOptions.radius;
				this.addGraph(name);
				this._highlighter_set = false;
			} else {
				console.log("Radius not supported by:", this._graphOptions.type);
			}
		},
		setGraphType: function( /*String*/ name, /*String*/ type) {
			this._graphOptions.type = type || this._graphOptions.type;
			this.addGraph(name);
			if (type == 'Pie') {
				_this.setMoveSlice();
				_this.setMagnify(1.1);
			}
			if (type == 'Columns') {
				_this.setHighLighter();
			} else {
				_this.setMagnify();
			}
			this._highlighter_set = false;
		},
		setGraphShadow: function( /*String*/ name, /*Integer*/ dx, /*Integer*/ dy, /*Integer*/ width, /*Array*/ color) {
			this._graphOptions.shadow = {};
			this._graphOptions.shadow.dx = 3;
			this._graphOptions.shadow.dy = 3;
			this._graphOptions.shadow.dw = 2;
			this._graphOptions.shadow.color = [0, 0, 0, 0.3];
			this.addGraph(name);
			this._highlighter_set = false;
		},
		setTension: function( /*String*/ name, /*String*/ tension) {
			if (["Areas", "StackedAreas", "StackedLines", "Default"].indexOf(this._graphOptions.type) != -1) {
				this._graphOptions.tension = tension || this._graphOptions.tension;
				this.addGraph(name);
			} else {
				console.log("Tension not supported by:", this._graphOptions.type);
			}
		},
		setGap: function( /*String*/ name, /*Integer*/ gap) {
			if (["ClusteredColumns", "Columns", "Bars", "ClusteredBars"].indexOf(this._graphOptions.type) != -1) {
				this._graphOptions.gap = gap || 5;
				this.addGraph(name);
			} else {
				console.log("Gap not supported by:", this._graphOptions.type);
			}
		},
		showMarkers: function( /*String*/ name, /*Boolean*/ markers) {

			if (["Areas", "StackedAreas", "StackedLines", "Default", "Pie", "Bubble"].indexOf(this._graphOptions.type) != -1) {
				this._graphOptions.markers = markers || this._graphOptions.markers;
				this.addGraph(name);
			} else {
				console.log("Markers not supported by:", this._graphOptions.type);
			}
		},
		addGraph: function(name, type) {
			var _this = this;
			this._name = name || this.chart.name;
			this._graphOptions.type = type || this._graphOptions.type;

			this.chart.addPlot("default", this._graphOptions);
			//new ToolTip(_this.chart,'default')
			//_this.setSelectableLegend();
			_this.setLegend();
			_this.setToolTip();
			if (type == 'Pie') {
				_this.setMoveSlice();
				_this.setMagnify(1.1);
			}
			if (type == 'Columns') {
				_this.setHighLighter();
			} else {
				_this.setMagnify();
			}



			//pieChart = new dc.Chart("pieChart");
			this.chart.setTheme(Claro);
			/*addSeries("Series A", [{
				y: 12.1,
				tooltip: "1,210 million"
			}, {
				y: 9.52,
				tooltip: "952 million"
			}, {
				y: 2.66,
				text: "USA",
				tooltip: "266 million"
			}, {
				y: 2.06,
				text: "Indonisia",
				tooltip: "206 million"
			}, {
				y: 1.63,
				text: "Brazil",
				tooltip: "163 million"
			}, {
				y: 1.48,
				text: "Russian",
				tooltip: "148 million"
			}, {
				y: 1.29,
				text: "Pakistan",
				tooltip: "129 million"
			}, {
				y: 1.25,
				text: "Japan",
				tooltip: "125 million"
			}, {
				y: 1.23,
				text: "Bangladesh",
				tooltip: "123 million"
			}, {
				y: 1.04,
				text: "Nigeria",
				tooltip: "104 million"
			}, {
				y: 0.96,
				text: "Mexico",
				tooltip: "96 million"
			}, {
				y: 0.84,
				text: "Germany",
				tooltip: "84 million"
			}, {
				y: 0.74,
				text: "Phillippines",
				tooltip: "74 million"
			}, {
				y: 0.74,
				text: "Viet Nam",
				tooltip: "74 million"
			}, {
				y: 0.66,
				text: "Iran",
				tooltip: "66 million"
			}, {
				y: 0.64,
				text: "Egypt",
				tooltip: "64 million"
			}]).render();*/
			return this;
		},
		addAxisToGraph: function( /*String*/ name, /*Boolean*/ vertical) {
			this._axisOptions = {
				fixLower: "major",
				fixUpper: "major",
				includeZero: true,
				vertical: vertical,
				natural:true
			};

			this._axisNamesArr.push(name);
			this.chart.addAxis(name, this._axisOptions);
			this.chart.render();
		},
		setAxisLabel: function( /*String*/ name, /*String/function*/ labels) {
			if (this._graphOptions.type != "Pie") {
				if (typeof labels == "string") {
					this._axisOptions.labels = labels;
				} else if (typeof labels == "function") {
					this._axisOptions.labelFunc = labels;
				}else{
					this._axisOptions.labels = labels;
				}
				this.chart.addAxis(name, this._axisOptions);
				//var data = this.getSeriesData(name);
				//this.setSeriesData(name, data);
				//this._highlighter_set = false;
			} else {
				console.log("Axis Custom Label not supported by:", this._graphOptions.type);
			}
			this.chart.render();
		},
		setAxisRange: function( /*String*/ name, /*Integer/String*/ from, /*Integer/String*/ to) {
			if (this._graphOptions.type != "Pie") {
				this._axisOptions.from = from;
				this._axisOptions.to = to;
				this.chart.addAxis(name, this._axisOptions);
				this._highlighter_set = false;
			} else {
				console.log("Axis Range not supported by:", this._graphOptions.type);
			}
		},
		setAxisTitle: function( /*String*/ name, /*String*/ title) {
			if (this._graphOptions.type != "Pie") {
				this._axisOptions.title = title;
				this.chart.addAxis(name, this._axisOptions);
				this._highlighter_set = false;
			} else {
				console.log("Title not supported by:", this._graphOptions.type);
			}
			this.chart.render();
		},
		setAxisTitleGap: function( /*String*/ name, /*String*/ Gap) {
			if (this._graphOptions.type != "Pie") {
				this._axisOptions.titleGap = Gap;
				this.chart.addAxis(name, this._axisOptions);
				this._highlighter_set = false;
			} else {
				console.log("Title not supported by:", this._graphOptions.type);
			}
		},
		setAxisTitleFontColor: function( /*String*/ name, /*String*/ color) {
			if (this._graphOptions.type != "Pie") {
				this._axisOptions.titleFontColor = color;
				this.chart.addAxis(name, this._axisOptions);
				this._highlighter_set = false;
			} else {
				console.log("Title not supported by:", this._graphOptions.type);
			}
		},
		setAxisTitleOrientation: function( /*String*/ name, /*String*/ orientation) {
			if (this._graphOptions.type != "Pie") {
				this._axisOptions.titleOrientation = orientation;
				this.chart.addAxis(name, this._axisOptions);
				this._highlighter_set = false;
			} else {
				console.log("Title Orientation not supported by:", this._graphOptions.type);
			}
			this.chart.render();
		},
		setAxisLabelRotation: function( /*String*/ name, /*String*/ rotation) {
			if (this._graphOptions.type != "Pie") {
				this._axisOptions.rotation = rotation;
				this.chart.addAxis(name, this._axisOptions);
				this._highlighter_set = false;
			} else {
				console.log("Label Rotation not supported by:", this._graphOptions.type);
			}
		},
		//		setAxisAsVertical: function(/*String*/ name)
		/*		{
			//reset vertical
			if(this.verticalAxis)
			{
				this.axes[this.verticalAxis].vertical= undefined;
				this.axes[name].vertical= true;
				this.verticalAxis = name;
			}
			else
			{
				this.axes[name].vertical= true;
				this.verticalAxis = name;
			}
			this.dirty = true;
			this.chart.render();
		},*/
		addSeriesData: function(/*String*/ name, /*Array*/ data, /*String*/ type) {
			var _this = this;
			/*if (!data) {
				data = [{
					x: 1,
					y: 90
				}, {
					x: 1,
					y: 320
				}, {
					x: 2,
					y: 220
				}, {
					x: 3,
					y: 420
				}, {
					x: 4,
					y: 320
				}, {
					x: 5,
					y: 560
				}, {
					x: 6,
					y: 850
				}, {
					x: 7,
					y: 320
				}, {
					x: 8,
					y: 0
				}, {
					x: 9,
					y: 320
				}];
			}*/
			// console.log("store data iss",storeData)
			
			if (this._graphOptions.type == "Bubble") {

				//				this._graphOptions.markers = markers||this._graphOptions.markers;
				var validData = true;
				// for(var i = 0; i < data.length; i++) {
				// 	if(data[i].size) {} else {
				// 		validData = false;
				// 		console.log("Invalid Data... for " + this._graphOptions.type + " Chart/Graph Please Enter like this Eg: { x:1, y:1, size:20 }");
				// 		break;
				// 	}
				// }
				// var storeData=new Memory({
				// 	data:data
				// })
				// console.log("store data iss",storeData)
				if (validData) {
					this.chart.addSeries(name, data/*, this._seriesOptions*/);
					 // this.chart.addSeries(name, new StoreSeries(this.getStore(), {
					 // 	query: {}
					 // }, type));;
					//this.set('store',storeData)
					this.chart.render();
				}

			} else {
				this.chart.addSeries(name, data/*, this._seriesOptions*/);
				 // this.chart.addSeries(name, new StoreSeries(this.getStore(), {
				 // 	query: {}
				 // }, type));;
				//this.set('store',storeData)
				this.chart.render();
			}
		},
		// addSeriesData: function( /*String*/ name, /*Array*/ data) {
		// 	// console.log("store data iss",storeData)
		// 	if(this._graphOptions.type == "Bubble") {
		// 		//				this._graphOptions.markers = markers||this._graphOptions.markers;
		// 		var validData = true;
		// 		for(var i = 0; i < data.length; i++) {
		// 			if(data[i].size) {} else {
		// 				validData = false;
		// 				console.log("Invalid Data... for " + this._graphOptions.type + " Chart/Graph Please Enter like this Eg: { x:1, y:1, size:20 }");
		// 				break;
		// 			}
		// 		}
		// 		// var storeData=new Memory({
		// 		// 	data:data
		// 		// })
		// 		// console.log("store data iss",storeData)
		// 		if(validData) {
		// 			this.addSeries(name, data, this._seriesOptions);
		// 			//this.set('store',storeData)
		// 			this.chart.render();
		// 		}
		// 	} else {
		// 		this.addSeries(name, data, this._seriesOptions);
		// 		//this.set('store',storeData)
		// 		this.chart.render();
		// 	}
		// },
		setSeriesMarkerType: function( /*String*/ name, /*Boolean*/ markersName) {
			if (["Areas", "StackedAreas", "StackedLines", "Default"].indexOf(this._graphOptions.type) != -1) {
				this._seriesOptions.marker = markersName || this._seriesOptions.marker;
				var data = this.chart.getSeries(name).data;
				this.addSeriesData(name, data, this._seriesOptions);
			} else {
				console.log("Markers not supported by:", this._graphOptions.type);
			}
		},
		setSeriesData: function( /*String*/ name, /*Array*/ data, /*Boolean*/ offsets) {
			// summary:
			//		Update the given series with a new set of data points.
			// name: String
			//		The name of the series as defined in addSeries.
			// data: Array|Object
			//		The array of data points (either numbers or objects) that
			//		represents the data to be drawn. Or it can be an object. In
			//		the latter case, it should have a property "data" (an array),
			//		destroy(), and setSeriesObject().
			// offsets: Boolean?
			//		If true recomputes the offsets of the chart based on the new
			//		data. This is useful if the range of data is drastically changing
			//		and offsets need to be recomputed.
			// returns: dojox/charting/Chart
			//		A reference to the current chart for functional chaining.
			this.chart.updateSeries(name, data, offsets);
			this.chart.render();
		},
		getSeriesData: function( /*String*/ name) {
			// name: String
			//		The name of the series as defined in addSeries.
			// returns: Array/undefined
			//		The array of data points (either numbers or objects) that
			//		represents the data to be drawn.
			if (this.chart.getSeries(name)) {
				return this.chart.getSeries(name).data;
			} else {
				return undefined
			}
		},
		pushElementToSeries: function( /*String*/ name, /*Integer/Object*/ element) {
			if (this.chart.getSeries(name)) {
				var data = this.chart.getSeries(name).data;
				data.push(element);
				this.setSeriesData(name, data)
				this.chart.render();
			} else {
				return "Invalid Series Name...Series Not Found";
			}
		},
		reverseSeries: function( /*String*/ name) {
			if (this.chart.getSeries(name)) {
				var data = this.chart.getSeries(name).data.reverse();
				this.setSeriesData(name, data)
			}
		},
		/*
						addAxis("x", { fixLower: "minor", fixUpper: "minor", natural: true }).
						addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true }).
						addSeries("Series A", [ 2, 1, 0.5, -1, -2 ] ).
						addSeries("Series B", [ -2, -1, -0.5, 1, 2 ] ).
						addSeries("Series C", [ 1, 0.5, -1, -2, -3 ] ).
						addSeries("Series D", [ 0.7, 1.5, -1.2, -1.25, 3 ] ).render();
*/
		toggleAxes: function() {},
		showZero: function( /*String*/ name, /*Boolean*/ show) {
			//reset vertical
			this.chart.axes[name].includeZero = show;
			this.chart.dirty = true;
			this.chart.render();
		},
		/*setColumns: function(groups) {
			var _this = this;
			array.forEach(groups, function(group) {
				_this._topRow.push({
					label: group.label,
					colSpan: group.fields.length
				});
				array.forEach(group.fields, function(field) {
					_this._bottomRow.push({
						label: field.label,
						field: field.id
					});
				});
			});
			this._grid.set('columns', _this._bottomRow);
		},
		*/
		
		/*
		set: function(prop, value) {
			this._graph.set(prop, value)
		},
		getGraphThis: function() {
			return this;
		}*/
		setStore: function(schema) {
			console.log("inside setStore")	
			var _this = this;
			_this.store = new Observable(new SocketStore({
				socket:window.socket,
				storeId: schema.$id,
				idProperty: _this.getIdProperyForGraph(schema),
				returnResult: _this.getIdToReturnQueryResult(schema)
			}))
			console.log("storeeeeeee",_this.store)
			//_this.chart.set('store',_this._store);
		},
		getIdToReturnQueryResult: function(schema) {
 			console.log(" inside getIdToReturnQueryResult")
 			var _this = this;
 			var result
 			schema.divisions.forEach(function(division) {
 				division.groups.forEach(function(group) {
 					group.fields.forEach(function(field) {
 						for (each in field){
 							if(field.$ref && field.$ref.graph){
 								result = field.$ref.graph[0];
 							}
 						}
 					});
 				});
 			});
 			return result;
 		},
 		getIdProperyForGraph: function(schema) {
			console.log("inside getIdProperyForGraph")
			var _this = this;
			var allTableName  = [];
			schema.divisions.forEach(function(division) {
			    division.groups.forEach(function(group) {
			        group.fields.forEach(function(field) {
			            if (!field.dbignore ) {
			                var tableName;
			                tableName = field.table;
			                if (allTableName.indexOf(tableName) == -1) {
			                    allTableName.push(tableName)
			                }
			            }
			        });
			    });
			});
			var primaryKeyForGraph = allTableName.sort().join('_');
			return primaryKeyForGraph+'_pk';
		},
		getFieldObject:function(schema){
			var _this = this;
			var graphField={};	
			array.forEach(schema.fields,function(field){
				graphField[field.$id]='';
			})
			console.log("field array in graph.js",graphField)
			return graphField;
		},
		/*setGraphData:function(data){
			var _this = this;
			_this.graphData = data;
		},*/
		setGraphData:function(data,schema){
			console.log("in setGraphData",data)
			var _this = this;
			_this.datas=data;
			var getLabels;
			var group = schema;
			console.log('graph data is  ',_this.datas)
			var dataForStore=_this.getDataForStore(data, schema);
			
			console.log('dataForStore in graph.js is =',dataForStore)
			
			if (group.widget){
				array.forEach(group.fields,function(field){
					//fieldTableColumn=field.table+'.'+field.column;
					//_this._fieldArray.push(fieldTableColumn);
					if(field.widget=='x'){
						//set axis
						_this.addAxisToGraph(field.widget);
						//set axis title
						_this.setAxisTitle(field.widget, field.label);
						_this.setAxisTitleOrientation(field.widget, "away")
						//get lable for axis
						 getlabels=_this.getGraphAxisLabel(_this.datas,field);
						 console.log('getLabels for x',getlabels)
						_this.setAxisLabel(field.widget,getlabels);
						//_this.labelX=field.label;
					}
					else {
						_this.addAxisToGraph(field.widget, true);
						_this.setAxisTitle(field.widget, field.label);
						 getlabels=_this.getGraphAxisLabel(_this.datas,field);
						 console.log('getLabels for y',getlabels)
						_this.setAxisLabel(field.widget,getlabels);
						//_this.labelY=field.label;	
					}
				})
			}
			 _this.addSeriesData(group.label,dataForStore,_this.addSeriesType)
		},
		getGraphAxisLabel:function(storeData,field){
			console.log("in getGraphAxisLabel",storeData,field)
			var _this=this;
			var labels=[];
				var i=1;
				var  z=1;
			var data=storeData;	
				console.log('data is==',data)
				for(each in data){
					//console.log('data[each]=',data[each])
					//console.log('each=',each)
					//var x=_this.labelX;
					//var y=_this.labelY;
					//console.log("xxxxx----yyyyyy",data[each][x]+'------'+data[each][y])
					var label = {}
					if(field.widget=='x'){
						//console.log("in xxxxx",each,data[each],data[each][field.$id],field.$id)	
						label.value=parseInt(each)+1;
						label.text=data[each][field.$id].toString();
					} else {
						//console.log("in yyyyyyyy",each,data[each],data[each][field.$id])	
						label.value=parseInt(data[each][field.$id]);
						label.text='--'+parseInt(data[each][field.$id]).toString();	
					}
					/*if(flag){
						console.log('flag')
						
					}
					else{
						label.value=i++;
						//label.text=data[each][x];
					}*/	
					//console.log("label ====",label)	
					labels.push(label)
				}
				//console.log('axixlabel are',labels)
				return labels;

		},
		getDataForStore:function(datas, group){
			console.log("in getDataForStore")
			console.log("graph data comming from server",datas)
			var _this=this;
			var xField;
			var yField;
			var labelX;
			var labelY;
			array.forEach(group.fields,function(field){
				if(field.widget=='x'){
					xField=field.$id;	
					labelX=field.label;
					_this.labelX=field.label;
				}
				else {
					yField=field.$id;		
					labelY=field.label;
					_this.labelY=field.label;				
				}
			})
			_this.addSeriesType=labelY;
			var storeDatas=[];
			var graphTestData=[];
			var a=1;
			array.forEach(datas,function(data){
				var storeData={};
				storeData[labelX]='';
				storeData[labelY]='';
				storeData[labelX]=data[xField];
				//storeData[labelY] = /*parseInt(data[yField])*/ (((a++)*15.5)/(a++));
				/*if (typeof data[yField]=='string'){
					storeData[labelY] = parseInt(data[yField]);
					
					//storeData[labelY] = parseInt(parseInt(data[yField])/((a++)*10));
					//storeData[labelY] = (a++)*10;
					//storeData[labelY]=(((a++)*100)/25);
				}
				else {
					storeData[labelY]=data[yField];
				}
				if(!((storeData[labelX]==null) && (storeData[labelY]==null))){
					storeDatas.push(storeData);
				}
				else{
					console.log('null value in graph data')
				}*/
				graphTestData.push(parseInt(data[yField]));
			})
			return graphTestData;
			//return storeDatas;
		}

	});
});