define([
	"dojo/_base/declare",
	"dijit/form/Button",
	"dojo/_base/lang", // lang.clone lang.hitch
	"dojo/string", // string.substitute
	"dojo/when"
], function(declare, Button, lang, string, when) {

	return declare(null, {
		addMoreButton: '',
		postCreate: function() {
			// Overrides `dijit/_TemplatedMixin/buildRendering`

			this.inherited(arguments);
			this.addMoreButton = new Button({
				label: '+'
			});
			var _this = this;
			// this.on('change', function() {
			// 	_this.showAddMore();
			// })
			// this.on('active', function() {
			// 	_this.showAddMore();
			// })
		},
		showAddMore: function() {
			this.addMoreButton.placeAt(this.domNode, 'after')
		},
		reset: function() {
			var obj = dojo.clone(this.query);
			obj[this.searchAttr] = '';
			obj[this.store.idProperty] = null;
			this.set('item', obj);
			this.item = null;
			this.textbox.value = "";
			this.valueNode.value = "";
		},
		_openResultList: function( /*Object*/ results, /*Object*/ query, /*Object*/ options) {
			// var obj = {};
			// for (each in query) {
			// 	if (each.indexOf('_pk') != -1) {
			// 		obj[each] = 0;
			// 	} else {
			// 		obj[each] = 'select';
			// 	}
			// }
			// results.splice(0, 0, obj);
			this.inherited(arguments);
		},
		_startSearch: function(/*String*/ key){
			// summary:
			//		Starts a search for elements matching key (key=="" means to return all items),
			//		and calls _openResultList() when the search completes, to display the results.
			if(!this.dropDown){
				var popupId = this.id + "_popup",
					dropDownConstructor = lang.isString(this.dropDownClass) ?
						lang.getObject(this.dropDownClass, false) : this.dropDownClass;
				this.dropDown = new dropDownConstructor({
					onChange: lang.hitch(this, this._selectOption),
					id: popupId,
					dir: this.dir,
					textDir: this.textDir
				});
			}
			this._lastInput = key; // Store exactly what was entered by the user.

			// summary:
			//		Starts a search for elements matching text (text=="" means to return all items),
			//		and calls onSearch(...) when the search completes, to display the results.

			this._abortQuery();
			var
				_this = this,
				// Setup parameters to be passed to store.query().
				// Create a new query to prevent accidentally querying for a hidden
				// value from FilteringSelect's keyField
				query = lang.clone(this.query), // #5970
				options = {
					start: 0,
					count: this.pageSize,
					queryOptions: {		// remove for 2.0
						ignoreCase: this.ignoreCase,
						deep: true
					}
				},
				text = key,
				qs = string.substitute(this.queryExpr, [text.replace(/([\\\*\?])/g, "\\$1")]),
				q,
				startQuery = function(){
					var newQuery = {};
					newQuery[this.searchAttr] = query[this.searchAttr].toString();

					// prevent overriding of query from clients side for making newQuery
					if(query[this.store.idProperty]) {
						newQuery[this.store.idProperty] = query[this.store.idProperty]
					}
					var resPromise = _this._fetchHandle = _this.store.query(newQuery, options);
					if(_this.disabled || _this.readOnly || (q !== _this._lastQuery)){
						return;
					} // avoid getting unwanted notify
					when(resPromise, function(res){
						_this._fetchHandle = null;
						if(!_this.disabled && !_this.readOnly && (q === _this._lastQuery)){ // avoid getting unwanted notify
							when(resPromise.total, function(total){
								res.total = total;
								var pageSize = _this.pageSize;
								if(isNaN(pageSize) || pageSize > res.total){ pageSize = res.total; }
								// Setup method to fetching the next page of results
								res.nextPage = function(direction){
									//	tell callback the direction of the paging so the screen
									//	reader knows which menu option to shout
									options.direction = direction = direction !== false;
									options.count = pageSize;
									if(direction){
										options.start += res.length;
										if(options.start >= res.total){
											options.count = 0;
										}
									}else{
										options.start -= pageSize;
										if(options.start < 0){
											options.count = Math.max(pageSize + options.start, 0);
											options.start = 0;
										}
									}
									if(options.count <= 0){
										res.length = 0;
										_this.onSearch(res, query, options);
									}else{
										startQuery();
									}
								};
								_this.onSearch(res, query, options);
							});
						}
					}, function(err){
						_this._fetchHandle = null;
						if(!_this._cancelingQuery){	// don't treat canceled query as an error
							console.error(_this.declaredClass + ' ' + err.toString());
						}
					});
				};

			lang.mixin(options, this.fetchProperties);

			// Generate query
			if(this.store._oldAPI){
				// remove this branch for 2.0
				q = qs;
			}else{
				// Query on searchAttr is a regex for benefit of dojo/store/Memory,
				// but with a toString() method to help dojo/store/JsonRest.
				// Search string like "Co*" converted to regex like /^Co.*$/i.
				q = this._patternToRegExp(qs);
				q.toString = function(){ return qs; };
			}

			// set _lastQuery, *then* start the timeout
			// otherwise, if the user types and the last query returns before the timeout,
			// _lastQuery won't be set and their input gets rewritten
			this._lastQuery = query[this.searchAttr] = q;
			this._queryDeferHandle = this.defer(startQuery, this.searchDelay);
		}
	});
});