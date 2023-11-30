
export interface RechartsAssetsLiabilities {
	year: string;
	totalAssets: number;
	totalLiabilities: number;
	equity: number;
}

export type RechartsDebtCash = {
	year: string,
	totalDebt: number,
	cashAndCashEquivalents: number
}

export type RechartsFreeCashFlowPerShare = {
	year: string,
	freeCashFlowPerShare: number
}