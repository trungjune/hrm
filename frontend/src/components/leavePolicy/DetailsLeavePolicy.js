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

import AwardEditPopup from "../UI/PopUp/AwardEditPopup";
import BtnLoader from "../loader/BtnLoader";
import {
	clearLeavePolicy,
	deleteLeavePolicy,
	loadSingleLeavePolicy,
} from "../../redux/rtk/features/leavePolicy/leavePolicySlice";
import LeavePolicyEdit from "../UI/PopUp/LeavePolicyEditPopup";
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
			title: "Paid Leave",
			key: "paidLeaveCount",
			render: () => data?.paidLeaveCount,
		},

		{
			id: 6,
			title: "Unpaid Leave",
			key: "unpaidLeaveCount",
			render: () => data?.unpaidLeaveCount,
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

const DetailLeavePolicy = () => {
	const { id } = useParams();
	let navigate = useNavigate();
	const { leavePolicy, loading } = useSelector((state) => state.leavePolicy);

	//dispatch
	const dispatch = useDispatch();

	//Delete Supplier
	const onDelete = async () => {
		try {
			const resp = await dispatch(deleteLeavePolicy(id));
			if (resp.payload.message === "success") {
				return navigate(-1);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		dispatch(loadSingleLeavePolicy(id));

		return () => {
			dispatch(clearLeavePolicy());
		};
	}, []);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back  ' />

			<UserPrivateComponent permission={"readSingle-leavePolicy"}>
				<Card className='mr-top mt-5'>
					{leavePolicy ? (
						<Fragment key={leavePolicy.id}>
							<div>
								<div className='flex justify-between '>
									<h3 className={"text-xl"}>
										ID : {leavePolicy.id} | {leavePolicy.name}
									</h3>
									<div className='flex justify-end'>
										<UserPrivateComponent permission={"update-leavePolicy"}>
											<LeavePolicyEdit data={leavePolicy} />
										</UserPrivateComponent>
										<UserPrivateComponent permission={"delete-leavePolicy"}>
											{!loading ? (
												<button className='ml-4 mr-2' onClick={onDelete}>
													<BtnDeleteSvg size={30} />
												</button>
											) : (
												<BtnLoader />
											)}
										</UserPrivateComponent>
									</div>
								</div>
								<CustomTable list={leavePolicy.user} data={leavePolicy} />
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

export default DetailLeavePolicy;
