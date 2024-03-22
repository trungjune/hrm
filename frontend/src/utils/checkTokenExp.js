import jwtDecode from "jwt-decode";

const checkTokenExp = (token, customer) => {
	//   console.log(token);
	try {
		if (jwtDecode(token).exp * 1000 < Date.now()) {
			if (customer) {
				return (window.location.href = "customer/logout");
			} else {
				return (window.location.href = "/admin/auth/logout");
			}
		} else {
		}
	} catch (error) {
		console.log("error");
	}
};

export default checkTokenExp;
