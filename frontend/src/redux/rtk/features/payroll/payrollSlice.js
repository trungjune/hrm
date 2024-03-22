import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	payslip: null,
	error: "",
	loading: false,
};

// ADD_ payroll
export const addPayslip = createAsyncThunk(
	"payslip/addPayslip",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `payroll/`,
				data: values,
			});
			toast.success("Payroll Created Successfully");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding Payroll try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

//  Get Payslips monthwise and yearwise with status
//TODO: add filtering by status and month and year
export const loadAllPayslipForPayment = createAsyncThunk(
	"payslip/loadAllPayslipForPayment",
	async () => {
		try {
			const { data } = await axios.get(`payroll/all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// payroll/all?value=monthWise&paymentStatus=UNPAID&salaryMonth=3&salaryYear=2024

// get all payslips monthwise and yearwise
export const loadAllPayslipForPaymentMonthWise = createAsyncThunk(
	"payslip/loadAllPayslipForPaymentMonthWise",
	async ({ month, year, status }) => {
		try {
			const { data } = await axios.get(
				`payroll/all?value=monthWise&paymentStatus=${status}&salaryMonth=${month}&salaryYear=${year}`
			);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// // DELETE_payroll
// export const deletepayroll = createAsyncThunk(
//   "payroll/deletepayroll",
//   async (id) => {
//     try {
//       const resp = await axios({
//         method: "patch",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json;charset=UTF-8",
//         },
//         url: `payroll/${id}`,
//         data: {
//           status: false,
//         },
//       });

//       return resp.data.id;
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// );

// payroll_DETAILS
export const loadSinglePayslip = createAsyncThunk(
	"payslip/loadSinglePayslip",
	async (id) => {
		try {
			const data = await axios.get(`payroll/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// payrollS
export const loadAllPayslip = createAsyncThunk(
	"payslip/loadAllPayslip",
	async ({ month, year }) => {
		try {
			const { data } = await axios.get(
				`payroll?salaryMonth=${month}&salaryYear=${year}`
			);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

const payrollSlice = createSlice({
	name: "payroll",
	initialState,
	reducers: {
		clearPayroll: (state) => {
			state.payslip = null;
		},
		updatePayslip: (state, { payload: { id, value, key } }) => {
			const item = state.list.find((i) => {
				return i.id === id;
			});
			if (typeof item === "object") {
				item[key] = value;
				item.totalPayable =
					item.salaryPayable + item.bonus - (item.deduction || 0);
			}
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllPayslip ======

		builder.addCase(loadAllPayslip.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllPayslip.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllPayslip.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addPayslip ======

		builder.addCase(addPayslip.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addPayslip.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addPayslip.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSinglePayslip ======

		builder.addCase(loadSinglePayslip.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSinglePayslip.fulfilled, (state, action) => {
			state.loading = false;
			state.payslip = action.payload.data;
		});

		builder.addCase(loadSinglePayslip.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for loadAllPayslipForPayment ======

		builder.addCase(loadAllPayslipForPayment.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllPayslipForPayment.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllPayslipForPayment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 5) ====== builders for loadAllPayslipForPaymentMonthWise ======

		builder.addCase(loadAllPayslipForPaymentMonthWise.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(
			loadAllPayslipForPaymentMonthWise.fulfilled,
			(state, action) => {
				state.loading = false;
				state.list = action.payload;
			}
		);

		builder.addCase(
			loadAllPayslipForPaymentMonthWise.rejected,
			(state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			}
		);
	},
});

export default payrollSlice.reducer;
export const { clearPayroll, updatePayslip } = payrollSlice.actions;
