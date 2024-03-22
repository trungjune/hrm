import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "../features/dashboard/dashboardSlice";
import designationReducer from "../features/designation/designationSlice";
import userReducer from "../features/user/userSlice";
import payrollSlice from "../features/payroll/payrollSlice";
import paymentSlice from "../features/payment/paymentSlice";
import shiftSlice from "../features/shift/shiftSlice";
import employmentStatusSlice from "../features/employemntStatus/employmentStatusSlice";
import attendanceReducer from "../features/attendance/attendanceSlice";
import leaveSlice from "../features/leave/leaveSlice";
import accountSlice from "../features/account/accountSlice";
import transactionSlice from "../features/transaction/transactionSlice";
import announcementSlice from "../features/announcement/announcementSlice";
import awardSlice from "../features/award/awardSlice";
import awardHistorySlice from "../features/awardHistory/awardHistorySlice";
import leavePolicySlice from "../features/leavePolicy/leavePolicySlice";
import weeklyHolidaySlice from "../features/weeklyHoliday/weeklyHolidaySlice";
import publicHolidaySlice from "../features/publicHoliday/publicHolidaySlice";
import milestoneSlice from "../features/projectManagement/project/milestone/milestone";
import projectTaskSlice from "../features/projectManagement/project/projectTask/projectTask";
import projectTeamSlice from "../features/projectManagement/project/projectTeam/projectTeam";
import taskDependencySlice from "../features/projectManagement/project/taskDependency/taskDependency";
import taskStatusSlice from "../features/projectManagement/project/taskStatus/taskStatus";
import taskTimeSlice from "../features/projectManagement/project/taskTime/taskTime";
import taskPrioritySlice from "../features/projectManagement/project/taskPriority/taskPriority";
import projectSlice from "../features/projectManagement/project/project/project";

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const store = configureStore({
	reducer: {
		users: userReducer,
		dashboard: dashboardReducer,
		designations: designationReducer,
		payroll: payrollSlice,
		payment: paymentSlice,
		shift: shiftSlice,
		employmentStatus: employmentStatusSlice,
		attendance: attendanceReducer,
		leave: leaveSlice,
		accounts: accountSlice,
		transactions: transactionSlice,
		announcement: announcementSlice,
		award: awardSlice,
		awardHistory: awardHistorySlice,
		leavePolicy: leavePolicySlice,
		weeklyHoliday: weeklyHolidaySlice,
		publicHoliday: publicHolidaySlice,
		milestone: milestoneSlice,
		project: projectSlice,
		projectTask: projectTaskSlice,
		projectTeam: projectTeamSlice,
		taskDependency: taskDependencySlice,
		taskStatus: taskStatusSlice,
		taskTime: taskTimeSlice,
		taskPriority: taskPrioritySlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
