import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Table,
	Typography,
} from "antd";

import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { useDispatch, useSelector } from "react-redux";
import {
	addSinglePublicHoliday,
	loadAllPublicHoliday,
} from "../../redux/rtk/features/publicHoliday/publicHolidaySlice";
import dayjs from "dayjs";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

function CustomTable({ list, loading }) {
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
			title: "Name",
			dataIndex: "name",
			key: "name",
		},

		{
			id: 3,
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => dayjs(date).format("DD/MM/YYYY"),
		},

		{
			id: 3,
			title: "Created At",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY"),
		},
		{
			id: 4,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<UserPrivateComponent permission={"readSingle-publicHoliday"}>
					<ViewBtn path={`/admin/holiday/public/${id}/`} />
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
		<Card>
			<div className='text-center my-2 flex justify-between'>
				<h5 className='department-list-title text-color-2 text-xl mb-2'>
					Public Holiday List
				</h5>
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='public-holiday'>
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
				scroll={{ x: true }}
				loading={!list || loading}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</Card>
	);
}

const AddPublicHoliday = ({ drawer }) => {
	const { list, loading } = useSelector((state) => state.publicHoliday);
	const [loader, setLoader] = useState(false);
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllPublicHoliday());
	}, []);

	const { Title } = Typography;

	const onFinish = async (values) => {
		setLoader(true);
		const resp = await dispatch(addSinglePublicHoliday(values));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllPublicHoliday());
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding department");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			<UserPrivateComponent permission={"create-publicHoliday"}>
				<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={drawer ? 22 : 12}
						xl={drawer ? 22 : 12}
						className='column-design border rounded card-custom'>
						<Title level={4} className='m-2 mt-5 mb-5 text-center'>
							Add Public Holiday
						</Title>
						<Form
							style={{ marginBottom: "40px" }}
							form={form}
							eventKey='department-form'
							name='basic'
							labelCol={{
								span: 6,
							}}
							wrapperCol={{
								span: 12,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<div>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Name'
									name='name'
									rules={[
										{
											required: true,
											message: "Please input name!",
										},
									]}>
									<Input placeholder='New Year' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "20px" }}
									label='Date'
									name='date'
									rules={[
										{
											required: true,
											message: "Please input date!",
										},
									]}>
									<DatePicker placeholder='Select Date' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									wrapperCol={{
										offset: 6,
										span: 12,
									}}>
									<Button
										onClick={() => setLoader(true)}
										type='primary'
										size='large'
										htmlType='submit'
										block
										loading={loader}>
										Add Public Holiday
									</Button>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
			</UserPrivateComponent>
			<hr />
			<UserPrivateComponent permission={"readAll-publicHoliday"}>
				{drawer || <CustomTable list={list} loading={loading} />}
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddPublicHoliday;
