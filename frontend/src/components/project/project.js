import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddProject from "./AddProject";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Segmented, Table } from "antd";
import {
	loadAllProject,
	loadAllProjectByStatus,
} from "../../redux/rtk/features/projectManagement/project/project/project";
import ViewBtn from "../Buttons/ViewBtn";
import UpdateBtn from "../Buttons/UpdateBtn";
import KanbanBtn from "../Buttons/KanbanBtn";

import GanttChartBtn from "../Buttons/GanttChartBtn";
import MilestoneBtn from "../Buttons/MilestoneBtn";
import TaskBtn from "../Buttons/TaskBtn";
import { GreenLinkBtn } from "../UI/AllLinkBtn";
import BtnAllSvg from "../UI/Button/btnAllSvg";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { CSVLink } from "react-csv";
import UpdateStatusBtn from "../Buttons/UpdateStatusBtn";

const Project = (props) => {
	const dispatch = useDispatch();
	const isLogged = Boolean(localStorage.getItem("isLogged"));
	// const [ loading, setLoading ] = useState(false);
	// const list = useSelector((state) => state.project.list);
	const { loading, list } = useSelector((state) => state.project);
	const [columnsToShow, setColumnsToShow] = useState([]);
	const [status, setStatus] = useState("all");

	useEffect(() => {
		dispatch(loadAllProject());
	}, []);

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

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
			render: ({ name }) => (
				<div className='font-semibold'>{name.toUpperCase()}</div>
			),
		},
		{
			id: 3,
			title: "Project Manager",
			key: "projectManager",
			render: ({ projectManager }) =>
				(
					projectManager.firstName +
					" " +
					projectManager.lastName
				).toUpperCase(),
		},

		{
			id: 5,
			title: "Kanban Board",
			dataIndex: "id",
			key: "board",
			render: (id) => (
				<div className='flex justify-start'>
					<KanbanBtn path={`/admin/kanban/${id}/`} />
					{/* <GanttChartBtn path={`/admin/gantt-chart/${id}/`} /> */}
				</div>
			),
		},
		{
			id: 4,
			title: "Milestone",
			dataIndex: "id",
			key: "milestone",
			render: (id) => (
				<div className='flex justify-start'>
					<MilestoneBtn path={`/admin/project/${id}/milestone/`} />
				</div>
			),
		},
		{
			id: 4,
			title: "Task Status",
			dataIndex: "id",
			key: "taskStatus",
			render: (id) => (
				<div className='flex justify-start'>
					<TaskBtn path={`/admin/project/${id}/task-status/`} />
				</div>
			),
		},
		{
			id: 4,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<div className='flex justify-start'>
					<UpdateBtn path={`/admin/project/update/${id}`} />
					<UpdateStatusBtn path={`/admin/project/update/${id}/status`} />
				</div>
			),
		},
	];
	//make a onChange function
	const onChange = (value) => {
		console.log(value);
		setStatus(value);
		dispatch(loadAllProjectByStatus(value));
	};
	const onAllClick = () => {
		setStatus("all");
		dispatch(loadAllProject());
	};
	return (
		<div className='ant-card p-4 rounded mt-5'>
			<div className='flex my-2 justify-between'>
				<div className='w-50'>
					<h4 className='text-2xl mb-2'>Project List</h4>
				</div>
				{list && (
					<div className='flex justify-end mr-4'>
						<div className='mt-0.5'>
							<CsvLinkBtn>
								<CSVLink
									data={list}
									className='btn btn-dark btn-sm'
									style={{ marginTop: "5px" }}
									filename='leave_applications'>
									Download CSV
								</CSVLink>
							</CsvLinkBtn>
						</div>

						<div className='ml-2 mt-0.5'>
							<GreenLinkBtn>
								<button onClick={onAllClick}>
									<BtnAllSvg size={15} title={"ALL"} />
								</button>
							</GreenLinkBtn>
						</div>
						<div>
							<Segmented
								className='text-center rounded text-red-500'
								size='middle'
								options={[
									{
										label: (
											<span>
												<i className='bi bi-person-lines-fill'></i> PROGRESS
											</span>
										),
										value: "PROGRESS",
									},
									{
										label: (
											<span>
												<i className='bi bi-person-dash-fill'></i> COMPLETE
											</span>
										),
										value: "COMPLETE",
									},
									{
										label: (
											<span>
												<i className='bi bi-person-dash-fill'></i> ONHOLD
											</span>
										),
										value: "ONHOLD",
									},
									{
										label: (
											<span>
												<i className='bi bi-person-dash-fill'></i> DELETED
											</span>
										),
										value: "DELETED",
									},
								]}
								value={status}
								onChange={onChange}
							/>
						</div>
					</div>
				)}
			</div>
			<Table
				className='text-center'
				scroll={{ x: true }}
				loading={loading}
				pagination={{
					defaultPageSize: 20,
				}}
				columns={columnsToShow}
				dataSource={list}
			/>
		</div>
	);
};

export default Project;
