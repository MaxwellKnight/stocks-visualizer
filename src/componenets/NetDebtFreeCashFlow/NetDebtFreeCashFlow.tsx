import { XAxis, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from "recharts";
import { RechartsNetDebtAndFreeCashFlow } from "../../utils/parser";

type NetDebtFreeCashFlowProps = {
	data: RechartsNetDebtAndFreeCashFlow[]
}
const NetDebtFreeCashFlow = ({data}: NetDebtFreeCashFlowProps) => {
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
				<Area dataKey="freeCashFlow" stroke="#6358ff" fill="#6358ff" name="Free cash flow" strokeWidth={3} dot={true}/>
				<Area dataKey="netDebt" stroke="#ff588d" fill="#ff588d" name="Net debt" strokeWidth={3} dot={true}/>
			</ComposedChart>
		</ResponsiveContainer>
	)
}

export default NetDebtFreeCashFlow;