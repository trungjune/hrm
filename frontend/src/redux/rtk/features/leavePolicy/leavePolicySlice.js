import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	leavePolicy: null,
	error: "",
	loading: false,
};

// ADD_leavePolicy
export const addSingleLeavePolicy = createAsyncThunk(
	"leavePolicy/addSingleLeavePolicy ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `leave-policy/`,
				data: {
					...values,
				},
			});
			toast.success("LeavePolicy Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding LeavePolicy try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_leavePolicy
export const deleteLeavePolicy = createAsyncThunk(
	"leavePolicy/deleteLeavePolicy ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `leave-policy/${id}`,
			});

			toast.success("LeavePolicy Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting leavePolicy try again");
			console.log(error.message);
		}
	}
);

// leavePolicy_DETAILS
export const loadSingleLeavePolicy = createAsyncThunk(
	"leavePolicy/loadSingleLeavePolicy",
	async (id) => {
		try {
			const data = await axios.get(`leave-policy/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// leavePolicyS
export const loadAllLeavePolicy = createAsyncThunk(
	"leavePolicy/loadAllLeavePolicy",
	async () => {
		try {
			const { data } = await axios.get(`leave-policy?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateLeavePolicy = createAsyncThunk(
	"leavePolicy/updateLeavePolicy",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `leave-policy/${id}`,
				data: {
					...values,
				},
			});
			toast.success("LeavePolicy Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating LeavePolicy try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const leavePolicySlice = createSlice({
	name: "leavePolicy",
	initialState,
	reducers: {
		clearLeavePolicy: (state) => {
			state.leavePolicy = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllLeavePolicy ======

		builder.addCase(loadAllLeavePolicy.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllLeavePolicy.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllLeavePolicy.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleLeavePolicy  ======

		builder.addCase(addSingleLeavePolicy.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleLeavePolicy.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleLeavePolicy.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleLeavePolicy ======

		builder.addCase(loadSingleLeavePolicy.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleLeavePolicy.fulfilled, (state, action) => {
			state.loading = false;
			state.leavePolicy = action.payload.data;
		});

		builder.addCase(loadSingleLeavePolicy.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for leavePolicy ======

		builder.addCase(updateLeavePolicy.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateLeavePolicy.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateLeavePolicy.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteLeavePolicy  ======

		builder.addCase(deleteLeavePolicy.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteLeavePolicy.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteLeavePolicy.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default leavePolicySlice.reducer;
export const { clearLeavePolicy } = leavePolicySlice.actions;
