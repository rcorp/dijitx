// Require the mysql
var mysql = require('mysql');

// Create a connection with mysql.
var connection =  mysql.createConnection({
	host: "localhost",
	user: "root",
	password: ""
});


// Stablish the connection.
connection.connect(function(err) {
	if (err) {
		console.warn('connection failed!', err);
	} else {
		//console.log('connection established! 1');
	}
});

// Run the squl query to Create test data base if not exists for automation data. 
connection.query("CREATE DATABASE IF NOT EXISTS aspire", function(err) {
	if (err) {
		console.warn('connection failed!', err);
	} else {
		//console.log('connection established! 2');
	}
});

// If database exists then use it.
connection.query("USE aspire", function(err) {
	if (err) {
		console.warn('connection failed!', err);
	} else {
		//console.log('connection established! 3');
	}
});

/**
 * Run the given sql query.
 * @param  {String} runQuery Sql query to be run.
 */
var runSqlQuery = function(runQuery){
	console.log(runQuery)
	connection.query(runQuery, function(err) {
		if (err) {
			console.warn('connection failed!', err);
		} else {
			//console.log('connection established! 3');
		}
	});	
}
// Sample input json which define the table ,column and related infomation to create a table in the database.
/*
var inputFields=[
	{
		dbtable:"country",
		dbcolumn:"name",
		type:"text",
		maxlength:30
	},
	{
		dbtable:"country",
		dbcolumn:"code",
		type:"text",
		maxlength:30
	},
	{
		dbtable:"country",
		dbcolumn:"organisation_pk",
		type:"text",
		maxlength:10
	}
]
*/

var inputFields=[
	{
		dbtable:"country_state",
		dbcolumn:"country_pk",
		type:"text",
		maxlength:30
	},
	{
		dbtable:"country_state",
		dbcolumn:"state_pk",
		type:"text",
		maxlength:30
	}
]
 
// Input/sample data to insert in the table.ie automation data to be inserted in the database.
 
var store = [
	{
		"country_pk":"1",
		"state_pk":"1"
	},
	{
		"country_pk":"1",
		"state_pk":"2"
	},
	{
		"country_pk":"1",
		"state_pk":"3"
	},
	{
		"country_pk":"1",
		"state_pk":"4"
	},
	{
		"country_pk":"1",
		"state_pk":"5"
	},
	{
		"country_pk":"1",
		"state_pk":"6"
	},
	{
		"country_pk":"1",
		"state_pk":"7"
	},
	{
		"country_pk":"1",
		"state_pk":"8"
	},
	{
		"country_pk":"1",
		"state_pk":"9"
	},
	{
		"country_pk":"1",
		"state_pk":"10"
	},
	{
		"country_pk":"1",
		"state_pk":"11"
	},
	{
		"country_pk":"1",
		"state_pk":"12"
	},
	{
		"country_pk":"1",
		"state_pk":"13"
	},
	{
		"country_pk":"1",
		"state_pk":"14"
	},
	{
		"country_pk":"1",
		"state_pk":"15"
	},
	{
		"country_pk":"1",
		"state_pk":"16"
	},
	{
		"country_pk":"1",
		"state_pk":"17"
	},
	{
		"country_pk":"1",
		"state_pk":"18"
	},
	{
		"country_pk":"1",
		"state_pk":"19"
	},
	{
		"country_pk":"1",
		"state_pk":"20"
	},
	{
		"country_pk":"1",
		"state_pk":"21"
	},
	{
		"country_pk":"1",
		"state_pk":"22"
	},
	{
		"country_pk":"1",
		"state_pk":"23"
	},
	{
		"country_pk":"1",
		"state_pk":"24"
	},
	{
		"country_pk":"1",
		"state_pk":"25"
	}
]
// var table = "country"
var table = "country_state"

// Function to get the sql data type for the attributes.
var getType = function(sqltype, len) {
	switch (sqltype) {
		case "number":
		case "text":
			{
				return ("VARCHAR (" + len + ")");
			}
		case "enumeration":
			{
				return ("ENUM('" + options.join("', '") + "')")
			}
		case "date":
			{
				return ("VARCHAR (" + len + ")");
			}
		case "longtext":
			{
				return "LONGTEXT";
			}
		case "bool":
			{
				return ("bit (" + len + ")");
			}
		case "password":
			{
				return ("VARCHAR (" + len + ")");
			}
		case "image":
			{
				return "VARCHAR(10)";
			}
		case "alphanumeric":
			{
				return ("VARCHAR (" + len + ")");
			}
		case "url":
			{
				return ("VARCHAR (" + len + ")");
			}
		case "time":
			{
				return ("VARCHAR (" + len + ")");
			}
		case "Number":
	}
}

/**
 * Get the table, column and column related information.
 * @param  {Array} fields Define the table columns and related information
 * @return {Array} Return table, column and column related information
 */
var getTableColumn = function(fields){
	var allTable =[];
	var dataTable={}
	var tableInfo = [];
	var dbInfo=[];

	// Loop to get the uniquely define tables.
	for(var data in fields){	
		if (allTable.indexOf(fields[data].dbtable) == -1) {
			allTable.push(fields[data].dbtable)
			dataTable={};
			dataTable.table = fields[data].dbtable;
			tableInfo.push(dataTable)
		}
	}

	// Loop to get the column(s) for the respective table(s). 
	for (var each in tableInfo){
		var finaldata={};
		var columns=[];
		for(var data in fields){	
			var columnInfo ={}; 
			if(tableInfo[each].table == fields[data].dbtable ){
				columnInfo.columnName = fields[data].dbcolumn;
				columnInfo.maxlength = 	fields[data].maxlength;
				columnInfo.type = 	fields[data].type;
				columns.push(columnInfo)
			}
		}	
		finaldata.tableName = tableInfo[each].table;
		finaldata.columns = columns;
		dbInfo.push(finaldata)
	}
	return dbInfo;	
}

/**
 * Generate the CREATE sql quey statment. 
 * @param  {Array} fields Define the table columns and related information
 * @return {String} CREATE sql query to create table(s) in the database.        
 */
var getCreateSqlQuery = function(fields){
	
	// Array valiable to store the respective data ie table and columns and related information needed to create the sql query.
	// eg.
	//  [
	//  	{ 
	//  		tableName: 'country',
	// 			columns: [ 
	//  			{ 
	//  				columnName: 'country_name',
	//  				maxlength: 30,
	//  				type: 'text'
	//  			}
	//  		] 
	//  	},
	// 		{ 
	// 			tableName: 'city',
	// 			columns: [ 
	// 				{ 
	// 					columnName: 'city_id',
	// 					maxlength: 30,
	// 					type: 'text'
	// 				},
	// 				{ 
	// 					columnName: 'city_name',
	// 					maxlength: 30,
	// 					type: 'text'
	// 				}
	// 			] 
	// 		},
	// 		{
	// 			tableName: 'state',
	//   		columns: [
	//   			{
	//   				columnName: 'state_name',
	//   				maxlength: 30,
	//   				type: 'text'
	//   			}
	//   		] 
	//   	}
	//   ]
	var dbInfo = getTableColumn(fields);

	var queryString = '';
	// Loop to create sql query which create a table in database
	for(var each in dbInfo){
		var table = dbInfo[each];
		queryString = "CREATE TABLE IF NOT EXISTS " + table.tableName + "(" + table.tableName+"_pk INT PRIMARY KEY AUTO_INCREMENT NOT NULL,";
		// Loop to concatinate columns in the sql query.	
		for(var eachColumn in table.columns){
			var column = table.columns[eachColumn];
			// When column is not last column in the table.
			if(eachColumn != table.columns.length-1){
				queryString = queryString + column.columnName + " " + getType(column.type, column.maxlength) +","; 
			}
			// When column is last column in the table.
			else {
				queryString = queryString + column.columnName + " " + getType(column.type, column.maxlength); 	
			}
		}
		queryString = queryString + " )";
		// Run the sql query.
		runSqlQuery(queryString);
	}
}

/**
 * Get the length of object.
 * @param  {Object} data Object whose length is to find.
 * @return {Number} Return the length of object.
 */
var getLength = function(data){
	var count =0;
	for(var i in data){
		count = count + 1;
	}
	return count;
}

/**
 * Generate the CREATE sql quey statment
 * @param  {Array} store It is the data to be inserted in the database.
 * @return {String} INSERT sql query to insert data in database.
 */
var getInsertSqlQuery = function(data, isRelationShipTable){
	var insertQuery= 'INSERT INTO ' + table +' (';
	for(each in data) {
		insertQuery = insertQuery + each + ",";
	}
	if(isRelationShipTable) {
		insertQuery = insertQuery.substr(0,insertQuery.length-1)		
	} else {
		insertQuery = insertQuery + "organisation_pk" ;
	}

	insertQuery = insertQuery + ')';
	insertQuery = insertQuery + ' VALUES (';

	for(each in data) {
		if(data[each] == "") {
			data[each] = null;
		}
		insertQuery = insertQuery +'"'+data[each] + '"' + ",";
	}

	if(isRelationShipTable) {
		insertQuery = insertQuery.substr(0,insertQuery.length-1)		
	} else {
		insertQuery = insertQuery + '"*"' ;
	}

	insertQuery = insertQuery + ')';
	return insertQuery;
}

/**
 * Insert the data in database.
 * @param  {Array} store Define the data to be inserted.
 */
var insertData = function (store){
	for (var data in store){
		var insertQuery = getInsertSqlQuery(store[data], true);
		console.log(insertQuery)
		runSqlQuery(insertQuery);   
	}	
}

// getCreateSqlQuery(inputFields);

insertData(store);
