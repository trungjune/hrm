import axios from "axios";
import { toast } from "react-toastify";

// Get Roles
export const getDepartments = async () => {
	const { data } = await axios.get(`department?query=all`);

	return data;
};

// Create Role

export const addDepartment = async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `department`,
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
		toast.error("Error in adding Department try again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
};

// Detail Role View

export const loadSingleDepartment = async (id) => {
	//dispatching with an call back function and returning that

	try {
		const { data } = await axios.get(`department/${id}`);
		return {
			data,
			message: "Success",
		};
		//dispatching data
	} catch (error) {
		console.log(error.message);
	}
};

// Update Department

export const updateDepartment = async (id, values) => {
	try {
		const { data } = await axios({
			method: "put",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `department/${id}`,
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
		toast.error("Error in updating Department try again");
		console.log(error.message);

		return {
			message: "error",
		};
	}
};

// Delete Department

export const deleteDepartment = async (id) => {
	try {
		const { data } = await axios({
			method: "patch",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `department/${id}`,
		});
		//dispatching data
		toast.success("Deleted successful");

		return {
			data,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in deleting Department try again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
};
