import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	list: [],
	ProjectTeam: null,
	error: "",
	loading: false,
};

// ADD_projectTeam
export const addSingleProjectTeam = createAsyncThunk(
	"projectTeam/addSingleProjectTeam",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `project-team/`,
				data: {
					...values,
				},
			});
			toast.success("Project Team Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Project Team try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_projectTeam
export const deleteProjectTeam = createAsyncThunk(
	"projectTeam/deleteProjectTeam ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `project-team/${id}`,
			});

			toast.success("Project Team Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Project Team try again");
			console.log(error.message);
		}
	}
);

// projectTeam_DETAILS
export const loadSingleProjectTeam = createAsyncThunk(
	"projectTeam/loadSingleProjectTeam",
	async (id) => {
		try {
			const data = await axios.get(`project-team/${id}?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// projectTeam_status
export const updateProjectTeamStatus = createAsyncThunk(
	"projectTeam/updateProjectTeamStatus",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `project-team/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Project Team Status Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Project Team Status try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// projectTeamS
export const loadAllProjectTeam = createAsyncThunk(
	"projectTeam/loadAllProjectTeam",
	async () => {
		try {
			const { data } = await axios.get(`project-team?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// load all projectTeamS by project id
export const loadAllProjectTeamByProjectId = createAsyncThunk(
	"projectTeam/loadAllProjectTeamByProjectId",
	async (id) => {
		try {
			const { data } = await axios.get(`project-team/${id}/project`);
			return data;
		} catch (error) {
			console.log(error.message);

			return {
				message: "error",
			};
		}
	}
);

export const updateProjectTeam = createAsyncThunk(
	"projectTeam/updateProjectTeam",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `project-team/${id}?query=all`,
				data: {
					...values,
				},
			});
			toast.success("Added Member to the Team");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating Project Team try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const ProjectTeamSlice = createSlice({
	name: "ProjectTeam",
	initialState,
	reducers: {
		clearProjectTeam: (state) => {
			state.ProjectTeam = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllProjectTeam ======

		builder.addCase(loadAllProjectTeam.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllProjectTeam.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllProjectTeam.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllProjectTeamByProjectId ======

		builder.addCase(loadAllProjectTeamByProjectId.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(
			loadAllProjectTeamByProjectId.fulfilled,
			(state, action) => {
				state.loading = false;
				state.list = action.payload;
			}
		);

		builder.addCase(loadAllProjectTeamByProjectId.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleProjectTeam  ======

		builder.addCase(addSingleProjectTeam.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleProjectTeam.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleProjectTeam.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleProjectTeam ======

		builder.addCase(loadSingleProjectTeam.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleProjectTeam.fulfilled, (state, action) => {
			state.loading = false;
			state.ProjectTeam = action.payload.data;
		});

		builder.addCase(loadSingleProjectTeam.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for projectTeam ======

		builder.addCase(updateProjectTeam.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateProjectTeam.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateProjectTeam.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for updateProjectTeamStatus  ======

		builder.addCase(updateProjectTeamStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateProjectTeamStatus.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateProjectTeamStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteProjectTeam  ======

		builder.addCase(deleteProjectTeam.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteProjectTeam.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteProjectTeam.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default ProjectTeamSlice.reducer;
export const { clearProjectTeam } = ProjectTeamSlice.actions;
