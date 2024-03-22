import { Card } from "antd";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";
import dayjs from "dayjs";
import BtnLoader from "../loader/BtnLoader";
import tw from "tailwind-styled-components";

import {
	clearPublicHoliday,
	deletePublicHoliday,
	loadSinglePublicHoliday,
} from "../../redux/rtk/features/publicHoliday/publicHolidaySlice";
import PublicHolidayEdit from "../UI/PopUp/PublicHolidayEditPopup";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const DetailPublicHoliday = () => {
	const { id } = useParams();
	let navigate = useNavigate();
	const { publicHoliday, loading } = useSelector(
		(state) => state.publicHoliday
	);

	//dispatch
	const dispatch = useDispatch();

	//Delete Supplier
	const onDelete = async () => {
		try {
			const resp = await dispatch(deletePublicHoliday(id));
			if (resp.payload.message === "success") {
				return navigate(-1);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		dispatch(loadSinglePublicHoliday(id));

		return () => {
			dispatch(clearPublicHoliday());
		};
	}, []);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back  ' />
			<UserPrivateComponent permission={"readSingle-publicHoliday"}>
				<Card className='mr-top mt-5'>
					{publicHoliday ? (
						<Fragment key={publicHoliday.id}>
							<div>
								<div className='flex justify-between '>
									<h3 className={"text-xl"}>
										ID : {publicHoliday.id} | {publicHoliday.name}
									</h3>
								</div>
								<div className='flex justify-center mt-5 mb-4 '>
									<Card
										style={{ width: 500 }}
										title='Details of Public Holiday'
										extra={
											<div className='flex justify-end '>
												<PublicHolidayEdit data={publicHoliday} />
												{!loading ? (
													<button className='ml-2' onClick={onDelete}>
														<BtnDeleteSvg size={20} />
													</button>
												) : (
													<BtnLoader />
												)}
											</div>
										}>
										<div className='flex justify-center'>
											<ul className='list-inside list-none '>
												<ListItem>
													Name :{" "}
													<TextInside>
														{(publicHoliday?.name).toUpperCase()}{" "}
													</TextInside>
												</ListItem>
												<ListItem>
													Date :{" "}
													<TextInside>
														{dayjs(publicHoliday?.date).format("DD/MM/YYYY")}
													</TextInside>
												</ListItem>

												<ListItem>
													Created At :{" "}
													<TextInside>
														{dayjs(publicHoliday?.createdAt).format(
															"DD/MM/YYYY"
														)}
													</TextInside>
												</ListItem>

												<ListItem>
													Updated At :{" "}
													<TextInside>
														{dayjs(publicHoliday?.updatedAt).format(
															"DD/MM/YYYY"
														)}
													</TextInside>
												</ListItem>
											</ul>
										</div>
									</Card>
								</div>
							</div>
						</Fragment>
					) : (
						<Loader />
					)}
				</Card>
			</UserPrivateComponent>
		</div>
	);
};

const ListItem = tw.li`
text-sm
text-gray-600
font-semibold
py-2
px-4
bg-gray-100
mb-1.5
rounded
w-96
flex
justify-start
`;

const TextInside = tw.p`
ml-2
text-sm
text-gray-900
`;

export default DetailPublicHoliday;
