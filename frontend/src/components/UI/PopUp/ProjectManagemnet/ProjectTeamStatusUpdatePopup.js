import { Button, Col, Form, Modal, Row, Select, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
	loadSingleProjectTeam,
	loadAllProjectTeam,
	updateProjectTeamStatus,
} from "../../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeam";
import { useParams } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

const ProjectTeamStatusUpdatePopup = ({ projectId, teamName, status }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loader, setLoader] = useState(false);
	const { list, loading } = useSelector((state) => state.users);

	const dispatch = useDispatch();

	const { Title } = Typography;
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const status = {
			...values,
		};

		console.log(status);
		setLoader(true);
		const resp = await dispatch(
			updateProjectTeamStatus({ id: projectId, values: status })
		);

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllProjectTeam(projectId));
			setIsModalOpen(false);
		} else {
			setLoader(false);
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding Project Team");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			<div>
				<div className='text-center mr-2'>
					<Button
						block
						className=''
						size={"small"}
						type='primary'
						onClick={showModal}
						icon={<EditOutlined style={{ width: "28px" }} />}></Button>
				</div>
				<Modal
					title={`Update Satus`}
					okButtonProps={{ style: { display: "none" } }}
					open={isModalOpen}
					onCancel={handleCancel}>
					{/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
					<Row className='mr-top' justify={"center"}>
						<Col
							xs={24}
							sm={24}
							md={24}
							lg={24}
							xl={24}
							className='column-design border rounded card-custom'>
							<Title level={4} className='m-2 mt-5 mb-5 text-center'>
								{`Update Team Status:  ${teamName}`}
							</Title>
							<Form
								form={form}
								style={{ marginBottom: "40px" }}
								eventKey='shift-form'
								name='basic'
								labelCol={{
									span: 6,
								}}
								wrapperCol={{
									span: 12,
								}}
								initialValues={{ status: status }}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete='off'>
								<div>
									<Form.Item
										style={{ marginBottom: "20px" }}
										label='Team Status'
										name='status'
										rules={[
											{
												required: true,
												message: "Select Team Status",
											},
										]}>
										<Select
											mode='single'
											loading={loading}
											placeholder='Select Team Status'
											optionFilterProp='children'>
											<Select.Option value={true}>Active</Select.Option>
											<Select.Option value={false}>Inactive</Select.Option>
										</Select>
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
											size='large'
											htmlType='submit'
											block
											loading={loader}>
											Update
										</Button>
									</Form.Item>
								</div>
							</Form>
						</Col>
					</Row>
					{/* </UserPrivateComponent> */}
				</Modal>
			</div>
		</Fragment>
	);
};

export default ProjectTeamStatusUpdatePopup;
