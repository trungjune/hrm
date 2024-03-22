import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	award: null,
	error: "",
	loading: false,
};

// ADD_award
export const addAwardHistory = createAsyncThunk(
	"award/addAwardHistory ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `awardHistory/`,
				data: {
					...values,
				},
			});
			toast.success("AwardHistory  Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding AwardHistory  try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_award
export const deleteAwardHistory = createAsyncThunk(
	"award/deleteAwardHistory  ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `awardHistory/${id}`,
			});

			toast.success("AwardHistory  Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting AwardHistory  try again");
			console.log(error.message);
		}
	}
);

// award_DETAILS
export const loadSingleAwardHistory = createAsyncThunk(
	"award/loadSingleAwardHistory",
	async (id) => {
		try {
			const data = await axios.get(`awardHistory/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// awardS
export const loadAllAwardHistory = createAsyncThunk(
	"award/loadAllAwardHistory",
	async () => {
		try {
			const { data } = await axios.get(`awardHistory?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateAwardHistory = createAsyncThunk(
	"award/updateAwardHistory",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `awardHistory/${id}`,
				data: {
					...values,
				},
			});
			toast.success("AwardHistory Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating AwardHistory try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const awardHistorySlice = createSlice({
	name: "awardHistory",
	initialState,
	reducers: {
		clearAward: (state) => {
			state.award = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllAwardHistory ======

		builder.addCase(loadAllAwardHistory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllAwardHistory.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllAwardHistory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addAwardHistory  ======

		builder.addCase(addAwardHistory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addAwardHistory.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addAwardHistory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleAwardHistory ======

		builder.addCase(loadSingleAwardHistory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleAwardHistory.fulfilled, (state, action) => {
			state.loading = false;
			state.award = action.payload.data;
		});

		builder.addCase(loadSingleAwardHistory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for Award ======

		builder.addCase(updateAwardHistory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateAwardHistory.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateAwardHistory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteAwardHistory   ======

		builder.addCase(deleteAwardHistory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteAwardHistory.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteAwardHistory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default awardHistorySlice.reducer;
export const { clearAward } = awardHistorySlice.actions;
