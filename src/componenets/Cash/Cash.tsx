import { XAxis, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { CashFlow } from '../../types/FinancialReport.type';
import { parseCash } from '../../utils/parser';


type CashProps = {
  cashFlowData: CashFlow | null | undefined;
};

const Cash = ({ cashFlowData }: CashProps) => {
  if (!cashFlowData || !cashFlowData.report) {
    return <div>No data available</div>;
  }

  const data = parseCash(cashFlowData);

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
        <Area
          type="monotone"
          dataKey="netCashProvidedByOperatingActivities"
          stroke="#8884d8"
          fill="#8884d8"
          name="Net Cash Provided by Operating Activities"
			 dot={true}
        />
        <Area
          type="monotone"
          dataKey="netCashUsedForInvestingActivities"
          stroke="#82ca9d"
          fill="#82ca9d"
          name="Net Cash Used for Investing Activities"
			 dot={true}
        />
        <Area
          type="monotone"
          dataKey="netCashUsedProvidedByFinancingActivities"
          stroke="#ffc658"
          fill="#ffc658"
          name="Net Cash Used/Provided by Financing Activities"
			 dot={true}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Cash;
