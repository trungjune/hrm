import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	leaveHistory: null,
	total: 0,
	leave: null,
	error: "",
	loading: false,
};

// ADD_leave
export const addLeaveApplication = createAsyncThunk(
	"leave/addLeaveApplication",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `leave-application/`,
				data: {
					...values,
				},
			});
			toast.success("Leave Application Created");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in creating try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// Approve_LEAVE
export const reviewLeaveApplication = createAsyncThunk(
	"leave/reviewLeaveApplication",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `leave-application/${id}`,
				data: {
					...values,
				},
			});

			toast.success(" Leave Approved");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in approving try again");
			console.log(error.message);
		}
	}
);

// leave_DETAILS
export const loadSingelLeaveApplication = createAsyncThunk(
	"leave/loadSingelLeaveApplication",
	async (id) => {
		try {
			const data = await axios.get(`leave-application/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// get leave application by status and pagination
export const loadLeaveApplicationByStatus = createAsyncThunk(
	"leave/loadLeaveApplicationByStatus",
	async ({ status, page, limit }) => {
		try {
			const { data } = await axios.get(
				`leave-application?page=${page}&count=${limit}&status=${status}`
			);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// leaveS
export const loadAllLeaveApplication = createAsyncThunk(
	"leave/loadAllLeaveApplication",
	async () => {
		try {
			const { data } = await axios.get(`leave-application?query=all`);

			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// count leave applications
export const countLeaveApplication = createAsyncThunk(
	"leave/countLeaveApplication",
	async () => {
		try {
			const { data } = await axios.get(`leave-application`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// get Single Leave history
export const loadSingleLeaveHistory = createAsyncThunk(
	"leave/loadSingleLeaveHistory",
	async (id) => {
		try {
			const { data } = await axios.get(`leave-application/${id}/leaveHistory`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateLeaveApplication = createAsyncThunk(
	"leave/updateLeaveApplication",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `leave-application/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Leave Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Leave try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const LeaveApplicationSlice = createSlice({
	name: "leaveApplication",
	initialState,
	reducers: {
		clearLeaveApplication: (state) => {
			state.leave = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllLeaveApplication ======

		builder.addCase(loadAllLeaveApplication.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllLeaveApplication.fulfilled, (state, action) => {
			state.loading = false;

			state.list = action.payload;
		});

		builder.addCase(loadAllLeaveApplication.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		builder.addCase(addLeaveApplication.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addLeaveApplication.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addLeaveApplication.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingelLeaveApplication ======

		builder.addCase(loadSingelLeaveApplication.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingelLeaveApplication.fulfilled, (state, action) => {
			state.loading = false;
			state.leave = action.payload.data;
		});

		builder.addCase(loadSingelLeaveApplication.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for loadLeaveApplicationByStatus ======

		builder.addCase(loadLeaveApplicationByStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadLeaveApplicationByStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadLeaveApplicationByStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for updateLeaveApplication ======

		builder.addCase(updateLeaveApplication.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateLeaveApplication.fulfilled, (state, action) => {
			state.loading = false;
			const list = [...state.list];
			const index = list.findIndex(
				(leave) => leave.id === parseInt(action.payload.data.id)
			);
			list[index] = action.payload.data;
			state.list = list;
		});

		builder.addCase(updateLeaveApplication.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for reviewLeaveApplication ======

		builder.addCase(reviewLeaveApplication.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(reviewLeaveApplication.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(reviewLeaveApplication.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 5) ====== builders for countLeaveApplication ======

		builder.addCase(countLeaveApplication.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(countLeaveApplication.fulfilled, (state, action) => {
			state.loading = false;
			const length = action.payload.length;
			state.total = length;
		});

		builder.addCase(countLeaveApplication.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 6) ====== builders for loadSingleLeaveHistory ======

		builder.addCase(loadSingleLeaveHistory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleLeaveHistory.fulfilled, (state, action) => {
			console.log(action.payload);
			state.loading = false;
			state.leaveHistory = action.payload;
		});

		builder.addCase(loadSingleLeaveHistory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default LeaveApplicationSlice.reducer;
export const { clearLeaveApplication } = LeaveApplicationSlice.actions;
