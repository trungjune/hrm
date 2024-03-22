import { Navigate, useParams } from "react-router-dom";
import PageTitle from "../../page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "antd";
import {
	deleteMilestone,
	loadAllMilestoneByProjectId,
} from "../../../redux/rtk/features/projectManagement/project/milestone/milestone";
import AddMilestone from "./AddMilestone";
import dayjs from "dayjs";
import UpdateBtn from "../../Buttons/UpdateBtn";
import { DeleteFilled } from "@ant-design/icons";

const Milestone = ({ isFixed }) => {
	const dispatch = useDispatch();
	const isLogged = Boolean(localStorage.getItem("isLogged"));
	const { loading, list } = useSelector((state) => state.milestone);
	const [columnsToShow, setColumnsToShow] = useState([]);
	const [deleteLoader, setDeleteLoader] = useState(false);
	const { id } = useParams("id");

	useEffect(() => {
		dispatch(loadAllMilestoneByProjectId(id));
	}, []);
	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const onDelete = async (id) => {
		console.log(id);
		setDeleteLoader(true);
		const resp = await dispatch(deleteMilestone(id));
		if (resp.payload.message === "success") {
			setDeleteLoader(false);
			dispatch(loadAllMilestoneByProjectId(id));
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
			dataIndex: "name",
			key: "name",
		},

		{
			id: 4,
			title: "Start Date",
			key: "startDate",
			render: ({ startDate }) => dayjs(startDate).format("DD/MM/YYYY"),
		},
		{
			id: 5,
			title: "End Date",
			key: "endDate",
			render: ({ endDate }) => dayjs(endDate).format("DD/MM/YYYY"),
		},
		{
			id: 5,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<div className='flex justify-start'>
					<UpdateBtn path={`/admin/milestone/update/${id}`} />
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
			<AddMilestone isFixed={isFixed} />
			{isFixed && (
				<Card>
					<h1 className='text-xl mb-5'> Milestones in Project </h1>
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

export default Milestone;
