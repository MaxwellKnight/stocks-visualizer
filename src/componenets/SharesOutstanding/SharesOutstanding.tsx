import { XAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import { Income } from '../../types/FinancialReport.type';
import { parseSharesOutstanding } from '../../utils/parser';

type SharesOutstandingProps = {
  incomeData: Income | null | undefined;
};

const SharesOutstanding = ({ incomeData }: SharesOutstandingProps) => {
  if (!incomeData || !incomeData.report) {
    return <div>No data available</div>;
  }

  const data = parseSharesOutstanding(incomeData);

  return (
    <ResponsiveContainer height={400} width="90%">
      <ComposedChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="year" />
        <Tooltip />
        <Legend />
        <Area
			type="monotone"
			dataKey="sharesOutstanding"
			stroke="#e05898"
			fill="#e05898"
			name="Shares Outstanding"
			strokeWidth={3}
			dot={true}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default SharesOutstanding;
