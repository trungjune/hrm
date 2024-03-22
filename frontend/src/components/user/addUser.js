import {
	Alert,
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Space,
	Switch,
	Typography,
} from "antd";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDesignation } from "../../redux/rtk/features/designation/designationSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddRole from "../role/AddRole";
import { getRoles } from "../role/roleApis";
import EmployeeEducationForm from "./EmployeeEducationForm";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getDepartments } from "../department/departmentApis";
import { loadAllEmploymentStatus } from "../../redux/rtk/features/employemntStatus/employmentStatusSlice";
import { loadAllShift } from "../../redux/rtk/features/shift/shiftSlice";
import { addStaff } from "../../redux/rtk/features/user/userSlice";
import { loadAllWeeklyHoliday } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidaySlice";
import { loadAllLeavePolicy } from "../../redux/rtk/features/leavePolicy/leavePolicySlice";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const AddUser = () => {
	const [loader, setLoader] = useState(false);
	const dispatch = useDispatch();
	const { Title } = Typography;
	const { Option } = Select;
	const [list, setList] = useState(null);
	const [department, setDepartment] = useState(null);

	const [education, setEducation] = useState([
		{
			degree: "",
			institution: "",
			fieldOfStudy: "",
			result: "",
			studyStartDate: "",
			studyEndDate: "",
		},
	]);

	// const [j_date, setJ_date] = useState(dayjs());
	// const [l_date, setL_date] = useState(dayjs());

	// useseletor to get designations from redux
	const designation = useSelector((state) => state.designations?.list);
	const employmentStatus = useSelector((state) => state.employmentStatus?.list);
	const shift = useSelector((state) => state.shift?.list);
	const weeklyHoliday = useSelector((state) => state.weeklyHoliday?.list);
	const leavePolicy = useSelector((state) => state.leavePolicy?.list);

	useEffect(() => {
		getRoles()
			.then((d) => setList(d))
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		getDepartments()
			.then((d) => setDepartment(d))
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		dispatch(loadAllDesignation());
		dispatch(loadAllEmploymentStatus());
		dispatch(loadAllShift());
		dispatch(loadAllWeeklyHoliday());
		dispatch(loadAllLeavePolicy());
	}, []);

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const FormData = {
			...values,

			educations: values.educations || education,
		};
		try {
			const resp = await dispatch(addStaff(FormData));
			setLoader(true);

			if (resp.payload.message === "success") {
				form.resetFields();
				setLoader(false);
			} else if (resp.payload.message === "error") {
				setLoader(false);
			} else {
				setLoader(false);
			}
		} catch (error) {
			console.log(error.message);
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		setLoader(false);
		console.log("Failed:", errorInfo);
	};

	const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

	return (
		<Fragment bordered={false}>
			<UserPrivateComponent permission={"create-user"}>
				<div className='mr-top mt-5 p-5 ant-card ' style={{ maxWidth: "100%" }}>
					<Form
						size='small'
						form={form}
						name='basic'
						labelCol={{
							span: 7,
						}}
						wrapperCol={{
							span: 22,
						}}
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<Row
							gutter={{
								xs: 8,
								sm: 16,
								md: 24,
								lg: 32,
							}}>
							<Col span={12} className='gutter-row form-color'>
								<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
									User Information
								</h2>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='First Name'
									name='firstName'
									rules={[
										{
											required: true,
											message: "Please input First Name!",
										},
									]}>
									<Input placeholder='John' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Last Name'
									name='lastName'
									rules={[
										{
											required: true,
											message: "Please input Last Name!",
										},
									]}>
									<Input placeholder='Doe' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='User Name'
									name='userName'
									rules={[
										{
											required: true,
											message: "Please input User Name!",
										},
									]}>
									<Input placeholder='john_doe' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Password'
									name='password'
									rules={[
										{
											required: true,
											message: "Please input your password !",
										},
									]}>
									<Input placeholder='Strong Password' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Email'
									name='email'
									rules={[
										{
											required: true,
											message: "Please input email!",
										},
									]}>
									<Input placeholder='johndoe2@example.com' />
								</Form.Item>
							</Col>
							<Col span={12} className='gutter-row'>
								<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
									Address Information
								</h2>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Street'
									name='street'
									rules={[
										{
											required: true,
											message: "Please input street!",
										},
									]}>
									<Input
										placeholder='123 Main Street'
										style={{ width: "100%" }}
									/>
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='City'
									name='city'
									rules={[{ required: true, message: "Please input city!" }]}>
									<Input placeholder='Los Angeles' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='State'
									name='state'
									rules={[{ required: true, message: "Please input state!" }]}>
									<Input placeholder='CA' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Zip Code'
									name='zipCode'
									rules={[
										{ required: true, message: "Please input Zip Code!" },
									]}>
									<Input placeholder='90211' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Country'
									name='country'
									rules={[
										{ required: true, message: "Please input Country!" },
									]}>
									<Input placeholder='USA' />
								</Form.Item>
							</Col>
						</Row>

						<Row
							gutter={{
								xs: 8,
								sm: 16,
								md: 24,
								lg: 32,
							}}>
							<Col span={12} className='gutter-row'>
								<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
									{" "}
									Employee Information{" "}
								</h2>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Joining Date'
									name='joinDate'
									rules={[
										{
											required: true,
											message: "Please input joining date!",
										},
									]}>
									<DatePicker className='date-picker hr-staffs-date-picker' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Leave Date'
									name='leaveDate'>
									<DatePicker className='date-picker hr-staffs-date-picker' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Employee ID'
									name='employeeId'
									rules={[
										{
											required: true,
											message: "Please input Employee ID!",
										},
									]}>
									<Input placeholder='OE-012' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Blood Group'
									name='bloodGroup'
									rules={[
										{
											required: true,
											message: "Please input Blood Group!",
										},
									]}>
									<Select
										placeholder='Select Blood Group'
										allowClear
										mode='single'
										size='middle'
										style={{
											width: "100%",
										}}>
										{bloodGroups.map((bloodGroup) => (
											<Option key={bloodGroup} value={bloodGroup}>
												{bloodGroup}
											</Option>
										))}
									</Select>
								</Form.Item>
								{/* TODO: Add a Upload Seciton for Image */}
								<Form.Item
									name={"employmentStatusId"}
									style={{ marginBottom: "10px" }}
									rules={[
										{
											required: true,
											message: "Please input Employment Status!",
										},
									]}
									label='Employee Status'>
									<Select
										placeholder='Select Status'
										allowClear
										size={"middle"}>
										{employmentStatus &&
											employmentStatus.map((employmentStatus) => (
												<Option
													key={employmentStatus.id}
													value={employmentStatus.id}>
													{employmentStatus.name}
												</Option>
											))}
									</Select>
								</Form.Item>
								<Form.Item
									name={"departmentId"}
									style={{ marginBottom: "10px" }}
									label='Department'
									rules={[
										{ required: true, message: "Please input Department!" },
									]}>
									<Select
										loading={!department}
										placeholder='Select Department'
										allowClear
										size={"middle"}>
										{department &&
											department.map((department) => (
												<Option key={department.id} value={department.id}>
													{department.name}
												</Option>
											))}
									</Select>
								</Form.Item>
								<Form.Item
									rules={[
										{ required: true, message: "Please input Department!" },
									]}
									label='Role'
									name={"roleId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!list}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder='Please select'>
										{list &&
											list.map((role) => (
												<Option key={role.id} value={role.id}>
													{role.name}
												</Option>
											))}
									</Select>
									{/*<BigDrawer
										title={"new Role"}
										btnTitle={"Role"}
										children={<AddRole drawer={true} />}
											/> */}
								</Form.Item>

								<Form.Item
									rules={[
										{ required: true, message: "Please input Department!" },
									]}
									label='Shift'
									name={"shiftId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!shift}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder='Please select'>
										{shift &&
											shift.map((shift) => (
												<Option key={shift.id} value={shift.id}>
													{shift.name}
												</Option>
											))}
									</Select>
									{/*<BigDrawer
										title={"new Role"}
										btnTitle={"Role"}
										children={<AddRole drawer={true} />}
											/> */}
								</Form.Item>

								<Form.Item
									rules={[
										{ required: true, message: "Please input Department!" },
									]}
									label='Leave Policy'
									name={"leavePolicyId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!leavePolicy}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder='Please select'>
										{leavePolicy &&
											leavePolicy.map((leavePolicy) => (
												<Option key={leavePolicy.id} value={leavePolicy.id}>
													{leavePolicy.name}
												</Option>
											))}
									</Select>
								</Form.Item>

								<Form.Item
									rules={[
										{ required: true, message: "Please input Department!" },
									]}
									label='WeekLy Holiday'
									name={"weeklyHolidayId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!weeklyHoliday}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder='Please select'>
										{weeklyHoliday &&
											weeklyHoliday.map((weeklyHoliday) => (
												<Option key={weeklyHoliday.id} value={weeklyHoliday.id}>
													{weeklyHoliday.name}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12} className='gutter-row'>
								<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
									Designation & Salary Information
								</h2>

								<Form.Item
									rules={[
										{ required: true, message: "Please input Designation!" },
									]}
									label='Designation'
									name={"designationId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!shift}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder='Please select Designation'>
										{designation &&
											designation.map((designation) => (
												<Option key={designation.id} value={designation.id}>
													{designation.name}
												</Option>
											))}
									</Select>
									{/*<BigDrawer
									title={"new Role"}
									btnTitle={"Role"}
									children={<AddRole drawer={true} />}
										/> */}
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Designation Start Date'
									rules={[{ required: true, message: "Please input date!" }]}
									name='designationStartDate'>
									<DatePicker className='date-picker hr-staffs-date-picker' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Designation End Date'
									name='designationEndDate'>
									<DatePicker className='date-picker hr-staffs-date-picker' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Salary'
									name='salary'
									rules={[
										{
											required: true,
											message: "Please input salary",
										},
									]}>
									<InputNumber style={{ width: "100%" }} />
								</Form.Item>

								<Form.Item
									label='Salary Start Date'
									name='salaryStartDate'
									style={{ marginBottom: "10px" }}
									rules={[
										{
											required: true,
											message: "Please input date!",
										},
									]}>
									<DatePicker className='date-picker hr-staffs-date-picker' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Salary End Date'
									name='salaryEndDate'>
									<DatePicker className='date-picker hr-staffs-date-picker' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Salary Comment'
									name='salaryComment'>
									<Input />
								</Form.Item>
							</Col>
						</Row>

						<h2 className='text-center text-xl mt-3 mb-5 txt-color'>
							Education Information
						</h2>

						<div className='text-center'>
							<p className='text-red-500 text-base mb-4'>
								Please add education information using the button below
							</p>
						</div>

						<Form.List name='educations'>
							{(fields, { add, remove }) => (
								<>
									{fields.map(({ key, name, ...restField }) => (
										<EmployeeEducationForm
											key={key}
											name={name}
											remove={remove}
											restField={restField}
										/>
									))}
									<Form.Item
										style={{ marginBottom: "10px" }}
										wrapperCol={{
											offset: 4,
											span: 16,
										}}>
										<Button
											type='dashed'
											size='middle'
											style={{ color: "#fff", backgroundColor: "#2c3e50" }}
											onClick={() => add()}
											block
											icon={<PlusOutlined />}>
											Add Education Information
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>

						<Form.Item
							style={{ marginBottom: "10px", marginTop: "10px" }}
							wrapperCol={{
								offset: 4,
								span: 16,
							}}>
							<Button
								className='mt-5'
								size='large'
								onClick={() => setLoader(true)}
								block
								type='primary'
								htmlType='submit'
								shape='round'
								loading={loader}>
								Add New Staff
							</Button>
						</Form.Item>
					</Form>
				</div>
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddUser;
