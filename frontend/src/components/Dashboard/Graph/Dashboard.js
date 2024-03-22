import { Card, Col, Row } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";
import checkTokenExp from "../../../utils/checkTokenExp";

import PublicHolidayBar from "./PublicHolidayBar";
import DemoLine from "./Demoline";
import AnnouncementBar from "./AnnouncementBar";

const Dashboard = () => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	//Looging Out if token is expried

	const accessToken = localStorage.getItem("access-token");
	checkTokenExp(accessToken);
	return (
		<>
			<div>
				<div>
					<div className='mb-3'>
						<Row>
							<Col span={24}>
								<DemoLine />
							</Col>
						</Row>
					</div>
					<div>
						<Row gutter={[30, 30]}>
							<Col sm={24} md={24} lg={12} span={24} className='mb-auto'>
								<Card title='PUBLIC HOLIDAYS' className=''>
									<PublicHolidayBar />
								</Card>
							</Col>
							<Col sm={24} md={24} lg={12} span={24}>
								<Card title='ANNOUNCEMENTS'>
									<AnnouncementBar />
								</Card>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
