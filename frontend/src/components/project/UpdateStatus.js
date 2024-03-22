import { Button, Col, Form, Input, Row, Select, Typography } from "antd";

import React, { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import Loader from "../loader/loader";
import { clearProject, loadAllProject, loadSingleProject, updateProject } from "../../redux/rtk/features/projectManagement/project/project/project";

const UpdateStatus = () => {
	const [loader, setLoader] = useState(false);
	const [initialValues, setInitialValues] = useState(null);

	const { loading, project } = useSelector((state) => state.project);

	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(loadSingleProject(projectId));
        return () => {
            dispatch(clearProject());
        }
	}, []);

    
	useEffect(() => {
		if (project) {
			setInitialValues(project);
		}
	}, [project]);

	const { Title } = Typography;
	const [form] = Form.useForm();
	const projectId = useParams("id").projectId;
	const navigate = useNavigate();

	const onFinish = async (values) => {
		const statusData = {
			...initialValues,
			...values,
		};

		console.log(statusData);
		setLoader(true);
		const resp = await dispatch(
			updateProject({ id: projectId, values: statusData })
		);

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllProject());
			navigate(-1);
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding Status");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			{/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
			<PageTitle title='Back' />
			<Row className='mr-top'>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={18}
					xl={16}
					className='column-design border rounded card-custom'>
					<Title level={4} className='m-2 mt-5 mb-5 text-center'>
						Update Status
					</Title>
					{initialValues ? (
						<Form
							form={form}
							style={{ marginBottom: "40px" }}
							eventKey='shift-form'
							name='basic'
							initialValues={initialValues}
							labelCol={{
								span: 8,
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
									label='Status'
									name='status'
									rules={[
										{
											required: true,
											message: "Select Status Name",
										},
									]}>
										<Select placeholder='Select Status Name'>
											<Select.Option value='PROGRESS'>PROGRESS</Select.Option>
											<Select.Option value='COMPLETE'>COMPLETE</Select.Option>
											<Select.Option value='ONHOLD'>ONHOLD</Select.Option>
											<Select.Option value='DELETED'>DELETED</Select.Option>
										</Select>
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									wrapperCol={{
										offset: 8,
										span: 12,
									}}>
									<Button
										onClick={() => setLoader(true)}
										type='primary'
										size='large'
										htmlType='submit'
										block
										loading={loader}>
										Update Now
									</Button>
								</Form.Item>
							</div>
						</Form>
					) : (
						<Loader />
					)}
				</Col>
			</Row>
			{/* </UserPrivateComponent> */}
		</Fragment>
	);
};

export default UpdateStatus;