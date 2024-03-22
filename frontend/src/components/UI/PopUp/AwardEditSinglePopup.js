import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../../redux/rtk/features/user/userSlice";
import BtnEditSvg from "../Button/btnEditSvg";
import { useEffect } from "react";
import { loadAllAward } from "../../../redux/rtk/features/award/awardSlice";
import { updateAwardHistory } from "../../../redux/rtk/features/awardHistory/awardHistorySlice";
import moment from "moment";

const AwardEditSinglePopup = ({ data, setLoading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [loader, setLoader] = useState(false);

	const award = useSelector((state) => state?.award.list);
	const [nawardedDate, setnAwardedDate] = useState(
		dayjs(data?.awardedDate).format()
	);

	const { id } = useParams("id");
	const dispatch = useDispatch();

	const [initialValues, setInitialValues] = useState({
		awardId: data?.awardId,
		awardedDate: moment(data?.awardedDate),
		comment: data?.Comment,
	});

	useEffect(() => {
		dispatch(loadAllAward());
	}, []);

	const onFinish = async (values) => {
		const FormData = {
			...values,
			awardedDate: dayjs(nawardedDate).format("YYYY-MM-DDTHH:mm:ss"),
		};
		setLoading(true);
		setLoader(true);

		const resp = await dispatch(
			updateAwardHistory({ id: id, values: FormData })
		);

		if (resp.message === "success") {
			setLoader(false);
			dispatch(loadSingleStaff(id));
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
		toast.warning("Failed at adding designation");
		setLoader(false);
		setLoading(false);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		setLoader(false);
		setLoading(false);
	};
	const handleCancel = () => {
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
				title={`Edit Award History`}
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
							label='Award'
							name='awardId'
							rules={[
								{
									required: true,
									message: "Please input your salary!",
								},
							]}>
							<Select
								name='awardId'
								defaultValue={initialValues.awardId}
								loading={!award}>
								{award?.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Start Date'
							name='awardedDate'
							rules={[
								{
									required: true,
									message: "Please input your start date!",
								},
							]}>
							<DatePicker
								name='awardedDate'
								onChange={(date) => setnAwardedDate(date)}
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
export default AwardEditSinglePopup;
