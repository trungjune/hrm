import { Navigate, useParams } from "react-router-dom";
import PageTitle from "../../page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "antd";
import {
	deleteTaskStatus,
	loadAllTaskStatusByProjectId,
} from "../../../redux/rtk/features/projectManagement/project/taskStatus/taskStatus";
import AddTaskStatus from "./AddtaskStatus";
import UpdateBtn from "../../Buttons/UpdateBtn";
import { DeleteFilled } from "@ant-design/icons";

const TaskStatus = ({ isFixed }) => {
	const dispatch = useDispatch();
	const isLogged = Boolean(localStorage.getItem("isLogged"));
	const { loading, list } = useSelector((state) => state.taskStatus);
	const [columnsToShow, setColumnsToShow] = useState([]);
	const [deleteLoader, setDeleteLoader] = useState(false);
	const { id } = useParams("id");

	useEffect(() => {
		dispatch(loadAllTaskStatusByProjectId(id));
	}, []);
	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const onDelete = async (id) => {
		console.log(id);
		setDeleteLoader(true);
		const resp = await dispatch(deleteTaskStatus(id));
		if (resp.payload.message === "success") {
			setDeleteLoader(false);
			dispatch(loadAllTaskStatusByProjectId(id));
		}
	};

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			id: 2,
			title: "Name",
			key: "name",
			render: ({ name }) => name.toUpperCase(),
		},
		{
			id: 4,
			title: "Project",
			key: "project",
			render: ({ project }) => project?.name?.toUpperCase(),
		},
		{
			id: 3,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<div className='flex justify-start'>
					<UpdateBtn path={`/admin/task-status/update/${id}`} />
					<Button
						size='small'
						style={{ width: "28px", height: "22px" }}
						type='danger'
						onClick={() => onDelete(id)}
						loading={deleteLoader}
						icon={<DeleteFilled />}></Button>
				</div>
			),
		},
	];
	return (
		<div>
			<PageTitle title='Back' />
			<AddTaskStatus list={list} loading={loading} isFixed={isFixed} />

			{isFixed && (
				<Card className='mb-4'>
					<h1 className='text-xl mb-4'>
						{" "}
						Task Column List :{" "}
						<span className='font-semibold'>
							{list ? list[0]?.project?.name : "No Task"}
						</span>{" "}
					</h1>
					<Table
						scroll={{ x: true }}
						loading={loading}
						pagination={{
							defaultPageSize: 20,
						}}
						columns={columnsToShow}
						dataSource={list}
					/>
				</Card>
			)}
		</div>
	);
};

export default TaskStatus;
