import { XAxis, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { RechartsFreeCashFlowPerShare } from "../../types/Recharts.type"

type CashFlowPerShareProps = {
	ratios: RechartsFreeCashFlowPerShare[]
}
const CashFlowPerShare = ({ ratios }: CashFlowPerShareProps) => {
	if (!ratios) {
		return <div>No data available</div>;
	}
	return (
		<ResponsiveContainer height={400} width="90%">
			<ComposedChart
				width={800}
				height={400}
				data={ratios}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				{/* <CartesianGrid strokeDasharray="0"/> */}
				<XAxis dataKey="year" />
				<Tooltip />
				<Legend />
				<Area dataKey="freeCashFlowPerShare" stroke="#ff5858" fill="#ff5858" name="Free cash flow per share" strokeWidth={3} dot={true}/>
			</ComposedChart>
		</ResponsiveContainer>
	)
}

export default CashFlowPerShare;