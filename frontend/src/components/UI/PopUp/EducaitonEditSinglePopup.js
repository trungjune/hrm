import { Button, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../../redux/rtk/features/user/userSlice";
import { updateEducation } from "../../education/educationApis";
import BtnEditSvg from "../Button/btnEditSvg";
import moment from "moment";

const EducaitonEditSinglePopup = ({ data, setLoading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [studyStartDate, setstudyStartDate] = useState(
		dayjs(data?.startDate).format("YYYY-MM-DD")
	);
	const [studyEndDate, setstudyEndDate] = useState(
		dayjs(data?.endDate).format("YYYY-MM-DD")
	);
	const [loader, setLoader] = useState(false);

	const [initialValues, setInitialValues] = useState({
		degree: data?.degree || "",
		institution: data?.institution || "",
		fieldOfStudy: data?.fieldOfStudy || "",
		result: data?.result || "",
		studyStartDate: moment(data?.startDate),
		studyEndDate: moment(data?.endDate),
	});

	const user_id = useParams("id");
	const dispatch = useDispatch();

	const onFinish = async (values) => {
		setLoading(true);
		const id = data.id || "";
		setLoader(true);
		const infodata = {
			...values,
			studyStartDate: studyStartDate,
			studyEndDate: studyEndDate,
		};
		const resp = await updateEducation(id, infodata);

		if (resp.message === "success") {
			setLoader(false);
			dispatch(loadSingleStaff(user_id.id));
			setInitialValues({});
			setIsModalOpen(false);
			setLoading(false);
			window.location.reload();
		} else {
			setLoading(false);
			setLoader(false);
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
	};
	const handleCancel = () => {
		setstudyStartDate(dayjs());
		setstudyEndDate(dayjs());
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
				title={`Edit Education ${data?.id}`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					style={{ marginBottom: "100px" }}
					eventKey='department-form'
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
							rules={[
								{
									required: true,
									message: "Please input your start date!",
								},
							]}>
							<DatePicker
								name='studyStartDate'
								onChange={(date) => setstudyStartDate(date)}
								format='YYYY-MM-DD'
							/>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='End Date'
							name='studyEndDate'
							rules={[
								{
									required: true,
									message: "Please input your start date!",
								},
							]}>
							<DatePicker
								name='studyEndDate'
								onChange={(date) => setstudyEndDate(date)}
								format='YYYY-MM-DD'
							/>
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
export default EducaitonEditSinglePopup;
