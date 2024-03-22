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
export const addSingleAward = createAsyncThunk(
	"award/addSingleAward ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `award/`,
				data: {
					...values,
				},
			});
			toast.success("Award Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding award try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_award
export const deleteAward = createAsyncThunk(
	"award/deleteAward ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `award/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("Award Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting award try again");
			console.log(error.message);
		}
	}
);

// award_DETAILS
export const loadSingleAward = createAsyncThunk(
	"award/loadSingleAward",
	async (id) => {
		try {
			const data = await axios.get(`award/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// awardS
export const loadAllAward = createAsyncThunk("award/loadAllAward", async () => {
	try {
		const { data } = await axios.get(`award?query=all`);
		return data;
	} catch (error) {
		console.log(error.message);
	}
});

export const updateAward = createAsyncThunk(
	"award/updateAward",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `award/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Award Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Award try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const awardSlice = createSlice({
	name: "award",
	initialState,
	reducers: {
		clearAward: (state) => {
			state.award = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllAward ======

		builder.addCase(loadAllAward.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllAward.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllAward.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleAward  ======

		builder.addCase(addSingleAward.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleAward.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleAward.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleAward ======

		builder.addCase(loadSingleAward.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleAward.fulfilled, (state, action) => {
			state.loading = false;
			state.award = action.payload.data;
		});

		builder.addCase(loadSingleAward.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for Award ======

		builder.addCase(updateAward.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateAward.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateAward.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteAward  ======

		builder.addCase(deleteAward.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteAward.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteAward.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default awardSlice.reducer;
export const { clearAward } = awardSlice.actions;
