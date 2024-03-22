import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	publicHoliday: null,
	error: "",
	loading: false,
};

// ADD_leavePolicy
export const addSinglePublicHoliday = createAsyncThunk(
	"leavePolicy/addSinglePublicHoliday",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `public-holiday/`,
				data: {
					...values,
				},
			});
			toast.success("PublicHoliday Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding PublicHoliday try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_leavePolicy
export const deletePublicHoliday = createAsyncThunk(
	"leavePolicy/deletePublicHoliday ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `public-holiday/${id}`,
			});

			toast.success("PublicHoliday Deleted");
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
export const loadSinglePublicHoliday = createAsyncThunk(
	"leavePolicy/loadSinglePublicHoliday",
	async (id) => {
		try {
			const data = await axios.get(`public-holiday/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// leavePolicyS
export const loadAllPublicHoliday = createAsyncThunk(
	"leavePolicy/loadAllPublicHoliday",
	async () => {
		try {
			const { data } = await axios.get(`public-holiday?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updatePublicHoliday = createAsyncThunk(
	"leavePolicy/updatePublicHoliday",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `public-holiday/${id}`,
				data: {
					...values,
				},
			});
			toast.success("PublicHoliday Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating PublicHoliday try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const publicHolidaySlice = createSlice({
	name: "publicHoliday",
	initialState,
	reducers: {
		clearPublicHoliday: (state) => {
			state.publicHoliday = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllPublicHoliday ======

		builder.addCase(loadAllPublicHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllPublicHoliday.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllPublicHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSinglePublicHoliday  ======

		builder.addCase(addSinglePublicHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSinglePublicHoliday.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSinglePublicHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSinglePublicHoliday ======

		builder.addCase(loadSinglePublicHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSinglePublicHoliday.fulfilled, (state, action) => {
			state.loading = false;
			state.publicHoliday = action.payload.data;
		});

		builder.addCase(loadSinglePublicHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for leavePolicy ======

		builder.addCase(updatePublicHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updatePublicHoliday.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updatePublicHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deletePublicHoliday  ======

		builder.addCase(deletePublicHoliday.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deletePublicHoliday.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deletePublicHoliday.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default publicHolidaySlice.reducer;
export const { clearPublicHoliday } = publicHolidaySlice.actions;
