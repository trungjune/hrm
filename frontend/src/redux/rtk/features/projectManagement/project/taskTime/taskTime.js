import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	TaskTime: null,
	error: "",
	loading: false,
};

// ADD_taskTime
export const addSingleTaskTime = createAsyncThunk(
	"taskTime/addSingleTaskTime",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `task-time/`,
				data: {
					...values,
				},
			});
			toast.success("Task Time Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Task Time try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_taskTime
export const deleteTaskTime = createAsyncThunk(
	"taskTime/deleteTaskTime ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-time/${id}`,
			});

			toast.success("Task Time Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Task Time try again");
			console.log(error.message);
		}
	}
);

// taskTime_DETAILS
export const loadSingleTaskTime = createAsyncThunk(
	"taskTime/loadSingleTaskTime",
	async (id) => {
		try {
			const data = await axios.get(`task-time/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// taskTimeS
export const loadAllTaskTime = createAsyncThunk(
	"taskTime/loadAllTaskTime",
	async () => {
		try {
			const { data } = await axios.get(`task-time?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTaskTime = createAsyncThunk(
	"taskTime/updateTaskTime",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `task-time/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Task Time Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Task Time try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const TaskTimeSlice = createSlice({
	name: "TaskTime",
	initialState,
	reducers: {
		clearTaskTime: (state) => {
			state.TaskTime = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllTaskTime ======

		builder.addCase(loadAllTaskTime.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTaskTime.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTaskTime.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleTaskTime  ======

		builder.addCase(addSingleTaskTime.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleTaskTime.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleTaskTime.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleTaskTime ======

		builder.addCase(loadSingleTaskTime.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleTaskTime.fulfilled, (state, action) => {
			state.loading = false;
			state.TaskTime = action.payload.data;
		});

		builder.addCase(loadSingleTaskTime.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for taskTime ======

		builder.addCase(updateTaskTime.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateTaskTime.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateTaskTime.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTaskTime  ======

		builder.addCase(deleteTaskTime.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteTaskTime.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteTaskTime.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default TaskTimeSlice.reducer;
export const { clearTaskTime } = TaskTimeSlice.actions;
