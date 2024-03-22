import { Card, DatePicker, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllTransaction } from "../../redux/rtk/features/transaction/transactionSlice";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import "./transaction.css";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

//Date fucntinalities
let startdate = dayjs().startOf("month");
let enddate = dayjs().endOf("month");

function CustomTable({ list, total }) {
	const dispatch = useDispatch();
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
		},
		{
			id: 2,
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => dayjs(date).format("DD/MM/YYYY"),
		},

		{
			id: 3,
			title: "Debit Account",
			dataIndex: "debit",
			key: "debit",
			render: (debit) => debit?.name,
		},

		{
			id: 4,
			title: "Credit Account",
			dataIndex: "credit",
			key: "credit",
			render: (credit) => credit?.name,
		},

		{
			id: 5,
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			responsive: ["md"],
		},
		{
			id: 6,
			title: "Particulars",
			dataIndex: "particulars",
			key: "particulars",
		},
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
		debit: i?.debit?.name,
		credit: i?.credit?.name,
	}));

	return (
		<div>
			<div className='flex mt-4 mb-4 mr-4 justify-end '>
				{list && (
					<CsvLinkBtn>
						<CSVLink data={CSVlist} filename='transaction'>
							Download CSV
						</CSVLink>
					</CsvLinkBtn>
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
				loading={!list}
				pagination={{
					defaultPageSize: 20,
					pageSizeOptions: [10, 20, 50, 100, 200],
					showSizeChanger: true,
					total: total ? total : 0,

					onChange: (page, limit) => {
						dispatch(loadAllTransaction({ page, limit, startdate, enddate }));
					},
				}}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</div>
	);
}

const GetAllTransaction = (props) => {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.transactions.list);

	const total = useSelector((state) => state.transactions.total);

	const { RangePicker } = DatePicker;

	useEffect(() => {
		dispatch(
			loadAllTransaction({
				page: 1,
				limit: 10,
				startdate,
				enddate,
			})
		);
	}, []);

	const onCalendarChange = (dates) => {
		startdate = (dates?.[0]).format("YYYY-MM-DD");
		enddate = (dates?.[1]).format("YYYY-MM-DD");
		dispatch(
			loadAllTransaction({
				page: 1,
				limit: 20,
				startdate: startdate,
				enddate: enddate,
			})
		);
	};

	return (
		<UserPrivateComponent permission={"readAll-transaction"}>
			<Card className=''>
				<div className='card-title  flex  justify-between mr-4'>
					<h5 className='text-xl txt-color-2'>
						<span>Transaction History</span>
					</h5>
					<div>
						<RangePicker
							className='range-picker'
							onCalendarChange={onCalendarChange}
							defaultValue={[startdate, enddate]}
						/>
					</div>
				</div>
				{list && (
					<CustomTable
						list={list}
						total={total?._count?.id}
						startdate={startdate}
						enddate={enddate}
					/>
				)}
			</Card>
		</UserPrivateComponent>
	);
};

export default GetAllTransaction;
