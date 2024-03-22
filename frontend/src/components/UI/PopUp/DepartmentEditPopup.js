import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateDepartment } from "../../department/departmentApis";
import BtnEditSvg from "../Button/btnEditSvg";
const DepartmentEditPopup = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { id } = useParams("id");

	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();

	const onFinish = async (values) => {
		setLoader(true);
		const resp = await updateDepartment(id, values);

		if (resp.message === "success") {
			setLoader(false);
			navigate(-1);
			setInitialValues({
				name: values.name,
			});
		} else {
			setLoader(false);
		}
	};

	const [initialValues, setInitialValues] = useState({
		name: data?.name || "",
	});

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding department");
		setLoader(false);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		setLoader(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setLoader(false);
	};
	return (
		<>
			<button onClick={showModal}>
				<BtnEditSvg size={30} />
			</button>
			<Modal
				title='Basic Modal'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					style={{ marginBottom: "100px" }}
					eventKey='department-form'
					initialValues={initialValues}
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
									message: "Please input your department name!",
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
								Add New department
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};
export default DepartmentEditPopup;
