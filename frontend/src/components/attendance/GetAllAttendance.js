import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Navigate } from "react-router-dom";

import { Card, DatePicker, Segmented, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";

import { CsvLinkBtn, TableHeraderh2 } from "../UI/CsvLinkBtn";
import {
	loadAllAttendancePaginated,
	clearAttendanceList,
} from "../../redux/rtk/features/attendance/attendanceSlice";
import BtnSearchSvg from "../UI/Button/btnSearchSvg";
import { VioletLinkBtn } from "../UI/AllLinkBtn";

//Date fucntinalities
let startdate = dayjs().startOf("month");
let enddate = dayjs().endOf("month");

function CustomTable({ list, total, status, setStatus, loading }) {
	const [columnsToShow, setColumnsToShow] = useState([]);

	const dispatch = useDispatch();

	const onChange = (value) => {
		setStatus(value);
		dispatch(
			loadAllAttendancePaginated({
				page: 1,
				limit: 30,
				startdate,
				enddate,
			})
		);
	};

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			id: 10,
			title: "Name",
			dataIndex: "user",
			key: "user",
			render: (user) => `${user?.firstName} ${user?.lastName}`,
		},
		{
			id: 2,
			title: "In Time",
			dataIndex: "inTime",
			key: "inTime",
			render: (inTime) => dayjs(inTime).format("DD-MM-YYYY, h:mm A") || "NONE",
		},
		{
			id: 3,
			title: "Out Time ",
			dataIndex: `outTime`,
			key: "outTime",
			render: (outTime) =>
				dayjs(outTime).format("DD-MM-YYYY, h:mm A") || "NONE",
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
			id: 6,
			title: "Total Hour",
			dataIndex: "totalHour",
			key: "totalHour",
			render: (totalHour) => totalHour || "Not Checked",
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

	const CSVlist = list?.map((i) => ({
		...i,
		supplier: i?.supplier?.name,
	}));

	return (
		<div className='mt-5'>
			{list && (
				<div className='text-center my-2 flex justify-end'>
					<CsvLinkBtn>
						<CSVLink data={CSVlist} filename='purchase'>
							Download CSV
						</CSVLink>
					</CsvLinkBtn>

					{/*<div>
						<Segmented
							className='text-center rounded text-red-500 mt-0.5'
							size='middle'
							options={[
								{
									label: (
										<span>
											<i className='bi bi-person-lines-fill'></i> Active
										</span>
									),
									value: "true",
								},
								{
									label: (
										<span>
											<i className='bi bi-person-dash-fill'></i> Inactive
										</span>
									),
									value: "false",
								},
							]}
							value={status}
							onChange={onChange}
						/>
            </div> */}
				</div>
			)}

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
				pagination={{
					defaultPageSize: 30,
					pageSizeOptions: [30, 40, 50, 100, 200],
					showSizeChanger: true,
					total: total ? total : 100,

					onChange: (page, limit) => {
						dispatch(
							loadAllAttendancePaginated({ page, limit, startdate, enddate })
						);
					},
				}}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</div>
	);
}

const GetAllAttendance = (props) => {
	const dispatch = useDispatch();

	const { list, loading } = useSelector((state) => state.attendance);
	const [status, setStatus] = useState("true");

	// const [total, setTotal] = useState(0);

	const { RangePicker } = DatePicker;

	useEffect(() => {
		dispatch(
			loadAllAttendancePaginated({
				page: 1,
				limit: 30,
				startdate,
				enddate,
			})
		);
	}, []);

	const onCalendarChange = (dates) => {
		startdate = (dates?.[0]).format("DD-MM-YYYY");
		enddate = (dates?.[1]).format("DD-MM-YYYY");
	};

	const onClickSearch = () => {
		// dispatch(clearAttendanceList());

		dispatch(
			loadAllAttendancePaginated({
				page: 1,
				limit: 30,
				startdate,
				enddate,
			})
		);
	};

	// TODO : Add Search functionality here

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<>
			<Card className='card card-custom mt-3 '>
				<div className='card-body'>
					<div className='flex justify-between'>
						<TableHeraderh2>Attendance List</TableHeraderh2>
						<div className='flex justify-end'>
							<RangePicker
								onCalendarChange={onCalendarChange}
								defaultValue={[startdate, enddate]}
								format={"DD-MM-YYYY"}
								className='range-picker mr-3'
								style={{ maxWidth: "400px" }}
							/>
							<VioletLinkBtn>
								<button onClick={onClickSearch}>
									<BtnSearchSvg size={25} title={"SEARCH"} loading={loading} />
								</button>
							</VioletLinkBtn>
						</div>
					</div>
					{/*TODO : ADD TOTAL AMOUNT HERE */}
					<CustomTable
						list={list}
						loading={loading}
						total={100}
						startdate={startdate}
						enddate={enddate}
						status={status}
						setStatus={setStatus}
					/>
				</div>
			</Card>
		</>
	);
};

export default GetAllAttendance;
