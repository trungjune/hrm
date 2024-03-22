import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

import "./user.css";

import { Segmented, Table } from "antd";

import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";

import { loadAllStaff } from "../../redux/rtk/features/user/userSlice";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import ViewBtn from "../Buttons/ViewBtn";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import AttendBtn from "../Buttons/AttendBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

function CustomTable({ list }) {
	const dispatch = useDispatch();
	const [status, setStatus] = useState("true");
	const [columnsToShow, setColumnsToShow] = useState([]);

	const { loading } = useSelector((state) => state.users);

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

			key: "fullName",
			render: ({ firstName, lastName }) =>
				(firstName + " " + lastName).toUpperCase(),
		},
		{
			id: 3,
			title: "Usr Name",
			dataIndex: "userName",
			key: "userName",
		},

		// {
		// 	id: 4,
		// 	title: "Role",
		// 	dataIndex: "role",
		// 	key: "role",
		// 	render: (role) => role.name,
		// },
		{
			id: 5,
			title: "Designation",
			dataIndex: "designationHistory",
			key: "designationHistory",
			render: (record) =>
				record.length > 0 ? record[0].designation.name : "N/A",
		},

		// TODO: fix this column to show the correct data

		{
			id: 6,
			title: "E-Status",
			dataIndex: "employmentStatus",
			key: "employmentStatus",
			render: (record) => (record?.name ? record?.name : "N/A"),
		},
		{
			id: 8,
			title: "Department",
			dataIndex: "department",
			key: "department",
			render: (record) => (record?.name ? record?.name : "N/A"),
		},

		{
			id: 9,
			title: "Shift",
			dataIndex: "shift",
			key: "shift",
			render: (record) => (record?.name ? record?.name : "N/A"),
		},

		{
			id: 7,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<div className='flex justify-start'>
					<UserPrivateComponent permission={"readSingle-user"}>
						<ViewBtn path={`/admin/hr/staffs/${id}/`} />
					</UserPrivateComponent>
					<UserPrivateComponent permission={"readSingle-attendance"}>
						<AttendBtn path={`/admin/attendance/user/${id}`} />
					</UserPrivateComponent>
				</div>
			),
		},
	];
	//make a onChange function
	const onChange = (value) => {
		setStatus(value);
		dispatch(loadAllStaff({ status: value }));
	};

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div className='ant-card p-4 rounded mt-5'>
			<div className='flex my-2 justify-between'>
				<div className='w-50'>
					<h4 className='text-2xl mb-2'>Employee List</h4>
				</div>
				{list && (
					<div className='flex justify-end mr-4'>
						<div className='mt-0.5'>
							<CsvLinkBtn>
								<CSVLink
									data={list}
									className='btn btn-dark btn-sm'
									style={{ marginTop: "5px" }}
									filename='staffs'>
									Download CSV
								</CSVLink>
							</CsvLinkBtn>
						</div>

						<div>
							<Segmented
								className='text-center rounded text-red-500'
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
				scroll={{ x: true }}
				loading={loading}
				pagination={{
					defaultPageSize: 20,
				}}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</div>
	);
}

const GetAllCust = (props) => {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.users.list);

	useEffect(() => {
		dispatch(loadAllStaff({ status: "true" }));
	}, []);

	// useEffect(() => {
	//   deleteHandler(list, deletedId);
	// }, [deletedId, list]);

	return (
		<UserPrivateComponent permission={"readAll-user"}>
			<div className='card card-custom'>
				<div className='card-body'>
					<CustomTable list={list} />
				</div>
			</div>
		</UserPrivateComponent>
	);
};

export default GetAllCust;
