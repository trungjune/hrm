import React from "react";
import tw from "tailwind-styled-components";
import TimeLineSvg from "./TimeLineSvg";
import dayjs from "dayjs";

import BtnDeleteSvg from "./Button/btnDeleteSvg";

import EducaitonEditSinglePopup from "./PopUp/EducaitonEditSinglePopup";
import { deleteEducation } from "../education/educationApis";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadSingleStaff } from "../../redux/rtk/features/user/userSlice";

const EmployeeTimeline = ({ list, edit, setLoading }) => {
	//call deleteEducation api here and set response to dItem state
	const user_id = useParams("id");
	const dispatch = useDispatch();

	const deletedEducation = async (id) => {
		setLoading(true);
		const { data } = await deleteEducation(id);

		// check if data is deleted or not and call the setPopUp function
		if (data) {
			dispatch(loadSingleStaff(user_id.id));
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
								<li key={item.id}>
									<div class='md:flex flex-start'>
										<TimeLineSvg />
										<div class='block p-6  max-w-md ml-6 mb-5 '>
											<div class='flex justify-between mb-4'>
												<Heading>{item?.degree || "No Degree"}</Heading>

												<Heading>
													{dayjs(item?.startDate).format("YYYY")} -{" "}
													{item?.endDate
														? dayjs(item?.endDate).format("YYYY")
														: "Present"}
												</Heading>
												{edit && (
													<div>
														<EducaitonEditSinglePopup
															data={item}
															setLoading={setLoading}
														/>
														<button onClick={() => deletedEducation(item.id)}>
															{" "}
															<BtnDeleteSvg size={20} />
														</button>
													</div>
												)}
											</div>

											<Heading1>
												Field of Study :{" "}
												<Heading2>{item?.fieldOfStudy}</Heading2>
											</Heading1>

											<Heading1>
												Institute : <Heading2>{item?.institution}</Heading2>
											</Heading1>

											<Heading1>
												Result : <Heading2>{item?.result}</Heading2>
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
export default EmployeeTimeline;
