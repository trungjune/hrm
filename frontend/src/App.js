import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import UserList from "./components/user/user";

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import Page404 from "./components/404/404Page";
import Dashboard from "./components/Dashboard/Graph/Dashboard";
import DetailStaff from "./components/user/detailsStaff";

import Designation from "./components/designation/designation";
import DetailDesignation from "./components/designation/detailDesignation";
import UpdateDesignation from "./components/designation/updateDesignation";

import Main from "./components/layouts/Main";

import AddPermission from "./components/role/AddPermission";
import DetailRole from "./components/role/DetailsRole";
import RoleList from "./components/role/role";
import InvoiceSetting from "./components/settings/invoiceSetting";
import WelcomePage from "./components/UI/welcomePage";
import GetAllUsers from "./components/user/GetAllUser";
import Department from "./components/department/Department.js";
import DetailDepartment from "./components/department/DetailsDepartment";
import CalculatePayroll from "./components/payroll/CalculatePayroll";

import PayslipList from "./components/payroll/PayslipList";
import Shift from "./components/shift/Shift";
import DetailShift from "./components/shift/ShiftDetails";
import EmploymentStatus from "./components/employmentStatus/EmploymentStatus";
import DetailEmploymentStatus from "./components/employmentStatus/EmploymentStatusDetails";
import Attendance from "./components/attendance/AddAttendance";
import Leave from "./components/leave/Leave";
import GetAllLeaves from "./components/leave/GetAllLeaves";
import DetailLeave from "./components/leave/DetailLeave";
import DetailAttendance from "./components/attendance/DetailAttendance";
import UserAttendance from "./components/attendance/UserAttendance";

import Account from "./components/account/account";
import BalanceSheet from "./components/account/balanceSheet";
import DetailAccount from "./components/account/detailAccount";
import IncomeStatement from "./components/account/incomeStatement";
import TrialBalance from "./components/account/trialBalance";

import AddTransaction from "./components/transaction/AddTransaction";
import DetailTransaction from "./components/transaction/detailTransaction";
import Transaction from "./components/transaction/transaction";
import UserLeave from "./components/leave/UserLeave";
import Announcement from "./components/announcement/Announcement";
import DetailAnnouncement from "./components/announcement/AnnouncementDetails";
import Award from "./components/award/Award";
import DetailAward from "./components/award/DetailsAward";
import LeavePolicy from "./components/leavePolicy/LeavePolicy";
import DetailLeavePolicy from "./components/leavePolicy/DetailsLeavePolicy";
import WeeklyHoliday from "./components/weeklyHoliday/WeeklyHoliday";
import DetailWeeklyHoliday from "./components/weeklyHoliday/DetailsWeeklyHoliday";
import PublicHoliday from "./components/publicHoliday/PublicHoliday";
import DetailPublicHoliday from "./components/publicHoliday/DetailsPublicHoliday";
import DetailPayslip from "./components/payroll/PayslipDetail";
import UserPrivateRoute from "./components/PrivateRoutes/UserPrivateRoute";
import AddAward from "./components/award/AddAward";
import GetAllAward from "./components/award/GetAllAward";
import Project from "./components/project/project";
import Milestone from "./components/project/milestone/milestone";
import TaskStatus from "./components/project/taskStatus/taskStatus";
import TaskPriority from "./components/project/taskPriority/taskPriority";
import DetailProjectTeam from "./components/project/team/DetailProjectTeam";
import AddProject from "./components/project/AddProject";
import UpdateProject from "./components/project/UpdateProject";
import UpdateMilestone from "./components/project/milestone/UpdateMilestone";
import ProjectTeam from "./components/project/team/ProjectTeam";
import UpdateTaskStatus from "./components/project/taskStatus/UpdateTaskStatus";
import UpdateTaskPriority from "./components/project/taskPriority/UpdateTaskPriority";
import Task from "./components/project/tasks/tasks";
import UpdateStatus from "./components/project/UpdateStatus";
import KanbanBoard2 from "./components/kanbanBoard/KanbanBoard2";

function App() {
	return (
		<div className='App container-fluid'>
			<ToastContainer
				position='bottom-left'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<BrowserRouter>
				{/* <TestComp/> */}
				<Main>
					<Routes>
						<Route path='/' element={<WelcomePage />} />
						<Route path='/admin/dashboard' element={<Dashboard />}></Route>
						<Route path='/admin' element={<Dashboard />} />
						<Route path='*' element={<Page404 />} />

						<Route path='/admin/auth/login' exact element={<Login />} />
						<Route path='/admin/auth/logout' exact element={<Logout />} />
						{/*         <Route path='/auth/register' exact element={<Register />} /> */}
						<Route element={<UserPrivateRoute permission={"create-user"} />}>
							<Route path='/admin/hr/staffs/new' exact element={<UserList />} />
						</Route>
						<Route element={<UserPrivateRoute permission={"readAll-user"} />}>
							<Route path='/admin/hr/staffs' exact element={<GetAllUsers />} />
						</Route>
						<Route
							element={<UserPrivateRoute permission={"readSingle-user"} />}>
							<Route
								path='/admin/hr/staffs/:id'
								exact
								element={<DetailStaff />}
							/>
						</Route>
						<Route
							element={
								<UserPrivateRoute permission={"readAll-rolePermission"} />
							}>
							<Route path='/admin/role' exact element={<RoleList />} />
						</Route>
						<Route
							element={
								<UserPrivateRoute permission={"readSingle-rolePermission"} />
							}>
							<Route path='/admin/role/:id' element={<DetailRole />} />
						</Route>
						<Route
							element={
								<UserPrivateRoute permission={"create-rolePermission"} />
							}>
							<Route
								path='/admin/role/permit/:id/'
								element={<AddPermission />}
							/>
						</Route>
						<Route
							element={<UserPrivateRoute permission={"readAll-department"} />}>
							<Route path='/admin/department' exact element={<Department />} />
						</Route>
						<Route
							element={
								<UserPrivateRoute permission={"readSingle-department"} />
							}>
							<Route
								path='/admin/department/:id'
								element={<DetailDepartment />}
							/>
						</Route>
						<Route
							element={<UserPrivateRoute permission={"readAll-designation"} />}>
							<Route
								path='/admin/designation'
								exact
								element={<Designation />}
							/>
						</Route>

						<Route
							element={
								<UserPrivateRoute permission={"readSingle-designation"} />
							}>
							<Route
								path='/admin/designation/:id'
								element={<DetailDesignation />}
							/>
						</Route>
						<Route
							element={<UserPrivateRoute permission={"update-designation"} />}>
							<Route
								path='/admin/designation/:id/update'
								element={<UpdateDesignation />}
							/>
						</Route>
						<Route
							element={<UserPrivateRoute permission={"readAll-setting"} />}>
							<Route
								path='/admin/company-setting'
								exact
								element={<InvoiceSetting />}
							/>
						</Route>

						{/* === === === Payroll Routes === === === */}
						<Route
							element={<UserPrivateRoute permission={"readAll-payroll"} />}>
							<Route path='/admin/payroll/new' element={<CalculatePayroll />} />
							<Route path='/admin/payroll/list' element={<PayslipList />} />
						</Route>
						<Route
							element={<UserPrivateRoute permission={"readSingle-payroll"} />}>
							<Route path='/admin/payroll/:id' element={<DetailPayslip />} />
						</Route>

						{/* === === === Shift Routes === === === */}

						<Route element={<UserPrivateRoute permission={"readAll-shift"} />}>
							<Route path='/admin/shift' element={<Shift />} />
						</Route>

						<Route
							element={<UserPrivateRoute permission={"readSingle-shift"} />}>
							<Route path='/admin/shift/:id' element={<DetailShift />} />
						</Route>

						{/* === === === EmploymentStatus Routes === === === */}
						<Route
							element={
								<UserPrivateRoute permission={"readAll-employmentStatus"} />
							}>
							<Route
								path='/admin/employment-status'
								element={<EmploymentStatus />}
							/>
						</Route>

						<Route
							element={
								<UserPrivateRoute permission={"readSingle-employmentStatus"} />
							}>
							<Route
								path='/admin/employment-status/:id'
								element={<DetailEmploymentStatus />}
							/>
						</Route>

						{/* === === === Leave Routes === === === */}

						<Route
							element={
								<UserPrivateRoute permission={"create-leaveApplication"} />
							}>
							<Route path='/admin/leave/new' element={<Leave />} />
						</Route>
						<Route
							element={
								<UserPrivateRoute permission={"readAll-leaveApplication"} />
							}>
							<Route path='/admin/leave/:id' element={<DetailLeave />} />
							<Route path='/admin/leave' element={<GetAllLeaves />} />
						</Route>
						<Route
							element={
								<UserPrivateRoute permission={"readSingle-leaveApplication"} />
							}>
							<Route path='/admin/leave/user/:id' element={<UserLeave />} />
						</Route>
						{/* === === === Attendance Routes === === === */}
						<Route
							element={<UserPrivateRoute permission={"readAll-attendance"} />}>
							<Route path='/admin/attendance' element={<Attendance />} />
						</Route>

						<Route
							element={
								<UserPrivateRoute permission={"readSingle-attendance"} />
							}>
							<Route
								path='/admin/attendance/user/:id'
								element={<UserAttendance />}
							/>
						</Route>
						{/*<Route
							path='/admin/attendance/:id'
							element={<DetailAttendance />}
						/> */}

						{/* === === === Accounting Routes === === === */}

						<Route
							element={<UserPrivateRoute permission={"readAll-account"} />}>
							<Route path='/admin/account' exact element={<Account />} />
							<Route path='/admin/account/:id' element={<DetailAccount />} />
							<Route
								path='/admin/account/trial-balance'
								exact
								element={<TrialBalance />}
							/>
							<Route
								path='/admin/account/balance-sheet'
								exact
								element={<BalanceSheet />}
							/>
							<Route
								path='/admin/account/income'
								exact
								element={<IncomeStatement />}
							/>
						</Route>
						{/* === === === Transaction Routes === === === */}
						<Route
							element={<UserPrivateRoute permission={"readAll-transaction"} />}>
							<Route
								path='/admin/transaction'
								exact
								element={<Transaction />}
							/>
						</Route>

						<Route
							element={
								<UserPrivateRoute permission={"readSingle-transaction"} />
							}>
							<Route
								path='/admin/transaction/:id'
								element={<DetailTransaction />}
							/>
						</Route>
						<Route
							element={<UserPrivateRoute permission={"create-transaction"} />}>
							<Route
								path='/admin/transaction/create'
								exact
								element={<AddTransaction />}
							/>
						</Route>

						{/* === === === Announcement Routes === === === */}
						<Route
							element={
								<UserPrivateRoute permission={"readAll-announcement"} />
							}>
							<Route
								path='/admin/announcement'
								exact
								element={<Announcement />}
							/>
						</Route>

						<Route
							element={
								<UserPrivateRoute permission={"readSingle-announcement"} />
							}>
							<Route
								path='/admin/announcement/:id'
								element={<DetailAnnouncement />}
							/>
						</Route>

						{/* === === === Award Routes === === === */}

						<Route element={<UserPrivateRoute permission={"create-award"} />}>
							<Route path='/admin/award/new' exact element={<AddAward />} />
						</Route>
						<Route element={<UserPrivateRoute permission={"readAll-award"} />}>
							<Route path='/admin/award/:id' element={<DetailAward />} />
							<Route path='/admin/award' exact element={<GetAllAward />} />
						</Route>

						{/* === === === Leave Policy Routes === === === */}
						<Route
							element={<UserPrivateRoute permission={"readAll-leavePolicy"} />}>
							<Route
								path='/admin/leave-policy'
								exact
								element={<LeavePolicy />}
							/>
							<Route
								path='/admin/leave-policy/:id'
								element={<DetailLeavePolicy />}
							/>
						</Route>

						{/* === === === Weekly Holiday Routes === === === */}
						<Route
							element={
								<UserPrivateRoute permission={"readAll-weeklyHoliday"} />
							}>
							<Route
								path='/admin/holiday/week'
								exact
								element={<WeeklyHoliday />}
							/>
							<Route
								path='/admin/holiday/week/:id'
								element={<DetailWeeklyHoliday />}
							/>
						</Route>
						{/* === === === Public Holiday Routes === === === */}
						<Route
							element={
								<UserPrivateRoute permission={"readAll-publicHoliday"} />
							}>
							<Route
								path='/admin/holiday/public'
								exact
								element={<PublicHoliday />}
							/>
							<Route
								path='/admin/holiday/public/:id'
								element={<DetailPublicHoliday />}
							/>
						</Route>

						{/* === === === === PROJECT MANAGEMENT STARTED HERE === === === ===*/}

						{/* === === === Kanban Routes === === === */}
						<Route
							element={<UserPrivateRoute permission={"readSingle-project"} />}>
							<Route
								path='/admin/kanban/:projectId'
								element={<KanbanBoard2 />}
							/>
						</Route>
						{/* <Route
							path='/admin/kanban2/:projectId'
							element={<KanbanBoard2 />}
						/>
 */}
						{/* === === === Project Routes === === === */}
						<Route
							element={<UserPrivateRoute permission={"readAll-project"} />}>
							<Route path='/admin/project' element={<Project />} />
						</Route>

						<Route element={<UserPrivateRoute permission={"create-project"} />}>
							<Route path='/admin/project/new' element={<AddProject />} />
						</Route>

						<Route element={<UserPrivateRoute permission={"update-project"} />}>
							<Route
								path='/admin/project/update/:projectId'
								element={<UpdateProject />}
							/>
						</Route>

						<Route
							path='/admin/project/update/:projectId/status'
							element={<UpdateStatus />}
						/>

						{/* === === === Project Milestone === === === */}

						<Route
							element={<UserPrivateRoute permission={"readAll-project"} />}>
							<Route
								path='/admin/project/:id/milestone'
								element={<Milestone isFixed={true} />}
							/>
						</Route>

						{/* === === === Project Task Status === === === */}

						<Route
							element={<UserPrivateRoute permission={"readAll-project"} />}>
							<Route
								path='/admin/project/:id/task-status'
								element={<TaskStatus isFixed={true} />}
							/>
						</Route>

						{/* === === === Team Routes === === === */}

						<Route
							element={<UserPrivateRoute permission={"readAll-projectTeam"} />}>
							<Route path='/admin/team' element={<ProjectTeam />} />
						</Route>

						<Route
							element={
								<UserPrivateRoute permission={"readSingle-projectTeam"} />
							}>
							<Route path='/admin/team/:id' element={<DetailProjectTeam />} />
						</Route>
						{/* <Route path='/admin/team/update/:id' element={<DetailProjectTeam />} /> */}

						{/* === === === Milestone Routes === === === */}

						<Route
							element={<UserPrivateRoute permission={"create-milestone"} />}>
							<Route path='/admin/milestone' element={<Milestone />} />
						</Route>

						<Route
							element={<UserPrivateRoute permission={"update-milestone"} />}>
							<Route
								path='/admin/milestone/update/:id'
								element={<UpdateMilestone />}
							/>
						</Route>

						{/* <Route path="/admin/milestone/:id" element={<DetailProject />} /> */}

						<Route element={<UserPrivateRoute permission={"create-task"} />}>
							<Route path='/admin/task' element={<Task />} />
						</Route>

						{/* === === === TaskStatus Routes === === === */}

						<Route
							element={<UserPrivateRoute permission={"readAll-taskStatus"} />}>
							<Route path='/admin/task-status' element={<TaskStatus />} />
						</Route>

						<Route
							element={<UserPrivateRoute permission={"update-taskStatus"} />}>
							<Route
								path='/admin/task-status/update/:id'
								element={<UpdateTaskStatus />}
							/>
						</Route>

						{/* === === === TaskPriority Routes === === === */}

						<Route
							element={<UserPrivateRoute permission={"readAll-priority"} />}>
							<Route path='/admin/task-priority' element={<TaskPriority />} />
						</Route>

						<Route
							element={<UserPrivateRoute permission={"update-priority"} />}>
							<Route
								path='/admin/task-priority/update/:id'
								element={<UpdateTaskPriority />}
							/>
						</Route>

						{/* <Route path='/admin/project-team' eclement={<ProjectTeam />} /> */}

						{/* === === === Task Routes === === === */}
						{/* <Route path="/admin/task" element={<Task />} /> */}
						{/* <Route path="/admin/task/:id" element={<DetailTask />} />  */}
					</Routes>
				</Main>
			</BrowserRouter>
		</div>
	);
}

export default App;
