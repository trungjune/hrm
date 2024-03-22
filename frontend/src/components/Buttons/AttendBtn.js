import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const AttendBtn = ({ path }) => {
	return (
		<div>
			<Link to={path}>
				<Tooltip title='Attendance'>
					<button className='bg-violet-600 hover:bg-violet-700 text-white font-bold  px-2 rounded mr-2'>
						<i class='bi bi-calendar2-check-fill'></i>
					</button>
				</Tooltip>
			</Link>
		</div>
	);
};

export default AttendBtn;
