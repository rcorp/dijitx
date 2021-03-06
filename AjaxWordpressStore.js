define(["dojo/_base/declare", "dojo/store/JsonRest", "dojo/_base/lang", "dojo/request/xhr", "dojo/io-query", "dojo/_base/config", "dojo/store/util/QueryResults", "dojo/store/util/SimpleQueryEngine" /*=====, "./api/Store" =====*/
], function(declare, JsonRest, lang, xhr, ioQuery, config, QueryResults, SimpleQueryEngine /*=====, Store =====*/){

var base = JsonRest;
/*===== base = Store; =====*/

/*=====
var __HeaderOptions = {
		// headers: Object?
		//		Additional headers to send along with the request.
	},
	__PutDirectives = declare(Store.PutDirectives, __HeaderOptions),
	__QueryOptions = declare(Store.QueryOptions, __HeaderOptions);
=====*/

return declare("dijitx.AjaxWordpressStore", base, {
	// summary:
	//		This is a basic store for RESTful communicating with a server through JSON
	//		formatted data. It implements dojo/store/api/Store.

	constructor: function(options){
		// summary:
		//		This is a basic store for RESTful communicating with a server through JSON
		//		formatted data.
		// options: dojo/store/JsonRest
		//		This provides any configuration information that will be mixed into the store
		this.headers = {};
		declare.safeMixin(this, options);
		this.target = config.wordpressUrl || this.target;
	},

	entity: '',
	data : [],
	queryEngine: SimpleQueryEngine,


	get: function(id, options){
		// summary:
		//		Retrieves an object by its identity. This will trigger a GET request to the server using
		//		the url `this.target + id`.
		// id: Number
		//		The identity to use to lookup the object
		// options: Object?
		//		HTTP headers. For consistency with other methods, if a `headers` key exists on this object, it will be
		//		used to provide HTTP headers instead.
		// returns: Object
		//		The object in the store that matches the given id.
		options = options || {};
		var headers = lang.mixin({ Accept: this.accepts }, this.headers, options.headers || options);
		console.log ('target is', this.target)
		return xhr(this.target, {
			query: {
				action: 'get_' + this.entity
			},
			method: 'GET',
			handleAs: "json",
			headers: headers
		});
	},
	query: function(query, options){
		var _this = this;
		//In whatever we are querying we have to find something* to do a local filter.
		for (var key in query){
			if (/[\w\s]+(?=\*)/.test(query[key]) && this.data.length != 0){
				//Make an object with just the key for the * element
				var localQuery = {};
				localQuery[key] = query[key];
				return QueryResults(this.queryEngine(localQuery, options)(this.data));
			}
		}

		//Capture the xhr request as a deferred.
		var d = xhr(this.target, {
			query: lang.mixin({
				action: 'query_' + this.entity,
			}, query),
			method: 'GET',
			handleAs: "json"
		});

		//Cache results from backend into this.data[]
		d.then(function (results){
			_this.data = results;
		})

		return d;
	},
	remove: function(object, options){
		// summary:
		//		Deletes an object by its identity. This will trigger a DELETE request to the server.
		// object: Object
		//		The object to store.
		// options: __HeaderOptions?
		//		HTTP headers.
		options = options || {};
		return xhr(this.target, {
			query: lang.mixin({
				action: 'remove_' + this.entity,
			}, object),
		});
	},
	add: function(object, options){
		// summary:
		//		Adds an object. This will trigger a PUT request to the server
		//		if the object has an id, otherwise it will trigger a POST request.
		// object: Object
		//		The object to store.
		// options: __PutDirectives?
		//		Additional metadata for storing the data.  Includes an "id"
		//		property if a specific id is to be used.
		return xhr(this.target, {
			query: lang.mixin({
				action: 'add_' + this.entity,
			}, object),
			method: 'GET',
			handleAs: "json"
		});
	},
	put: function(object, options){
		// summary:
		//		Adds an object. This will trigger a PUT request to the server
		//		if the object has an id, otherwise it will trigger a POST request.
		// object: Object
		//		The object to store.
		// options: __PutDirectives?
		//		Additional metadata for storing the data.  Includes an "id"
		//		property if a specific id is to be used.
		return xhr(this.target, {
			query: lang.mixin({
				action: 'put_' + this.entity,
			}, object),
			method: 'GET',
			handleAs: "json"
		});
	}
				
});

});