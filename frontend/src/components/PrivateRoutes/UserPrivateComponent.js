import React from "react";
import getPermissions from "../../utils/getPermissions";

const UserPrivateComponent = ({ permission, children }) => {
	const permissions = getPermissions();

	// console.log(permission, "permissions", permissions.includes(permission));

	if (permissions?.includes(permission)) {
		return <>{children}</>;
	} else {
		return "";
	}
};

export default UserPrivateComponent;
