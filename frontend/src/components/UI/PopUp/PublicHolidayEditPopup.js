import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BtnEditSvg from "../Button/btnEditSvg";
import { useDispatch } from "react-redux";
import {
	loadSinglePublicHoliday,
	updatePublicHoliday,
} from "../../../redux/rtk/features/publicHoliday/publicHolidaySlice";
import dayjs from "dayjs";
import moment from "moment";

const PublicHolidayEdit = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { id } = useParams("id");

	const [loader, setLoader] = useState(false);
	const [date, setDate] = useState(dayjs(data?.date).format());

	const dispatch = useDispatch();

	const onFinish = async (values) => {
		setLoader(true);
		const resp = await dispatch(updatePublicHoliday({ id, values }));

		if (resp.payload.message === "success") {
			setLoader(false);
			dispatch(loadSinglePublicHoliday(id));
		} else {
			setLoader(false);
		}
	};

	const initialValues = {
		name: data?.name,
		date: moment(data?.date),
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
				<BtnEditSvg size={20} />
			</button>
			<Modal
				title='Public Holiday Edit'
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
									message: "Please input name!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Date'
							name='date'
							rules={[{ required: true, message: "Please select date!" }]}>
							<DatePicker format={"YYYY-DD-MM"} />
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
								Update Public Holiday
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};
export default PublicHolidayEdit;
