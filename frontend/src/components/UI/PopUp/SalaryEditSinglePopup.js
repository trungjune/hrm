import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../../redux/rtk/features/user/userSlice";
import BtnEditSvg from "../Button/btnEditSvg";
import { updateSalaryHistory } from "../../salaryHistory/salaryHistoryApis";
import moment from "moment";

const SalaryEditSinglePopup = ({ data, setLoading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [salaryStartDate, setsalaryStartDate] = useState(
		dayjs(data?.startDate).format()
	);
	const [salaryEndDate, setsalaryEndDate] = useState(
		dayjs(data?.endDate).format()
	);
	const [loader, setLoader] = useState(false);
	const [salaryComment, setsalaryComment] = useState("");

	const user_id = useParams("id");
	const dispatch = useDispatch();

	const [initialValues, setInitialValues] = useState({
		salary: data?.salary,
		salaryStartDate: moment(data?.startDate),
		salaryEndDate: moment(data?.endDate),
		salaryComment: data?.comment,
	});

	const onFinish = async (values) => {
		setLoading(true);
		const id = data.id || "";
		setLoader(true);
		const infodata = {
			...values,
			salary: parseInt(values.salary),
			salaryComment: salaryComment || "",
			salaryStartDate: salaryStartDate,
			salaryEndDate: salaryEndDate,
		};

		const resp = await updateSalaryHistory(id, infodata);

		if (resp.message === "success") {
			setLoader(false);
			dispatch(loadSingleStaff(user_id.id));
			setInitialValues({});

			setsalaryComment("");
			setsalaryStartDate();
			setsalaryEndDate();

			setIsModalOpen(false);
			setLoading(false);
			window.location.reload();
		} else {
			setLoading(false);
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding designation");
		setLoader(false);
		setLoading(false);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setsalaryComment("");
		setsalaryStartDate();
		setsalaryEndDate();
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
	};
	const handleCancel = () => {
		setsalaryComment("");
		setsalaryStartDate();
		setsalaryEndDate();
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
	};

	return (
		<>
			<button onClick={showModal} className='mr-2'>
				<BtnEditSvg size={20} />
			</button>
			<Modal
				title={`Edit Designation ${data?.id}`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					style={{ marginBottom: "100px" }}
					eventKey='design-form'
					initialValues={initialValues}
					name='basic'
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 16,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<div>
						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Salary'
							name='salary'
							rules={[
								{
									required: true,
									message: "Please input your salary!",
								},
							]}>
							<Input name='salary' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Start Date'
							name='salaryStartDate'
							rules={[
								{
									required: true,
									message: "Please input your start date!",
								},
							]}>
							<DatePicker
								name='salaryStartDate'
								onChange={(date) => setsalaryStartDate(date)}
							/>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='End Date'
							name='salaryEndDate'>
							<DatePicker
								defaultValue={initialValues.salaryEndDate}
								onChange={(date) => setsalaryEndDate(date)}
							/>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Comment'
							name='salaryComment'>
							<Input name='salaryComment' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "20px" }}
							wrapperCol={{
								offset: 6,
								span: 12,
							}}>
							<Button
								onClick={() => setLoader(true)}
								type='primary'
								size='small'
								htmlType='submit'
								block
								loading={loader}>
								Update Now
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};
export default SalaryEditSinglePopup;
