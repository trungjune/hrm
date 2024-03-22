import { Button, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../../redux/rtk/features/user/userSlice";
import { addEducation, updateEducation } from "../../education/educationApis";
import BtnEditSvg from "../Button/btnEditSvg";

const EducaitonAddSinglePopup = ({ data, setLoading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const [studyStartDate, setstudyStartDate] = useState(null);
	const [studyEndDate, setstudyEndDate] = useState(null);
	const [loader, setLoader] = useState(false);

	const user_id = useParams("id");
	const dispatch = useDispatch();

	const onFinish = async (values) => {
		setLoader(true);
		setLoading(true);
		const infodata = {
			...values,
			userId: parseInt(user_id.id),
			studyStartDate: dayjs(studyStartDate).format("YYYY-MM-DD"),
			studyEndDate: dayjs(studyEndDate).format("YYYY-MM-DD"),
		};

		const resp = await addEducation(infodata);

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
		setstudyStartDate(dayjs());
		setstudyEndDate(dayjs());
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
		form.resetFields();
	};
	const handleCancel = () => {
		setstudyStartDate(dayjs());
		setstudyEndDate(dayjs());
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
		form.resetFields();
	};

	return (
		<>
			<div className='text-center'>
				<Button type='primary' onClick={showModal}>
					Add New Education
				</Button>
			</div>
			<Modal
				title={`Add Education`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					form={form}
					style={{ marginBottom: "100px" }}
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
							label='Degree'
							name='degree'
							rules={[
								{
									required: true,
									message: "Please input your degree!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Institution'
							name='institution'
							rules={[
								{
									required: true,
									message: "Please input your institution!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Field of Study'
							name='fieldOfStudy'
							rules={[
								{
									required: true,
									message: "Please input your field of study!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Result'
							name='result'
							rules={[
								{
									required: true,
									message: "Please input your result!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Start Date'
							name='studyStartDate'
							valuePropName='studyStartDate'
							rules={[
								{
									required: true,
									message: "Please input your start date!",
								},
							]}>
							<DatePicker onChange={(date) => setstudyStartDate(date)} />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='End Date'
							name='studyEndDate'
							valuePropName='studyEndDate'>
							<DatePicker onChange={(date) => setstudyEndDate(date)} />
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
export default EducaitonAddSinglePopup;
