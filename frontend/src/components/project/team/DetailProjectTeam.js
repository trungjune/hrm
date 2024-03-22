import PageTitle from "../../page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Table } from "antd";
import { loadSingleProject } from "../../../redux/rtk/features/projectManagement/project/project/project";
import ViewBtn from "../../Buttons/ViewBtn";
import AddProjectTeamMember from "./AddProjectTeamMember";
import { loadSingleProjectTeam } from "../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeam";
import Loader from "../../loader/loader";
const columns = [
	{
		id: 1,
		title: "ID",
		dataIndex: "userId",
		key: "userId",
	},
	{
		id: 2,
		title: "Name",
		key: "username",
		render: ({ user }) => user.firstName + " " + user.lastName,
	},
	{
		id: 4,
		title: "Action",
		dataIndex: "id",
		key: "action",
		render: (id) => (
			<div className='flex justify-start'>
				<ViewBtn path={`/admin/team/update/${id}`} />
			</div>
		),
	},
];
const DetailProjectTeam = () => {
	const { id } = useParams("id");

	const dispatch = useDispatch();
	const isLogged = Boolean(localStorage.getItem("isLogged"));
	const { ProjectTeam, loading: teamLoading } = useSelector(
		(state) => state.projectTeam
	);
	const [columnsToShow, setColumnsToShow] = useState([]);

	useEffect(() => {
		dispatch(loadSingleProjectTeam(id));
	}, []);

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<>
			{ProjectTeam ? (
				<div>
					<PageTitle title='Back' />
					{ProjectTeam && (
						<AddProjectTeamMember
							id={id}
							projectId={ProjectTeam.projectId}
							teamName={ProjectTeam.projectTeamName}
						/>
					)}
					<Card className='mb-4'>
						<div className='flex justify-between mb-8'>
							<h1 className='text-lg '>
								{" "}
								<span className='font-semibold'>Project :</span>{" "}
								{ProjectTeam.project.name}
							</h1>
							<h1 className='text-lg'>
								{" "}
								<span className='font-semibold'>Team : </span>
								{ProjectTeam.projectTeamName}
							</h1>
							<h1 className='text-lg '>
								<span className='font-semibold'>Project Manager : </span>
								{(
									ProjectTeam.project.projectManager.firstName +
									" " +
									ProjectTeam.project.projectManager.lastName
								).toUpperCase()}
							</h1>
						</div>
						<Table
							scroll={{ x: true }}
							loading={teamLoading}
							pagination={{
								defaultPageSize: 20,
							}}
							columns={columnsToShow}
							dataSource={ProjectTeam ? ProjectTeam.projectTeamMember : []}
						/>
					</Card>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default DetailProjectTeam;
