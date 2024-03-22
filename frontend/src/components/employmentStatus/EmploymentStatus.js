import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";

import AddEmploymentStatus from "./AddEmploymentStatus";

const EmploymentStatus = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />
			<AddEmploymentStatus />
		</div>
	);
};

export default EmploymentStatus;
