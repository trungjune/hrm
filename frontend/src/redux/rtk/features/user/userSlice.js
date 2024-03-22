import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	user: null,
	error: "",
	loading: false,
};

export const addStaff = createAsyncThunk("user/addStaff", async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `user/register`,
			data: {
				...values,
			},
		});
		toast.success("Registration successful");
		return {
			data,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in adding staff try again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
});

export const deleteStaff = createAsyncThunk("user/deleteStaff", async (id) => {
	try {
		const resp = await axios({
			method: "patch",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `user/${id}`,
			data: {
				status: false,
			},
		});
		return resp.data;
	} catch (error) {
		console.log(error.message);
	}
});

export const loadSingleStaff = createAsyncThunk(
	"user/loadSingleStaff",
	async (id) => {
		try {
			const data = await axios.get(`user/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const loadAllStaff = createAsyncThunk(
	"user/loadAllStaff",
	async ({ status }) => {
		try {
			const { data } = await axios.get(`user?status=${status}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const addUser = createAsyncThunk("user/addUser", async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `user/login`,
			data: {
				...values,
			},
		});
		localStorage.setItem("access-token", data.token);
		localStorage.setItem("role", data.role);
		localStorage.setItem("user", data.userName);
		localStorage.setItem("id", data.id);
		localStorage.setItem("isLogged", true);
		toast.success(" Login Successfully Done");

		return {
			data,
			message: "success",
		};
	} catch (error) {
		console.log(error.message);
		toast.error("Incorrect Username or Password !");
		return {
			message: "error",
		};
	}
});

// Update User Information

export const updateUser = createAsyncThunk(
	"user/updateUser",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",
				url: `user/${id}`,
				data: {
					...values,
				},
			});
			toast.success("User Information Updated Successfully");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			console.log(error.message);
			toast.error("Error in updating user information");
			return {
				message: "error",
			};
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearUser: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllStaff ======

		builder.addCase(loadAllStaff.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllStaff.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllStaff.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addStaff ======

		builder.addCase(addStaff.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addStaff.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addStaff.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for addUser ======

		builder.addCase(addUser.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addUser.fulfilled, (state, action) => {
			state.loading = false;

			if (!Array.isArray(state.user)) {
				state.user = [];
			}
			const user = [...state.user];
			user.push(action.payload.data);
			state.user = user;
		});

		builder.addCase(addUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for updateUser ======

		builder.addCase(updateUser.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for loadSingleStaff ======

		builder.addCase(loadSingleStaff.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleStaff.fulfilled, (state, action) => {
			state.loading = false;

			state.user = action.payload.data;
		});

		builder.addCase(loadSingleStaff.rejected, (state, action) => {
			state.loading = false;
			console.log(action.payload);
			state.error = action.payload.message;
		});

		// 5) ====== builders for deleteStaff ======

		builder.addCase(deleteStaff.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteStaff.fulfilled, (state, action) => {
			state.loading = false;

			const filterUser = state.list.filter(
				(staff) => staff.id !== parseInt(action.payload) && staff
			);

			state.list = filterUser;
		});

		builder.addCase(deleteStaff.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
