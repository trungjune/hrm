import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Segmented, Table, Tag } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { GreenLinkBtn } from "../UI/AllLinkBtn";
import BtnAllSvg from "../UI/Button/btnAllSvg";
import {
	countLeaveApplication,
	loadAllLeaveApplication,
	loadLeaveApplicationByStatus,
} from "../../redux/rtk/features/leave/leaveSlice";
import dayjs from "dayjs";
import BtnViewSvg from "../UI/Button/btnViewSvg";
import ViewBtn from "../Buttons/ViewBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

function CustomTable({ list, total }) {
	const dispatch = useDispatch();
	const [status, setStatus] = useState("true");
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},

		{
			id: 2,
			title: " Name",
			key: "name",
			dataIndex: "user",
			render: ({ firstName, lastName }) => firstName + " " + lastName,
		},
		{
			id: 3,
			title: "Leave Type",
			dataIndex: "leaveType",
			key: "leaveType",
		},
		{
			id: 4,
			title: "Leave From",
			dataIndex: "leaveFrom",
			key: "leaveFrom",
			render: (leaveFrom) => dayjs(leaveFrom).format("DD-MM-YYYY"),
		},
		{
			id: 5,
			title: "Leave To",
			dataIndex: "leaveTo",
			key: "leaveTo",
			render: (leaveTo) => dayjs(leaveTo).format("DD-MM-YYYY"),
		},
		{
			id: 6,
			title: "Leave Duration",
			dataIndex: "leaveDuration",
			key: "leaveDuration",
			render: (leaveDuration) => {
				if (leaveDuration > 1) {
					return <span>{leaveDuration} days</span>;
				} else {
					return <span>{leaveDuration} day</span>;
				}
			},
		},
		{
			id: 7,
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status) => {
				if (status === "ACCEPTED") {
					return <Tag color='green'>{status.toUpperCase()}</Tag>;
				} else if (status === "REJECTED") {
					return <Tag color='red'>{status.toUpperCase()}</Tag>;
				} else {
					return <Tag color='orange'>{status.toUpperCase()}</Tag>;
				}
			},
		},

		{
			id: 7,
			title: "Action",
			key: "action",
			render: ({ id }) => (
				<ViewBtn
					path={`/admin/leave/${id}`}
					text='View'
					icon={<BtnViewSvg />}
				/>
			),
		},
	];
	//make a onChange function
	const onChange = (value) => {
		setStatus(value);
		dispatch(
			loadLeaveApplicationByStatus({ page: 1, limit: 20, status: value })
		);
	};

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const onAllClick = () => {
		dispatch(loadAllLeaveApplication());
		setStatus("all");
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div className='ant-card p-4 rounded mt-5'>
			<div className='flex my-2 justify-between'>
				<div className='w-50'>
					<h4 className='text-2xl mb-2'> Leave Applications</h4>
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
								defaultValue={"accepted"}
								options={[
									{
										label: (
											<span>
												<i className='bi bi-person-lines-fill'></i> Accepted
											</span>
										),
										value: "accepted",
									},
									{
										label: (
											<span>
												<i className='bi bi-person-dash-fill'></i> Pending
											</span>
										),
										value: "pending",
									},
								]}
								value={status}
								onChange={onChange}
							/>
						</div>
					</div>
				)}
			</div>
			{list && (
				<div style={{ marginBottom: "30px" }}>
					<ColVisibilityDropdown
						options={columns}
						columns={columns}
						columnsToShowHandler={columnsToShowHandler}
					/>
				</div>
			)}
			<Table
				className='text-center'
				scroll={{ x: true }}
				loading={!list}
				pagination={{
					defaultPageSize: 20,
					pageSizeOptions: [10, 20, 50, 100, 200],
					showSizeChanger: true,
					total: total ? total : 100,
					onChange: (page, limit) => {
						dispatch(loadLeaveApplicationByStatus({ page, limit, status }));
					},
				}}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</div>
	);
}

const GetAllLeaves = (props) => {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.leave.list);
	const total = useSelector((state) => state.leave.total);

	useEffect(() => {
		dispatch(loadAllLeaveApplication());
		dispatch(countLeaveApplication());
	}, []);

	// useEffect(() => {
	//   deleteHandler(list, deletedId);
	// }, [deletedId, list]);

	return (
		<UserPrivateComponent permission={"readAll-leaveApplication"}>
			<div className='card card-custom'>
				<div className='card-body'>
					<CustomTable list={list} total={total} />
				</div>
			</div>
		</UserPrivateComponent>
	);
};

export default GetAllLeaves;
