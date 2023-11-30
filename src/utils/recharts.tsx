import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

export type CustomTooltip = TooltipProps<ValueType, NameType> 

export const CustomTooltip = ({ active, payload } : CustomTooltip) => {
	if (active && payload) {
		console.log(payload[0])
		return (
			<div className="custom-tooltip">
				<p className="label">{payload[0].payload.name}</p>
				<p className="desc">{payload[0].payload.value}</p>
			</div>
		);
	}
}