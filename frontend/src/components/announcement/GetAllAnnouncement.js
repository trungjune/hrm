import { Card, List } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAnnouncement } from "../../redux/rtk/features/announcement/announcementSlice";
import AnnouncementDelete from "./AnnouncementDelete";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const TitleComponent = ({ item }) => {
	return (
		<div className='flex justify-between'>
			<h2 className='text-xl txt-color-2'>{item.title}</h2>
			<div className='flex justify-end'>
				<UserPrivateComponent permission={"delete-announcement"}>
					<AnnouncementDelete id={item.id} />
				</UserPrivateComponent>
			</div>
		</div>
	);
};

const GetAllAnnouncement = () => {
	const { loading, list } = useSelector((state) => state.announcement);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllAnnouncement());
	}, []);

	return (
		<Card>
			<h2 className='text-center text-2xl txt-color-2'>Announcements</h2>
			<hr className='mt-3 mb-5 mx-5' />
			<List
				className='m-4'
				loading={loading}
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 2,
					lg: 3,
					xl: 3,
					xxl: 3,
				}}
				dataSource={list ? list : []}
				renderItem={(item) => (
					<List.Item className='new-card'>
						<Card title={<TitleComponent item={item} />}>
							{item.description}
						</Card>
					</List.Item>
				)}
			/>
		</Card>
	);
};
export default GetAllAnnouncement;
