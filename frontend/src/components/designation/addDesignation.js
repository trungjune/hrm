import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
	addDesignation,
	loadAllDesignation,
} from "../../redux/rtk/features/designation/designationSlice";
import UploadMany from "../Card/UploadMany";
import styles from "./AddDesignation.module.css";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const AddDesignation = () => {
	const dispatch = useDispatch();
	const { Title } = Typography;

	const [loader, setLoader] = useState(false);
	const onClickLoading = () => {
		setLoader(true);
	};

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		try {
			const resp = await dispatch(addDesignation(values));
			if (resp.payload.message === "success") {
				setLoader(false);
				dispatch(loadAllDesignation());
				form.resetFields();
			}
		} catch (error) {
			setLoader(false);
			console.log(error.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		setLoader(false);
		console.log("Failed:", errorInfo);
	};

	return (
		<Fragment>
			<UserPrivateComponent permission={"create-designation"}>
				<Row className='mr-top' justify='space-between' gutter={[0, 30]}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={12}
						xl={12}
						className='rounded column-design'>
						<Card bordered={false}>
							<Title level={4} className='m-2 mb-4 text-center'>
								Add designation
							</Title>
							<Form
								form={form}
								name='basic'
								labelCol={{
									span: 6,
								}}
								wrapperCol={{
									span: 12,
								}}
								initialValues={{
									remember: true,
								}}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete='off'>
								<Form.Item
									style={{ marginBottom: "20px" }}
									label='Name'
									name='name'
									rules={[
										{
											required: true,
											message: "Please input designation name!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "20px" }}
									wrapperCol={{
										offset: 6,
										span: 12,
									}}>
									<Button
										onClick={onClickLoading}
										type='primary'
										block
										htmlType='submit'
										shape='round'
										size='large'
										loading={loader}>
										Add designation
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</Col>
				</Row>
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddDesignation;
