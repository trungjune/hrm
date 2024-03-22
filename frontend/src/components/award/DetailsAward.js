import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { CSVLink } from "react-csv";
import ViewBtn from "../Buttons/ViewBtn";
import dayjs from "dayjs";
import {
	deleteAward,
	loadSingleAward,
} from "../../redux/rtk/features/award/awardSlice";
import AwardEditPopup from "../UI/PopUp/AwardEditPopup";
import BtnLoader from "../loader/BtnLoader";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

//PopUp

const CustomTable = ({ list }) => {
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
			key: "user",
			dataIndex: "user",
			render: (user) => user?.firstName + " " + user?.lastName,
		},

		{
			id: 6,
			title: "Awarded Date",
			dataIndex: "awardedDate",
			key: "awardedDate",
			render: (awardedDate) => dayjs(awardedDate).format("DD/MM/YYYY"),
		},

		{
			id: 5,
			title: "Comment",
			dataIndex: "comment",
			key: "comment",
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

const DetailAward = () => {
	const { id } = useParams();
	let navigate = useNavigate();
	const { award, loading } = useSelector((state) => state.award);

	//dispatch
	const dispatch = useDispatch();

	//Delete Supplier
	const onDelete = async () => {
		try {
			const resp = await dispatch(deleteAward(id));
			if (resp.payload.message === "success") {
				return navigate(-1);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		dispatch(loadSingleAward(id));
	}, []);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back  ' />

			<UserPrivateComponent permission={"readSingle-award"}>
				<Card className='mr-top mt-5'>
					{award ? (
						<Fragment key={award.id}>
							<div>
								<div className='flex justify-between '>
									<h3 className={"text-xl"}>
										ID : {award.id} | {award.name}
									</h3>
									<div className='flex justify-end'>
										<AwardEditPopup data={award} />
										{!loading ? (
											<button className='ml-4 mr-2' onClick={onDelete}>
												<BtnDeleteSvg size={30} />
											</button>
										) : (
											<BtnLoader />
										)}
									</div>
								</div>
								<CustomTable list={award?.awardHistory} />
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

export default DetailAward;
