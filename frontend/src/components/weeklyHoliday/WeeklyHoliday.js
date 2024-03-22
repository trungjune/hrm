import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";

import AddWeeklyHoliday from "./AddWeeklyHoliday";

const WeeklyHoliday = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />
			<AddWeeklyHoliday />
		</div>
	);
};

export default WeeklyHoliday;
