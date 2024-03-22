import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	shift: null,
	error: "",
	loading: false,
};

// ADD_shift
export const addAnnouncement = createAsyncThunk(
	"shift/addAnnouncement ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `announcement/`,
				data: {
					...values,
				},
			});
			toast.success("Announcement Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding announcement try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_shift
export const deleteAnnouncement = createAsyncThunk(
	"shift/deleteAnnouncement ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `announcement/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("Announcement Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting announcement try again");
			console.log(error.message);
		}
	}
);

// shift_DETAILS
export const loadSingleAnnouncement = createAsyncThunk(
	"shift/loadSingleAnnouncement",
	async (id) => {
		try {
			const data = await axios.get(`announcement/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// shiftS
export const loadAllAnnouncement = createAsyncThunk(
	"announcement/loadAllAnnouncement",
	async () => {
		try {
			const { data } = await axios.get(`announcement?status=true`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateAnnouncement = createAsyncThunk(
	"shift/updateAnnouncement",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `announcement/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Announcement Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating announcement try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const announcementSlice = createSlice({
	name: "announcement",
	initialState,
	reducers: {
		clearAnnouncement: (state) => {
			state.announcement = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllAnnouncement ======

		builder.addCase(loadAllAnnouncement.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllAnnouncement.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllAnnouncement.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addAnnouncement  ======

		builder.addCase(addAnnouncement.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addAnnouncement.fulfilled, (state, action) => {
			state.loading = false;

			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			state.list = list;
		});

		builder.addCase(addAnnouncement.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleAnnouncement ======

		builder.addCase(loadSingleAnnouncement.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleAnnouncement.fulfilled, (state, action) => {
			state.loading = false;
			state.announcement = action.payload.data;
		});

		builder.addCase(loadSingleAnnouncement.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for updateAnnouncement ======

		builder.addCase(updateAnnouncement.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateAnnouncement.fulfilled, (state, action) => {
			state.loading = false;
			const list = [...state.list];
			const index = list.findIndex(
				(shift) => shift.id === parseInt(action.payload.data.id)
			);
			list[index] = action.payload.data;
			state.list = list;
		});

		builder.addCase(updateAnnouncement.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteAnnouncement  ======

		builder.addCase(deleteAnnouncement.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteAnnouncement.fulfilled, (state, action) => {
			state.loading = false;
			const filterShift = state.list.filter(
				(shift) => shift.id !== parseInt(action.payload) && shift
			);
			state.list = filterShift;
		});

		builder.addCase(deleteAnnouncement.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default announcementSlice.reducer;
export const { clearAnnouncement } = announcementSlice.actions;
