export interface BalanceSheet {
	originalCurrency: string;
	convertedCurrency: string;
	report: BalanceSheetReport[];
}

export interface CashFlow {
	originalCurrency: string;
	convertedCurrency: string;
	report: CashFlowReport[];
}

export interface Income {
	originalCurrency: string;
	convertedCurrency: string;
	report: IncomeReport[];
}

export interface Ratios {
	originalCurrency: string;
	convertedCurrency: string;
	report: RatiosReport[];
}

export interface BalanceSheetReport {
	date: string;
	symbol: string;
	reportedCurrency: string;
	cik: string;
	fillingDate: string;
	acceptedDate: string;
	calendarYear: string;
	period: string;
	cashAndCashEquivalents: number;
	shortTermInvestments: number;
	cashAndShortTermInvestments: number;
	netReceivables: number;
	inventory: number;
	otherCurrentAssets: number;
	totalCurrentAssets: number;
	propertyPlantEquipmentNet: number;
	goodwill: number;
	intangibleAssets: number;
	goodwillAndIntangibleAssets: number;
	longTermInvestments: number;
	taxAssets: number;
	otherNonCurrentAssets: number;
	totalNonCurrentAssets: number;
	otherAssets: number;
	totalAssets: number;
	accountPayables: number;
	shortTermDebt: number;
	taxPayables: number;
	deferredRevenue: number;
	otherCurrentLiabilities: number;
	totalCurrentLiabilities: number;
	longTermDebt: number;
	deferredRevenueNonCurrent: number;
	deferredTaxLiabilitiesNonCurrent: number;
	otherNonCurrentLiabilities: number;
	totalNonCurrentLiabilities: number;
	otherLiabilities: number;
	capitalLeaseObligations: number;
	totalLiabilities: number;
	preferredStock: number;
	commonStock: number;
	retainedEarnings: number;
	accumulatedOtherComprehensiveIncomeLoss: number;
	othertotalStockholdersEquity: number;
	totalStockholdersEquity: number;
	totalEquity: number;
	totalLiabilitiesAndStockholdersEquity: number;
	minorityInterest: number;
	totalLiabilitiesAndTotalEquity: number;
	totalInvestments: number;
	totalDebt: number;
	netDebt: number;
	link?: string;
	finalLink?: string;
	calculatedOtherCurrentAssets: number;
	calculatedOtherNonCurrentAssets: number;
	calculatedOtherCurrentLiabilities: number;
	calculatedOtherNonCurrentLiabilities: number;
}

export interface CashFlowReport {
	date: string;
	symbol: string;
	reportedCurrency: string;
	cik: string;
	fillingDate: string;
	acceptedDate: string;
	calendarYear: string;
	period: string;
	netIncome: number;
	depreciationAndAmortization: number;
	deferredIncomeTax: number;
	stockBasedCompensation: number;
	changeInWorkingCapital: number;
	accountsReceivables: number;
	inventory: number;
	accountsPayables: number;
	otherWorkingCapital: number;
	otherNonCashItems: number;
	netCashProvidedByOperatingActivities: number;
	investmentsInPropertyPlantAndEquipment: number;
	acquisitionsNet: number;
	purchasesOfInvestments: number;
	salesMaturitiesOfInvestments: number;
	otherInvestingActivites: number;
	netCashUsedForInvestingActivites: number;
	debtRepayment: number;
	commonStockIssued: number;
	commonStockRepurchased: number;
	dividendsPaid: number;
	otherFinancingActivites: number;
	netCashUsedProvidedByFinancingActivities: number;
	effectOfForexChangesOnCash: number;
	netChangeInCash: number;
	cashAtEndOfPeriod: number;
	cashAtBeginningOfPeriod: number;
	operatingCashFlow: number;
	capitalExpenditure: number;
	freeCashFlow: number;
	link?: string;
	finalLink?: string;
	calculatedOtherWorkingCapital: number;
}

export interface RatiosReport {
	symbol: string;
	date: string;
	calendarYear: string;
	period: string;
	currentRatio: number;
	quickRatio: number;
	cashRatio: number;
	daysOfSalesOutstanding: number;
	daysOfInventoryOutstanding: number;
	operatingCycle: number;
	daysOfPayablesOutstanding: number;
	cashConversionCycle: number;
	grossProfitMargin: number;
	operatingProfitMargin: number;
	pretaxProfitMargin: number;
	netProfitMargin: number;
	effectiveTaxRate: number;
	returnOnAssets: number;
	returnOnEquity: number;
	returnOnCapitalEmployed: number;
	netIncomePerEBT: number;
	ebtPerEbit: number;
	ebitPerRevenue: number;
	debtRatio: number;
	debtEquityRatio: number;
	longTermDebtToCapitalization: number;
	totalDebtToCapitalization: number;
	interestCoverage: number;
	cashFlowToDebtRatio?: number;
	companyEquityMultiplier: number;
	receivablesTurnover: number;
	payablesTurnover: number;
	inventoryTurnover: number;
	fixedAssetTurnover: number;
	assetTurnover: number;
	operatingCashFlowPerShare?: number;
	freeCashFlowPerShare?: number;
	cashPerShare: number;
	payoutRatio?: number;
	operatingCashFlowSalesRatio?: number;
	freeCashFlowOperatingCashFlowRatio: number;
	cashFlowCoverageRatios?: number;
	shortTermCoverageRatios?: number;
	capitalExpenditureCoverageRatio: number;
	dividendPaidAndCapexCoverageRatio: number;
	dividendPayoutRatio?: number;
	priceBookValueRatio: number;
	priceToBookRatio: number;
	priceToSalesRatio: number;
	priceEarningsRatio: number;
	priceToFreeCashFlowsRatio: number;
	priceToOperatingCashFlowsRatio: number;
	priceCashFlowRatio: number;
	priceEarningsToGrowthRatio: number;
	priceSalesRatio: number;
	dividendYield?: number;
	enterpriseValueMultiple: number;
	priceFairValue: number;
	freeCashFlowMargin: number;
 }

export interface IncomeReport {
	date: string;
	symbol: string;
	reportedCurrency: string;
	cik: string;
	fillingDate: string;
	acceptedDate: string;
	calendarYear: string;
	period: string;
	revenue: number;
	costOfRevenue: number;
	grossProfit: number;
	grossProfitRatio: number;
	researchAndDevelopmentExpenses: number;
	generalAndAdministrativeExpenses: number;
	sellingAndMarketingExpenses: number;
	sellingGeneralAndAdministrativeExpenses: number;
	otherExpenses: number;
	operatingExpenses: number;
	costAndExpenses: number;
	interestIncome: number;
	interestExpense: number;
	depreciationAndAmortization: number;
	ebitda: number;
	ebitdaratio: number;
	operatingIncome: number;
	operatingIncomeRatio: number;
	totalOtherIncomeExpensesNet: number;
	incomeBeforeTax: number;
	incomeBeforeTaxRatio: number;
	incomeTaxExpense: number;
	netIncome: number;
	netIncomeRatio: number;
	eps: number;
	epsdiluted: number;
	weightedAverageShsOut: number;
	weightedAverageShsOutDil: number;
	link?: string;
	finalLink?: string;
	calculatedOtherExpenses: number;
	calculatedOperatingExpenses: number;
	calculatedNetInterest: number;
	calculatedOtherIncome: number;
	calculatedIncomeNonControlling: number;
	calculatedEbitda: number;
}
