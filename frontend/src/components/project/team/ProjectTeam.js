import PageTitle from "../../page-header/PageHeader";
import AddProjectTeam from "./AddProjectTeam";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "antd";
import { DeleteFilled } from "@ant-design/icons";

import ViewBtn from "../../Buttons/ViewBtn";
import {
	deleteProjectTeam,
	loadAllProjectTeam,
} from "../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeam";
import UpdateBtn from "../../Buttons/UpdateBtn";
import ProjectTeamStatusUpdatePopup from "../../UI/PopUp/ProjectManagemnet/ProjectTeamStatusUpdatePopup";

const ProjectTeam = () => {
	const { list, loading } = useSelector((state) => state.projectTeam);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			id: 2,
			title: "Team Name",
			dataIndex: "projectTeamName",
			key: "projectTeamName",
		},
		{
			id: 4,
			title: "Action",
			key: "action",
			render: ({id, projectTeamName, status}) => (
				<div className='flex justify-start'>
					<ViewBtn path={`/admin/team/${id}`} />
					<ProjectTeamStatusUpdatePopup
						projectId={id}
						teamName={projectTeamName}
						status={status}
					/>
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
	const dispatch = useDispatch();
	const isLogged = Boolean(localStorage.getItem("isLogged"));
	const [deleteLoader, setDeleteLoader] = useState(false);
	const [columnsToShow, setColumnsToShow] = useState([]);

	useEffect(() => {
		dispatch(loadAllProjectTeam());
	}, []);

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const onDelete = async (id) => {
		console.log(id);
		setDeleteLoader(true);
		const resp = await dispatch(deleteProjectTeam(id));
		if (resp.payload.message === "success") {
			setDeleteLoader(false);
			dispatch(loadAllProjectTeam());
		}
	};

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />
			<AddProjectTeam />
			<Card>
				<h1 className='text-xl mb-4'> Team List </h1>
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

export default ProjectTeam;
