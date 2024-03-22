import { Button, Popover } from "antd";
import "./styles.css";
import {
	deleteTaskStatus,
	loadAllTaskStatusByProjectId,
} from "../../redux/rtk/features/projectManagement/project/taskStatus/taskStatus";
import { useState } from "react";
import { useDispatch } from "react-redux";

const DeleteColumn = ({ id, projectId }) => {
	const dispatch = useDispatch();

	const [deleteLoader, setDeleteLoader] = useState(false);

	console.log(id, projectId);
	const onDelete = async () => {
		setDeleteLoader(true);
		const resp = await dispatch(deleteTaskStatus(id));
		if (resp.payload.message === "success") {
			setDeleteLoader(false);
			dispatch(loadAllTaskStatusByProjectId(projectId));
		}
	};

	const content = (
		<div>
			<Button
				className='text-sm text-red-500 ml-2'
				onClick={onDelete}>
					Delete
			</Button>
		</div>
	);

	return (
		<Popover
			content={content}
			title='Options'
			placement='left'
			trigger={"click"}>
			<button
				type='primary'
				className=' px-2 mb-1 text-indigo-500 rounded hover:text-indigo-300'>
				<i class='bi bi-three-dots-vertical' style={{ fontSize: "19px" }}></i>
			</button>
		</Popover>
	);
};
export default DeleteColumn;
