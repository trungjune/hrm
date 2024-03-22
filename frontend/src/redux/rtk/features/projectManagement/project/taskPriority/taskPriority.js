import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	taskPriority: null,
	error: "",
	loading: false,
};

// ADD_taskPriority
export const addSingleTaskPriority = createAsyncThunk(
	"taskPriority/addSingleTaskPriority",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `task-priority/`,
				data: {
					...values,
				},
			});
			toast.success("Task Priority Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Task Priority try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_taskPriority
export const deleteTaskPriority = createAsyncThunk(
	"taskPriority/deleteTaskPriority ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-priority/${id}`,
			});

			toast.success("Task Priority Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Task Priority try again");
			console.log(error.message);
		}
	}
);

// taskPriority_DETAILS
export const loadSingleTaskPriority = createAsyncThunk(
	"taskPriority/loadSingleTaskPriority",
	async (id) => {
		try {
			const data = await axios.get(`task-priority/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// taskPriorityS
export const loadAllTaskPriority = createAsyncThunk(
	"taskPriority/loadAllTaskPriority",
	async () => {
		try {
			const { data } = await axios.get(`task-priority?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTaskPriority = createAsyncThunk(
	"taskPriority/updateTaskPriority",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `task-priority/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Task Priority Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Task Priority try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const taskPrioritySlice = createSlice({
	name: "taskPriority",
	initialState,
	reducers: {
		clearTaskPriority: (state) => {
			state.taskPriority = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllTaskPriority ======

		builder.addCase(loadAllTaskPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTaskPriority.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTaskPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleTaskPriority  ======

		builder.addCase(addSingleTaskPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleTaskPriority.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleTaskPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleTaskPriority ======

		builder.addCase(loadSingleTaskPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleTaskPriority.fulfilled, (state, action) => {
			state.loading = false;
			state.taskPriority = action.payload.data;
		});

		builder.addCase(loadSingleTaskPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for taskPriority ======

		builder.addCase(updateTaskPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateTaskPriority.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateTaskPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTaskPriority  ======

		builder.addCase(deleteTaskPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteTaskPriority.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteTaskPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default taskPrioritySlice.reducer;
export const { clearTaskPriority } = taskPrioritySlice.actions;
