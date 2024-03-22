import { Line } from "@ant-design/plots";
import { Card, Col, DatePicker, Row } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import Loader from "../../loader/loader";
import { loadDashboardData } from "../../../redux/rtk/features/dashboard/dashboardSlice";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import AttendancePopup from "../..//UI/PopUp/AttendancePopup";

dayjs.extend(utc);
//Date fucntinalities
let startdate = dayjs(new Date()).startOf("month").format("YYYY-MM-DD");
let enddate = dayjs(new Date()).endOf("month").format("YYYY-MM-DD");

const DemoLine = () => {
	const data = useSelector((state) => state.dashboard.list?.workHoursByDate);

	const cardInformation = useSelector((state) => state.dashboard.list);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadDashboardData({ startdate, enddate }));
	}, []);

	const { RangePicker } = DatePicker;

	const onCalendarChange = (dates) => {
		startdate = (dates?.[0]).format("YYYY-MM-DD");
		enddate = (dates?.[1]).format("YYYY-MM-DD");

		dispatch(loadDashboardData({ startdate, enddate }));
	};

	const config = {
		data,
		xField: "date",
		yField: "time",
		seriesField: "type",
		yAxis: {
			label: {
				formatter: (v) => `${v / 1000} Hours`,
			},
		},
		legend: {
			position: "top",
		},
		smooth: true,
		animation: {
			appear: {
				animation: "path-in",
				duration: 5000,
			},
		},
	};

	return (
		<Fragment>
			<UserPrivateComponent permission={"readAll-dashboard"}>
				<Row gutter={[30, 30]} justify={"space-between"}>
					<Col sm={24} md={24} lg={12} span={24} className='mb-auto'>
						<RangePicker
							onCalendarChange={onCalendarChange}
							defaultValue={[dayjs().startOf("month"), dayjs().endOf("month")]}
							className='range-picker'
							style={{ maxWidth: "25rem" }}
						/>
					</Col>
					<Col sm={24} md={24} lg={12} span={24}>
						<div className='text-end mr-4'>
							<AttendancePopup />
						</div>
					</Col>
				</Row>

				<NewDashboardCard information={cardInformation} />

				<Card title='WORK HOURS '>
					{data ? <Line {...config} /> : <Loader />}
				</Card>
			</UserPrivateComponent>
		</Fragment>
	);
};

export default DemoLine;
