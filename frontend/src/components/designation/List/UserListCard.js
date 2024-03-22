import { Card, Col, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ViewBtn from "../../Buttons/ViewBtn";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";

const UserListCard = ({ list, loading }) => {
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id) => <Link to={`/admin/hr/staffs/${id}`}>{id}</Link>,
		},
		{
			title: "Employee Name",
			key: "employee",
			render: ({ firstName, lastName, id }) => (
				<Link to={`/admin/hr/staffs/${id}`}>{firstName + " " + lastName}</Link>
			),
		},
		{
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<UserPrivateComponent permission={"readSingle-user"}>
					<ViewBtn path={`/admin/hr/staffs/${id}`} />
				</UserPrivateComponent>
			),
		},
	];

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24}>
				<Card
					className='header-solid h-full'
					bordered={false}
					title={[
						<h5 className='font-semibold m-0 text-center'>
							Staffs Information
						</h5>,
					]}
					bodyStyle={{ padding: "0" }}>
					<div className='col-info'>
						<Table
							scroll={{ x: true }}
							loading={loading}
							columns={columns}
							dataSource={list ? addKeys(list) : []}
						/>
					</div>
				</Card>
			</Col>
		</Row>
	);
};

export default UserListCard;
