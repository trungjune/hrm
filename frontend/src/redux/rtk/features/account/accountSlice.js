import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	account: null,
	error: "",
	loading: false,
};

// ADD_ACCOUNT
export const addAccount = createAsyncThunk(
	"account/addAccount",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `account/`,
				data: {
					...values,
				},
			});
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding account");
			console.log(error.message);
		}
	}
);

// DELETE_ACCOUNT
export const deleteAccount = createAsyncThunk(
	"account/deleteAccount",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `account/${id}`,
			});
			//dispatching data
			return resp.data.id;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// ACCOUNT_DETAILS
export const loadSingleAccount = createAsyncThunk(
	"account/loadSingleAccount",
	async (id) => {
		try {
			const { data } = await axios({
				method: "get",
				url: `account/${id}`,
			});

			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// ACCOUNTS
export const loadAllAccount = createAsyncThunk(
	"account/loadAllAccount",
	async (id) => {
		try {
			const { data } = await axios.get(`account?query=sa`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		clearAccount: (state) => {
			state.account = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllAccount ======

		builder.addCase(loadAllAccount.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllAccount.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllAccount.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addAccount ======

		builder.addCase(addAccount.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addAccount.fulfilled, (state, action) => {
			state.loading = false;

			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			state.list = list;
		});

		builder.addCase(addAccount.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleAccount ======

		builder.addCase(loadSingleAccount.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleAccount.fulfilled, (state, action) => {
			state.loading = false;
			state.account = action.payload;
		});

		builder.addCase(loadSingleAccount.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteAccount ======

		builder.addCase(deleteAccount.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteAccount.fulfilled, (state, action) => {
			state.loading = false;

			const filterAccount = state.list.filter(
				(acc) => acc.id !== parseInt(action.payload) && acc
			);

			state.list = filterAccount;
		});

		builder.addCase(deleteAccount.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default accountSlice.reducer;
export const { clearAccount } = accountSlice.actions;
