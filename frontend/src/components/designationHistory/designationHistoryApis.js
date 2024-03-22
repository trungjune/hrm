import axios from "axios";
import { toast } from "react-toastify";

// Get Roles
export const getDeshistories = async () => {
	const { data } = await axios.get(
		`designationHistory?status=true&page=1&count=20`
	);

	return data;
};

// Create Role

export const addDesHistory = async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `designationHistory`,
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
		toast.error("Error in adding designation History again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
};

// Detail Role View

export const loadSingleDesHistory = async (id) => {
	//dispatching with an call back function and returning that

	try {
		const { data } = await axios.get(`designationHistory/${id}`);
		return {
			data,
			message: "Success",
		};
		//dispatching data
	} catch (error) {
		console.log(error.message);
	}
};

// Update designationHistory

export const updateDesHistory = async (id, values) => {
	try {
		const { data } = await axios({
			method: "put",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `designationHistory/${id}`,
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
		toast.error("Error in updating designation History again");
		console.log(error.message);

		return {
			message: "error",
		};
	}
};

// Delete designationHistory

export const deleteDesHistory = async (id) => {
	try {
		const { data } = await axios({
			method: "delete",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `designationHistory/${id}`,
		});
		//dispatching data
		toast.success("Deleted successful");

		return {
			data,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in deleting designation History again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
};
