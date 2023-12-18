import RationInterestCoverage from './componenets/RatiosInterestCoverage/RatiosInterestCoverage';
import TotalDebtAndCashGraph from './componenets/DebtCashEquivalent/DebtCashEquivalent';
import NetDebtFreeCashFlow from './componenets/NetDebtFreeCashFlow/NetDebtFreeCashFlow';
import { BalanceSheet, CashFlow, Income, Ratios } from './types/FinancialReport.type';
import { RechartsAssetsLiabilities } from './types/Recharts.type';
import SharesOutstanding from './componenets/SharesOutstanding/SharesOutstanding';
import AssetsLiabilities from './componenets/AssetsLiabilities/AssetsLiabilities';
import CashFlowPerShare from './componenets/CashFlowPerShare/CashFlowPerShare';
import RevenueIncome from './componenets/RevenueIncome/RevenueIncome';
import Acquisitions from './componenets/Acquisitions/Acquitisions';
import Returns from './componenets/Returns/Returns';
import Margins from './componenets/Margins/Margins';
import useFetch from './hooks/useFetch/useFetch';
import Cash from './componenets/Cash/Cash';
import { useState, useEffect } from 'react';
import {
	parseAssetsLiabilities,
	parseFreeCashFlowPerShare,
	parseNetDebtAndFreeCashFlow,
	parseTotalDebtAndCash,
} from './utils/parser';
import './App.css';

function App() {
	const [ticker, setTicker] = useState('AAPL');
	const [debouncedTicker, setDebouncedTicker] = useState('AAPL');

	const { data: balanceSheet } = useFetch<BalanceSheet>(
		`https://discountingcashflows.com/api/balance-sheet-statement/${debouncedTicker}/`,
		[debouncedTicker]
	);
	const { data: ratios } = useFetch<Ratios>(
		`https://discountingcashflows.com/api/ratios/${debouncedTicker}/`,
		[debouncedTicker]
	);
	const { data: cashFlow } = useFetch<CashFlow>(
		`https://discountingcashflows.com/api/cash-flow-statement/${debouncedTicker}/`,
		[debouncedTicker]
	);
	const { data: incomeData } = useFetch<Income>(
		`https://discountingcashflows.com/api/income-statement/${debouncedTicker}/`,
		[debouncedTicker]
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
        <RevenueIncome incomeData={incomeData}/>
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
