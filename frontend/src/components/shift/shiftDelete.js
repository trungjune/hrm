import { Button, Popconfirm } from "antd";
import React, { useState } from "react";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";
import { useDispatch, useSelector } from "react-redux";
import { deleteShift } from "../../redux/rtk/features/shift/shiftSlice";
import { useNavigate } from "react-router-dom";
const ShifDelete = ({ id }) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const { loading } = useSelector((state) => state.shift);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onDelete = () => {
		try {
			dispatch(deleteShift(id));
			navigate("/admin/shift");
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
export default ShifDelete;
