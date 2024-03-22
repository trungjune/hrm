import PageTitle from "../page-header/PageHeader";

import { Navigate } from "react-router-dom";

import AddAccount from "./AddAccount";
import GetAllAccount from "./getAllAccount";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const Account = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title='Back' />
			<UserPrivateComponent permission='create-account'>
				<AddAccount />
			</UserPrivateComponent>

			<UserPrivateComponent permission='readAll-account'>
				<GetAllAccount />
			</UserPrivateComponent>
		</div>
	);
};

export default Account;
