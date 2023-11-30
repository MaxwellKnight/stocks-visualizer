import { ComposedChart, XAxis, Tooltip, Legend, Bar, ResponsiveContainer, Area } from "recharts"
import { RechartsAssetsLiabilities } from "../../types/Recharts.type"

type AssetsLiabilitiesProps = {
	rechartsData: RechartsAssetsLiabilities[]
}
const AssetsLiabilities = ({ rechartsData }: AssetsLiabilitiesProps) => {
	if (!rechartsData) {
		return <div>No data available</div>;
	}
	return (
		<ResponsiveContainer height={400} width="90%">
			<ComposedChart
			width={800}
			height={400}
			data={rechartsData}
			>
				{/* <CartesianGrid strokeDasharray="0"/> */}
				<XAxis dataKey="year" />
				<Legend />
				<Tooltip />
				<Bar dataKey="totalLiabilities" fill="#ffc658" name="Total Liabilities"/>
				<Bar dataKey="totalAssets" fill="#82ca9d" name="Total Assets"/>
				<Area type="monotone" dataKey="equity" fill="#8884d8" name="Equity" strokeWidth={5} dot={true}/>
			</ComposedChart>
		</ResponsiveContainer>
	)
}

export default AssetsLiabilities;