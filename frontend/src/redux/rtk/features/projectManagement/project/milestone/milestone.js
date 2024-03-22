import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { data } from "autoprefixer";

const initialState = {
	list: [],
	milestone: null,
	error: "",
	loading: false,
};

// ADD_milestone
export const addSingleMilestone = createAsyncThunk(
	"milestone/addSingleMilestone",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `milestone/`,
				data: {
					...values,
				},
			});
			toast.success("Milestone Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Milestone try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_milestone
export const deleteMilestone = createAsyncThunk(
	"milestone/deleteMilestone ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `milestone/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("Milestone Deleted");
			return {
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Milestone try again");
			console.log(error.message);
		}
	}
);

// milestone_DETAILS
export const loadSingleMilestone = createAsyncThunk(
	"milestone/loadSingleMilestone",
	async (id) => {
		try {
			const data = await axios.get(`milestone/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// load all milestone
export const loadAllMilestone = createAsyncThunk(
	"milestone/loadAllMilestone",
	async () => {
		try {
			const { data } = await axios.get(`milestone?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// load all milestone by project id
export const loadAllMilestoneByProjectId = createAsyncThunk(
	"milestone/loadAllMilestoneByProjectId",
	async (id) => {
		try {
			const { data } = await axios.get(`milestone/${id}/project`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateMilestone = createAsyncThunk(
	"milestone/updateMilestone",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `milestone/${id}?query=all`,
				data: {
					...values,
				},
			});
			toast.success("Milestone Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Milestone try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

export const updateMilestoneStatus = createAsyncThunk(
	"milestone/updateMilestoneStatus",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `milestone/${id}/status`,
				data: {
					...values,
				},
			});
			toast.success("Milestone Status Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Milestone Status try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const milestoneSlice = createSlice({
	name: "milestone",
	initialState,
	reducers: {
		clearMilestone: (state) => {
			state.milestone = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllMilestone ======

		builder.addCase(loadAllMilestone.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllMilestone.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllMilestone.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleMilestone  ======

		builder.addCase(addSingleMilestone.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleMilestone.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleMilestone.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleMilestone ======

		builder.addCase(loadSingleMilestone.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleMilestone.fulfilled, (state, action) => {
			state.loading = false;
			state.milestone = action.payload.data;
		});

		builder.addCase(loadSingleMilestone.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for milestone ======

		builder.addCase(updateMilestone.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateMilestone.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateMilestone.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for Load All milestone by ProjectID ======

		builder.addCase(loadAllMilestoneByProjectId.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllMilestoneByProjectId.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllMilestoneByProjectId.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for Update milestone Status ======

		builder.addCase(updateMilestoneStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateMilestoneStatus.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateMilestoneStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteMilestone  ======

		builder.addCase(deleteMilestone.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteMilestone.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteMilestone.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default milestoneSlice.reducer;
export const { clearMilestone } = milestoneSlice.actions;
