import React, { useEffect, useState } from "react";
import ViewBtn from "../Buttons/ViewBtn";
import dayjs from "dayjs";
import { Card, Table, Tag } from "antd";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { CSVLink } from "react-csv";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import PageTitle from "../page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
	loadAttendanceByUserId,
	clearAttendanceList,
} from "../../redux/rtk/features/attendance/attendanceSlice";

import { useParams } from "react-router-dom";
import Loader from "../loader/loader";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

function CustomTable({ list, loading }) {
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
			title: "Name",
			dataIndex: "user",
			key: "user",
			render: ({ firstName, lastName }) => firstName + " " + lastName,
		},

		{
			id: 3,
			title: "inTime",
			dataIndex: "inTime",
			key: "inTime",
			render: (inTime) => dayjs(inTime).format("DD-MM-YYYY, h:mm A"),
		},

		{
			id: 4,
			title: "Out Time",
			dataIndex: "outTime",
			key: "outTime",
			render: (outTime) => dayjs(outTime).format("DD-MM-YYYY, h:mm A"),
		},
		{
			id: 4,
			title: "In Status",
			dataIndex: "inTimeStatus",
			key: "inTimeStatus",
			render: (inTimeStatus) => {
				// use Tag component from antd to show status in different colors like green, red, yellow etc based on the status value
				if (inTimeStatus === "Late") {
					return <Tag color='red'>{inTimeStatus.toUpperCase()}</Tag>;
				} else if (inTimeStatus === "Early") {
					return <Tag color='blue'>{inTimeStatus.toUpperCase()}</Tag>;
				} else if (inTimeStatus === "On Time") {
					return <Tag color='green'>{inTimeStatus.toUpperCase()}</Tag>;
				} else {
					return <Tag style={{ color: "orange" }}>NONE</Tag>;
				}
			},
		},
		{
			id: 5,
			title: "Out Status",
			dataIndex: "outTimeStatus",
			key: "outTimeStatus",
			render: (outTimeStatus) => {
				// use Tag component from antd to show status in different colors like green, red, yellow etc based on the status value
				if (outTimeStatus === "Late") {
					return <Tag color='red'>{outTimeStatus.toUpperCase()}</Tag>;
				} else if (outTimeStatus === "Early") {
					return <Tag color='blue'>{outTimeStatus.toUpperCase()}</Tag>;
				} else if (outTimeStatus === "On Time") {
					return <Tag color='green'>{outTimeStatus.toUpperCase()}</Tag>;
				} else {
					return <Tag style={{ color: "orange" }}>NONE</Tag>;
				}
			},
		},
		{
			id: 7,
			title: "Punch By",
			dataIndex: "punchBy",
			key: "punchBy",
			render: (punchBy) => (
				<span>
					{punchBy[0]?.firstName + " " + punchBy[0]?.lastName || "Not Checked"}
				</span>
			),
		},
		{
			id: 6,
			title: "Total Hour",
			dataIndex: "totalHour",
			key: "totalHour",
			render: (totalHour) => totalHour || "Not Checked",
		},

		// {
		// 	id: 8,
		// 	title: "Action",
		// 	dataIndex: "id",
		// 	key: "id",
		// 	render: (id) => (
		// 		<AttendBtn
		// 			path={`/admin/attendance/${id}`}
		// 			text='View'
		// 			icon={<BtnViewSvg />}
		// 		/>
		// 	),
		// },
	];

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Card className='mt-5'>
			<div className='text-center my-2 flex justify-between'>
				<h5 className='department-list-title text-color-2 text-xl mb-2'>
					Attendance History
				</h5>
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='attendance_user'>
								Download CSV
							</CSVLink>
						</CsvLinkBtn>
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
				scroll={{ x: true }}
				loading={loading}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</Card>
	);
}

const UserAttendance = () => {
	const { list, loading } = useSelector((state) => state.attendance);
	const { id } = useParams("id");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAttendanceByUserId(id));

		return () => {
			dispatch(clearAttendanceList());
		};
	}, [id]);

	return (
		<UserPrivateComponent permission='readSingle-attendance'>
			<div>
				<PageTitle title='Back' />
				{!loading ? <CustomTable list={list} loading={loading} /> : <Loader />}
			</div>
		</UserPrivateComponent>
	);
};

export default UserAttendance;
