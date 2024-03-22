import {
	MailOutlined,
	PhoneOutlined,
	ThunderboltOutlined,
	TeamOutlined,
	TrophyOutlined,
	UserOutlined,
	CalendarOutlined,
	ClockCircleOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { Col, Row, Alert } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import tw from "tailwind-styled-components";
import {
	clearUser,
	deleteStaff,
	loadSingleStaff,
} from "../../redux/rtk/features/user/userSlice";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";

import EmployeeDesignation from "../UI/EmployeeDesignation";
import EmployeeTimeline from "../UI/EmployeeTimeline";
import DesignationEditPopup from "../UI/PopUp/DesignationEditPopup";
import EducaitonEditPopup from "../UI/PopUp/EducaitonEditPopup";
import ProfileEditPopup from "../UI/PopUp/ProfileEditPopup";

import SalaryEditPopup from "../UI/PopUp/SalaryEditPopup";
import EmployeeSalary from "../UI/EmployeeSalary";

import EmployeeAward from "../UI/EmployeeAward";

import AwardHistoryEditPopup from "../UI/PopUp/AwardHistoryEditPopup";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { loadAllDesignation } from "../../redux/rtk/features/designation/designationSlice";

//PopUp

const DetailStaff = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users.user);
	const error = useSelector((state) => state.users.error);
	const designation = useSelector((state) => state.designations.list);

	console.log(designation, "designation");

	//Delete Supplier
	const onDelete = () => {
		try {
			dispatch(deleteStaff(id));

			setVisible(false);
			toast.warning(`User Name : ${user.username} is removed `);
			return navigate("/admin/hr/staffs");
		} catch (error) {
			console.log(error.message);
		}
	};
	// Delete Supplier PopUp
	const [visible, setVisible] = useState(false);

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	useEffect(() => {
		dispatch(loadSingleStaff(id));
		return () => {
			dispatch(clearUser());
		};
	}, [id]);

	useEffect(() => {
		dispatch(loadAllDesignation());
	}, [dispatch]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<UserPrivateComponent permission={"readSingle-user"}>
				<PageTitle title=' Back  ' />

				{user ? (
					<div className='mr-top'>
						<section>
							<div className='flex justify-between ant-card rounded h-auto mr-8'>
								{/* Profile Card */}

								<div className='flex justify-start'>
									{/*	<img
										src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png'
										alt='profile'
										className='rounded-full h-40 w-40 m-5'
									/> */}
									<div class='flex justify-center py-8 px-4 mt-4 ml-4'>
										<div class='flex flex-col items-around'>
											<h1 class='text-2xl font-bold txt-color-2 mb-1'>
												{(user?.firstName + " " + user?.lastName).toUpperCase()}
											</h1>
											<h2 class='text-base font-medium txt-color-secondary mb-1'>
												{user?.designationHistory[0]?.designation?.name ||
													"No Designation"}
											</h2>
											<h3 class='text-base font-medium txt-color-secondary'>
												{user?.department?.name || "No Department"}
											</h3>
											<h3 class='text-base font-medium txt-color-secondary'>
												{user?.employeeId || "No Employee ID"}
											</h3>
										</div>
									</div>
								</div>

								{/* Leave Status */}
								<div className=''>
									<div className='flex justify-center py-8 px-4 mt-4'>
										<div className='flex flex-col items-around'>
											<h1 className='text-2xl font-bold txt-color-2 mb-1'>
												Leave Status
											</h1>

											<h3 className='text-base font-medium txt-color-secondary'>
												Leaves :{" "}
												<span className='text-base font-medium txt-color-2'>
													Paid - {user?.leavePolicy.paidLeaveCount} | U.Paid -{" "}
													{user?.leavePolicy.unpaidLeaveCount}
												</span>
											</h3>
											<h3 className='text-base font-medium txt-color-secondary'>
												Taken :{" "}
												<span className='text-base font-medium txt-color-2'>
													Paid -{" "}
													{user?.leavePolicy.paidLeaveCount -
														user?.leftPaidLeaveDays}{" "}
													| U.Paid -{" "}
													{user?.leavePolicy.unpaidLeaveCount -
														user?.leftUnpaidLeaveDays}
												</span>
											</h3>
											<h3 className='text-base font-medium txt-color-secondary'>
												Balance :{" "}
												<span className='text-base font-medium txt-color-2'>
													Paid - {user?.leftPaidLeaveDays} | U.Paid -{" "}
													{user?.leftUnpaidLeaveDays}
												</span>
											</h3>
										</div>
									</div>
								</div>

								{/*Clock In and Out Time*/}

								<div className='flex justify-center py-8 px-4 mt-4'>
									<div className='flex flex-col items-around'>
										<h1 className='text-2xl font-bold txt-color-2 mb-1'>
											Clock In & Out
										</h1>

										<h3 className='text-base font-medium txt-color-secondary'>
											In Time :{" "}
											<span className='text-base font-medium txt-color-2'>
												{dayjs(user?.attendance.inTime).format("hh:mm A")}
											</span>
										</h3>

										<h3 className='text-base font-medium txt-color-secondary'>
											Out Time :{" "}
											<span className='text-base font-medium txt-color-2'>
												{dayjs(user?.attendance.outTime).format("hh:mm A")}
											</span>
										</h3>
									</div>
								</div>

								{/* Action Buttons */}

								<div className=''>
									<div className='flex justify-center py-8 px-4 mt-10 mr-4'>
										<UserPrivateComponent permission='update-user'>
											<button className='mr-2 mt-2'>
												{user && <ProfileEditPopup data={user} />}
											</button>
										</UserPrivateComponent>
										<UserPrivateComponent permission='delete-user'>
											<button onClick={onDelete}>
												<BtnDeleteSvg size={30} />
											</button>
										</UserPrivateComponent>
									</div>
								</div>
							</div>
						</section>
						<Row
							className='mt-5'
							gutter={{
								xs: 8,
								sm: 16,
								md: 24,
								lg: 32,
								xl: 32,
							}}>
							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={11}
								className='new-card rounded h-auto m-2'>
								<ProfileCardText className='text-start'>
									Personal Information
								</ProfileCardText>

								<Hr />

								<div className='m-5'>
									<ul className='space-y-4'>
										<li className='flex items-center'>
											<TeamOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												Department:
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.department?.name}
											</p>
										</li>
										<li className='flex items-center'>
											<TrophyOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												Employment Status:
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.employmentStatus?.name}
											</p>
										</li>

										<li className='flex items-center'>
											<CalendarOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												Join Date :
											</span>
											<p className='txt-color-secondary ml-2'>
												{dayjs(user?.joinDate).format("DD/MM/YYYY")}
											</p>
										</li>

										<li className='flex items-center'>
											<CalendarOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												Leave Date:
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.leaveDate
													? dayjs(user?.leaveDate).format("DD/MM/YYYY")
													: "PRESENT"}
											</p>
										</li>

										<li className='flex items-center'>
											<UserOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>Role :</span>
											<p className='txt-color-secondary ml-2'>
												{user?.role?.name || "No Role"}
											</p>
										</li>

										<li className='flex items-center'>
											<CalendarOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												Leave Policy:
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.leavePolicy.name}
											</p>
										</li>

										<li className='flex items-center'>
											<CalendarOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												Weekly Holiday:
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.weeklyHoliday.name}
											</p>
										</li>

										<li className='flex items-center'>
											<ClockCircleOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>Shift :</span>
											<p className='txt-color-secondary ml-2'>
												{user?.shift?.name || "No Shift"} (
												{dayjs(user?.shift?.startTime).format("LT")} -{" "}
												{dayjs(user?.shift?.endTime).format("LT")})
											</p>
										</li>
									</ul>
								</div>
							</Col>
							<Col
								xs={24}
								sm={12}
								md={12}
								lg={12}
								xl={12}
								className='new-card rounded h-auto m-2'>
								<ProfileCardText className='text-start'>
									Contact Information
								</ProfileCardText>

								<Hr />
								<div className='m-5'>
									<ul className='space-y-4'>
										<li className='flex items-center'>
											<MailOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>Email:</span>
											<p className='txt-color-secondary  ml-2'>
												{user?.email || "No Email"}
											</p>
										</li>
										<li className='flex items-center'>
											<PhoneOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>Phone:</span>
											<p className='txt-color-secondary ml-2'>
												{user?.phone || "No Phone"}
											</p>
										</li>

										<li className='flex items-start'>
											<HomeOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>Address:</span>
											<div className=''>
												<li className='txt-color-secondary ml-2'>
													{" "}
													Street : {user?.street || "No Address"}
												</li>
												<li className='txt-color-secondary ml-2'>
													{" "}
													City : {user?.city || "No Address"}
												</li>
												<li className='txt-color-secondary ml-2'>
													{" "}
													State : {user?.state || "No Address"}
												</li>
												<li className='txt-color-secondary ml-2'>
													{" "}
													Country : {user?.country || "No Address"}
												</li>

												<li className='txt-color-secondary ml-2'>
													{" "}
													Zip Code : {user?.zipCode || "No Address"}
												</li>
											</div>
										</li>

										<li className='flex items-center'>
											<ThunderboltOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												Blood Group:
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.bloodGroup || "No Blood Group"}
											</p>
										</li>
									</ul>
								</div>
							</Col>
							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={11}
								className='new-card rounded h-auto m-2'>
								<div className='flex justify-between'>
									<ProfileCardText className='text-start'>
										Designation History
									</ProfileCardText>

									<UserPrivateComponent
										permission={"update-designationHistory"}>
										{user?.designationHistory && (
											<DesignationEditPopup data={user?.designationHistory} />
										)}
									</UserPrivateComponent>
								</div>
								<Hr />
								<div className='flex justify-start ml-10'>
									{user?.designationHistory.length !== 0 ? (
										<EmployeeDesignation list={user?.designationHistory} />
									) : (
										<div className='mb-10'>
											<p className='text-center mt-3 mb-3'>
												No Designation History Found
											</p>
											<Alert
												message='Not found , Click on edit button to add new'
												type='info'
												showIcon
											/>
										</div>
									)}
								</div>
							</Col>

							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={12}
								className='new-card rounded h-auto m-2 '>
								<div className='flex justify-between'>
									<ProfileCardText className='text-start'>
										Educaiton History
									</ProfileCardText>
									<UserPrivateComponent permission={"update-education"}>
										{user?.educations && (
											<EducaitonEditPopup data={user?.educations} />
										)}
									</UserPrivateComponent>
								</div>
								<Hr />
								<div className='flex justify-start ml-10'>
									{user?.educations.length !== 0 ? (
										<EmployeeTimeline list={user?.educations} />
									) : (
										<div className='mb-10'>
											<p className='text-center mt-3 mb-3'>
												No Education History Found
											</p>
											<Alert
												message='Not found , Click on edit button to add new'
												type='info'
												showIcon
											/>
										</div>
									)}
								</div>
							</Col>

							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={11}
								className='new-card rounded h-auto m-2 '>
								<div className='flex justify-between'>
									<ProfileCardText className='text-start'>
										Salary History
									</ProfileCardText>
									<UserPrivateComponent permission={"update-salaryHistory"}>
										{user?.salaryHistory && (
											<SalaryEditPopup data={user?.salaryHistory} />
										)}
									</UserPrivateComponent>
								</div>
								<Hr />
								<div className='flex justify-start ml-10'>
									{user?.salaryHistory.length !== 0 ? (
										<EmployeeSalary list={user?.salaryHistory} />
									) : (
										<div className='mb-10'>
											<p className='text-center mt-3 mb-3 '>
												No Education History Found
											</p>
											<Alert
												message='Not found , Click on edit button to add new'
												type='info'
												showIcon
											/>
										</div>
									)}
								</div>
							</Col>

							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={12}
								className='new-card rounded h-auto m-2 '>
								<div className='flex justify-between'>
									<ProfileCardText className='text-start'>
										Award History
									</ProfileCardText>

									<UserPrivateComponent permission={"update-awardHistory"}>
										{user?.awardHistory && (
											<AwardHistoryEditPopup data={user?.awardHistory} />
										)}
									</UserPrivateComponent>
								</div>
								<Hr />
								<div className='flex justify-start ml-10'>
									{user?.awardHistory.length !== 0 ? (
										<EmployeeAward list={user?.awardHistory} />
									) : (
										<div className='mb-10'>
											<p className='text-center mt-3 mb-3 '>
												No Award History Found
											</p>
											<Alert
												message='Not found , Click on edit button to add new'
												type='info'
												showIcon
											/>
										</div>
									)}
								</div>
							</Col>
						</Row>
					</div>
				) : (
					<div className='mt-10'>
						<Loader />
						{error && <p className='text-center mt-3 mb-3'>No Data Found</p>}
					</div>
				)}
			</UserPrivateComponent>
		</div>
	);
};

const ProfileCardText = tw.div`
txt-color-2
text-xl
 text-center
  mt-5 `;

const Hr = tw.hr`
mt-3
mb-3
new-hr

`;

const Information = tw.div`
m-5
`;

export default DetailStaff;
