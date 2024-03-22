import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../../redux/rtk/features/user/userSlice";
import { addDesHistory } from "../../designationHistory/designationHistoryApis";
import AddAwardHistory from "../../awardHistory/AddAwardHistory";

const AwardAddSinglePopup = ({ data, setLoading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
			<div className='text-center'>
				<Button type='primary' onClick={showModal}>
					Add New Award
				</Button>
			</div>
			<Modal
				title={`Add award`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<AddAwardHistory setLoading={setLoading} />
			</Modal>
		</>
	);
};
export default AwardAddSinglePopup;
