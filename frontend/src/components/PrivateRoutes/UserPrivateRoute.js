import { Navigate, Outlet } from "react-router-dom";
import getPermissions from "../../utils/getPermissions";
import Page404 from "../404/404Page";
import { toast } from "react-toastify";

const UserPrivateRoute = ({ path, permission, ...props }) => {
	const permissions = getPermissions();

	if (permissions?.includes(permission)) {
		return <Outlet />;
	} else {
		return <> {toast.error("You are not Authorized , Contact with Admin")}</>;
	}
};

export default UserPrivateRoute;
