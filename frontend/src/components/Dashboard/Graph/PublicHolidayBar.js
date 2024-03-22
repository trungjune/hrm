import { Avatar, List } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPublicHoliday } from "../../../redux/rtk/features/publicHoliday/publicHolidaySlice";

const PublicHolidayBar = () => {
	const { list, loading } = useSelector((state) => state?.publicHoliday);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllPublicHoliday());
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
							avatar={
								<div
									style={{ height: "65px", width: "60px" }}
									className='border-4 border-indigo-500/75 text-center'>
									<h3 className='text-xl font-medium txt-color-2'>
										{dayjs(item.date).format("DD")}
									</h3>
									<h3 className='text-base font-medium txt-color-secondary '>
										{dayjs(item.date).format("MMM")}
									</h3>
								</div>
							}
							title={
								<h3 className='text-base font-medium ml-4'>{item.name}</h3>
							}
							description={
								<div className='flex items-center'>
									<p className='text-sm text-gray-500 ml-4'>
										{dayjs(item.date).format("DD/MM/YYYY")}
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
export default PublicHolidayBar;
