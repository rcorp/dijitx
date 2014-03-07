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
var inputFields=[
	{
		dbtable:"account",
		dbcolumn:"name",
		type:"text",
		maxlength:30
	},
	{
		dbtable:"account",
		dbcolumn:"description",
		type:"text",
		maxlength:100
	},
	{
		dbtable:"account",
		dbcolumn:"balance",
		type:"number",
		maxlength:15
	},
	{
		dbtable:"account_account",
		dbcolumn:"account_parent",
		type:"number",
		maxlength:10
	},
	{
		dbtable:"account_account",
		dbcolumn:"account_children",
		type:"number",
		maxlength:10
	}
]

// Input/sample data to insert in the table.ie automation data to be inserted in the database.

var store = [
	{
		table: 'account',
		name: 'Balance Sheet Accounts',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: 'Asset accounts',
		description: '',
		balance: ''																																																																																																																																																																																																																																																																																																	
	},
	{
		table: 'account',
		name: '1000 Immaterial assets',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '1100 Buildings and land assets',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '1200 Inventories, Machines, Vehicles & Equipment assets',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '1300 Financial relations with other near companies',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '1400 Stored products and work in progress',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '1500-1699 Receivables',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '1700 Pre-payments and accrued income',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '1800 Securities market assets',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '1900 Cash & Bank Accounts',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: 'Liabilities accounts',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '2000 Equity 1',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '2100 Reserves',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '2200 Deposits (staff pensions etc.)',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '2300 Loans',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '2400 Short debts (payables 2440)',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '2500 Income Tax Payable',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '2600 VAT Payable',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '2700 Staff income Payable',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '2800-2999 other liabilities',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: 'Profit & Loss accounts',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: 'Revenue accounts',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '3000 Revenue Accounts',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: 'Expense accounts',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '4000 Costs directly related to revenues',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '5000-7999 General expense Accounts',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '8000 Financial Accounts',
		description: '',
		balance: ''
	},
	{
		table: 'account',
		name: '9000 Contra-accounts',
		description: '',
		balance: ''
	},
	{
		table:'account_account',
		account_parent:'0',
		account_children:'1'
	},
	{
		table:'account_account',
		account_parent:'1',
		account_children:'2'
	},
	{
		table:'account_account',
		account_parent:'2',
		account_children:'3'
	},
	{
		table:'account_account',
		account_parent:'2',
		account_children:'4'
	},
	{
		table:'account_account',
		account_parent:'2',
		account_children:'5'
	},
	{
		table:'account_account',
		account_parent:'2',
		account_children:'6'
	},
	{
		table:'account_account',
		account_parent:'2',
		account_children:'7'
	},
	{
		table:'account_account',
		account_parent:'2',
		account_children:'8'
	},
	{
		table:'account_account',
		account_parent:'2',
		account_children:'9'
	},
	{
		table:'account_account',
		account_parent:'2',
		account_children:'10'
	},
	{
		table:'account_account',
		account_parent:'2',
		account_children:'11'
	},
	{
		table:'account_account',
		account_parent:'1',
		account_children:'12'
	},
	{
		table:'account_account',
		account_parent:'12',
		account_children:'13'
	},
	{
		table:'account_account',
		account_parent:'12',
		account_children:'14'
	},
	{
		table:'account_account',
		account_parent:'12',
		account_children:'15'
	},
	{
		table:'account_account',
		account_parent:'12',
		account_children:'16'
	},
	{
		table:'account_account',
		account_parent:'12',
		account_children:'17'
	},
	{
		table:'account_account',
		account_parent:'12',
		account_children:'18'
	},
	{
		table:'account_account',
		account_parent:'12',
		account_children:'19'
	},
	{
		table:'account_account',
		account_parent:'12',
		account_children:'20'
	},
	{
		table:'account_account',
		account_parent:'12',
		account_children:'21'
	},
	{
		table:'account_account',
		account_parent:'0',
		account_children:'22'
	},
	{
		table:'account_account',
		account_parent:'22',
		account_children:'23'
	},
	{
		table:'account_account',
		account_parent:'23',
		account_children:'24'
	},
	{
		table:'account_account',
		account_parent:'22',
		account_children:'25'
	},
	{
		table:'account_account',
		account_parent:'25',
		account_children:'26'
	},
	{
		table:'account_account',
		account_parent:'25',
		account_children:'27'
	},
	{
		table:'account_account',
		account_parent:'25',
		account_children:'28'
	},
	{
		table:'account_account',
		account_parent:'25',
		account_children:'29'
	}
]

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
var getInsertSqlQuery = function(data){
    var insertQuery= 'INSERT INTO ' + data.table +' (';
	objectLength=getLength(data);
    var count =0 ;
    for(var i in data){
    	count = count + 1;
   		if(i != "table"){
   			if(count!=objectLength){
   				insertQuery = insertQuery + i ;
 		       	insertQuery = insertQuery + ",";	
   			}
    		else {
    			insertQuery = insertQuery + i ;
    		}	
    	}
    }
    insertQuery = insertQuery + ')';
    insertQuery = insertQuery + ' VALUES (';
    var count =0 ;
    for(var i in data){
    	count = count + 1;
        if(i != "table"){
        	if(data[i]==''){
        		data[i]=null;
        	}
            if(count!=objectLength){
            	insertQuery = insertQuery +'"'+data[i] + '"' ;
            	insertQuery = insertQuery + ",";
            }
            else {
            	insertQuery = insertQuery +'"'+data[i] + '"' ;
            }			 		
        }
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
		var insertQuery = getInsertSqlQuery(store[data]);
		runSqlQuery(insertQuery);   
	}	
}

getCreateSqlQuery(inputFields);

insertData(store);
