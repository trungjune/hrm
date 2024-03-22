import { Button, Card, DatePicker, Input, InputNumber, Table } from "antd";
import React from "react";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { CSVLink } from "react-csv";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import PageTitle from "../page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
	addPayslip,
	loadAllPayslip,
	updatePayslip,
	clearPayroll,
} from "../../redux/rtk/features/payroll/payrollSlice";
import { useNavigate } from "react-router-dom";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

function CustomTable({ list, loading }) {
	const [columnsToShow, setColumnsToShow] = useState([]);
	const dispatch = useDispatch();

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Name",
			key: "name",
			render: (record) => `${record.firstName} ${record.lastName}`,
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
			render: (salaryPayable, { id }) => {
				return (
					<div>
						<InputNumber
							size={"small"}
							style={{ width: "150px", fontSize: "15px" }}
							onChange={(value) => {
								dispatch(updatePayslip({ id, value, key: "salaryPayable" }));
							}}
							value={salaryPayable}
							min={0}
							// defaultValue={salaryPayable}
						/>{" "}
					</div>
				);
			},
		},

		{
			title: "Bonus",
			dataIndex: "bonus",
			key: "bonus",
			render: (bonus, { id }) => {
				return (
					<div>
						<InputNumber
							size={"small"}
							style={{ width: "100px", fontSize: "15px" }}
							onChange={(value) => {
								dispatch(updatePayslip({ id, value, key: "bonus" }));
							}}
							value={bonus}
							min={0}
							// defaultValue={bonus}
						/>{" "}
					</div>
				);
			},
		},

		{
			title: "B-Comment",
			dataIndex: "bonusComment",
			key: "bonusComment",
			render: (bonusComment, { id }) => {
				return (
					<div>
						<Input
							placeholder='comment'
							size={"small"}
							style={{ width: "100px", fontSize: "15px" }}
							onChange={(e) => {
								dispatch(
									updatePayslip({
										id,
										value: e.target.value,
										key: "bonusComment",
									})
								);
							}}
							value={bonusComment}

							// defaultValue={deductionComment}
						/>{" "}
					</div>
				);
			},
		},

		{
			title: "Deduction",
			dataIndex: "deduction",
			key: "deduction",
			render: (deduction, { id }) => {
				return (
					<div>
						<InputNumber
							size={"small"}
							style={{ width: "100px", fontSize: "15px" }}
							onChange={(value) => {
								dispatch(updatePayslip({ id, value, key: "deduction" }));
							}}
							value={deduction}
							min={0}
							// defaultValue={deduction}
						/>{" "}
					</div>
				);
			},
		},

		{
			title: "D-Comment",
			dataIndex: "deductionComment",
			key: "deductionComment",
			render: (deductionComment, { id }) => {
				return (
					<div>
						<Input
							placeholder='comment'
							size={"small"}
							style={{ width: "100px", fontSize: "15px" }}
							onChange={(e) => {
								dispatch(
									updatePayslip({
										id,
										value: e.target.value,
										key: "deductionComment",
									})
								);
							}}
							value={deductionComment}

							// defaultValue={deductionComment}
						/>{" "}
					</div>
				);
			},
		},

		{
			title: "Working Hours",
			dataIndex: "workingHour",
			key: "workingHour",
			render: (workingHour) => `${workingHour?.toFixed(2)} hours`,
		},

		{
			title: "Total Payable",
			dataIndex: "totalPayable",
			key: "totalPayable",
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
				loading={loading}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
				expandable={{
					expandedRowRender: (record) => (
						<div className='flex justify-start'>
							<div className='flex flex-col mr-10'>
								<div className='flex justify-between'>
									<div className='font-bold'>Paid Leave : </div>
									<div>{record.paidLeave}</div>
								</div>
								<div className='flex justify-between'>
									<div className='font-bold'>Unpaid Leave : </div>
									<div className='ml-2'>{record.unpaidLeave}</div>
								</div>
							</div>
							<div className='flex flex-col mr-10'>
								<div className='flex justify-between '>
									<div className='font-bold'>M-Holiday : </div>
									<div>{record.monthlyHoliday}</div>
								</div>
								<div className='flex justify-between'>
									<div className='font-bold'>P-Holiday : </div>
									<div>{record.publicHoliday}</div>
								</div>
							</div>

							<div className='flex flex-col mr-10'>
								<div className='flex justify-between'>
									<div className='font-bold'>Work Day : </div>
									<div className='ml-2'>{record.workDay}</div>
								</div>
								<div className='flex justify-between'>
									<div className='font-bold'> Shift W.H : </div>
									<div>{record.shiftWiseWorkHour}</div>
								</div>
							</div>
							<div className='flex flex-col mr-10'>
								<div className='flex justify-between'>
									<div className='font-bold'>Month W.H : </div>
									<div className='ml-2'>{record.monthlyWorkHour}</div>
								</div>
								<div className='flex justify-between'>
									<div className='font-bold'>H Salary : </div>
									<div className='ml-2'>{record.hourlySalary}</div>
								</div>
							</div>
						</div>
					),
					rowExpandable: (record) => record.name !== "Not Expandable",
				}}
			/>
		</div>
	);
}

const CalculatePayroll = () => {
	const [month, setMonth] = useState(dayjs().format("M"));
	const [year, setYear] = useState(dayjs().format("YYYY"));
	const [loading, setLoading] = useState(false);

	const payroll = useSelector((state) => state.payroll.list);
	const loader = useSelector((state) => state.payroll.loading);

	const dispatch = useDispatch();
	const [payslips, setPayslips] = useState([]);

	useEffect(() => {
		dispatch(loadAllPayslip({ month, year }));

		return () => {
			dispatch(clearPayroll());
		};
	}, []);

	useEffect(() => {
		setPayslips(payroll);
	}, [payroll]);

	const onMonthChange = (date, dateString) => {
		setMonth(dateString);
		dispatch(loadAllPayslip({ month: dateString, year }));
	};

	const onYearChange = (date, dateString) => {
		setYear(dateString);
		dispatch(loadAllPayslip({ month, year: dateString }));
	};

	const navigate = useNavigate();

	const OnSubmit = async () => {
		setLoading(true);
		const dataArray = payslips.map((i) => ({
			userId: i.id,
			salaryMonth: parseInt(month),
			salaryYear: parseInt(year),
			salary: i.salary,
			paidLeave: i.paidLeave,
			unpaidLeave: i.unpaidLeave,
			monthlyHoliday: i.monthlyHoliday,
			publicHoliday: i.publicHoliday,
			workDay: i.workDay,
			shiftWiseWorkHour: i.shiftWiseWorkHour,
			monthlyWorkHour: i.monthlyWorkHour,
			hourlySalary: i.hourlySalary,
			bonus: i.bonus,
			bonusComment: i.bonusComment,
			deduction: i.deduction,
			deductionComment: i.deductionComment,
			totalPayable: i.totalPayable,
			workingHour: i.workingHour,
			salaryPayable: i.salaryPayable,
		}));

		try {
			const resp = await dispatch(addPayslip(dataArray));
			if (resp.payload.message === "success") {
				setLoading(false);
				navigate("/admin/payroll/list");
			} else {
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<div>
			<PageTitle title='Back' />
			<UserPrivateComponent permission={"readAll-payroll"}>
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
							defaultValue={dayjs()}
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
							defaultValue={dayjs()}
						/>
					</div>

					<CustomTable list={payroll} loading={loader} />

					<div className='flex justify-end'>
						<Button
							loading={loading}
							type='primary'
							size='large'
							htmlType='sumbit'
							onClick={OnSubmit}
							className='mt-5 text-end'>
							Genrate Payslip
						</Button>
					</div>
				</Card>
			</UserPrivateComponent>
		</div>
	);
};

export default CalculatePayroll;
