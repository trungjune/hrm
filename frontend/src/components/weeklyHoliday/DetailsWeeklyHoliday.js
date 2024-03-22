import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { CSVLink } from "react-csv";
import ViewBtn from "../Buttons/ViewBtn";
import dayjs from "dayjs";
import BtnLoader from "../loader/BtnLoader";

import LeavePolicyEdit from "../UI/PopUp/LeavePolicyEditPopup";
import {
	clearWeeklyHoliday,
	deleteWeeklyHoliday,
	loadSingleWeeklyHoliday,
} from "../../redux/rtk/features/weeklyHoliday/weeklyHolidaySlice";
import WeeklyHolidayEdit from "../UI/PopUp/WeeklyHolidayEditPopup";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

//PopUp

const CustomTable = ({ list, data }) => {
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},

		{
			id: 2,
			title: " Name",
			key: "name",

			render: ({ firstName, lastName }) => firstName + " " + lastName,
		},

		{
			id: 6,
			title: "Start Day",
			key: "startDay",
			render: () => data?.startDay,
		},

		{
			id: 6,
			title: "End Day",
			key: "endDay",
			render: () => data?.endDay,
		},

		{
			id: 4,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<UserPrivateComponent permission={"readSingle-user"}>
					<ViewBtn path={`/admin/hr/staffs/${id}/`} />
				</UserPrivateComponent>
			),
		},
	];

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div>
			<div className='text-center my-2 flex justify-between'>
				<h5 className='award-list-title text-color-2 text-xl mb-2'>
					Employee List
				</h5>

				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink data={list} filename='user_award'>
								Download CSV
							</CSVLink>
						</CsvLinkBtn>
					</div>
				)}
			</div>
			{list && (
				<div style={{ marginBottom: "30px" }}>
					<ColVisibilityDropdown
						options={columns}
						columns={columns}
						columnsToShowHandler={columnsToShowHandler}
					/>
				</div>
			)}
			<Table
				loading={!list}
				columns={columnsToShow}
				dataSource={addKeys(list)}
				pagination={{ pageSize: 5 }}
				scroll={{ x: 720 }}
			/>
		</div>
	);
};

const DetailWeeklyHoliday = () => {
	const { id } = useParams();
	let navigate = useNavigate();
	const { weeklyHoliday, loading } = useSelector(
		(state) => state.weeklyHoliday
	);

	//dispatch
	const dispatch = useDispatch();

	//Delete Supplier
	const onDelete = async () => {
		try {
			const resp = await dispatch(deleteWeeklyHoliday(id));
			if (resp.payload.message === "success") {
				return navigate(-1);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		dispatch(loadSingleWeeklyHoliday(id));

		return () => {
			dispatch(clearWeeklyHoliday());
		};
	}, []);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back  ' />

			<UserPrivateComponent permission={"readSingle-weeklyHoliday"}>
				<Card className='mr-top mt-5'>
					{weeklyHoliday ? (
						<Fragment key={weeklyHoliday.id}>
							<div>
								<div className='flex justify-between '>
									<h3 className={"text-xl"}>
										ID : {weeklyHoliday.id} | {weeklyHoliday.name}
									</h3>
									<div className='flex justify-end '>
										<UserPrivateComponent permission={"update-weeklyHoliday"}>
											<WeeklyHolidayEdit data={weeklyHoliday} />
										</UserPrivateComponent>
										{!loading ? (
											<UserPrivateComponent permission={"delete-weeklyHoliday"}>
												<button className='ml-4' onClick={onDelete}>
													<BtnDeleteSvg size={30} />
												</button>
											</UserPrivateComponent>
										) : (
											<BtnLoader />
										)}
									</div>
								</div>
								<CustomTable list={weeklyHoliday.user} data={weeklyHoliday} />
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

export default DetailWeeklyHoliday;
