import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";

import AddLeave from "./AddLeave";

const Leave = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />
			<AddLeave />
		</div>
	);
};

export default Leave;
