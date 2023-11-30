import { LineChart, Line, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Income } from '../../types/FinancialReport.type';
import { parseIncomeDataForGraph } from '../../utils/parser';

// Assume the Income and IncomeReport interfaces are imported

interface IncomeGraphProps {
  incomeData: Income | null | undefined;
  isQuarterly: boolean;
  onQuarterlyClick: () => void;
}

const RevenueIncome = ({ incomeData, isQuarterly, onQuarterlyClick }: IncomeGraphProps) => {
  const graphData = parseIncomeDataForGraph(incomeData).sort((a, b) => a.year.localeCompare(b.year));
  if (graphData.length === 0) {
	  return <div>No data available</div>;
	}
	
  return (
	<div>
		<div>
        <label>Show:</label>
        <button onClick={onQuarterlyClick}>{isQuarterly ? 'Quartely' : 'Annualy'}</button>
      </div>
		<ResponsiveContainer height={400} width="90%">
			<LineChart
				height={400} 
				data={graphData} 
				margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
			>
				<XAxis dataKey="year" />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue"  strokeWidth={3}/>
				<Line type="monotone" dataKey="operatingIncome" stroke="#82ca9d" name="Operating Income" strokeWidth={3} />
			</LineChart>
			</ResponsiveContainer>
	 </div>
  );
};

export default RevenueIncome;
