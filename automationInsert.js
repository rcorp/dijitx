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
		dbcolumn:"account_name",
		type:"text",
		maxlength:30
	},
	{
		dbtable:"account",
		dbcolumn:"account_description",
		type:"text",
		maxlength:100
	},
	{
		dbtable:"account",
		dbcolumn:"account_balance",
		type:"number",
		maxlength:15
	},
	{
		dbtable:"account",
		dbcolumn:"organisation_pk",
		type:"text",
		maxlength:10
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
	},
	{
		dbtable:"account_category",
		dbcolumn:"account_pk",
		type:"number",
		maxlength:10
	},
	{
		dbtable:"account_category",
		dbcolumn:"category_pk",
		type:"number",
		maxlength:10
	},
	{
		dbtable:"category",
		dbcolumn:"category_name",
		type:"text",
		maxlength:100
	},
	{
		dbtable:"category",
		dbcolumn:"organisation_pk",
		type:"text",
		maxlength:10
	}
]

// Input/sample data to insert in the table.ie automation data to be inserted in the database.

var store = [
	{
		"table": "category",
		"category_name":"Account Category",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Account Receivable (Debtors)",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Current Assets",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Bank",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Fixed Assets",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Non Current Assets",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Account Payable (Creditors)",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Credit Cards",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Current Liabilities",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Non- Current Liabilities",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Equity",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Income",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Other Income",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Costs Of Goods Sold",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Expenses",
		"organisation_pk":"*"
	},
	{
		"table": "category",
		"category_name":"Other Expenses",
		"organisation_pk":"*"
	},
	{
		"table":"account",
		"account_name": "Account Receivable (Debtors)",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Assets available for sale",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "development costs",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Employee Cash Advances",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Inventory",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Investments – Other",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Loans to Officers",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Loans to Others",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Accounts of Bad Debts",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other current Assets",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Prepaid Expenses",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Retainage",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Undeposited  Funds",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Cash and Cash Equivalents",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Cash on hands",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Client Trust Account",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Current",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Money market",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Rents held in trust",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Savings",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Accumulated Depreciation",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Accumulated Depletion",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Buildings",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Depletable Assets",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Furniture and fixtures",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Land",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Leasehold improvements",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Machinery And Equipment",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Fixed Assets",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Vehicles",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Accumulated Amortisation of non - current assets",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Assets held for sale",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Deferred Tax",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Goodwill",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Intangible Assets",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Lease Buyout",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Licenses",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Long Term Investment",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Organizational Costs",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Long Time Assets",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Security  Deposits",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Account Payable (Creditors)",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Credit Cards",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Accured Liabilities",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Client Trust Accounts – Liabilities",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Current Liabilities",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Current Portion of Obligations under finance leases",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Dividends Payable",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Income Tax Payable",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Insurance Payable",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Line Of Credit",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Loan Payable",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Current Liabilities",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Payroll Liabilities",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Prepaid Expenses Payable",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Rents in – Liability",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Short Term Provisions",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Accured Holiday Payable",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "AccuredNon Current Liabilities",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Liabiliteis related to assets hold for sale",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Long Term Debt",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Notes Payable",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Non Current Liabilities",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Shareholder Notes Payable",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Accumulated Adjustment",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Dividend Disbursed",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Equity In Earnings Subsidiaries",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Opening Balance Equity",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Ordinary Shares",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Comprehensive Income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Owner's Equity",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Paid in Capital or surplus",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Partner Contributions",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Partner's Equity",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Preferred Shares",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Retained Earnings",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Share Capital",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Treasury Shares",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Discounts/refunds Given",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Non Profit income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Primary Income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Revenue General",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Sales – Retail",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Sales –Wholesale",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Sales of product Income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Service/Fee Income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Unapplied Cash Payment Income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Dividend Income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Interest Earned",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Loss on Disposal of assets",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Investment income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other miscellaneous income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other operating income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Tax exempt income",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Unrealized loss on securities",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Equipment Rental – COS",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Freight and Delivery –COS",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Costs of sales – COS",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Salaries and wages",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Supplies and materials – COS",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Advertising/Promotions",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Amortisation Expense",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Auto",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Bad Debts",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Bank Charges",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Charitable Contributions",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Commissions and Fees",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Cost of Labor",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Dues and subscriptions",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Equipment Rental",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Finance Costs",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Income Tax Costs",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Insurance",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Interest Paid",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Legal and Professional Fees",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Loss on Discontinued operations",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Management Compensation",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Meals and Entertainment",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Office Expenses",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Miscellaneous Service Costs",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Selling Expenses",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Rent or Lease of Buildings",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Repair and maintenance",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Shipping and delivery Expense",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Supplies and materials",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Taxes Paid",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Travel Expenses",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Unapplied Cash Bill Payment",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Utilities",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Amortisation",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Depreciation",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Exchange on gain or loss",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Other Expense",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account",
		"account_name": "Penalties and settlements",
		"account_description":"",
		"account_balance":"",
		"organisation_pk": "*"
	},
	{
		"table":"account_category",
		"account_pk":"1",
		"category_pk":"1"
	},
	{
		"table":"account_category",
		"account_pk":"2",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"3",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"4",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"5",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"6",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"7",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"8",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"9",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"10",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"11",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"12",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"13",
		"category_pk":"2"
	},
	{
		"table":"account_category",
		"account_pk":"14",
		"category_pk":"3"
	},
	{
		"table":"account_category",
		"account_pk":"15",
		"category_pk":"3"
	},
	{
		"table":"account_category",
		"account_pk":"16",
		"category_pk":"3"
	},
	{
		"table":"account_category",
		"account_pk":"17",
		"category_pk":"3"
	},
	{
		"table":"account_category",
		"account_pk":"18",
		"category_pk":"3"
	},
	{
		"table":"account_category",
		"account_pk":"19",
		"category_pk":"3"
	},
	{
		"table":"account_category",
		"account_pk":"20",
		"category_pk":"3"
	},
	{
		"table":"account_category",
		"account_pk":"21",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"22",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"23",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"24",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"25",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"26",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"27",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"28",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"29",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"30",
		"category_pk":"4"
	},
	{
		"table":"account_category",
		"account_pk":"31",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"32",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"33",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"34",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"35",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"36",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"37",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"38",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"39",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"40",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"41",
		"category_pk":"5"
	},
	{
		"table":"account_category",
		"account_pk":"42",
		"category_pk":"6"
	},
	{
		"table":"account_category",
		"account_pk":"43",
		"category_pk":"7"
	},
	{
		"table":"account_category",
		"account_pk":"44",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"45",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"46",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"47",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"48",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"49",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"50",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"51",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"52",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"53",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"54",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"55",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"56",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"57",
		"category_pk":"8"
	},
	{
		"table":"account_category",
		"account_pk":"58",
		"category_pk":"9"
	},
	{
		"table":"account_category",
		"account_pk":"59",
		"category_pk":"9"
	},
	{
		"table":"account_category",
		"account_pk":"60",
		"category_pk":"9"
	},
	{
		"table":"account_category",
		"account_pk":"61",
		"category_pk":"9"
	},
	{
		"table":"account_category",
		"account_pk":"62",
		"category_pk":"9"
	},
	{
		"table":"account_category",
		"account_pk":"63",
		"category_pk":"9"
	},
	{
		"table":"account_category",
		"account_pk":"64",
		"category_pk":"9"
	},
	{
		"table":"account_category",
		"account_pk":"65",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"66",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"67",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"68",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"69",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"70",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"71",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"72",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"73",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"74",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"75",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"76",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"77",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"78",
		"category_pk":"10"
	},
	{
		"table":"account_category",
		"account_pk":"79",
		"category_pk":"11"
	},
	{
		"table":"account_category",
		"account_pk":"80",
		"category_pk":"11"
	},
	{
		"table":"account_category",
		"account_pk":"81",
		"category_pk":"11"
	},
	{
		"table":"account_category",
		"account_pk":"82",
		"category_pk":"11"
	},
	{
		"table":"account_category",
		"account_pk":"83",
		"category_pk":"11"
	},
	{
		"table":"account_category",
		"account_pk":"84",
		"category_pk":"11"
	},
	{
		"table":"account_category",
		"account_pk":"85",
		"category_pk":"11"
	},
	{
		"table":"account_category",
		"account_pk":"86",
		"category_pk":"11"
	},
	{
		"table":"account_category",
		"account_pk":"87",
		"category_pk":"11"
	},
	{
		"table":"account_category",
		"account_pk":"88",
		"category_pk":"12"
	},
	{
		"table":"account_category",
		"account_pk":"89",
		"category_pk":"12"
	},
	{
		"table":"account_category",
		"account_pk":"90",
		"category_pk":"12"
	},
	{
		"table":"account_category",
		"account_pk":"91",
		"category_pk":"12"
	},
	{
		"table":"account_category",
		"account_pk":"92",
		"category_pk":"12"
	},
	{
		"table":"account_category",
		"account_pk":"93",
		"category_pk":"12"
	},
	{
		"table":"account_category",
		"account_pk":"94",
		"category_pk":"12"
	},
	{
		"table":"account_category",
		"account_pk":"95",
		"category_pk":"12"
	},
	{
		"table":"account_category",
		"account_pk":"96",
		"category_pk":"13"
	},
	{
		"table":"account_category",
		"account_pk":"97",
		"category_pk":"13"
	},
	{
		"table":"account_category",
		"account_pk":"98",
		"category_pk":"13"
	},
	{
		"table":"account_category",
		"account_pk":"99",
		"category_pk":"13"
	},
	{
		"table":"account_category",
		"account_pk":"100",
		"category_pk":"13"
	},
	{
		"table":"account_category",
		"account_pk":"101",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"102",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"103",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"104",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"105",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"106",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"107",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"108",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"109",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"110",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"111",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"112",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"113",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"114",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"115",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"116",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"117",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"118",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"119",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"120",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"121",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"122",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"123",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"124",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"125",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"126",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"127",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"128",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"129",
		"category_pk":"14"
	},
	{
		"table":"account_category",
		"account_pk":"130",
		"category_pk":"15"
	},
	{
		"table":"account_category",
		"account_pk":"131",
		"category_pk":"15"
	},
	{
		"table":"account_category",
		"account_pk":"132",
		"category_pk":"15"
	},
	{
		"table":"account_category",
		"account_pk":"133",
		"category_pk":"15"
	},
	{
		"table":"account_category",
		"account_pk":"134",
		"category_pk":"15"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"1"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"2"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"3"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"4"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"5"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"6"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"7"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"8"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"9"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"10"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"11"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"12"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"13"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"14"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"15"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"16"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"17"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"18"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"19"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"20"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"21"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"22"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"23"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"24"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"25"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"26"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"27"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"28"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"29"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"30"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"31"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"32"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"33"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"34"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"35"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"36"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"37"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"38"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"39"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"40"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"41"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"42"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"43"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"44"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"45"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"46"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"47"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"48"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"49"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"50"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"51"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"52"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"53"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"54"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"55"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"56"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"57"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"58"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"59"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"60"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"61"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"62"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"63"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"64"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"65"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"66"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"67"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"68"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"69"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"70"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"71"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"72"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"73"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"74"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"75"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"76"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"77"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"78"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"79"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"80"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"81"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"82"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"83"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"84"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"85"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"86"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"87"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"88"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"89"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"90"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"91"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"92"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"93"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"94"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"95"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"96"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"97"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"98"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"99"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"100"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"101"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"102"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"103"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"104"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"105"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"106"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"107"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"108"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"109"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"110"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"111"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"112"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"113"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"114"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"115"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"116"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"117"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"118"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"119"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"120"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"121"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"122"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"123"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"124"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"125"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"126"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"127"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"128"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"129"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"130"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"131"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"132"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"133"
	},
	{
		"table":"account_account",
		"account_parent": "0",
		"account_children":"134"
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
