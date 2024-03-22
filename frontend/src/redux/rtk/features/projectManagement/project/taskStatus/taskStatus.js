import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	taskStatus: null,
	error: "",
	loading: false,
};

// ADD_taskStatus
export const addSingleTaskStatus = createAsyncThunk(
	"taskStatus/addSingleTaskStatus",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `task-status/`,
				data: {
					...values,
				},
			});
			toast.success("Task Status Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Task Status try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_taskStatus
export const deleteTaskStatus = createAsyncThunk(
	"taskStatus/deleteTaskStatus ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-status/${id}`,
			});

			toast.success("Task Status Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Task Status try again");
			console.log(error.message);
		}
	}
);

// taskStatus_DETAILS
export const loadSingleTaskStatus = createAsyncThunk(
	"taskStatus/loadSingleTaskStatus",
	async (id) => {
		try {
			const data = await axios.get(`task-status/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// load All task status
export const loadAllTaskStatus = createAsyncThunk(
	"taskStatus/loadAllTaskStatus",
	async () => {
		try {
			const { data } = await axios.get(`task-status?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// loadAllTaskStatusByProjectId
export const loadAllTaskStatusByProjectId = createAsyncThunk(
	"taskStatus/loadAllTaskStatusByProjectId",
	async (id) => {
		try {
			const { data } = await axios.get(`task-status/${id}/project`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTaskStatus = createAsyncThunk(
	"taskStatus/updateTaskStatus",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `task-status/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Task Status Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Task Status try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

export const updateTaskStatusId = createAsyncThunk(
	"taskStatus/updateTaskStatusId",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `task-status/${id}?query=taskStatus`,
				data: {
					...values,
				},
			});
			toast.success("Task Status Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Task Status try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const taskStatusSlice = createSlice({
	name: "taskStatus",
	initialState,
	reducers: {
		clearTaskStatus: (state) => {
			state.taskStatus = null;
		},
		clearTaskStatusList: (state) => {
			state.list = [];
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllTaskStatus ======

		builder.addCase(loadAllTaskStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTaskStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTaskStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllTaskStatusByProjectId ======

		builder.addCase(loadAllTaskStatusByProjectId.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTaskStatusByProjectId.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTaskStatusByProjectId.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleTaskStatus  ======

		builder.addCase(addSingleTaskStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleTaskStatus.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleTaskStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleTaskStatus ======

		builder.addCase(loadSingleTaskStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleTaskStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.taskStatus = action.payload.data;
		});

		builder.addCase(loadSingleTaskStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for taskStatus ======

		builder.addCase(updateTaskStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateTaskStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTaskStatus  ======

		builder.addCase(deleteTaskStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteTaskStatus.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteTaskStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default taskStatusSlice.reducer;
export const { clearTaskStatus, clearTaskStatusList } = taskStatusSlice.actions;
