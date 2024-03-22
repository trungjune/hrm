import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const KanbanBtn = ({ path }) => {
	return (
		<div>
			<Tooltip title='Kanban'>
				<Link to={path}>
					<button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold  px-2 rounded mr-2'>
						<i class='bi bi-trello'></i>
					</button>
				</Link>
			</Tooltip>
		</div>
	);
};

export default KanbanBtn;
