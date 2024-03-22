import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const UpdateStatusBtn = ({ path }) => {
	return (
		<div>
			<Tooltip title='Status Update'>
				<Link to={path}>
					<button className='bg-purple-500 hover:bg-purple-700 text-white font-bold  px-2 rounded mr-2'>
						<i class='bi bi-bookmark-check-fill'></i>
					</button>
				</Link>
			</Tooltip>
		</div>
	);
};

export default UpdateStatusBtn;
