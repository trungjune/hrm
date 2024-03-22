import { Button, Form, Input, Modal, TimePicker } from "antd";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BtnEditSvg from "../Button/btnEditSvg";
import { updateShift } from "../../../redux/rtk/features/shift/shiftSlice";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

const ShiftEditPopup = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { id } = useParams("id");
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const { loading } = useSelector((state) => state.shift);
	const navigate = useNavigate();
	const onFinish = (values) => {
		dispatch(updateShift({ id: id, values: values }));
		setIsModalOpen(false);
		navigate(-1);
	};

	const [initialValues, setInitialValues] = useState({
		name: data?.name || "",
		startTime: dayjs(data?.startTime),
		endTime: dayjs(data?.endTime),
	});

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding department");
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<button onClick={showModal}>
				<BtnEditSvg size={30} />
			</button>
			<Modal
				title='Edit Shift'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					form={form}
					style={{ marginBottom: "40px" }}
					eventKey='shift-form'
					name='basic'
					initialValues={initialValues}
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 12,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<div>
						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Name'
							name='name'
							rules={[
								{
									required: true,
									message: "Please input your shift!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Start Time'
							name='startTime'
							rules={[
								{
									required: true,
									message: "Please input your shift!",
								},
							]}>
							<TimePicker name='startTime' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "20px" }}
							label='End Time'
							name='endTime'
							rules={[
								{
									required: true,
									message: "Please input your shift!",
								},
							]}>
							<TimePicker name='endTime' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							wrapperCol={{
								offset: 6,
								span: 12,
							}}>
							<Button
								type='primary'
								size='small'
								htmlType='submit'
								block
								loading={loading}>
								Update Shift
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};
export default ShiftEditPopup;
