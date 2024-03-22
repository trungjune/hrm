import { Button, Card, DatePicker, Table, Radio, Tooltip } from "antd";
import React from "react";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { CSVLink } from "react-csv";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { useEffect } from "react";
import { DollarCircleFilled, EyeFilled } from "@ant-design/icons";

import dayjs from "dayjs";
import { useState } from "react";
import PageTitle from "../page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
	loadAllPayslipForPaymentMonthWise,
	loadAllPayslipForPayment,
} from "../../redux/rtk/features/payroll/payrollSlice";
import { addPayslipPayment } from "../../redux/rtk/features/payment/paymentSlice";
import { VioletLinkBtn } from "../UI/AllLinkBtn";
import BtnSearchSvg from "../UI/Button/btnSearchSvg";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

function CustomTable({ list, loading, month, year, paymentStatus }) {
	const [columnsToShow, setColumnsToShow] = useState([]);

	const dispatch = useDispatch();
	// const loadingButton = useSelector((state) => state.payment.loading);
	const [loadingButton, setLoadingButton] = useState(false);

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Name",
			key: "name",
			dataIndex: "user",
			render: (user) => `${user?.firstName} ${user?.lastName}`,
		},

		{
			title: "Salary",
			dataIndex: "salary",
			key: "salary",
		},
		{
			title: "Salary Payable",
			dataIndex: "salaryPayable",
			key: "salaryPayable",
		},
		{
			title: "Month ",
			key: "month",
			render: ({ salaryMonth }) => `${dayjs(salaryMonth, "M").format("MMM")}`,
		},
		{
			title: "Year",
			key: "year",
			render: ({ salaryYear }) => `${salaryYear}`,
		},

		{
			title: "bonus",
			dataIndex: "bonus",
			key: "bonus",
		},

		{
			title: "bonusComment",
			dataIndex: "bonusComment",
			key: "bonusComment",
		},

		{
			title: "deduction",
			dataIndex: "deduction",
			key: "deduction",
		},

		{
			title: "deductionComment",
			dataIndex: "deductionComment",
			key: "deductionComment",
		},

		{
			title: "Total",
			dataIndex: "totalPayable",
			key: "totalPayable",
		},

		{
			title: "W Hours",
			dataIndex: "workingHour",
			key: "workingHour",
			render: (workingHour) => `${workingHour?.toFixed(2)} hours`,
		},
		{
			title: "Status",
			dataIndex: "paymentStatus",
			key: "paymentStatus",
		},
		{
			title: "Action",
			key: "action",
			render: ({ id, paymentStatus }) => {
				const onPayment = async () => {
					setLoadingButton(true);
					const resp = await dispatch(addPayslipPayment(id));
					if (resp.meta.requestStatus === "fulfilled") {
						setLoadingButton(false);
						dispatch(
							loadAllPayslipForPaymentMonthWise({
								month,
								year,
								status: paymentStatus,
							})
						);
					}
				};

				return (
					<div flex justify-between>
						<Link to={`/admin/payroll/${id}`}>
							<Tooltip title='View'>
								<Button
									icon={<EyeFilled />}
									type='primary'
									size='middle'
									className='mr-2'></Button>
							</Tooltip>
						</Link>

						<UserPrivateComponent permission='create-transaction'>
							<Tooltip title='Payment'>
								<Button
									loading={loadingButton[id]}
									icon={<DollarCircleFilled />}
									type='primary'
									size='middle'
									onClick={onPayment}
									disabled={paymentStatus === "PAID"}></Button>
							</Tooltip>
						</UserPrivateComponent>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div className='mt-5'>
			<div className='text-center my-2 flex justify-between'>
				{list && (
					<div style={{ marginBottom: "30px" }}>
						<ColVisibilityDropdown
							options={columns}
							columns={columns}
							columnsToShowHandler={columnsToShowHandler}
						/>
					</div>
				)}

				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='payslips'>
								Download CSV
							</CSVLink>
						</CsvLinkBtn>
					</div>
				)}
			</div>

			<Table
				scroll={{ x: true }}
				loading={loading || loadingButton}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</div>
	);
}

const PayslipList = () => {
	const [month, setMonth] = useState(dayjs().format("M"));
	const [year, setYear] = useState(dayjs().format("YYYY"));
	const [paymentStatus, setPaymentStatus] = useState("ALL");

	const payroll = useSelector((state) => state.payroll.list);
	const loading = useSelector((state) => state.payroll.loading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllPayslipForPayment());
	}, []);

	// TODO: Update ONCHANGEs function

	const onMonthChange = (date, dateString) => {
		setMonth(dateString);
		// dispatch(loadAllPayslipForPayment({ month: dateString, year }));
	};

	const onYearChange = (date, dateString) => {
		setYear(dateString);
	};

	const options = [
		{
			label: "ALL",
			value: "ALL",
		},
		{
			label: "PAID",
			value: "PAID",
		},
		{
			label: "UNPAID",
			value: "UNPAID",
		},
	];

	const onChange4 = ({ target: { value } }) => {
		setPaymentStatus(value);
	};

	const onClickSearch = () => {
		if (paymentStatus === "ALL") {
			dispatch(loadAllPayslipForPayment({ month, year }));
		} else {
			dispatch(
				loadAllPayslipForPaymentMonthWise({
					month,
					year,
					status: paymentStatus,
				})
			);
		}
	};

	return (
		<div>
			<PageTitle title='Back' />
			<UserPrivateComponent permission='readAll-payroll'>
				<Card className='mt-5'>
					<div className='flex justify-end'>
						<h1 className='text-base text-color-2 items-center mr-2 mt-1'>
							{" "}
							Select Month :{" "}
						</h1>
						<DatePicker
							format={"M"}
							className=' mr-5'
							style={{ maxWidth: "200px" }}
							picker='month'
							// defaultValue={dayjs()}
							onChange={onMonthChange}
						/>
						<h1 className='text-base text-color-2 items-center mr-2 mt-1'>
							{" "}
							Select Year :{" "}
						</h1>
						<DatePicker
							format={"YYYY"}
							picker='year'
							style={{ maxWidth: "200px" }}
							onChange={onYearChange}
							// defaultValue={dayjs()}
						/>
						<Radio.Group
							className='ml-3 mr-3'
							options={options}
							onChange={onChange4}
							value={paymentStatus}
							optionType='button'
							buttonStyle='solid'
						/>
						<VioletLinkBtn>
							<button onClick={onClickSearch}>
								<BtnSearchSvg size={25} title={"SEARCH"} loading={loading} />
							</button>
						</VioletLinkBtn>
					</div>

					<CustomTable
						list={payroll}
						loading={loading}
						month={month}
						year={year}
						paymentStatus={paymentStatus}
					/>
				</Card>
			</UserPrivateComponent>
		</div>
	);
};

export default PayslipList;
