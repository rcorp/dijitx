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
		maxlength:1000
	},
	{
		dbtable:"account",
		dbcolumn:"account_balance",
		type:"text",
		maxlength:1000
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
	},
	{
		dbtable:"reportingmethod",
		dbcolumn:"method_name",
		type:"text",
		maxlength:10
	},
	{
		dbtable:"reportingmethod",
		dbcolumn:"organisation_pk",
		type:"text",
		maxlength:10
	},
	{
		dbtable:"fillingfrequency",
		dbcolumn:"frequency_name",
		type:"text",
		maxlength:10
	},
	{
		dbtable:"fillingfrequency",
		dbcolumn:"organisation_pk",
		type:"text",
		maxlength:10
	}
]

// Input/sample data to insert in the table.ie automation data to be inserted in the database.

var store = [
	{
		"table": "category",
		"category_name": "Account Receivable (Debtors)",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Current Assets",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Bank",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Fixed Assets",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Non-Current Assets",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Account Payable (Creditors)",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Credit Cards",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Current Liabilities",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Non- Current Liabilities",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Equity",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Income",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Other Income",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Costs of Goods Sold",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Expenses",
		"organisation_pk": "*"
	},
	{
		"table": "category",
		"category_name": "Other Expenses",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Account Receivable (Debtors)",
		"account_description": "Accounts receivable (Debtors) tracks money that customers owe you for products or services, and payments customers make. Aspire automatically creates one Accounts receivable (Debtors) account for you. Most businesses need only one.Each customer has a register, which functions like a Accounts receivable (Debtors) account for each customer.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Assets available for sale",
		"account_description": "Use Assets available for sale to track assets that are available for sale that are not expected to be held for a long period of time.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Development costs",
		"account_description": "Use Development costs to track amounts you deposit or set aside to arrange for financing, such as an SBA loan, or for deposits in anticipation of the purchase of property or other assets.When the deposit is refunded, or the purchase takes place, remove the amount from this account.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Employee Cash Advances",
		"account_description": "Use Employee cash advances to track employee wages and salary you issue to an employee early, or other non-salary money given to employees.If you make a loan to an employee, use the Current asset account type called Loans to others, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Inventory",
		"account_description": "Use Inventory to track the cost of goods your business purchases for resale.When the goods are sold, assign the sale to aCost of goods sold account.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Investments– Other",
		"account_description": "Use Investments - Other to track the value of investments not covered by other investment account types. Examples include publicly-traded shares, coins, or gold.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Loans to Officers",
		"account_description": "If you operate your business as a Corporation, use Loans to officers to track money loaned to officers of your business.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Loans to Others",
		"account_description": "Use Loans to others to track money your business loans to other people or businesses.This type of account is also referred to as Notes Receivable.For early salary payments to employees, use Employee cash advances, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Loans to Shareholders",
		"account_description": "If you operate your business as a Corporation, use Loans to Shareholders to track money your business loans to its shareholders.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other current Assets",
		"account_description": "Use other current assets for current assets not covered by the other types. Current assets are likely to be converted to cash or used up in a year.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Prepaid Expenses",
		"account_description": "Use Prepaid expenses to track payments for expenses that you won’t recognize until your next accounting period. When you recognize the expense, make a journal entry to transfer money from this account to the expense account.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Retainage",
		"account_description": "Use Retainage if your customers regularly hold back a portion of a contract amount until you have completed a project.This type of account is often used in the construction industry, and only if you record income on an accrual basis.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Undeposited  Funds",
		"account_description": "Use Undeposited funds for cash or cheques from sales that haven’t been deposited yet.For petty cash, use Cash on hand, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Cash and Cash Equivalents",
		"account_description": "Use Cash and Cash Equivalents to track cash or assets that can be converted into cash immediately. For example, marketable securities and Treasury bills",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Cash on hands",
		"account_description": "Use a Cash on hand account to track cash your company keeps for occasional expenses, also called petty cash.To track cash from sales that have not been deposited yet, use a pre-created account called Undeposited funds, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Client Trust Account",
		"account_description": "Use Client trust accounts for money held by you for the benefit of someone else.For example, client trust accounts are often used by lawyers to keep track of expense money their customers have given them.Often, to keep the amount in a client trust account from looking like it’s yours, the amount is offset in a contra liability account (a Current Liability).",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Current",
		"account_description": "Use Current accounts to track all your chequing activity, including debit card transactions.Each current account your company has at a bank or other financial institution should have its own Current type account in Aspire.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Money market",
		"account_description": "Use Money market to track amounts in money market accounts.For investments, see Current Assets, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Rents held in trust",
		"account_description": "Use Rents held in trust to track deposits and rent held on behalf of the property owners.Typically only property managers use this type of account.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Savings",
		"account_description": "Use Savings accounts to track your savings and CD activity.Each savings account your company has at a bank or other financial institution should have its own Savings type account.For investments, see Current Assets, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Accumulated Depreciation",
		"account_description": "Use Accumulated depreciation to track how much you depreciate a fixed asset (a physical asset you do not expect to convert to cash during one year of normal operations).",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Accumulated Depletion",
		"account_description": "Use Accumulated depletion to track how much you deplete a natural resource.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Buildings",
		"account_description": "Use Buildings to track the cost of structures you own and use for your business. If you have a business in your home, consult your accountant.Use a Land account for the land portion of any real property you own, splitting the cost of the property between land and building in a logical method. A common method is to mimic the land-to-building ratio on the property tax statement.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Depletable Assets",
		"account_description": "Use Depletable assets to track natural resources, such as timberlands, oil wells, and mineral deposits.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Furniture and fixtures",
		"account_description": "Use Furniture and fixtures to track any furniture and fixtures your business owns and uses, like a dental chair or sales booth.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Land",
		"account_description": "Use Land to track assets that are not easily convertible to cash or not expected to become cash within the next year. For example, leasehold improvements.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Leasehold improvements",
		"account_description": "Use Leasehold improvements to track improvements to a leased asset that increases the asset’s value. For example, if you carpet a leased office space and are not reimbursed, that’s a leasehold improvement.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Machinery And Equipment",
		"account_description": "Use Machinery and equipment to track computer hardware, as well as any other non-furniture fixtures or devices owned and used for your business.This includes equipment that you ride, like tractors and lawn mowers. Cars and trucks, however, should be tracked with Vehicle accounts, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Fixed Assets",
		"account_description": "Use Other fixed asset for fixed assets that are not covered by other asset types.Fixed assets are physical property that you use in your business and that you do not expect to convert to cash or be used up during one year of normal operations.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Vehicles",
		"account_description": "Use Vehicles to track the value of vehicles your business owns and uses for business. This includes off-road vehicles, air planes, helicopters, and boats.If you use a vehicle for both business and personal use, consult your accountant to see how you should track its value.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Accumulated Amortisation of non - current assets",
		"account_description": "Use Accumulated amortisation of non-current assets to track how much you’ve amortised an asset whose type is Non-Current Asset.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Assets held for sale",
		"account_description": "Use Assets held for sale to track assets of a company that are available for sale that are not expected to be held for a long period of time.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Deferred Tax",
		"account_description": "Use Deferred tax for tax liabilities or assets that are to be used in future accounting periods.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Goodwill",
		"account_description": "Use Goodwill only if you have acquired another company. It represents the intangible assets of the acquired company which gave it an advantage, such as favorable government relations, business name, outstanding credit ratings, location, superior management, customer lists, product quality, or good labor relations.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Intangible Assets",
		"account_description": "Use Intangible assets to track intangible assets that you plan to amortise. Examples include franchises, customer lists, copyrights, and patents",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Lease Buyout",
		"account_description": "Use Lease buyout to track lease payments to be applied toward the purchase of a leased asset.You don’t track the leased asset itself until you purchase it.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Licenses",
		"account_description": "Use Licenses to track non-professional licenses for permission to engage in an activity, like selling alcohol or radio broadcasting.For fees associated with professional licenses granted to individuals, use a Legal and professional fees expense account, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Long Term Investment",
		"account_description": "Use Long-term investments to track investments that have a maturity date of longer than one year.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Organizational Costs",
		"account_description": "Use Organizational costs to track costs incurred when forming a partnership or corporation.The costs include the legal and accounting costs necessary to organize the company, facilitate the filings of the legal documents, and other paperwork.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Long Time Assets",
		"account_description": "Use Other long-term assets to track assets not covered by other types.Long-term assets are expected to provide value for more than one year.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Security Deposits",
		"account_description": "Use Security deposits to track funds you’ve paid to cover any potential costs incurred by damage, loss, or theft.The funds should be returned to you at the end of the contract.If you collect deposits, use an other current liabilities account (a Current liability account).",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Account Payable (Creditors)",
		"account_description": "Accounts payable (Creditors) tracks amounts you owe to your suppliers.Aspire automatically creates one Accounts Payable (Creditors) account for you. Most businesses need only one.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Credit Cards",
		"account_description": "Credit card accounts track the balance due on your business credit cards.Create one Credit card account for each credit card account your business uses.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Accured Liabilities",
		"account_description": "Use Accrued Liabilities to track expenses that a business has incurred but has not yet paid. For example, pensions for companies that contribute to a pension fund for their employees for their retirement.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Client Trust Accounts– Liabilities",
		"account_description": "Use Client Trust accounts - liabilities to offset Client Trust accounts in assets.Amounts in these accounts are held by your business on behalf of others. They do not belong to your business, so should not appear to be yours on your balance sheet. This contra account takes care of that, as long as the two balances match.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Current Liabilities",
		"account_description": "Use Current liabilities to track liabilities due within the next twelve months that do not fit the Current liability account types.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Current Portion of Obligations under finance leases",
		"account_description": "Use Current portion of obligations under finance leases to track the value of lease payments due within the next 12 months.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Dividends Payable",
		"account_description": "Use Dividends payable to track dividends that are owed to shareholders but have not yet been paid.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Income Tax Payable",
		"account_description": "Use Income tax payable to track monies that are due to pay the company’s income tax liabilities.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Insurance Payable",
		"account_description": "Use Insurance payable to keep track of insurance amounts due.This account is most useful for businesses with monthly recurring insurance expenses.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Line Of Credit",
		"account_description": "Use Line of credit to track the balance due on any lines of credit your business has. Each line of credit your business has should have its own Line of credit account.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Loan Payable",
		"account_description": "Use Loan payable to track loans your business owes which are payable within the next twelve months.For longer-term loans, use the Long-term liability called Notes payable, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Current Liabilities",
		"account_description": "Use Other current liabilities to track monies owed by the company and due within one year.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Payroll Liabilities",
		"account_description": "Use Payroll liabilities to keep track of tax amounts that you owe to government agencies as a result of paying wages. This includes taxes withheld, health care premiums, employment insurance, government pensions, etc. When you forward the money to the government agency, deduct the amount from the balance of this account.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Prepaid Expenses Payable",
		"account_description": "Use Prepaid expenses payable to track items such as property taxes that are due, but not yet deductible as an expense because the period they cover has not yet passed.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Rents in – Liability",
		"account_description": "Use Rents in trust - liability to offset theRents in trust amount in assets.Amounts in these accounts are held by your business on behalf of others. They do not belong to your business, so should not appear to be yours on your balance sheet. This contra account takes care of that, as long as the two balances match.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Short Term Provisions",
		"account_description": "Use Short-term provisions to track current liabilities that have not yet been realized.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Accured Holiday Payable",
		"account_description": "Use Accrued holiday payable to track holiday earned but that has not been paid out to employees.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "AccuredNon-Current Liabilities",
		"account_description": "Use Accrued Non-current liabilities to track expenses that a business has incurred but has not yet paid. For example, pensions for companies that contribute to a pension fund for their employees for their retirement.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Liabilities related to assets held for sale",
		"account_description": "Use Liabilities related to assets held for sale to track any liabilities that are directly related to assets being sold or written off.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Long Term Debt",
		"account_description": "Use Long-term debt to track loans and obligations with a maturity of longer than one year. For example, mortgages.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Notes Payable",
		"account_description": "Use Notes payable to track the amounts your business owes in long-term (over twelve months) loans.For shorter loans, use the Current liability account type called Loan payable, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Non-Current Liabilities",
		"account_description": "Use Other non-current liabilities to track liabilities due in more than twelve months that don’t fit the other Non-Current liability account types.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Shareholder Notes Payable",
		"account_description": "Use Shareholder notes payable to track long-term loan balances your business owes its shareholders.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Accumulated Adjustment",
		"account_description": "Some corporations use this account to track adjustments to owner’s equity that are not attributable to net income.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Dividend Disbursed",
		"account_description": "Use Dividend disbursed to track a payment given to its shareholders out of the company’s retained earnings.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Equity In Earnings Subsidiaries",
		"account_description": "Use Equity in earnings of subsidiaries to track the original investment in shares of subsidiaries plus the share of earnings or losses from the operations of the subsidiary.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Opening Balance Equity",
		"account_description": "As you enter opening balances, Aspire records the amounts in Opening balance equity. This ensures that you have a correct balance sheet for your company, even before you’ve finished entering all your company’s assets and liabilities.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Ordinary Shares",
		"account_description": "Corporations use Ordinary shares to track its ordinary shares in the hands of shareholders. The amount in this account should be the stated (or par) value of the stock.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Comprehensive Income",
		"account_description": "Use Other comprehensive income to track the increases or decreases in income from various businesses that is not yet absorbed by the company.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Owner's Equity",
		"account_description": "Corporations use Owner’s equity to show the cumulative net income or loss of their business as of the beginning of the financial year.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Paid in Capital or surplus",
		"account_description": "Corporations use Paid-in capital to track amounts received from shareholders in exchange for shares that are over and above the shares’ stated (or par) value.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Partner Contributions",
		"account_description": "Partnerships use Partner contributions to track amounts partners contribute to the partnership during the year.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Partner's Equity",
		"account_description": "Partnerships use Partner’s equity to show the income remaining in the partnership for each partner as of the end of the prior year.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Preferred Shares",
		"account_description": "Corporations use this account to track its preferred shares in the hands of shareholders. The amount in this account should be the stated (or par) value of the shares.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Retained Earnings",
		"account_description": "Aspire adds this account when you create your company.Retained earnings tracks net income from previous financial years.Aspire automatically transfers your profit (or loss) to Retained earnings at the end of each financial year.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Share Capital",
		"account_description": "Use Share capital to track the funds raised by issuing shares.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Treasury Shares",
		"account_description": "Corporations use Treasury shares to track amounts paid by the corporation to buy its own shares back from shareholders.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Discounts/Refunds Given",
		"account_description": "Use Discounts/refunds given to track discounts you give to customers.This account typically has a negative balance so it offsets other income.For discounts from suppliers, use an expense account, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Non Profit income",
		"account_description": "Use Non-profit income to track money coming in if you are a non-profit organization.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Primary Income",
		"account_description": "Use Other primary income to track income from normal business operations that doesn’t fall into another Income type.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Revenue General",
		"account_description": "Use Revenue - General to track income from normal business operations that do not fit under any other category.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Sales – Retail",
		"account_description": "Use Sales - retail to track sales of goods/services that have a mark-up cost to consumers.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Sales –Wholesale",
		"account_description": "Use Sales - wholesale to track the sale of goods in quantity for resale purposes. ",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Sales of product Income",
		"account_description": "Use Sales of product income to track income from selling products.This can include all kinds of products, like crops and livestock, rental fees, performances, and food served.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Service/Fee Income",
		"account_description": "Use Service/fee income to track income from services you perform or ordinary usage fees you charge.For fees customers pay you for late payments or other uncommon situations, use an Other Income account type called Other miscellaneous income, instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Unapplied Cash Payment Income",
		"account_description": "Unapplied Cash Payment Income reports the Cash Basis income from customers payments you’ve received but not applied to invoices or charges. In general, you would never use this directly on a purchase or sale transaction.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Dividend Income",
		"account_description": "Use Dividend income to track taxable dividends from investments.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Interest Earned",
		"account_description": "Use Interest earned to track interest from bank or savings accounts, investments, or interest payments to you on loans your business made.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Loss on Disposal of assets",
		"account_description": "Use Loss on disposal of assets to track losses realized on the disposal of assets.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Investment income",
		"account_description": "Use Other investment income to track other types of investment income that isn’t from dividends or interest.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Miscellaneous income",
		"account_description": "Use Other miscellaneous income to track income that isn’t from normal business operations, and doesn’t fall into another Other Income type.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other operating income",
		"account_description": "Use Other operating income to track income from activities other than normal business operations. For example, Investment interest, foreign exchange gains, and rent income.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Tax exempt interest",
		"account_description": "Use Tax-exempt interest to record interest that isn’t taxable, such as interest on money in tax-exempt retirement accounts, or interest from tax-exempt bonds.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Unrealized Loss on securities",
		"account_description": "Use Unrealised loss on securities, net of tax to track losses on securities that have occurred but are yet been realized through a transaction. For example, shares whose value has fallen but that are still being held.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Equipment Rental – COS",
		"account_description": "Use Equipment rental - COS to track the cost of renting equipment to produce products or services.If you purchase equipment, use a Fixed Asset account type called Machinery and equipment.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Freight and Delivery –COS",
		"account_description": "Use Freight and delivery - COS to track the cost of shipping/delivery of obtaining raw materials and producing finished goods for resale.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Costs of sales – COS",
		"account_description": "Use Other costs of sales - COS to track costs related to services or sales that you provide that don’t fall into another Cost of Sales type.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Salaries and wages",
		"account_description": "Use Salaries and Wages to track the cost of paying employees to produce products or supply services.It includes all employment costs, including food and transportation, if applicable.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Supplies and materials",
		"account_description": "Use Supplies and materials - COS to track the cost of raw goods and parts used or consumed when producing a product or providing a service.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Advertising/Promotions",
		"account_description": "Use Advertising/promotional to track money spent promoting your company.You may want different accounts of this type to track different promotional efforts (Yellow Pages, newspaper, radio, flyers, events, and so on).If the promotion effort is a meal, use Promotional meals instead.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Amortisation Expense",
		"account_description": "Use Amortisation expense to track writing off of assets (such as intangible assets or investments) over the projected life of the assets.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Auto",
		"account_description": "Use Auto to track costs associated with vehicles.You may want different accounts of this type to track fuel, repairs, and maintenance.If your business owns a car or truck, you may want to track its value as a Fixed Asset, in addition to tracking its expenses.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Bad Debts",
		"account_description": "Use Bad debt to track debt you have written off. ",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Bank Charges",
		"account_description": "Use Bank charges for any fees you pay to financial institutions.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Charitable Contributions",
		"account_description": "Use Charitable contributions to track gifts to charity.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Commissions and Fees",
		"account_description": "Use Commissions and fees to track amounts paid to agents (such as brokers) in order for them to execute a trade.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Cost of Labor",
		"account_description": "Use Cost of labor to track the cost of paying employees to produce products or supply services.It includes all employment costs, including food and transportation, if applicable.This account is also available as a Cost of Sales (COS) account.Liabilities related to assets held for sale",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Dues and subscriptions",
		"account_description": "Use Dues and subscriptions to track dues and subscriptions related to running your business.You may want different accounts of this type for professional dues, fees for licenses that can’t be transferred, magazines, newspapers, industry publications, or service subscriptions.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Equipment Rental",
		"account_description": "Use Equipment rental to track the cost of renting equipment to produce products or services.This account is also available as a Cost of Sales account.If you purchase equipment, use a Fixed asset account type called Machinery and equipment.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Finance Costs",
		"account_description": "Use Finance costs to track the costs of obtaining loans or credit.Examples of finance costs would be credit card fees, interest and mortgage costs.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Income Tax Expense",
		"account_description": "Use Income tax expense to track income taxes that the company has paid to meet their tax obligations.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Insurance",
		"account_description": "Use Insurance to track insurance payments.You may want different accounts of this type for different types of insurance (auto, general liability, and so on).",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Interest Paid",
		"account_description": "Use Interest paid for all types of interest you pay, including mortgage interest, finance charges on credit cards, or interest on loans.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Legal and Professional Fees",
		"account_description": "Use Legal and professional fees to track money to pay to professionals to help you run your business.You may want different accounts of this type for payments to your accountant, attorney, or other consultants.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Loss on Discontinued operations",
		"account_description": "Use Loss on discontinued operations, net of tax to track the loss realized when a part of the business ceases to operate or when a product line is discontinued.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Management Compensation",
		"account_description": "Use Management compensation to track remuneration paid to Management, Executives and non-Executives. For example, salary, fees, and benefits.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Meals and Entertainment",
		"account_description": "Use Meals and entertainment to track how much you spend on dining with your employees to promote morale.If you dine with a customer to promote your business, use a Promotional meals account, instead.Be sure to include who you ate with and the purpose of the meal when you enter the transaction.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Office Expenses",
		"account_description": "Use Office expenses to track all types of general or office-related expenses.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Miscellaneous Service Costs",
		"account_description": "Use Other miscellaneous service cost to track costs related to providing services that don’t fall into another Expense type.This account is also available as a Cost of Sales (COS) account.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Selling Expenses",
		"account_description": "Use Other selling expenses to track selling expenses incurred that do not fall under any other category.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Rent or Lease of Buildings",
		"account_description": "Use Rent or lease of buildings to track rent payments you make.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Repair and maintenance",
		"account_description": "Use Repair and maintenance to track any repairs and periodic maintenance fees.You may want different accounts of this type to track different types repair & maintenance expenses (auto, equipment, landscape, and so on).",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Shipping and delivery Expense",
		"account_description": "Use Shipping and delivery expense to track the cost of shipping and delivery of goods to customers.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Supplies and materials",
		"account_description": "Use Supplies & materials to track the cost of raw goods and parts used or consumed when producing a product or providing a service.This account is also available as a Cost of Sales account.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Taxes Paid",
		"account_description": "Use Taxes paid to track taxes you pay.You may want different accounts of this type for payments to different tax agencies.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Travel Expenses",
		"account_description": "Use Travel expenses - general and admin expenses to track travelling costs incurred that are not directly related to the revenue-generating operation of the company. For example, flight tickets and hotel costs when performing job interviews.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Unapplied Cash Bill Payment",
		"account_description": "Unapplied Cash Bill Payment Expensereports the Cash Basis expense from supplier payment cheques you’ve sent but not yet applied to supplier bills. In general, you would never use this directly on a purchase or sale transaction.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Utilities",
		"account_description": "Use Utilities to track utility payments.You may want different accounts of this type to track different types of utility payments (gas and electric, telephone, water, and so on).",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Amortisation",
		"account_description": "Use Amortisation to track amortisation of intangible assets.Amortisation is spreading the cost of an intangible asset over its useful life, like depreciation of fixed assets.You may want an amortisation account for each intangible asset you have.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Depreciation",
		"account_description": "Use Depreciation to track how much you depreciate fixed assets.You may want a depreciation account for each fixed asset you have.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Exchange on gain or loss",
		"account_description": "Use Exchange Gain or Loss to track gains or losses that occur as a result of exchange rate fluctuations.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Other Expense",
		"account_description": "Use Other expense to track unusual or infrequent expenses that don’t fall into another Other Expense type.",
		"organisation_pk": "*"
	},
	{
		"table": "account",
		"account_name": "Penalties and settlements",
		"account_description": "Use Penalties and settlements to track money you pay for violating laws or regulations, settling lawsuits, or other penalties.",
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
	},
	{
		"table":"fillingfrequency",
		"frequency_name": "WEEKLY",
		"organisation_pk": "*"
	},
	{
		"table":"fillingfrequency",
		"frequency_name": "MONTHLY",
		"organisation_pk": "*"
	},
	{
		"table":"fillingfrequency",
		"frequency_name": "QUARTERLY",
		"organisation_pk": "*"
	},
	{
		"table":"fillingfrequency",
		"frequency_name": "YEARLY",
		"organisation_pk": "*"
	},
	{
		"table":"reportingmethod",
		"method_name": "CASH",
		"organisation_pk": "*"
	},
	{
		"table":"reportingmethod",
		"method_name": "CHEQUE",
		"organisation_pk": "*"
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
