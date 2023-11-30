import { BalanceSheet, CashFlow, Income, Ratios } from "../types/FinancialReport.type";
import { RechartsAssetsLiabilities, RechartsDebtCash, RechartsFreeCashFlowPerShare } from "../types/Recharts.type";

export const parseAssetsLiabilities = (financialReport: BalanceSheet | null | undefined): RechartsAssetsLiabilities[] => {
  if (!financialReport) return [];

  // Sort reports by calendarYear
  const sortedReports = financialReport.report.slice().sort((a, b) => a.calendarYear.localeCompare(b.calendarYear));

  const rechartsData: RechartsAssetsLiabilities[] = [];

  // Create a map to store yearly totals
  const yearlyTotalsMap: { [year: string]: RechartsAssetsLiabilities } = {};

  // Loop through each report in the financial report
  sortedReports.forEach((report) => {
    const year = report.calendarYear;

    // Initialize the yearly total if not already present
    if (!yearlyTotalsMap[year]) {
      yearlyTotalsMap[year] = {
        year,
        totalAssets: 0,
        totalLiabilities: 0,
        equity: 0,
      };
    }

    // Accumulate values for totalAssets and totalLiabilities
    yearlyTotalsMap[year].totalAssets += report.totalAssets;
    yearlyTotalsMap[year].totalLiabilities += report.totalLiabilities;
  });

  // Calculate equity for each year
  Object.values(yearlyTotalsMap).forEach((yearlyTotal) => {
    yearlyTotal.equity = yearlyTotal.totalAssets - yearlyTotal.totalLiabilities;
    rechartsData.push(yearlyTotal);
  });

  return rechartsData;
};



export const parseTotalDebtAndCash = (financialReport: BalanceSheet | null | undefined): RechartsDebtCash[] => {
  if (!financialReport) return [];

  // Sort reports by calendarYear
  const sortedReports = financialReport.report.slice().sort((a, b) => a.calendarYear.localeCompare(b.calendarYear));

  return sortedReports.map((report) => ({
    year: report.calendarYear,
    totalDebt: report.totalDebt,
    cashAndCashEquivalents: report.cashAndCashEquivalents,
  }));
};

export const parseFreeCashFlowPerShare = (ratios: Ratios[] | null | undefined): RechartsFreeCashFlowPerShare[] => {
	if (!ratios) return [];
 
	const sortedData = ratios.map((ratio) => ({
		 year: ratio.calendarYear,
		 freeCashFlowPerShare: ratio.freeCashFlowPerShare || 0,
	}))
	.sort((a, b) => a.year.localeCompare(b.year));
	return sortedData;
 };

 export interface RechartsNetDebtAndFreeCashFlow {
	year: string;
	netDebt: number;
	freeCashFlow: number;
 }
 
 export const parseNetDebtAndFreeCashFlow = (
	balanceSheet: BalanceSheet | null | undefined,
	cashFlow: CashFlow | null | undefined
 ): RechartsNetDebtAndFreeCashFlow[] => {
	if (!balanceSheet || !cashFlow) return [];
 
	// Combine BalanceSheet data based on the calendarYear
	const balanceSheetData: { [year: string]: number } = {};
 
	balanceSheet.report.forEach((balanceSheetReport) => {
	  const year = balanceSheetReport.calendarYear;
 
	  if (!balanceSheetData[year]) {
		 balanceSheetData[year] = 0;
	  }
 
	  balanceSheetData[year] += balanceSheetReport.totalDebt;
	});
 
	// Combine CashFlow data based on the calendarYear
	const cashFlowData: { [year: string]: number } = {};
 
	cashFlow.report.forEach((cashFlowReport) => {
	  const year = cashFlowReport.calendarYear;
 
	  if (!cashFlowData[year]) {
		 cashFlowData[year] = 0;
	  }
 
	  cashFlowData[year] += cashFlowReport.freeCashFlow || 0;
	});
 
	// Combine BalanceSheet and CashFlow data
	const combinedData: { [year: string]: RechartsNetDebtAndFreeCashFlow } = {};
 
	const years = Array.from(new Set([...Object.keys(balanceSheetData), ...Object.keys(cashFlowData)]));
 
	years.forEach((year) => {
	  combinedData[year] = {
		 year,
		 netDebt: balanceSheetData[year] || 0,
		 freeCashFlow: cashFlowData[year] || 0,
	  };
	});
 
	// Convert the combined data to an array and sort it by year
	const rechartsData = Object.values(combinedData).sort((a, b) => a.year.localeCompare(b.year));
 
	return rechartsData;
 };

export const parseIncomeDataForGraph = (incomeData: Income | null | undefined) => {
	if (!incomeData || !incomeData.report) {
	  return [];
	}
 
	return incomeData.report.map((report) => ({
	  year: report.calendarYear,
	  revenue: report.revenue,
	  operatingIncome: report.operatingIncome,
	}));
};

export const parseRatiosDataForGraph = (ratiosData: Ratios[] | null | undefined) => {
	if (!ratiosData) {
	  return [];
	}
 
	const sortedData = ratiosData
	  .map((ratio) => ({
		 year: ratio.calendarYear,
		 returnOnAssets: ratio.returnOnAssets || 0,
		 returnOnCapital: ratio.returnOnCapitalEmployed || 0,
		 returnOnEquity: ratio.returnOnEquity || 0,
	  }))
	  .sort((a, b) => a.year.localeCompare(b.year));
 
	return sortedData;
 };

 export const parseMargins = (ratios: Ratios[] | null | undefined) => {
	if(!ratios) return [];
	return ratios.map((ratio) => ({
		year: ratio.calendarYear,
		grossProfitMargin: ratio.grossProfitMargin || 0,
		operatingProfitMargin: ratio.operatingProfitMargin || 0,
		netProfitMargin: ratio.netProfitMargin || 0,
	 }));
};

export const parseAcquitions = (cashFlowData: CashFlow) => cashFlowData.report.map((report) => ({
	year: report.calendarYear,
	acquisitions: report.acquisitionsNet || 0,
	debtIssuance: report.debtRepayment || 0,
	shareIssuance: (report.commonStockRepurchased + report.commonStockIssued) || 0,
 }));


export const parseCash = (cashFlowData: CashFlow) => cashFlowData.report.map((report) => ({
	year: report.calendarYear,
	netCashProvidedByOperatingActivities: report.netCashProvidedByOperatingActivities || 0,
	netCashUsedForInvestingActivities: report.netCashUsedForInvestingActivites || 0,
	netCashUsedProvidedByFinancingActivities: report.netCashUsedProvidedByFinancingActivities || 0,
 }));

export const parseSharesOutstanding = (incomeData: Income) => incomeData.report.map((report) => ({
	year: report.calendarYear,
	sharesOutstanding: report.weightedAverageShsOutDil || 0,
 }));

export const parseRatiosForChart = (ratiosData: Ratios[]) => {
	return ratiosData.map((data) => ({
	  date: data.date,
	  currentRatio: data.currentRatio,
	  quickRatio: data.quickRatio,
	  interestCoverage: data.interestCoverage,
	  assetTurnover: data.assetTurnover,
	}));
 };