import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const GanttChartBtn = ({ path }) => {
	return (
		<div>
			<Tooltip title='Gantt Chart'>
				<Link to={path}>
					<button className='bg-violet-500 hover:bg-violet-700 text-white font-bold  px-2 rounded mr-2'>
						<i class='bi bi-bar-chart-line-fill'></i>
					</button>
				</Link>
			</Tooltip>
		</div>
	);
};

export default GanttChartBtn;
