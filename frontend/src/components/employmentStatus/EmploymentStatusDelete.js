import { Button, Popconfirm } from "antd";
import React, { useState } from "react";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmploymentStatus } from "../../redux/rtk/features/employemntStatus/employmentStatusSlice";

const EmploymentStatusDelete = ({ id }) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const { loading } = useSelector((state) => state.employmentStatus);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onDelete = () => {
		try {
			dispatch(deleteEmploymentStatus(id));
			navigate("/admin/employment-status/");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<button type='primary' onClick={onDelete} className='mr-3 ml-2'>
			<BtnDeleteSvg size={25} />
		</button>
	);
};
export default EmploymentStatusDelete;
