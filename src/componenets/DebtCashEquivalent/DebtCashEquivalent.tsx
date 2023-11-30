import { XAxis, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { RechartsDebtCash } from '../../types/Recharts.type';

type TotalDebtAndCashGraphProps = {
	data: RechartsDebtCash[] | undefined
}
const TotalDebtAndCashGraph = ({ data }: TotalDebtAndCashGraphProps) => {
	if (!data) {
		return <div>No data available</div>;
	}
  return (
	<ResponsiveContainer height={400} width="90%">
		<ComposedChart
			width={800}
			height={400}
			data={data}
			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		>
			{/* <CartesianGrid strokeDasharray="0"/> */}
			<XAxis dataKey="year" />
			<Tooltip />
			<Legend />
			<Area dataKey="cashAndCashEquivalents" fill="#8884d8" name="Cash and Equivalents" strokeWidth={3} dot={true} stroke='#8884d8'/>
			<Area dataKey="totalDebt" fill="#ffc658" name="Total Debt" strokeWidth={3} dot={true} stroke='#ffc658'/>
		</ComposedChart>
	 </ResponsiveContainer>
  );
};

export default TotalDebtAndCashGraph;
