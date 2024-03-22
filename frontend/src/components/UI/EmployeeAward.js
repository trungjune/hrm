import React from "react";
import tw from "tailwind-styled-components";
import dayjs from "dayjs";
import { loadSingleStaff } from "../../redux/rtk/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BtnDeleteSvg from "./Button/btnDeleteSvg";
import SalaryTimelineSvg from "./SalaryTimelineSVG";
import { deleteAwardHistory } from "../../redux/rtk/features/awardHistory/awardHistorySlice";
import AwardEditSinglePopup from "./PopUp/AwardEditSinglePopup";
import AwardTimelineSvg from "./AwardTimelineSVG";

const EmployeeAward = ({ list, edit, setLoading }) => {
	const user_id = useParams("id").id;
	const dispatch = useDispatch();

	const deletedAwardHistory = async (id) => {
		setLoading(true);
		const resp = await dispatch(deleteAwardHistory(id));

		// check if data is deleted or not and call the setPopUp function
		if (resp.payload.message === "success") {
			dispatch(loadSingleStaff(user_id));
			setLoading(false);
		} else {
			setLoading(false);
		}
	};
	return (
		<div>
			<main class='container mx-auto w-full flex justify-center mt-5'>
				<ol class='border-l-2 border-slate-600'>
					{list &&
						list?.map((item) => {
							return (
								<li>
									<div class='md:flex flex-start'>
										<AwardTimelineSvg />
										<div class='block p-6  max-w-md ml-6 mb-5 '>
											<div class='flex justify-between mb-4'>
												<Heading>Award : {item?.award?.name}</Heading>

												<Heading>
													{dayjs(item?.awardedDate).format("YYYY")}
												</Heading>

												{edit && (
													<div>
														<AwardEditSinglePopup
															data={item}
															setLoading={setLoading}
														/>

														<button
															onClick={() => deletedAwardHistory(item.id)}>
															<BtnDeleteSvg size={20} />
														</button>
													</div>
												)}
											</div>

											<Heading1>
												Description :{" "}
												<Heading2>
													{item?.description || "No description"}
												</Heading2>
											</Heading1>
											<Heading1>
												Comment : <Heading2>{item?.comment}</Heading2>
											</Heading1>
											<Heading1 class=''>
												Awarded Date :
												<Heading2>
													{" "}
													{dayjs(item?.awardedDate).format("DD/MM/YYYY")}
												</Heading2>
											</Heading1>
										</div>
									</div>
								</li>
							);
						})}
				</ol>
			</main>
		</div>
	);
};

const Heading = tw.h3`
font-medium
text-base
mr-20
w-500
txt-color-2
		 `;

const Heading1 = tw.h3`
font-medium
text-sm
mr-20
w-500
txt-color-2
		 `;

const Heading2 = tw.span`
font-medium 
text-sm
txt-color-secondary`;

export default EmployeeAward;
