import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";

import AddAward from "./AddAward";

const Award = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />

			<AddAward />
		</div>
	);
};

export default Award;
