import { useState } from "react";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Select,
	Space,
	Modal,
	Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoles } from "../../role/roleApis";
import BtnEditSvg from "../Button/btnEditSvg";
import dayjs from "dayjs";
import {
	clearUser,
	loadSingleStaff,
	updateUser,
} from "../../../redux/rtk/features/user/userSlice";
import { toast } from "react-toastify";
import { getDepartments } from "../../department/departmentApis";
import { loadAllShift } from "../../../redux/rtk/features/shift/shiftSlice";
import { loadAllLeavePolicy } from "../../../redux/rtk/features/leavePolicy/leavePolicySlice";
import { loadAllWeeklyHoliday } from "../../../redux/rtk/features/weeklyHoliday/weeklyHolidaySlice";
import { useParams } from "react-router-dom";

const ProfileEditPopup = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loader, setLoader] = useState(false);
	const leavePolicy = useSelector((state) => state.leavePolicy?.list);
	const weeklyHoliday = useSelector((state) => state.weeklyHoliday?.list);
	const shift = useSelector((state) => state.shift?.list);
	const user = useSelector((state) => state.users?.user);

	const { id } = useParams("id");

	const dispatch = useDispatch();
	const { Title } = Typography;
	const { Option } = Select;
	const [list, setList] = useState(null);

	const [department, setDepartment] = useState(null);

	const [initialValues, setInitialValues] = useState({});

	const [roleId, setRoleId] = useState("");
	const [departmentId, setDepartmentId] = useState("");
	const [shiftId, setShiftId] = useState("");
	const [leavePolicyId, setLeavePolicyId] = useState("");
	const [weeklyHolidayId, setWeeklyHolidayId] = useState("");

	useEffect(() => {
		getRoles()
			.then((d) => setList(d))
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		dispatch(loadAllShift());
		dispatch(loadAllLeavePolicy());
		dispatch(loadAllWeeklyHoliday());
	}, []);

	useEffect(() => {
		dispatch(loadSingleStaff(id));
		setInitialValues({
			firstName: user.firstName ? user.firstName : "",
			lastName: user.lastName ? user.lastName : "",
			userName: user.userName ? user.userName : "",
			email: user.email ? user.email : "",
			phone: user.phone ? user.phone : "",
			street: user.street ? user.street : "",
			city: user.city ? user.city : "",
			state: user.state ? user.state : "",
			zipCode: user.zipCode ? user.zipCode : "",
			country: user.country ? user.country : "",
			joinDate: dayjs(user.joinDate),
			leaveDate: user.leaveDate ? dayjs(user.leaveDate) : null,
			employeeId: user.employeeId ? user.employeeId : "",
			bloodGroup: user.bloodGroup ? user.bloodGroup : "",
			image: user.image ? user.image : "",
			roleId: user.roleId ? user.roleId : "",
			departmentId: user.departmentId ? user.departmentId : "",
			shiftId: user.shiftId ? user.shiftId : "",
			leavePolicyId: user.leavePolicyId ? user.leavePolicyId : "",
			weeklyHolidayId: user.weeklyHolidayId ? user.weeklyHolidayId : "",
		});
	}, [id]);

	useEffect(() => {
		getDepartments()
			.then((d) => setDepartment(d))
			.catch((error) => console.log(error));
	}, []);

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		try {
			const resp = await dispatch(
				updateUser({
					id: id,
					values: {
						...values,
						roleId: roleId ? roleId : data.roleId,
						departmentId: departmentId ? departmentId : data.departmentId,
						shiftId: shiftId ? shiftId : data.shiftId,
						leavePolicyId: leavePolicyId ? leavePolicyId : data.leavePolicyId,
						weeklyHolidayId: weeklyHolidayId
							? weeklyHolidayId
							: data.weeklyHolidayId,
					},
				})
			);

			setLoader(true);
			if (resp.payload.message === "success") {
				setLoader(false);
				dispatch(clearUser());
				dispatch(loadSingleStaff(id));
				setIsModalOpen(false);
			} else {
				setLoader(false);
			}

			// form.resetFields();
		} catch (error) {
			console.log(error.message);
			setLoader(false);
			toast.error("Something went wrong");
		}
	};

	const onFinishFailed = (errorInfo) => {
		setLoader(false);
		console.log("Failed:", errorInfo);
	};

	const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button onClick={showModal}>
				<BtnEditSvg size={30} />
			</button>
			<Modal
				width={"50%"}
				title='Update Employee Information'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					size='small'
					form={form}
					name='basic'
					labelCol={{
						span: 5,
					}}
					wrapperCol={{
						span: 14,
					}}
					initialValues={initialValues}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
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

					<Form.Item
						style={{ marginBottom: "10px" }}
						label='Phone'
						name='phone'
						rules={[
							{
								required: true,
								message: "Please input phone!",
							},
						]}>
						<Input placeholder='1234584515' />
					</Form.Item>

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
						<Input placeholder='123 Main Street' style={{ width: "100%" }} />
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
						rules={[{ required: true, message: "Please input Zip Code!" }]}>
						<Input placeholder='90211' />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label='Country'
						name='country'
						rules={[{ required: true, message: "Please input Country!" }]}>
						<Input placeholder='USA' />
					</Form.Item>

					<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
						{" "}
						Employee Information{" "}
					</h2>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label='Joining Date'
						name='joinDate'
						valuePropName='date'
						rules={[
							{
								required: true,
								message: "Please input joining date!",
							},
						]}>
						<DatePicker
							className='date-picker hr-staffs-date-picker'
							defaultValue={initialValues.joinDate}
						/>
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label='Leave Date'
						name='leaveDate'
						valuePropName='leaveDate'>
						<DatePicker
							className='date-picker hr-staffs-date-picker'
							defaultValue={initialValues.leaveDate}
						/>
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
							defaultValue={initialValues.bloodGroup}
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
						name={"departmentId"}
						style={{ marginBottom: "10px" }}
						label='Department'
						rules={[{ required: true, message: "Please input Department!" }]}>
						<Select
							onChange={(value) => setDepartmentId(value)}
							placeholder='Select Department'
							allowClear
							size={"middle"}
							defaultValue={initialValues.departmentId}>
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
							{
								required: true,
								message: "Pleases Select Type!",
							},
						]}
						label='Role'
						name={"roleId"}
						style={{ marginBottom: "10px" }}>
						<Select
							onChange={(value) => setRoleId(value)}
							defaultValue={initialValues.roleId}
							loading={!list}
							size='middle'
							mode='single'
							allowClear
							style={{
								width: "100%",
							}}
							placeholder='Please select Role'>
							{list &&
								list.map((role) => (
									<Option key={role.id} value={role.id}>
										{role.name}
									</Option>
								))}
						</Select>
					</Form.Item>

					<Form.Item
						rules={[
							{
								required: true,
								message: "Pleases Select Type!",
							},
						]}
						label='Shift'
						name={"shiftId"}
						style={{ marginBottom: "10px" }}>
						<Select
							onChange={(value) => setShiftId(value)}
							defaultValue={initialValues.shiftId}
							loading={!shift}
							size='middle'
							mode='single'
							allowClear
							style={{
								width: "100%",
							}}
							placeholder='Please select shift'>
							{shift &&
								shift.map((shift) => (
									<Option key={shift.id} value={shift.id}>
										{shift.name}
									</Option>
								))}
						</Select>
					</Form.Item>

					<Form.Item
						rules={[
							{
								required: true,
								message: "Pleases Select Type!",
							},
						]}
						label='Leave Policy'
						name={"leavePolicyId"}
						style={{ marginBottom: "10px" }}>
						<Select
							onChange={(value) => setLeavePolicyId(value)}
							defaultValue={initialValues.leavePolicyId}
							loading={!leavePolicy}
							size='middle'
							mode='single'
							allowClear
							style={{
								width: "100%",
							}}
							placeholder='Please select leavePolicy'>
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
							{
								required: true,
								message: "Pleases Select Type!",
							},
						]}
						label='Weekly Holiday'
						name={"weeklyHolidayId"}
						style={{ marginBottom: "10px" }}>
						<Select
							onChange={(value) => setWeeklyHolidayId(value)}
							defaultValue={initialValues.weeklyHolidayId}
							loading={!weeklyHoliday}
							size='middle'
							mode='single'
							allowClear
							style={{
								width: "100%",
							}}
							placeholder='Please select weeklyHoliday'>
							{weeklyHoliday &&
								weeklyHoliday.map((weeklyHoliday) => (
									<Option key={weeklyHoliday.id} value={weeklyHoliday.id}>
										{weeklyHoliday.name}
									</Option>
								))}
						</Select>
					</Form.Item>

					<Form.Item
						style={{ marginBottom: "10px", marginTop: "10px" }}
						wrapperCol={{
							offset: 4,
							span: 16,
						}}>
						<Button
							className='mt-5'
							block
							onClick={() => setLoader(true)}
							type='primary'
							shape='round'
							htmlType='submit'
							loading={loader}>
							Update Employee
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default ProfileEditPopup;
