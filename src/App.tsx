import { useState, useEffect } from 'react';
import { BalanceSheet, CashFlow, Income, Ratios } from './types/FinancialReport.type';
import { RechartsAssetsLiabilities } from './types/Recharts.type';
import {
  parseAssetsLiabilities,
  parseFreeCashFlowPerShare,
  parseNetDebtAndFreeCashFlow,
  parseTotalDebtAndCash,
} from './utils/parser';
import AssetsLiabilities from './componenets/AssetsLiabilities/AssetsLiabilities';
import TotalDebtAndCashGraph from './componenets/DebtCashEquivalent/DebtCashEquivalent';
import CashFlowPerShare from './componenets/CashFlowPerShare/CashFlowPerShare';
import NetDebtFreeCashFlow from './componenets/NetDebtFreeCashFlow/NetDebtFreeCashFlow';
import RevenueIncome from './componenets/RevenueIncome/RevenueIncome';
import Returns from './componenets/Returns/Returns';
import Margins from './componenets/Margins/Margins';
import './App.css';
import Cash from './componenets/Cash/Cash';
import Acquisitions from './componenets/Acquisitions/Acquitisions';
import SharesOutstanding from './componenets/SharesOutstanding/SharesOutstanding';
import useFetch from './hooks/useFetch/useFetch';
import RationInterestCoverage from './componenets/RatiosInterestCoverage/RatiosInterestCoverage';

const generateIncomeUrl = (ticker: string, isQuarterly: boolean) => {
	return `https://discountingcashflows.com/api/income-statement/${ticker}${isQuarterly ? '/quarterly' : ''}`;
};

function App() {
	const [ticker, setTicker] = useState('AAPL');
	const [debouncedTicker, setDebouncedTicker] = useState('AAPL');
	const [isQuarterly, setIsQuarterly] = useState(false);

	const { data: balanceSheet } = useFetch<BalanceSheet>(
		`https://discountingcashflows.com/api/balance-sheet-statement/${debouncedTicker}/`,
		[debouncedTicker, isQuarterly]
	);
	const { data: ratios } = useFetch<Ratios[]>(
		`https://discountingcashflows.com/api/ratios/${debouncedTicker}/`,
		[debouncedTicker, isQuarterly]
	);
	const { data: cashFlow } = useFetch<CashFlow>(
		`https://discountingcashflows.com/api/cash-flow-statement/${debouncedTicker}/`,
		[debouncedTicker, isQuarterly]
	);
	const { data: incomeData } = useFetch<Income>(
		generateIncomeUrl(debouncedTicker, isQuarterly),
		[debouncedTicker, isQuarterly]
	);
  const rechartsData: RechartsAssetsLiabilities[] = parseAssetsLiabilities(balanceSheet);

	

  const handleTickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Set the debounced ticker after the delay
      setDebouncedTicker(ticker);
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [ticker]);

  return (
    <main>
      <div className="ticker-input">
        <label htmlFor="ticker">Enter Ticker Symbol:</label>
        <input
          type="text"
          id="ticker"
          value={ticker}
          onChange={(e) => handleTickerChange(e)}
          placeholder="AAPL"
        />
      </div>
      <div className="container shadow">
        <AssetsLiabilities rechartsData={rechartsData} />
        <TotalDebtAndCashGraph data={parseTotalDebtAndCash(balanceSheet)} />
      </div>
		<div className="wide-container shadow">
        <RationInterestCoverage ratiosData={ratios}/>
      </div>
      <div className="container shadow">
        <CashFlowPerShare ratios={parseFreeCashFlowPerShare(ratios)} />
        <NetDebtFreeCashFlow data={parseNetDebtAndFreeCashFlow(balanceSheet, cashFlow)} />
      </div>
      <div className="wide-container shadow">
        <Returns ratiosData={ratios} />
      </div>
      <div className="wide-container shadow">
        <RevenueIncome incomeData={incomeData} isQuarterly={isQuarterly} onQuarterlyClick={() => setIsQuarterly(prev => !prev)}/>
      </div>
      <div className="wide-container shadow">
        <Margins ratios={ratios} />
      </div>
      <div className="wide-container shadow">
        <Cash cashFlowData={cashFlow} />
      </div>
      <div className="container shadow">
        <Acquisitions cashFlowData={cashFlow} />
        <SharesOutstanding incomeData={incomeData} />
      </div>
    </main>
  );
}

export default App;
