import { Card } from "antd";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { loadSingelEmploymentStatus } from "../../redux/rtk/features/employemntStatus/employmentStatusSlice";

const DetailAnnouncement = () => {
	const { id } = useParams();

	//dispatch
	const dispatch = useDispatch();
	const employmentStatus = useSelector(
		(state) => state.employmentStatus.employmentStatus
	);
	//Delete Supplier

	useEffect(() => {
		dispatch(loadSingelEmploymentStatus(id));
	}, []);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back  ' />

			<Card className='mr-top mt-5'>
				{employmentStatus ? (
					<Fragment key={employmentStatus.id}>
						<div>
							<div className='flex justify-between '>
								<h3 className={"text-xl"}>
									ID : {employmentStatus.id} | {employmentStatus.name}
								</h3>
								<div className='flex justify-end'>
									<h2 className='mr-5'>Status</h2>
								</div>
							</div>
						</div>
					</Fragment>
				) : (
					<Loader />
				)}
			</Card>
		</div>
	);
};

export default DetailAnnouncement;
