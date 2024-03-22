import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import "./account.css";

import { Card, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAccount } from "../../redux/rtk/features/account/accountSlice";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import ViewBtn from "../Buttons/ViewBtn";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

//Date fucntinalities
let startdate = dayjs(new Date()).format("YYYY-MM-DD");
let enddate = dayjs(new Date()).add(1, "day").format("YYYY-MM-DD");

function CustomTable({ list, total }) {
	const dispatch = useDispatch();
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id) => <Link to={`/admin/account/${id}`}>{id}</Link>,
		},

		{
			id: 2,
			title: "Account",
			dataIndex: "name",
			key: "name",
		},

		{
			id: 3,
			title: "Account Type ",
			dataIndex: "account",
			key: "account",
			render: (account) => account?.name,
			responsive: ["md"],
		},
		{
			id: 4,
			title: "Action",
			key: "action",
			render: ({ id }) => (
				<UserPrivateComponent permission={"readSingle-account"}>
					<ViewBtn path={`/admin/account/${id}`} />
				</UserPrivateComponent>
			),
		},
	];

	useEffect(() => {
		// setColumnItems(menuItems);
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	const CSVlist = list?.map((i) => ({
		...i,
		account: i?.account?.name,
	}));

	return (
		<div>
			<div className='flex justify-end mr-5 '>
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink data={CSVlist} filename='accounts'>
								Download CSV
							</CSVLink>
						</CsvLinkBtn>
					</div>
				)}
			</div>

			{list && (
				<div style={{ marginBottom: "30px" }} className=' ml-5  mt-4'>
					<ColVisibilityDropdown
						options={columns}
						columns={columns}
						columnsToShowHandler={columnsToShowHandler}
					/>
				</div>
			)}

			<Table
				scroll={{ x: true }}
				loading={!list}
				pagination={{
					defaultPageSize: 20,
					pageSizeOptions: [10, 20, 50, 100, 200],
					showSizeChanger: true,

					onChange: (page, limit) => {
						dispatch(loadAllAccount());
					},
				}}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</div>
	);
}

const GetAllAccount = (props) => {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.accounts.list);

	useEffect(() => {
		dispatch(loadAllAccount());
	}, []);

	return (
		<Card className=''>
			<h5 className=' text-2xl'>
				<span className='ml-4'>Accounts List</span>
			</h5>

			<CustomTable list={list} startdate={startdate} enddate={enddate} />
		</Card>
	);
};

export default GetAllAccount;
