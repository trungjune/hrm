import React from "react";
import "./styles.css";
import { DeleteFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { Tooltip } from "antd";

const Task = ({ taskS: task, btnLoading, btnId, handleDeleteTask }) => {
	return (
		<div class='task new-column-card' draggable='true'>
			<div class='task__tags '>
				<span class='task__tag task__tag--illustration'>
					{task.priority.name}
				</span>
				<button class='task__options'>
					<Tooltip title='Delete Task'>
						<button
							className='text-sm text-red-500 ml-2 float-right'
							onClick={() => handleDeleteTask(task.id)}>
							<DeleteFilled
								className={`mr-3 ml-2 ${
									btnId === task.id ? (btnLoading ? "animate-spin" : "") : ""
								}`}
							/>
						</button>
					</Tooltip>
				</button>
			</div>
			<p className='mt-2 txt-color font-semibold'>{task.name}</p>
			<div className='m-2 txt-color ' style={{ fontSize: "13px" }}>
				{task.description}
			</div>
			<div className='task__stats'>
				<span>
					<time>
						<i class='fas fa-flag'></i>
						{dayjs(task.startDate).format("DD/MM/YYYY")} -{" "}
						{dayjs(task.endDate).format("DD/MM/YYYY")}
					</time>
				</span>
				<span>{/* 		<i class='fas fa-comment'></i>4 */}</span>
				<span>{/* <i class='fas fa-paperclip'></i>8 */}</span>
				{/* <span class='task__owner'></span> */}
				<span> Time : {task.completionTime} Hours</span>
			</div>
		</div>
	);
};

export default Task;
