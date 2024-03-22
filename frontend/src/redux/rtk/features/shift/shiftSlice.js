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
export const addShift = createAsyncThunk("shift/addShift", async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `shift/`,
			data: {
				...values,
			},
		});
		toast.success("shift Added");
		return {
			data,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in adding shift try again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
});

// DELETE_shift
export const deleteShift = createAsyncThunk("shift/deleteShift", async (id) => {
	try {
		const resp = await axios({
			method: "delete",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `shift/${id}`,
		});

		toast.success("shift Deleted");
		return resp.data.id;
	} catch (error) {
		toast.error("Error in deleting shift try again");
		console.log(error.message);
	}
});

// shift_DETAILS
export const loadSingleShift = createAsyncThunk(
	"shift/loadSingleShift",
	async (id) => {
		try {
			const data = await axios.get(`shift/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// shiftS
export const loadAllShift = createAsyncThunk("shift/loadAllShift", async () => {
	try {
		const { data } = await axios.get(`shift?status=true`);
		return data;
	} catch (error) {
		console.log(error.message);
	}
});

// export const loadAllShiftByEmployee = createAsyncThunk(
// 	"shift/loadAllShift",
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

export const updateShift = createAsyncThunk(
	"shift/updateShift",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `shift/${id}`,
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

const shiftSlice = createSlice({
	name: "shift",
	initialState,
	reducers: {
		clearShift: (state) => {
			state.shift = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllShift ======

		builder.addCase(loadAllShift.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllShift.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllShift.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 1) ====== builders for loadAllShiftByEmployee ======

		// builder.addCase(loadAllShiftByEmployee.pending, (state) => {
		// 	state.loading = true;
		// });

		// builder.addCase(loadAllShiftByEmployee.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.employee = action.payload;
		// });

		// builder.addCase(loadAllShiftByEmployee.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.error = action.payload.message;
		// });

		// 2) ====== builders for addShift ======

		builder.addCase(addShift.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addShift.fulfilled, (state, action) => {
			state.loading = false;

			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			state.list = list;
		});

		builder.addCase(addShift.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleShift ======

		builder.addCase(loadSingleShift.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleShift.fulfilled, (state, action) => {
			state.loading = false;
			state.shift = action.payload.data;
		});

		builder.addCase(loadSingleShift.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for updateShift ======

		builder.addCase(updateShift.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateShift.fulfilled, (state, action) => {
			state.loading = false;
			const list = [...state.list];
			const index = list.findIndex(
				(shift) => shift.id === parseInt(action.payload.data.id)
			);
			list[index] = action.payload.data;
			state.list = list;
		});

		builder.addCase(updateShift.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteShift ======

		builder.addCase(deleteShift.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteShift.fulfilled, (state, action) => {
			state.loading = false;
			const filterShift = state.list.filter(
				(shift) => shift.id !== parseInt(action.payload) && shift
			);
			state.list = filterShift;
		});

		builder.addCase(deleteShift.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default shiftSlice.reducer;
export const { clearShift } = shiftSlice.actions;
