import React, { useState } from "react";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";
import { useDispatch } from "react-redux";
import {
	deleteAnnouncement,
	loadAllAnnouncement,
} from "../../redux/rtk/features/announcement/announcementSlice";

const AnnouncementDelete = ({ id }) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const onDelete = async () => {
		setLoading(true);
		try {
			const resp = await dispatch(deleteAnnouncement(id));
			if (resp.payload.message === "success") {
				dispatch(loadAllAnnouncement());
				setLoading(false);
			} else {
				setLoading(false);
			}
		} catch (error) {
			console.log(error.message);
			setLoading(false);
		}
	};

	return (
		<button
			type='primary'
			onClick={onDelete}
			className={`mr-3 ml-2 ${loading ? "animate-spin" : ""}`}>
			<BtnDeleteSvg size={20} />
		</button>
	);
};
export default AnnouncementDelete;
