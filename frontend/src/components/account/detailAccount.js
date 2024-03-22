import { Card } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	clearAccount,
	loadSingleAccount,
} from "../../redux/rtk/features/account/accountSlice";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import UpdateAccount from "./updateAccount";
import "./account.css";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const DetailAccount = () => {
	// const [data, setData] = useState(null);
	const data = useSelector((state) => state.accounts.account);
	const { id } = useParams("id");
	const dispatch = useDispatch();
	//make a use effect to get the data from the getTrailBalance function
	useEffect(() => {
		// getSubAccount(id).then((data) => {
		// 	setData(data);
		// });
		dispatch(loadSingleAccount(id));
		return () => {
			dispatch(clearAccount());
		};
	}, []);

	return (
		<>
			<PageTitle title={"Back"} />
			<br />
			<UserPrivateComponent permission={"readSingle-account"}>
				<Card>
					{data ? (
						<div className=''>
							<div className='flex justify-between mb-4'>
								<h5 className='text-xl'>
									<i className='bi bi-card-list'>
										<span className=' ml-2'> Account Details: {data.name}</span>{" "}
									</i>
								</h5>
								<UserPrivateComponent permission={"update-account"}>
									<UpdateAccount account={data?.name} id={id} />
								</UserPrivateComponent>
							</div>
							<div className='flex justify-center'>
								<table className='w-full max-w-full mb-4 bg-transparent detail-account-table'>
									<thead className='text-gray-400 text-xs font-semibold border-gray tracking-wider text-left px-5 py-3 hover:cursor-pointer uppercase border-b-2 border-gray-200'>
										<tr className='border-b border-gray'>
											<th
												scope='col'
												className='text-white border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'>
												Debit
											</th>
											<th
												scope='col'
												className='text-white border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'>
												Credit
											</th>
											<th
												scope='col'
												className='text-white border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'>
												Perticulars
											</th>
											<th
												scope='col'
												className='text-white border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'>
												Date
											</th>
										</tr>
									</thead>
									<tbody>
										{data &&
											data?.debit?.map((item, index) => {
												return (
													<tr className='hover:bg-gray-100 hover:cursor-pointer'>
														<td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
															{item.amount}
														</td>
														<td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'></td>
														<td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
															{item.particulars}
														</td>
														<td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
															{dayjs(item.date).format("YYYY-MM-DD")}
														</td>
													</tr>
												);
											})}
										{data &&
											data?.credit?.map((item, index) => {
												return (
													<tr className='hover:bg-gray-100 hover:cursor-pointer'>
														<td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'></td>
														<td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
															{item.amount}
														</td>
														<td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
															{item.particulars}
														</td>
														<td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
															{dayjs(item.date).format("YYYY-MM-DD")}
														</td>
													</tr>
												);
											})}

										{data && (
											<tr className=' text-center hover:bg-gray-100 hover:cursor-pointer'>
												<td
													colSpan='2'
													className=' table-active py-4 px-6 border-b border-gray-200 text-gray-900 text-base'>
													<strong>Balance</strong>
												</td>
												<td>
													<strong>{data?.balance}</strong>
												</td>
												<td></td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<Loader />
					)}
				</Card>
			</UserPrivateComponent>
		</>
	);
};

export default DetailAccount;
