import React, { useEffect, useState } from "react";
import { Button, Col, Row, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
// add redux/rtk/features/attendance/attendanceSlice
import {
	addClockIn,
	getCurrentUserClockInStatus,
} from "../../../redux/rtk/features/attendance/attendanceSlice";

// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import dayjs from "dayjs";
import getUserFromToken from "../../../utils/getUserFromToken";
// publicIp
const publicIp = require("react-public-ip");

const AttendancePopup = () => {
	const isLogged = localStorage.getItem("isLogged");

	const dispatch = useDispatch();
	const { TextArea } = Input;
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loader, setLoader] = useState(false);
	const [time, setTime] = useState();
	const [date, setDate] = useState();
	const [ipv4, setIpv4] = useState();
	const [checkInNote, setCheckInNote] = useState("");
	const [inOut, setInOut] = useState("In");
	const id = getUserFromToken();
	const [inTime, setInTime] = useState();

	const { clockIn, loading } = useSelector((state) => state.attendance);

	useEffect(() => {
		// call current user status
		dispatch(getCurrentUserClockInStatus(id));
	}, []);

	useEffect(() => {
		if (clockIn) {
			if (clockIn.outTime === null) {
				setInOut("Out");
				// get inTime
				const inTime = clockIn.inTime;
				// calculate the difference between inTime and now
				const diff = dayjs(new Date()).diff(dayjs(inTime));
				// convert to duration
				const diffDuration = dayjs.utc(diff).format("HH:mm");
				// set inTime
				setInTime(diffDuration);
			} else {
				setInOut("In");
			}
		}
	}, [clockIn]);

	const clockInClick = async () => {
		setLoader(true);
		// get the current public ip address
		const ipv4 = (await publicIp.v4()) || "";
		setIpv4(ipv4);
		setLoader(false);
		setIsModalVisible(true);
		setTime(dayjs(new Date()).format("hh:mm A"));
		setDate(dayjs(new Date()).format("DD-MM-YYYY"));
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setCheckInNote("");
	};

	const handleOk = async () => {
		// make json object
		const data = {
			// convert string to int
			userId: parseInt(id),
			comment: checkInNote,
			ip: ipv4,
		};
		// make a post request with redux/rtk
		try {
			const resp = await dispatch(addClockIn(data));
			if (resp.payload.data.outTime === null) {
				setInOut("Out");
			} else {
				setInOut("In");
			}
			setCheckInNote("");
		} catch (error) {
			console.log(error);
		}
		// close the modal
		setIsModalVisible(false);
	};

	return (
		<>
			{/* button for Clock IN */}
			{isLogged &&
				(inOut === "In" ? (
					<Button
						loading={loading || loader}
						type='primary'
						className='btn-clock-in'
						onClick={() => clockInClick()}>
						<span className='btn-clock-in-text'>Clock In</span>
					</Button>
				) : (
					<Button
						loading={loading || loader}
						type='danger'
						className='btn-clock-in'
						onClick={() => clockInClick()}>
						<span className='btn-clock-in-text'>Clock Out {inTime}</span>
					</Button>
				))}
			<Modal
				title={`Clock ${inOut}`}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Row gutter={[12, 0]}>
					<Col span={12}>
						<p className='text-base font-semibold text-color-2'>{`Clock ${inOut} date & time:`}</p>
						{/* show current time */}
						<h1>Today {date}</h1>
						{/* show current date */}
						<h1>Time {time}</h1>
					</Col>
					<Col
						span={24}
						className='font-semibold '
						style={{
							"background-color": "#AFFF9C",
							padding: "2%",
							marginTop: "5%",
						}}>
						<p className='font-semibold'>
							Your IP: <span style={{ color: "#595959" }}>{ipv4}</span>
						</p>
					</Col>
					{/* show a text area */}
					<Col
						span={24}
						style={{
							marginTop: "2%",
						}}>
						<p>{`Clock ${inOut} Note:`}</p>
						<TextArea
							onChange={(e) => setCheckInNote(e.target.value)}
							maxLength={28}
							rows={4}
						/>
					</Col>
				</Row>
			</Modal>
		</>
	);
};
export default AttendancePopup;
