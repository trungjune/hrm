import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../../redux/rtk/features/user/userSlice";
import { addSalaryHistory } from "../../salaryHistory/salaryHistoryApis";

const SalaryAddSinglePopup = ({ data, setLoading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const [salaryStartDate, setsalaryStartDate] = useState(null);
	const [salaryEndDate, setsalaryEndDate] = useState(null);
	const [loader, setLoader] = useState(false);

	const user_id = useParams("id");
	const dispatch = useDispatch();

	const onFinish = async (values) => {
		setLoader(true);
		setLoading(true);
		const infodata = {
			...values,
			userId: parseInt(user_id.id),
			salary: parseInt(values.salary),
			salaryStartDate: dayjs(salaryStartDate).format("YYYY-MM-DD"),
			salaryEndDate: dayjs(salaryEndDate).format("YYYY-MM-DD"),
		};

		const resp = await addSalaryHistory(infodata);

		if (resp.message === "success") {
			setLoader(false);
			dispatch(loadSingleStaff(user_id.id));
			setIsModalOpen(false);
			setLoading(false);
			form.resetFields();
		} else {
			setLoader(false);
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding department");
		setLoader(false);
		setLoading(false);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setsalaryStartDate(dayjs());
		setsalaryEndDate(dayjs());
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
		form.resetFields();
	};
	const handleCancel = () => {
		setsalaryStartDate(dayjs());
		setsalaryEndDate(dayjs());
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
		form.resetFields();
	};

	return (
		<>
			<div className='text-center'>
				<Button type='primary' onClick={showModal}>
					Add New Salary
				</Button>
			</div>
			<Modal
				title={`Add Salary`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					form={form}
					style={{ marginBottom: "10px" }}
					eventKey='department-form'
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
							name='salary'>
							<Input placeholder='Salary' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Start Date'
							name='salaryStartDate'
							valuePropName='salaryStartDate'
							rules={[
								{
									required: true,
									message: "Please input your start date!",
								},
							]}>
							<DatePicker onChange={(date) => setsalaryStartDate(date)} />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='End Date'
							name='salaryEndDate'
							valuePropName='salaryEndDate'>
							<DatePicker onChange={(date) => setsalaryEndDate(date)} />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Comment'
							name='salaryComment'>
							<Input placeholder='Comment' />
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
								Add Now
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};
export default SalaryAddSinglePopup;
