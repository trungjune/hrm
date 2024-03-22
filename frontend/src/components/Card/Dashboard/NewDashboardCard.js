import React, { Fragment } from "react";
import {
	UsergroupAddOutlined,
	TeamOutlined,
	UsergroupDeleteOutlined,
	UserSwitchOutlined,
	DollarOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Card, Col, Row, Statistic } from "antd";

const NewDashboardCard = ({ information }) => {
	return (
		<Fragment>
			<section className='mt-5 mb-5'>
				<div className='site-statistic-demo-card '>
					<Row gutter={[16, 16]} justify={"space-between"}>
						<Col xs={20} sm={16} md={12} lg={4} xl={5}>
							<Card className='ant-shadow txt-color-2' bordered={false}>
								<Statistic
									title={<p className='text-xl  txt-color-2'> TOTAL USERS </p>}
									loading={!information}
									value={information?.totalUsers}
									valueStyle={{
										color: "#10b981",
									}}
									prefix={
										<TeamOutlined
											className='mr-4'
											style={{ fontSize: "35px" }}
										/>
									}
								/>
							</Card>
						</Col>
						<Col xs={20} sm={16} md={12} lg={5} xl={5}>
							<Card className='ant-shadow txt-color-2' bordered={false}>
								<Statistic
									title={<p className='text-xl  txt-color-2'>TOTAL SALARY</p>}
									loading={!information}
									value={information?.totalSalary || 0}
									precision={2}
									valueStyle={{
										color: "#4f46e5",
									}}
									prefix={
										<DollarOutlined
											className='mr-4'
											style={{ fontSize: "35px" }}
										/>
									}
								/>
							</Card>
						</Col>

						<Col xs={20} sm={16} md={12} lg={5} xl={5}>
							<Card className='ant-shadow txt-color-2' bordered={false}>
								<Statistic
									title={
										<p className='text-xl  txt-color-2'> TODAY PRESENT </p>
									}
									loading={!information}
									value={information?.totalPresent}
									valueStyle={{
										color: "#0891b2",
									}}
									prefix={
										<UsergroupAddOutlined
											className='mr-4'
											style={{ fontSize: "35px" }}
										/>
									}
								/>
							</Card>
						</Col>
						<Col xs={20} sm={16} md={12} lg={5} xl={5}>
							<Card className='ant-shadow txt-color-2' bordered={false}>
								<Statistic
									title={<p className='text-xl  txt-color-2'>TODAY ON LEAVE</p>}
									loading={!information}
									value={information?.totalOnLeave}
									valueStyle={{
										color: "#a855f7",
									}}
									prefix={
										<UserSwitchOutlined
											className='mr-4'
											style={{ fontSize: "35px" }}
										/>
									}
								/>
							</Card>
						</Col>
						<Col xs={20} sm={16} md={12} lg={4} xl={4}>
							<Card className='ant-shadow txt-color-2' bordered={false}>
								<Statistic
									title={<p className='text-xl  txt-color-2'> TODAY ABSENT</p>}
									loading={!information}
									value={information?.totalAbsent}
									valueStyle={{
										color: "#f43f5e",
									}}
									prefix={
										<UsergroupDeleteOutlined
											className='mr-4'
											style={{ fontSize: "35px" }}
										/>
									}
								/>
							</Card>
						</Col>
					</Row>
				</div>
			</section>
		</Fragment>
	);
};

export default NewDashboardCard;
