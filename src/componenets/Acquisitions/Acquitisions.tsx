import { XAxis, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts'; 
import { CashFlow } from '../../types/financialReport.type';
import { parseAcquitions } from '../../utils/parser';
import {  CustomTooltip } from '../../utils/recharts';

type CashFlowGraphProps = {
  cashFlowData: CashFlow | null | undefined;
};

const Acquisitions = ({ cashFlowData }: CashFlowGraphProps) => {
  if (!cashFlowData || !cashFlowData.report) {
    return <div>No data available</div>;
  }

  const data = parseAcquitions(cashFlowData);

  return (
    <ResponsiveContainer height={400} width="90%">
      <ComposedChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
			<XAxis dataKey="year" />
			<Tooltip content={<CustomTooltip />}/>
			<Legend />
			<Area
			type="monotone"
			dataKey="shareIssuance"
			stroke="#ffc658"
			fill="#ffc658"
			name="Share Issuance"
			strokeWidth={3}
			dot={true}
			/>
			<Area
			type="monotone"
			dataKey="debtIssuance"
			stroke="#82ca9d"
			fill="#82ca9d"
			name="Debt Issuance"
			strokeWidth={3}
			dot={true}
			/>
			<Area
				type="monotone"
				dataKey="acquisitions"
				stroke="#8884d8"
				fill="#8884d8"
				name="Acquisitions"
				strokeWidth={3}
				dot={true}
			/>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Acquisitions;
