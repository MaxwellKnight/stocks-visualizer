import {
	Line,
	XAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ComposedChart,
} from 'recharts';
import { Ratios } from '../../types/FinancialReport.type';
import { parseRatiosForChart } from '../../utils/parser';
import { CustomTooltip } from '../../utils/recharts';

interface RationInterestCoverageProps {
  ratiosData: Ratios | null | undefined
}

const RationInterestCoverage = ({ ratiosData }: RationInterestCoverageProps) => {

	if (!ratiosData) {
		return <div>No data available</div>;
	}

	const data = parseRatiosForChart(ratiosData);

	return (
		<ResponsiveContainer width="100%" height={400}>
		<ComposedChart data={data}>
			<XAxis dataKey="year" />
			<Tooltip content={<CustomTooltip />}/>
			<Legend />
			<Line dataKey="quickRatio" stroke="#8884d8" name="Quick Ratio" />
			<Line dataKey="currentRatio" stroke="#82ca9d" name="Current Ratio" />
			<Line dataKey="interestCoverage" stroke="#ffc658" name="Interest Coverage" />
			<Line dataKey="assetTurnover" stroke="#ff7300" name="Asset Turnover" />
		</ComposedChart>
		</ResponsiveContainer>
	);
};

export default RationInterestCoverage;
