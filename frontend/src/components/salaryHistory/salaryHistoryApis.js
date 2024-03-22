import axios from "axios";
import { toast } from "react-toastify";

// Get Roles
export const getSalaryHistories = async () => {
	const { data } = await axios.get(`salaryHistory?status=true&page=1&count=20`);

	return data;
};

// Create Role

export const addSalaryHistory = async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `salaryHistory`,
			data: {
				...values,
			},
		});
		//dispatching data
		toast.success("Added successful");

		return {
			data,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in adding salary history again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
};

// Detail Role View

export const loadSingleSalaryHistory = async (id) => {
	//dispatching with an call back function and returning that

	try {
		const { data } = await axios.get(`salaryHistory/${id}`);
		return {
			data,
			message: "Success",
		};
		//dispatching data
	} catch (error) {
		console.log(error.message);
	}
};

// Update salaryHistory

export const updateSalaryHistory = async (id, values) => {
	try {
		const { data } = await axios({
			method: "put",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `salaryHistory/${id}`,
			data: {
				...values,
			},
		});
		//dispatching data
		toast.success("Updated successful");

		return {
			data,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in updating salary history again");
		console.log(error.message);

		return {
			message: "error",
		};
	}
};

// Delete salaryHistory

export const deleteSalaryHistory = async (id) => {
	try {
		const { data } = await axios({
			method: "delete",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `salaryHistory/${id}`,
		});
		//dispatching data
		toast.success("Deleted successful");

		return {
			data,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in deleting salary history again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
};
