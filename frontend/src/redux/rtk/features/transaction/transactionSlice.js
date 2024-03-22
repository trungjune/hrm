import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	list: [],
	transaction: null,
	total: null,
	error: "",
	loading: false,
};

// ADD_TRANSACTION
export const addTransaction = createAsyncThunk(
	"transaction/addTransaction",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `transaction/`,
				data: {
					...values,
				},
			});

			return {
				data,
				message: "success",
			};
		} catch (error) {
			console.log(error.message);
		}
	}
);

// TRANSACTION_DETAILS
export const loadTransaction = createAsyncThunk(
	"transaction/deleteStaff",
	async (id) => {
		try {
			const data = await axios.get(`transaction/${id}`);
			//dispatching data
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// TRANSACTIONS
export const loadAllTransaction = createAsyncThunk(
	"transaction/loadSingleStaff",
	async ({ page, limit, startdate, enddate, status = true }) => {
		try {
			const { data } = await axios.get(
				`transaction?status=${status}&page=${page}&count=${limit}&startdate=${startdate}&enddate=${enddate}`
			);
			//dispatching data
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

const transactionSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearTransaction: (state) => {
			state.transaction = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllTransaction ======

		builder.addCase(loadAllTransaction.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTransaction.fulfilled, (state, action) => {
			state.loading = false;

			state.list = action.payload.allTransaction;
			state.total = action.payload.aggregations;
		});

		builder.addCase(loadAllTransaction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addTransaction ======

		builder.addCase(addTransaction.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addTransaction.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addTransaction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadTransaction ======

		builder.addCase(loadTransaction.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadTransaction.fulfilled, (state, action) => {
			state.loading = false;
			state.transaction = action.payload.data;
		});

		builder.addCase(loadTransaction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTransaction ======

		// builder.addCase(deleteTransaction.pending, (state) => {
		//   state.loading = true;
		// });

		// builder.addCase(deleteTransaction.fulfilled, (state, action) => {
		//   state.loading = false;
		//   state.user = action.payload.data;

		//   const filtertransaction = state.list.filter(
		//     (sup) => sup.id !== parseInt(action.payload) && sup
		//   );

		//   state.list = filtertransaction
		// });

		// builder.addCase(deleteTransaction.rejected, (state, action) => {
		//   state.loading = false;
		//   state.error = action.payload.message;
		// });
	},
});

export default transactionSlice.reducer;
export const { clearTransaction } = transactionSlice.actions;
