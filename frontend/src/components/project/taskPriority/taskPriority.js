import { Navigate } from "react-router-dom";
import PageTitle from "../../page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "antd";
import {
	deleteTaskPriority,
	loadAllTaskPriority,
} from "../../../redux/rtk/features/projectManagement/project/taskPriority/taskPriority";
import AddTaskPriority from "./AddtaskPriority";
import UpdateBtn from "../../Buttons/UpdateBtn";
import { DeleteFilled } from "@ant-design/icons";

const TaskStatus = (props) => {
	const dispatch = useDispatch();
	const isLogged = Boolean(localStorage.getItem("isLogged"));
	const { loading, list } = useSelector((state) => state.taskPriority);
	const [columnsToShow, setColumnsToShow] = useState([]);
	const [deleteLoader, setDeleteLoader] = useState(false);
	useEffect(() => {
		dispatch(loadAllTaskPriority());
	}, []);
	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const onDelete = async (id) => {
		console.log(id);
		setDeleteLoader(true);
		const resp = await dispatch(deleteTaskPriority(id));
		if (resp.payload.message === "success") {
			setDeleteLoader(false);
			dispatch(loadAllTaskPriority());
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
			id: 3,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<div className='flex justify-start'>
					<div className='flex justify-start'>
						<UpdateBtn path={`/admin/task-priority/update/${id}`} />
						<Button
							size='small'
							style={{ width: "28px", height: "22px" }}
							type='danger'
							onClick={() => onDelete(id)}
							loading={deleteLoader}
							icon={<DeleteFilled />}></Button>
					</div>
				</div>
			),
		},
	];
	return (
		<div>
			<PageTitle title='Back' />
			<AddTaskPriority list={list} loading={loading} />
			<Card className='mb-4'>
				<h1 className='text-xl mb-4'> Task Priority Column List </h1>
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
		</div>
	);
};

export default TaskStatus;
