import { Button, Modal } from "antd";
import { useState } from "react";
import BtnEditSvg from "../Button/btnEditSvg";
import Loader from "../../loader/loader";
import EmployeeDesignation from "../EmployeeDesignation";
import DesignationAddSinglePopup from "./DesignationAddSinglePopup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAllDesignation } from "../../../redux/rtk/features/designation/designationSlice";

const DesignationEditPopup = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { list } = useSelector((state) => state.designations);
	const dispatch = useDispatch();

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
			<button onClick={showModal} className='mt-4 mr-2'>
				<BtnEditSvg size={25} />
			</button>
			<Modal
				title='Edit Designation'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				{!loading ? (
					<>
						<EmployeeDesignation
							list={data}
							edit={true}
							setLoading={setLoading}
						/>
						<DesignationAddSinglePopup list={list} setLoading={setLoading} />
					</>
				) : (
					<Loader />
				)}
			</Modal>
		</>
	);
};
export default DesignationEditPopup;
