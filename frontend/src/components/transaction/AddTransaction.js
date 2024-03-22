import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Space,
	Typography,
} from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AddTransaction.module.css";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getAllAccount from "../../api/getAllApis/getAllAccounts";
import {
	addTransaction,
	loadAllTransaction,
} from "../../redux/rtk/features/transaction/transactionSlice";
import PageTitle from "../page-header/PageHeader";
import BigDrawer from "../Drawer/BigDrawer";
import AddAccount from "../account/AddAccount";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const AddTransaction = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { Title } = Typography;

	const [form] = Form.useForm();

	let [date, setDate] = useState(dayjs());
	const [loader, setLoader] = useState(false);

	const [accounts, setAccounts] = useState(null);
	const [account, setAccount] = useState({
		debit_id: 0,
		credit_id: 0,
	});

	useEffect(() => {
		const getAccounts = async () => {
			const response = await getAllAccount();
			setAccounts(response);
		};
		getAccounts();
	}, []);

	const onFinish = async (values) => {
		try {
			const data = {
				...values,
				date: date,
				amount: parseInt(values.amount),
				debit_id: account.debit_id,
				credit_id: account.credit_id,
			};

			const resp = await dispatch(addTransaction(data));
			if (resp.payload.message === "success") {
				setLoader(false);
				navigate("/admin/transaction/");
				dispatch(loadAllTransaction());
			}

			toast.success("Payment Successfully done");
			form.resetFields();
			setLoader(false);
		} catch (error) {
			console.log(error.message);
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		setLoader(false);
	};

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<>
			<PageTitle title='Back' />
			<UserPrivateComponent permission={"create-transaction"}>
				<Row className='mr-top'>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={16}
						xl={12}
						className='column-design border rounded bg-white'>
						<Card bordered={false}>
							<Title level={3} className='m-2 mb-4 text-center'>
								Transaction
							</Title>
							<Form
								form={form}
								name='basic'
								labelCol={{
									span: 6,
								}}
								wrapperCol={{
									span: 16,
								}}
								initialValues={{
									remember: true,
								}}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete='off'>
								<Form.Item label='Date' required>
									<DatePicker
										defaultValue={dayjs()}
										onChange={(value) => setDate(value?._d)}
										label='date'
										name='date'
										className='date-picker date-picker-transaction-create'
										rules={[
											{
												required: true,
												message: "Please input date!",
											},
										]}
									/>
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									name='debit_id'
									label='Debit Account'>
									<Space.Compact block>
										<Select
											onChange={(value) =>
												setAccount({ ...account, debit_id: value })
											}
											loading={!accounts}
											showSearch
											placeholder='Select Debit ID'
											optionFilterProp='children'
											filterOption={(input, option) =>
												option.children.includes(input)
											}
											filterSort={(optionA, optionB) =>
												optionA.children
													.toLowerCase()
													.localeCompare(optionB.children.toLowerCase())
											}>
											{accounts &&
												accounts.map((acc) => (
													<Select.Option key={acc.id} value={acc.id}>
														{acc.name}
													</Select.Option>
												))}
										</Select>
										<BigDrawer
											title={"new debit account"}
											btnTitle={"Debit account"}
											children={<AddAccount drawer={true} />}
										/>
									</Space.Compact>
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									name='credit_id'
									label='Credit Account'>
									<Space.Compact block>
										<Select
											onChange={(value) =>
												setAccount({ ...account, credit_id: value })
											}
											loading={!accounts}
											showSearch
											placeholder='Select Credit ID'
											optionFilterProp='children'
											filterOption={(input, option) =>
												option.children.includes(input)
											}
											filterSort={(optionA, optionB) =>
												optionA.children
													.toLowerCase()
													.localeCompare(optionB.children.toLowerCase())
											}>
											{accounts &&
												accounts.map((acc) => (
													<Select.Option key={acc.id} value={acc.id}>
														{acc.name}
													</Select.Option>
												))}
										</Select>
										<BigDrawer
											title={"new credit account"}
											btnTitle={"Credit account"}
											children={<AddAccount drawer={true} />}
										/>
									</Space.Compact>
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Amount'
									name='amount'
									rules={[
										{
											required: true,
											message: "Please input amount!",
										},
									]}>
									<Input type='number' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Particulars'
									name='particulars'
									rules={[
										{
											required: true,
											message: "Please input particulars!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									className={styles.payNowBtnContainer}>
									<Button
										type='primary'
										htmlType='submit'
										shape='round'
										size='large'
										loading={loader}
										onClick={() => setLoader(true)}>
										Pay Now
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</Col>
				</Row>
			</UserPrivateComponent>
		</>
	);
};

export default AddTransaction;
