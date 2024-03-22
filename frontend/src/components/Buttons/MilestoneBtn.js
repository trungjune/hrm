import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const MilestoneBtn = ({ path }) => {
	return (
		<div>
			<Tooltip title='Milestone'>
				<Link to={path}>
					<button className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold  px-2 rounded mr-2'>
						<i class='bi bi-signpost-2-fill'></i>
					</button>
				</Link>
			</Tooltip>
		</div>
	);
};

export default MilestoneBtn;
