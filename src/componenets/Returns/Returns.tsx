import { LineChart, Line, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Ratios } from '../../types';
import { parseRatiosDataForGraph } from '../../utils/parser';
import { CustomTooltip } from '../../utils/recharts';

// Assume the Ratios interface is imported

interface RatiosGraphProps {
  ratiosData: Ratios | null | undefined;
}

const Returns = ({ ratiosData }: RatiosGraphProps) => {
	if (!ratiosData) {
		return <div>No data available</div>;
	}
	
	const graphData = parseRatiosDataForGraph(ratiosData);
	
  return (
	<ResponsiveContainer height={400} width="90%">
		<LineChart width={800} height={400} data={graphData} margin={{ top: 20, right: 30, left: 150, bottom: 5 }}>
			<XAxis dataKey="year" />
			<Tooltip content={<CustomTooltip />}/>
			<Legend />
			<Line type="monotone" dataKey="returnOnAssets" stroke="#8884d8" name="Return on Assets" strokeWidth={3}/>
			<Line type="monotone" dataKey="returnOnCapital" stroke="#82ca9d" name="Return on Capital Employed" strokeWidth={3}/>
			<Line type="monotone" dataKey="returnOnEquity" stroke="#ff7300" name="Return on Equity" strokeWidth={3}/>
		</LineChart>
	 </ResponsiveContainer>
  );
};

export default Returns;
