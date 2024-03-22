import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BtnEditSvg from "../Button/btnEditSvg";
import { useDispatch } from "react-redux";
import {
	loadSingleWeeklyHoliday,
	updateWeeklyHoliday,
} from "../../../redux/rtk/features/weeklyHoliday/weeklyHolidaySlice";

const WeeklyHolidayEdit = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { id } = useParams("id");

	const [loader, setLoader] = useState(false);

	const dispatch = useDispatch();

	const onFinish = async (values) => {
		setLoader(true);
		const resp = await dispatch(updateWeeklyHoliday({ id, values }));

		if (resp.payload.message === "success") {
			setLoader(false);
			dispatch(loadSingleWeeklyHoliday(id));
		} else {
			setLoader(false);
		}
	};

	const initialValues = {
		name: data?.name,
		startDay: data?.startDay,
		endDay: data?.endDay,
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
				title='Weekly Holiday Edit'
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
							label='Start Day'
							name='startDay'
							rules={[
								{
									required: true,
									message: "Please input start day!",
								},
							]}>
							<Select
								placeholder='Select Start Day'
								defaultValue={initialValues.startDay}>
								<Select.Option value='Saturday'>Saturday</Select.Option>
								<Select.Option value='Sunday'>Sunday</Select.Option>
								<Select.Option value='Monday'>Monday</Select.Option>
								<Select.Option value='Tuesday'>Tuesday</Select.Option>
								<Select.Option value='Wednesday'>Wednesday</Select.Option>
								<Select.Option value='Thursday'>Thursday</Select.Option>
								<Select.Option value='Friday'>Friday</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='End Day'
							name='endDay'
							rules={[
								{
									required: true,
									message: "Please input end day!",
								},
							]}>
							<Select
								placeholder='Select Start Day'
								defaultValue={initialValues.endDay}>
								<Select.Option value='Saturday'>Saturday</Select.Option>
								<Select.Option value='Sunday'>Sunday</Select.Option>
								<Select.Option value='Monday'>Monday</Select.Option>
								<Select.Option value='Tuesday'>Tuesday</Select.Option>
								<Select.Option value='Wednesday'>Wednesday</Select.Option>
								<Select.Option value='Thursday'>Thursday</Select.Option>
								<Select.Option value='Friday'>Friday</Select.Option>
							</Select>
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
								Update Weekly Holiday
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};
export default WeeklyHolidayEdit;
