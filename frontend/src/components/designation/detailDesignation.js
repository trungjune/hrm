import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	clearDesignation,
	deleteDesignation,
	loadAllDesignationByEmployee,
	loadSingleDesignation,
} from "../../redux/rtk/features/designation/designationSlice";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import UserListCard from "./List/UserListCard";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
//PopUp

const DetailDesignation = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const { designation, loading } = useSelector((state) => state.designations);

	//Delete Supplier
	const onDelete = () => {
		try {
			dispatch(deleteDesignation(id));

			setVisible(false);
			toast.warning(`Designation : ${designation.name} is removed `);
			return navigate("/admin/designation");
		} catch (error) {
			console.log(error.message);
		}
	};

	// Delete Supplier PopUp
	const [visible, setVisible] = useState(false);

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	useEffect(() => {
		dispatch(loadSingleDesignation(id));
		return () => {
			dispatch(clearDesignation());
		};
	}, []);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back ' subtitle=' ' />

			<div className='mr-top'>
				<UserPrivateComponent permission={"readSingle-designation"}>
					{designation ? (
						<Fragment key={designation.id}>
							<Card bordered={false} style={{}}>
								<div className='flex justify-between' style={{ padding: 0 }}>
									<div className='w-50'>
										<h5>
											<i className='bi bi-person-lines-fill'></i>
											<span className='mr-left text-xl'>
												ID : {designation.designationId} | {designation.name}
											</span>
										</h5>
									</div>
									<div className='text-end w-50'>
										<UserPrivateComponent permission={"update-designation"}>
											<Link
												className='mr-3 d-inline-block'
												to={`/admin/designation/${designation.designationId}/update`}
												state={{ data: designation }}>
												<Button
													type='primary'
													shape='round'
													icon={<EditOutlined />}></Button>
											</Link>
										</UserPrivateComponent>
										<UserPrivateComponent permission={"delete-designation"}>
											<Popover
												content={
													<a onClick={onDelete}>
														<Button type='primary' danger>
															Yes Please !
														</Button>
													</a>
												}
												title='Are you sure you want to delete ?'
												trigger='click'
												visible={visible}
												onVisibleChange={handleVisibleChange}>
												<Button
													type='danger'
													DetailDesignation
													shape='round'
													icon={<DeleteOutlined />}></Button>
											</Popover>
										</UserPrivateComponent>
									</div>
								</div>

								<UserListCard list={designation.employee} loading={loading} />
							</Card>
						</Fragment>
					) : (
						<Loader />
					)}
				</UserPrivateComponent>
			</div>
		</div>
	);
};

export default DetailDesignation;
