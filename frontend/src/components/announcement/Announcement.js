import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddAnnouncement from "./AddAnnouncement";
import GetAllAnnouncement from "./GetAllAnnouncement";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const Announcement = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />
			<UserPrivateComponent permission='create-announcement'>
				<AddAnnouncement />
			</UserPrivateComponent>
			<UserPrivateComponent permission='readAll-announcement'>
				<GetAllAnnouncement />
			</UserPrivateComponent>
		</div>
	);
};

export default Announcement;
