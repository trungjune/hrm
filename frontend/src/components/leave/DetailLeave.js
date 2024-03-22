import { Card } from "antd";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	clearLeaveApplication,
	loadSingelLeaveApplication,
} from "../../redux/rtk/features/leave/leaveSlice";
import tw from "tailwind-styled-components";
import { useParams } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import dayjs from "dayjs";
import ReviewLeavePopup from "../UI/PopUp/ReviewLeavePopup";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const DetailLeave = () => {
	const { id } = useParams("id");
	const leave = useSelector((state) => state.leave.leave);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadSingelLeaveApplication(id));

		return () => {
			dispatch(clearLeaveApplication());
		};
	}, []);

	return (
		<div>
			<PageTitle title='Back' />
			<UserPrivateComponent permission={"readSingle-leaveApplication"}>
				<Card className='mt-4'>
					<div className='text-center mb-4'>
						{" "}
						<h2 className='text-2xl font-semibold text-gray-600'>
							Leave Application #{leave?.id}{" "}
						</h2>
					</div>
					{leave ? (
						<div className='flex justify-center '>
							<ul className='list-inside list-none border-2 border-inherit rounded px-5 py-5 '>
								<ListItem>
									Name :{" "}
									<TextInside>
										{(
											leave?.user.firstName +
											" " +
											leave?.user.lastName
										).toUpperCase()}{" "}
									</TextInside>
								</ListItem>
								<ListItem>
									Leave Type : <TextInside>{leave.leaveType}</TextInside>
								</ListItem>
								<ListItem>
									Leave From :{" "}
									<TextInside>
										{dayjs(leave.leaveFrom).format("DD-MM-YYYY")}
									</TextInside>
								</ListItem>

								<ListItem>
									Leave To :{" "}
									<TextInside>
										{dayjs(leave.leaveTo).format("DD-MM-YYYY")}
									</TextInside>
								</ListItem>

								<ListItem>
									Leave Duration :{" "}
									<TextInside className='text-red-500'>
										{leave.leaveDuration}
									</TextInside>
								</ListItem>

								<ListItem>
									Leave Reason :{" "}
									<TextInside>{leave.reason || "No reason"}</TextInside>
								</ListItem>

								<ListItem>
									Leave Status :{" "}
									<TextInside>
										{leave.status === "pending" ? (
											<span className='text-yellow-500'>
												{leave.status.toUpperCase()}
											</span>
										) : leave.status === "accepted" ? (
											<span className='text-green-500'>
												{leave.status.toUpperCase()}
											</span>
										) : (
											<span className='text-red-500'>
												{leave.status.toUpperCase()}
											</span>
										)}
									</TextInside>
								</ListItem>

								<ListItem>
									Leave Acceted From :{" "}
									<TextInside>
										{leave.acceptLeaveFrom
											? dayjs(leave.acceptLeaveFrom).format("DD-MM-YYYY")
											: "ON REVIEW"}
									</TextInside>
								</ListItem>

								<ListItem>
									Leave Acceted To :{" "}
									<TextInside>
										{leave.acceptLeaveTo
											? dayjs(leave.acceptLeaveTo).format("DD-MM-YYY")
											: "ON REVIEW"}
									</TextInside>
								</ListItem>

								<ListItem>
									Leave Acceted By :{" "}
									<TextInside className='text-green-500'>
										{(leave.acceptLeaveBy?.firstName || "ON") +
											" " +
											(leave.acceptLeaveBy?.lastName || "REVIEW")}
									</TextInside>
								</ListItem>

								<ListItem>
									Review Comment :{" "}
									<TextInside>{leave.reviewComment || "No comment"}</TextInside>
								</ListItem>

								<ListItem>
									Attachment :{" "}
									<TextInside>
										{leave.attachment ? (
											<a
												href={leave.attachment}
												target='_blank'
												rel='noreferrer'
												className='text-blue-500'>
												Download
											</a>
										) : (
											"No Attachment"
										)}
									</TextInside>
								</ListItem>
							</ul>
						</div>
					) : (
						<Loader />
					)}
					<UserPrivateComponent permission={"update-leaveApplication"}>
						{leave?.status === "PENDING" && (
							<div className='flex justify-center items-center'>
								<ReviewLeavePopup />
							</div>
						)}
						{leave?.status === "REJECTED" && (
							<div className='flex justify-center items-center'>
								<ReviewLeavePopup />
							</div>
						)}
					</UserPrivateComponent>
				</Card>
			</UserPrivateComponent>
		</div>
	);

	// "reviewComment": null,
	// "attachment": null,
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
export default DetailLeave;
