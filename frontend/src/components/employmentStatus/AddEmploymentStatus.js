import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Row,
	Table,
	TimePicker,
	Typography,
} from "antd";

import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { useDispatch, useSelector } from "react-redux";
import {
	addEmploymentStatus,
	loadAllEmploymentStatus,
} from "../../redux/rtk/features/employemntStatus/employmentStatusSlice";

import { HexColorPicker } from "react-colorful";
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
			title: "Color Code",
			dataIndex: "colourValue",
			key: "colourValue",
			render: (colourValue) => (
				<div className='flex'>
					<div
						className='rounded border border-gray-200'
						style={{
							marginRight: "10px",
							width: "20px",
							height: "20px",
							backgroundColor: colourValue,
						}}></div>
					{colourValue}
				</div>
			),
		},

		{
			id: 4,
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			id: 5,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => <ViewBtn path={`/admin/employment-status/${id}/`} />,
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
					Shift List
				</h5>
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='shift'>
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
				loading={loading}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</Card>
	);
}

const AddEmploymentStatus = ({ drawer }) => {
	const [loader, setLoader] = useState(false);
	const { list, loading } = useSelector((state) => state.employmentStatus);
	const [color, setColor] = useState("#ffffff");
	const [showColorPicker, setShowColorPicker] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllEmploymentStatus());
	}, []);

	const { Title } = Typography;
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const FormData = {
			...values,
			colourValue: color,
		};

		setLoader(true);
		const resp = await dispatch(addEmploymentStatus(FormData));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllEmploymentStatus());
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding shift");
		setLoader(false);
	};
	return (
		<Fragment>
			<UserPrivateComponent permission={"create-employmentStatus"}>
				<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={drawer ? 22 : 16}
						xl={drawer ? 22 : 12}
						className='column-design border rounded card-custom'>
						<Title level={4} className='m-2 mt-5 mb-5 text-center'>
							Add Employment Status
						</Title>
						<Form
							form={form}
							style={{ marginBottom: "40px" }}
							eventKey='shift-form'
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
											message: "Please input your shift!",
										},
									]}>
									<Input placeholder='Parmanet' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Color Code'
									name='colourValue'>
									<Input
										placeholder='#00FF00'
										value={color}
										onChange={(e) => setColor(e.target.value)}
										onClick={() => setShowColorPicker(true)}
									/>
									{showColorPicker && (
										<div className='flex justify-between mt-3 mb-3'>
											<HexColorPicker
												onChange={(i) => setColor(i)}
												color={color}
											/>
											<Button
												type='danger'
												onClick={() => setShowColorPicker(false)}>
												Close
											</Button>
										</div>
									)}
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "20px" }}
									label='Description'
									name={"description"}>
									<Input.TextArea placeholder='Description' />
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
										block
										htmlType='submit'
										loading={loader}>
										Add Employment Status
									</Button>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
			</UserPrivateComponent>
			<hr />
			<UserPrivateComponent permission={"readAll-employmentStatus"}>
				{drawer || <CustomTable list={list} loading={loading} />}
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddEmploymentStatus;
