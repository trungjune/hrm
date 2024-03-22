import { Avatar, List } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAnnouncement } from "../../../redux/rtk/features/announcement/announcementSlice";
import AnnounceIconSVG from "../../Icons/announceIconSVG";

const AnnouncementBar = () => {
	const { list, loading } = useSelector((state) => state?.announcement);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllAnnouncement());
	}, []);

	return (
		<div>
			<List
				loading={loading}
				itemLayout='horizontal'
				dataSource={list}
				renderItem={(item, index) => (
					<List.Item>
						<List.Item.Meta
							avatar={<AnnounceIconSVG />}
							title={
								<h3 className='text-base font-medium ml-4'>{item.title}</h3>
							}
							description={
								<div className='flex items-center'>
									<p className='text-sm text-gray-500 ml-4'>
										{item.description}
									</p>
								</div>
							}
						/>
					</List.Item>
				)}
			/>
		</div>
	);
};
export default AnnouncementBar;
