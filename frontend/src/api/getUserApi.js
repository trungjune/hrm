import axios from "axios";

const getUserApi = async (id) => {
	const data = await axios.get(`user/${id}`);
	return data;
};

export default getUserApi;
