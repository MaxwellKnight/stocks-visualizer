import { XAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { Ratios } from '../../types/FinancialReport.type';
import { parseMargins } from '../../utils/parser';

type ProfitMarginsProps = {
  ratios: Ratios[] | null | undefined;
};

const Margins = ({ ratios }: ProfitMarginsProps) => {
	if (!ratios) {
		return <div>No data available</div>;
	}
  const data = parseMargins(ratios);

  return (
    <ResponsiveContainer height={400} width="90%">
      <ComposedChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
      >
        <XAxis dataKey="year" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="grossProfitMargin"
          stroke="#8884d8"
          fill="#8884d8"
          name="Gross Profit Margin"
			 strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="operatingProfitMargin"
          stroke="#82ca9d"
          fill="#82ca9d"
          name="Operating Profit Margin"
			 strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="netProfitMargin"
          stroke="#ffc658"
          fill="#ffc658"
          name="Net Profit Margin"
			 strokeWidth={3}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Margins;
