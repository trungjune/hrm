import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const UpdateBtn = ({ path }) => {
	return (
		<div>
			<Tooltip title='Update'>
				<Link to={path}>
					<button className='bg-teal-500 hover:bg-teal-700 text-white font-bold  px-2 rounded mr-2'>
						<i class='bi bi-pencil-square'></i>
					</button>
				</Link>
			</Tooltip>
		</div>
	);
};

export default UpdateBtn;
