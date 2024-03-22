import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	projectTasks: null,
	error: "",
	loading: false,
};

// ADD_tasks
export const addSingleProjectTasks = createAsyncThunk(
	"tasks/addSingleProjectTasks",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `tasks/`,
				data: {
					...values,
				},
			});
			toast.success("ProjectTasks Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Project Tasks try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_tasks
export const deleteProjectTasks = createAsyncThunk(
	"tasks/deleteProjectTasks ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `tasks/${id}`,
			});

			toast.warning("Project Tasks Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Tasks try again");
			console.log(error.message);
		}
	}
);

// tasks_DETAILS
export const loadSingleProjectTasks = createAsyncThunk(
	"tasks/loadSingleProjectTasks",
	async (id) => {
		try {
			const data = await axios.get(`tasks/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// tasksS
export const loadAllProjectTasks = createAsyncThunk(
	"tasks/loadAllProjectTasks",
	async () => {
		try {
			const { data } = await axios.get(`tasks?status=true`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateProjectTasks = createAsyncThunk(
	"tasks/updateProjectTasks",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `tasks/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Project Tasks Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Project Tasks try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);
export const updateProjectTaskStatus = createAsyncThunk(
	"tasks/updateProjectTaskStatus",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `tasks/${id}?query=taskStatus`,
				data: {
					...values,
				},
			});
			toast.success("Tasks Status Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Tasks Status try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const projectTasksSlice = createSlice({
	name: "projectTasks",
	initialState,
	reducers: {
		clearProjectTasks: (state) => {
			state.projectTasks = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllProjectTasks ======

		builder.addCase(loadAllProjectTasks.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllProjectTasks.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllProjectTasks.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleProjectTasks  ======

		builder.addCase(addSingleProjectTasks.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleProjectTasks.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleProjectTasks.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleProjectTasks ======

		builder.addCase(loadSingleProjectTasks.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleProjectTasks.fulfilled, (state, action) => {
			state.loading = false;
			state.projectTasks = action.payload.data;
		});

		builder.addCase(loadSingleProjectTasks.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for tasks ======

		builder.addCase(updateProjectTasks.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateProjectTasks.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateProjectTasks.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		builder.addCase(updateProjectTaskStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateProjectTaskStatus.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateProjectTaskStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteProjectTasks  ======

		builder.addCase(deleteProjectTasks.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteProjectTasks.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteProjectTasks.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default projectTasksSlice.reducer;
export const { clearProjectTasks } = projectTasksSlice.actions;
