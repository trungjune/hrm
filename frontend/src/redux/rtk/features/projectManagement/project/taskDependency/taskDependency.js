import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	TaskDependency: null,
	error: "",
	loading: false,
};

// ADD_taskDependency
export const addSingleTaskDependency = createAsyncThunk(
	"taskDependency/addSingleTaskDependency",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `task-dependency/`,
				data: {
					...values,
				},
			});
			toast.success("Task Dependency Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Task Dependency try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_taskDependency
export const deleteTaskDependency = createAsyncThunk(
	"taskDependency/deleteTaskDependency ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-dependency/${id}`,
			});

			toast.success("Task Dependency Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Task Dependency try again");
			console.log(error.message);
		}
	}
);

// taskDependency_DETAILS
export const loadSingleTaskDependency = createAsyncThunk(
	"taskDependency/loadSingleTaskDependency",
	async (id) => {
		try {
			const data = await axios.get(`task-dependency/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// taskDependencyS
export const loadAllTaskDependency = createAsyncThunk(
	"taskDependency/loadAllTaskDependency",
	async () => {
		try {
			const { data } = await axios.get(`task-dependency?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTaskDependency = createAsyncThunk(
	"taskDependency/updateTaskDependency",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `task-dependency/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Task Dependency Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Task Dependency try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const TaskDependencySlice = createSlice({
	name: "TaskDependency",
	initialState,
	reducers: {
		clearTaskDependency: (state) => {
			state.TaskDependency = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllTaskDependency ======

		builder.addCase(loadAllTaskDependency.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTaskDependency.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTaskDependency.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleTaskDependency  ======

		builder.addCase(addSingleTaskDependency.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleTaskDependency.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleTaskDependency.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleTaskDependency ======

		builder.addCase(loadSingleTaskDependency.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleTaskDependency.fulfilled, (state, action) => {
			state.loading = false;
			state.TaskDependency = action.payload.data;
		});

		builder.addCase(loadSingleTaskDependency.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for taskDependency ======

		builder.addCase(updateTaskDependency.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateTaskDependency.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateTaskDependency.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTaskDependency  ======

		builder.addCase(deleteTaskDependency.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteTaskDependency.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteTaskDependency.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default TaskDependencySlice.reducer;
export const { clearTaskDependency } = TaskDependencySlice.actions;
