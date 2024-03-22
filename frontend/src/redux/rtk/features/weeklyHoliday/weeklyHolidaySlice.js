import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	weeklyHoliday: null,
	error: "",
	loading: false,
};

// ADD_leavePolicy
export const addSingleWeeklyHoliday = createAsyncThunk(
	"leavePolicy/addSingleWeeklyHoliday",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `weekly-holiday/`,
				data: {
					...values,
				},
			});
			toast.success("WeeklyHoliday Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding WeeklyHoliday try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_leavePolicy
export const deleteWeeklyHoliday = createAsyncThunk(
	"leavePolicy/deleteWeeklyHoliday ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `weekly-holiday/${id}`,
			});

			toast.success("WeeklyHoliday Deleted");
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
export const loadSingleWeeklyHoliday = createAsyncThunk(
	"leavePolicy/loadSingleWeeklyHoliday",
	async (id) => {
		try {
			const data = await axios.get(`weekly-holiday/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// leavePolicyS
export const loadAllWeeklyHoliday = createAsyncThunk(
	"leavePolicy/loadAllWeeklyHoliday",
	async () => {
		try {
			const { data } = await axios.get(`weekly-holiday?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateWeeklyHoliday = createAsyncThunk(
	"leavePolicy/updateWeeklyHoliday",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `weekly-holiday/${id}`,
				data: {
					...values,
				},
			});
			toast.success("WeeklyHoliday Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating WeeklyHoliday try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const weeklyHolidaySlice = createSlice({
	name: "weeklyHoliday",
	initialState,
	reducers: {
		clearWeeklyHoliday: (state) => {
			state.weeklyHoliday = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllWeeklyHoliday ======

		builder.addCase(loadAllWeeklyHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllWeeklyHoliday.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllWeeklyHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleWeeklyHoliday  ======

		builder.addCase(addSingleWeeklyHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleWeeklyHoliday.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleWeeklyHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleWeeklyHoliday ======

		builder.addCase(loadSingleWeeklyHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleWeeklyHoliday.fulfilled, (state, action) => {
			state.loading = false;
			state.weeklyHoliday = action.payload.data;
		});

		builder.addCase(loadSingleWeeklyHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for leavePolicy ======

		builder.addCase(updateWeeklyHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateWeeklyHoliday.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateWeeklyHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteWeeklyHoliday  ======

		builder.addCase(deleteWeeklyHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteWeeklyHoliday.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteWeeklyHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default weeklyHolidaySlice.reducer;
export const { clearWeeklyHoliday } = weeklyHolidaySlice.actions;
