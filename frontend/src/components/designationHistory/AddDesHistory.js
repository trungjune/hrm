import { Button, Col, Form, Input, Row, Typography } from "antd";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { addDepartment } from "./DesignationApis";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const AddDesHistory = ({ drawer }) => {
	const [list, setList] = useState(null);
	const [loader, setLoader] = useState(false);

	const { Title } = Typography;

	const onFinish = async (values) => {
		setLoader(true);
		const resp = await addDepartment(values);

		if (resp.message === "success") {
			setLoader(false);
			const newList = [...list];
			newList.push(resp.data);
			setList(newList);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding department");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			<UserPrivateComponent permission={"create-designationHistory"}>
				<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={drawer ? 22 : 16}
						xl={drawer ? 22 : 12}
						className='column-design border rounded card-custom'>
						<Title level={4} className='m-2 mt-5 mb-5 text-center'>
							Add New department
						</Title>
						<Form
							style={{ marginBottom: "100px" }}
							eventKey='department-form'
							name='basic'
							labelCol={{
								span: 6,
							}}
							wrapperCol={{
								span: 12,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<div>
								<Form.Item
									style={{ marginBottom: "20px" }}
									label='Name'
									name='name'
									rules={[
										{
											required: true,
											message: "Please input your Designation!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									wrapperCol={{
										offset: 6,
										span: 12,
									}}>
									<Button
										onClick={() => setLoader(true)}
										type='primary'
										size='small'
										htmlType='submit'
										block
										loading={loader}>
										Add New Designation
									</Button>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
				<hr />
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddDesHistory;
