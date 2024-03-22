import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BtnEditSvg from "../Button/btnEditSvg";
import { useDispatch } from "react-redux";
import {
	loadAllLeavePolicy,
	loadSingleLeavePolicy,
	updateLeavePolicy,
} from "../../../redux/rtk/features/leavePolicy/leavePolicySlice";

const LeavePolicyEdit = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { id } = useParams("id");

	const [loader, setLoader] = useState(false);

	const dispatch = useDispatch();

	const onFinish = async (values) => {
		const FormData = {
			...values,
			paidLeaveCount: parseInt(values.paidLeaveCount),
			unpaidLeaveCount: parseInt(values.unpaidLeaveCount),
		};
		setLoader(true);
		const resp = await dispatch(updateLeavePolicy({ id, values: FormData }));

		if (resp.payload.message === "success") {
			setLoader(false);
			dispatch(loadSingleLeavePolicy(id));
		} else {
			setLoader(false);
		}
	};

	const initialValues = {
		name: data?.name,
		paidLeaveCount: data?.paidLeaveCount,
		unpaidLeaveCount: data?.unpaidLeaveCount,
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding department");
		setLoader(false);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		setLoader(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setLoader(false);
	};
	return (
		<>
			<button onClick={showModal}>
				<BtnEditSvg size={30} />
			</button>
			<Modal
				title='Leave Policy Edit'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					style={{ marginBottom: "50px" }}
					eventKey='department-form'
					initialValues={{ ...initialValues }}
					name='basic'
					labelCol={{
						span: 7,
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
									message: "Please input Leave Policy name!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Paid Leave'
							name='paidLeaveCount'
							rules={[
								{
									required: true,
									message: "Please input your Paid Leave!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Unpaid Leave'
							name='unpaidLeaveCount'
							rules={[
								{
									required: true,
									message: "Please input your Unpaid Leave!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							wrapperCol={{
								offset: 7,
								span: 12,
							}}>
							<Button
								onClick={() => setLoader(true)}
								type='primary'
								size='small'
								htmlType='submit'
								block
								loading={loader}>
								Update Leave Policy
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};
export default LeavePolicyEdit;
