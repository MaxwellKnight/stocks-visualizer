import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

export type CustomTooltip = TooltipProps<ValueType, NameType> 

export const CustomTooltip = ({ active, payload } : CustomTooltip) => {
	if (active && payload) {
		return (
			<div className="custom-tooltip">
				{payload.map((element) => 
					<p>
						<span style={{color:`${element.color}`}}>{element.name}</span>:<span>{formatNumber(Number(element.value))}</span>
					</p>
				)}
			</div>
		);
	}
}

export const formatNumber = (num: number): string => {
	const billion = 1000000000;
	const million = 1000000;
 
	if (num >= billion || num <= -billion) {
	  // Convert to billions
	  return (num / billion).toFixed(2) + 'B';
	} else if (num >= million || num <= -million) {
	  // Convert to millions
	  return (num / million).toFixed(2) + 'M';
	} else {
	  // Leave as is
	  return new Intl.NumberFormat('en').format(num);
	}
 }