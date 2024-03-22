import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddUser from "./addUser";

const UserList = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />

			<h1 className='m-2 text-center text-2xl font-semibold mt-5 txt-color'>
				Add New Employee
			</h1>
			<AddUser />
		</div>
	);
};

export default UserList;
