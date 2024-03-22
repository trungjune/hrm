import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import CustomTable from "./CustomTable";
import { loadSingleRole } from "./roleApis";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

//PopUp

const DetailRole = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const [role, setRole] = useState(null);
	//Delete Supplier
	const onDelete = () => {
		try {
			setVisible(false);
			toast.warning(`role Name : ${role.rolename} is removed `);
			return navigate("/admin/dashboard");
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
		loadSingleRole(id).then((d) => setRole(d.data));
	}, [id]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back  ' />

			<UserPrivateComponent permission={"readSingle-role"}>
				<div className='mr-top'>
					{role ? (
						<Fragment key={role.id}>
							<Card bordered={false}>
								<div className='flex justify-between mb-5'>
									<h5>
										<i className='bi bi-person-lines-fill'></i>
										<span className='mr-left'>
											ID : {role.id} | {role.name}
										</span>
									</h5>
									<div className='text-end'>
										<UserPrivateComponent permission={"update-role"}>
											<Link
												className='m-2'
												to={`/admin/role/permit/${role.id}`}
												state={{ data: role }}>
												<Button
													type='primary'
													shape='round'
													icon={<EditOutlined />}>
													{" "}
													New Permission{" "}
												</Button>
											</Link>
										</UserPrivateComponent>
										<UserPrivateComponent permission={"delete-role"}>
											<Popover
												className='m-2'
												content={
													<a onClick={onDelete}>
														<Button disabled={true} type='primary' danger>
															Yes Please !
														</Button>
													</a>
												}
												title='Are you sure you want to delete ?'
												trigger='click'
												visible={visible}
												onVisibleChange={handleVisibleChange}>
												<Button
													disabled={true}
													type='danger'
													shape='round'
													icon={<DeleteOutlined />}></Button>
											</Popover>
										</UserPrivateComponent>
									</div>
								</div>
								<CustomTable role={role?.rolePermission} />
							</Card>
						</Fragment>
					) : (
						<Loader />
					)}
				</div>
			</UserPrivateComponent>
		</div>
	);
};

export default DetailRole;
