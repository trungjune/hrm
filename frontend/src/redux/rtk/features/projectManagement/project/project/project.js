import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	project: null,
	error: "",
	loading: false,
};

// ADD_project
export const addSingleProject = createAsyncThunk(
	"project/addSingleProject",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `project/`,
				data: {
					...values,
				},
			});
			toast.success("Project Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Project try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_project
export const deleteProject = createAsyncThunk(
	"project/deleteProject ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `project/${id}`,
			});

			toast.success("Project Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting project try again");
			console.log(error.message);
		}
	}
);

// project_DETAILS
export const loadSingleProject = createAsyncThunk(
	"project/loadSingleProject",
	async (id) => {
		try {
			const data = await axios.get(`project/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// projectS
export const loadAllProject = createAsyncThunk(
	"project/loadAllProject",
	async () => {
		try {
			const { data } = await axios.get(`project?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// loadAllProjectByStatus
export const loadAllProjectByStatus = createAsyncThunk(
	"project/loadAllProjectByStatus",
	async (status) => {
		try {
			const { data } = await axios.get(`project?status=${status}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateProject = createAsyncThunk(
	"project/updateProject",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `project/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Project Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Project try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		clearProject: (state) => {
			state.project = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllProject ======

		builder.addCase(loadAllProject.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllProject.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllProject.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 1) ====== builders for loadAllProjectByStatus ======

		builder.addCase(loadAllProjectByStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllProjectByStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllProjectByStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
		
		// 2) ====== builders for addSingleProject  ======

		builder.addCase(addSingleProject.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleProject.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleProject.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleProject ======

		builder.addCase(loadSingleProject.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleProject.fulfilled, (state, action) => {
			state.loading = false;
			state.project = action.payload.data;
		});

		builder.addCase(loadSingleProject.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for project ======

		builder.addCase(updateProject.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateProject.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateProject.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteProject  ======

		builder.addCase(deleteProject.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteProject.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteProject.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default projectSlice.reducer;
export const { clearProject } = projectSlice.actions;
