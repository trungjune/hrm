import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	employmentStatus: null,
	error: "",
	loading: false,
};

// ADD_shift
export const addEmploymentStatus = createAsyncThunk(
	"shift/addEmploymentStatus",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `employment-status/`,
				data: {
					...values,
				},
			});
			toast.success("Employment Status Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Employment Status try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_shift
export const deleteEmploymentStatus = createAsyncThunk(
	"shift/deleteEmploymentStatus",
	async (id) => {
		try {
			const resp = await axios({
				method: "put",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `employment-status/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("shift Deleted");
			return resp.data.id;
		} catch (error) {
			toast.error("Error in deleting shift try again");
			console.log(error.message);
		}
	}
);

// shift_DETAILS
export const loadSingelEmploymentStatus = createAsyncThunk(
	"shift/loadSingelEmploymentStatus",
	async (id) => {
		try {
			const data = await axios.get(`employment-status/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// shiftS
export const loadAllEmploymentStatus = createAsyncThunk(
	"shift/loadAllEmploymentStatus",
	async () => {
		try {
			const { data } = await axios.get(`employment-status?status=true`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// export const loadAllEmploymentStatusByEmployee = createAsyncThunk(
// 	"shift/loadAllEmploymentStatus",
// 	async () => {
// 		try {
// 			const { data } = await axios.get(`shift/employee`);
// 			return data;
// 		} catch (error) {
// 			console.log(error.message);
// 		}
// 	}
// );

// UPDATE_shift

export const updateEmploymentStatus = createAsyncThunk(
	"shift/updateEmploymentStatus",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `employment-status/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Shift Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating shift try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const employmentStatusSlice = createSlice({
	name: "employmentStatus",
	initialState,
	reducers: {
		clearEmploymentStatus: (state) => {
			state.employmentStatus = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllEmploymentStatus ======

		builder.addCase(loadAllEmploymentStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllEmploymentStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllEmploymentStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 1) ====== builders for loadAllEmploymentStatusByEmployee ======

		// builder.addCase(loadAllEmploymentStatusByEmployee.pending, (state) => {
		// 	state.loading = true;
		// });

		// builder.addCase(loadAllEmploymentStatusByEmployee.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.employee = action.payload;
		// });

		// builder.addCase(loadAllEmploymentStatusByEmployee.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.error = action.payload.message;
		// });

		// 2) ====== builders for addEmploymentStatus ======

		builder.addCase(addEmploymentStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addEmploymentStatus.fulfilled, (state, action) => {
			state.loading = false;

			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			state.list = list;
		});

		builder.addCase(addEmploymentStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingelEmploymentStatus ======

		builder.addCase(loadSingelEmploymentStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingelEmploymentStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.employmentStatus = action.payload.data;
		});

		builder.addCase(loadSingelEmploymentStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for updateEmploymentStatus ======

		builder.addCase(updateEmploymentStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateEmploymentStatus.fulfilled, (state, action) => {
			state.loading = false;
			const list = [...state.list];
			const index = list.findIndex(
				(shift) => shift.id === parseInt(action.payload.data.id)
			);
			list[index] = action.payload.data;
			state.list = list;
		});

		builder.addCase(updateEmploymentStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteEmploymentStatus ======

		builder.addCase(deleteEmploymentStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteEmploymentStatus.fulfilled, (state, action) => {
			state.loading = false;
			const filterShift = state.list.filter(
				(shift) => shift.id !== parseInt(action.payload) && shift
			);
			state.list = filterShift;
		});

		builder.addCase(deleteEmploymentStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default employmentStatusSlice.reducer;
export const { clearEmploymentStatus } = employmentStatusSlice.actions;
