import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	clockIn: null,
	attendance: null,
	error: "",
	loading: false,
};

// ADD_attendance
export const addClockIn = createAsyncThunk("attendance", async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `attendance`,
			data: {
				...values,
			},
		});
		toast.success("Attendance Added");
		return {
			data,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in adding Attendance try again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
});

export const getCurrentUserClockInStatus = createAsyncThunk(
	"clockIn/loadSingleClockIn",
	async (id) => {
		try {
			const data = await axios.get(`attendance/${id}/last`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// add Manual Attendance
export const addManualAttendance = createAsyncThunk(
	"attendance/addManualAttendance",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `attendance?query=manualPunch`,
				data: {
					...values,
				},
			});
			toast.success("Attendance Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Attendance try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// get all attendance list paginated
export const loadAllAttendancePaginated = createAsyncThunk(
	"attendance/loadAllAttendancePaginated",
	async ({ page, startdate, enddate, limit }) => {
		try {
			const { data } = await axios({
				method: "get",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `attendance?page=${page}&count=${limit}&startdate=${startdate}&enddate=${enddate}`,
			});
			return data;
		} catch (error) {
			toast.error("Error in getting Attendance list try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// get all attendance
export const loadAllAttendance = createAsyncThunk(
	"attendance/loadAllAttendance",
	async () => {
		try {
			const { data } = await axios({
				method: "get",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `attendance?query=all`,
			});
			return data;
		} catch (error) {
			toast.error("Error in getting Attendance list try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// get single attendance
export const loadSingleAttendance = createAsyncThunk(
	"attendance/loadSingleAttendance",
	async (id) => {
		try {
			const { data } = await axios({
				method: "get",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `attendance/${id}`,
			});

			return data;
		} catch (error) {
			toast.error("Error in getting Attendance list try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// loadAttendanceByUserId
export const loadAttendanceByUserId = createAsyncThunk(
	"attendance/loadAttendanceByUserId",
	async (id) => {
		try {
			const { data } = await axios({
				method: "get",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `attendance/${id}/user`,
			});

			return data;
		} catch (error) {
			toast.error("Error in getting Attendance list try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const clockInSlice = createSlice({
	name: "clockIn",
	initialState,
	reducers: {
		clearAttendance: (state) => {
			state.attendance = null;
		},
		clearAttendanceList: (state) => {
			state.list = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addClockIn.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addClockIn.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addClockIn.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for getCurrentUserClockInStatus ======

		builder.addCase(getCurrentUserClockInStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(getCurrentUserClockInStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.clockIn = action.payload.data;
		});

		builder.addCase(getCurrentUserClockInStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for loadAllAttendancePaginated ======

		builder.addCase(loadAllAttendancePaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllAttendancePaginated.fulfilled, (state, action) => {
			state.loading = false;

			state.list = action.payload;
		});

		builder.addCase(loadAllAttendancePaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for loadAllAttendance ======

		builder.addCase(loadAllAttendance.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllAttendance.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllAttendance.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for addManualAttendance ======

		builder.addCase(addManualAttendance.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addManualAttendance.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addManualAttendance.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for loadSingleAttendance ======

		builder.addCase(loadSingleAttendance.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleAttendance.fulfilled, (state, action) => {
			state.loading = false;

			state.attendance = action.payload;
		});

		builder.addCase(loadSingleAttendance.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for loadAttendanceByUserId ======

		builder.addCase(loadAttendanceByUserId.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAttendanceByUserId.fulfilled, (state, action) => {
			state.loading = false;

			state.list = action.payload;
		});

		builder.addCase(loadAttendanceByUserId.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default clockInSlice.reducer;
export const { clearAttendance, clearAttendanceList } = clockInSlice.actions;
