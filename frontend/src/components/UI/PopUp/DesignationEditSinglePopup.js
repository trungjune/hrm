import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../../redux/rtk/features/user/userSlice";
import { updateDesHistory } from "../../designationHistory/designationHistoryApis";
import BtnEditSvg from "../Button/btnEditSvg";
import moment from "moment";

const DesignationEditSinglePopup = ({ data, setLoading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [designationStartDate, setdesignationStartDate] = useState(
		dayjs(data?.startDate).format("YYYY-MM-DD")
	);
	const [designationEndDate, setdesignationEndDate] = useState(
		dayjs(data?.endDate).format("YYYY-MM-DD")
	);
	const [loader, setLoader] = useState(false);
	const [designationComment, setdesignationComment] = useState("");

	const user_id = useParams("id");
	const dispatch = useDispatch();
	const designations = useSelector((state) => state.designations.list);
	const [designationId, setDesignationId] = useState(
		data?.designation?.designationId
	);

	const [initialValues, setInitialValues] = useState({
		designationId: data?.designationId || "",
		designationStartDate: moment(data?.startDate),
		designationEndDate: moment(data?.endDate),
		designationComment: data?.comment,
	});

	const onFinish = async (values) => {
		setLoading(true);
		const id = data.id || "";
		setLoader(true);
		const infodata = {
			...values,
			designationId: designationId,
			designationComment: designationComment || "",
			designationStartDate: designationStartDate,
			designationEndDate: designationEndDate,
		};

		const resp = await updateDesHistory(id, infodata);

		if (resp.message === "success") {
			setLoader(false);
			dispatch(loadSingleStaff(user_id.id));
			setInitialValues({});
			setDesignationId("");
			setdesignationComment("");
			setdesignationStartDate();
			setdesignationEndDate();

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
		setDesignationId("");
		setdesignationComment("");
		setdesignationStartDate();
		setdesignationEndDate();
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
	};
	const handleCancel = () => {
		setDesignationId("");
		setdesignationComment("");
		setdesignationStartDate();
		setdesignationEndDate();
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
							label='Designation'
							name='designationId'
							rules={[
								{
									required: true,
									message: "Please input your Designation!",
								},
							]}>
							<Select
								placeholder='Select Designation'
								onChange={(value) => setDesignationId(value)}>
								{designations?.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.name || ""}
									</Select.Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Start Date'
							name='designationStartDate'
							rules={[
								{
									required: true,
									message: "Please input your start date!",
								},
							]}>
							<DatePicker
								name='designationStartDate'
								format='YYYY-MM-DD'
								onChange={(date) => setdesignationStartDate(date)}
							/>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='End Date'
							name='designationEndDate'>
							<DatePicker
								defaultValue={initialValues.designationEndDate}
								onChange={(date) => setdesignationEndDate(date)}
							/>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Comment'
							name='designationComment'>
							<Input name='designationComment' />
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
export default DesignationEditSinglePopup;
