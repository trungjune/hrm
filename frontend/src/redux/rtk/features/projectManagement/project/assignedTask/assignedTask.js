import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	AssignedTask: null,
	error: "",
	loading: false,
};

// ADD_assignedTask
export const addSingleAssignedTask = createAsyncThunk(
	"assignedTask/addSingleAssignedTask",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `assigned-task/`,
				data: {
					...values,
				},
			});
			toast.success("AssignedTask Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding AssignedTask try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_assignedTask
export const deleteAssignedTask = createAsyncThunk(
	"assignedTask/deleteAssignedTask ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `assigned-task/${id}`,
			});

			toast.success("AssignedTask Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting assignedTask try again");
			console.log(error.message);
		}
	}
);

// assignedTask_DETAILS
export const loadSingleAssignedTask = createAsyncThunk(
	"assignedTask/loadSingleAssignedTask",
	async (id) => {
		try {
			const data = await axios.get(`assigned-task/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// assignedTaskS
export const loadAllAssignedTask = createAsyncThunk(
	"assignedTask/loadAllAssignedTask",
	async () => {
		try {
			const { data } = await axios.get(`assigned-task?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateAssignedTask = createAsyncThunk(
	"assignedTask/updateAssignedTask",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `assigned-task/${id}`,
				data: {
					...values,
				},
			});
			toast.success("AssignedTask Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating AssignedTask try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const AssignedTaskSlice = createSlice({
	name: "AssignedTask",
	initialState,
	reducers: {
		clearAssignedTask: (state) => {
			state.AssignedTask = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllAssignedTask ======

		builder.addCase(loadAllAssignedTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllAssignedTask.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllAssignedTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleAssignedTask  ======

		builder.addCase(addSingleAssignedTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleAssignedTask.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleAssignedTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleAssignedTask ======

		builder.addCase(loadSingleAssignedTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleAssignedTask.fulfilled, (state, action) => {
			state.loading = false;
			state.AssignedTask = action.payload.data;
		});

		builder.addCase(loadSingleAssignedTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for assignedTask ======

		builder.addCase(updateAssignedTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateAssignedTask.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateAssignedTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteAssignedTask  ======

		builder.addCase(deleteAssignedTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteAssignedTask.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteAssignedTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default AssignedTaskSlice.reducer;
export const { clearAssignedTask } = AssignedTaskSlice.actions;
