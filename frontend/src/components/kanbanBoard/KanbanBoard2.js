import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import TaskAddSinglePopup from "../UI/PopUp/ProjectManagemnet/TaskAddSinglePopup";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import Loader from "../loader/loader";

import {
	deleteProjectTasks,
	updateProjectTaskStatus,
} from "../../redux/rtk/features/projectManagement/project/projectTask/projectTask";
import taskStatus, {
	clearTaskStatusList,
	loadAllTaskStatusByProjectId,
} from "../../redux/rtk/features/projectManagement/project/taskStatus/taskStatus";
import { take } from "lodash";
import AddColumn from "./AddColumn";
import DeleteColumn from "./DeleteColumn";

const ShowAttTaskStatusBtn = ({ projectId }) => {
	return (
		<Link to={`/admin/project/${projectId}/task-status/`}>
			<Button className='mt-5 ml-2' type='primary' size='large'>
				Add Task Status Colum
			</Button>
		</Link>
	);
};

function KanbanBoard2() {
	const projectId = useParams("id").projectId;

	const [data, setData] = useState([]);
	// const [newColumnTitle, setNewColumnTitle] = useState("");
	const dispatch = useDispatch();
	const { list, loading } = useSelector((state) => state.taskStatus);
	const [btnLoading, setBtnLoading] = useState(false);
	const [btnId, setBtnId] = useState(null);

	useEffect(() => {
		dispatch(loadAllTaskStatusByProjectId(projectId));

		return () => {
			dispatch(clearTaskStatusList());
		};
	}, []);

	useEffect(() => {
		if (list) {
			setData(list);
		}
	}, [list]);

	const handleDragEnd = (result) => {
		console.log(result);
		const { destination, source, draggableId, type } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		if (type === "column") {
			console.log("column");
		} else {
			const sourceColumn = data.find(
				(column) => "column" + column.id === source.droppableId
			);
			const destinationColumn = data.find(
				(column) => "column" + column.id === destination.droppableId
			);

			if (sourceColumn === destinationColumn) {
				const newTask = Array.from(sourceColumn.task);
				sourceColumn.task.map((task) => {
					if ("task" + task.id === draggableId) {
						newTask.splice(source.index, 1);
						newTask.splice(destination.index, 0, task);
					}
				});
				const newColumn = {
					...sourceColumn,
					task: newTask,
				};
				const newColumns = data.map((column) => {
					if (column.id === newColumn.id) {
						return newColumn;
					}
					return column;
				});
				setData(newColumns);
			} else {
				const sourceTask = Array.from(sourceColumn.task);
				sourceTask.splice(source.index, 1);

				const newSourceColumn = {
					...sourceColumn,
					task: sourceTask,
				};

				const destinationTask = Array.from(destinationColumn.task);
				sourceColumn.task.map((task) => {
					if ("task" + task.id === draggableId) {
						destinationTask.splice(destination.index, 0, task);
					}
				});

				const newDestinationColumn = {
					...destinationColumn,
					task: destinationTask,
				};

				const newColumns = data.map((column) => {
					if (column.id === newSourceColumn.id) {
						return newSourceColumn;
					} else if (column.id === newDestinationColumn.id) {
						return newDestinationColumn;
					} else {
						return column;
					}
				});
				setData(newColumns);
			}

			const statusId = draggableId.split("task")[1];
			const taskStatusId = destination.droppableId.split("column")[1];
			// make json data
			const sendData = {
				taskStatusId: taskStatusId,
			};
			dispatch(updateProjectTaskStatus({ id: statusId, values: sendData }));
		}
	};
	const handleDeleteTask = async (taskId) => {
		setBtnLoading(true);
		setBtnId(taskId);

		const res = await dispatch(deleteProjectTasks(taskId));
		if (res.payload.message === "success") {
			dispatch(loadAllTaskStatusByProjectId(projectId));
			setBtnLoading(false);
			setBtnId(0);
		} else {
			setBtnLoading(false);
			setBtnId(0);
			console.log("Error in deleting task");
		}
	};

	return (
		<div style={{ height: "97%" }}>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-semibold antialiased txt-color-2'>
					PROJECT BOARD{" "}
				</h1>
				<AddColumn projectId={projectId} />
			</div>
			{list?.length > 0 ? (
				<div className='flex overflow-x-scroll' style={{ height: "100%" }}>
					<DragDropContext onDragEnd={handleDragEnd}>
						{data.map((column, columnIndex) => (
							<div
								key={column.id}
								className='p-4 '
								style={{ minWidth: "400px", height: "40vw" }}>
								<div
									className='new-card shadow-sm p-4 overflow-y-auto scrollbar-hide'
									style={{ height: "100%" }}>
									<h2 className='text-lg font-medium mb-4'>{column.title}</h2>
									<Droppable
										droppableId={"column" + column.id}
										key={"column" + column.id}>
										{(provided, snapshot) => (
											<ul
												ref={provided.innerRef}
												{...provided.droppableProps}
												className='space-y-2 '
												style={{ height: "100%" }}>
												<div className='flex justify-between items-center mb-4'>
													<h2 className='text-xl font-semibold txt-color-2 capitalize'>
														{column.name}
													</h2>
													<div className='flex justify-end'>
														<TaskAddSinglePopup
															className='bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600'
															// onClick={() => handleAddTask(column.id)}
															projectId={projectId}
															taskStatusId={column.id}>
															Add Task
														</TaskAddSinglePopup>
														<DeleteColumn
															id={column.id}
															projectId={projectId}
														/>
													</div>
												</div>
												{/* <div className='mt-2 mb-4'>
													<TaskAddSinglePopup
														className='bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600'
														// onClick={() => handleAddTask(column.id)}
														projectId={projectId}>
														Add Task
													</TaskAddSinglePopup>
												</div> */}
												{/* {column.tasks.map((task, taskIndex) => ( */}
												{column?.task?.map((taskS, index) => (
													<Draggable
														key={"task" + taskS.id}
														draggableId={"task" + taskS.id}
														index={index}>
														{(provided, snapshot) => (
															<li
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																className='rounded-lg px-1 py-1 cursor-move flex justify-between items-center'>
																<Task
																	taskS={taskS}
																	btnLoading={btnLoading}
																	btnId={btnId}
																	handleDeleteTask={handleDeleteTask}
																/>
															</li>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</ul>
										)}
									</Droppable>
								</div>
							</div>
						))}
					</DragDropContext>
				</div>
			) : loading ? (
				<div className='flex justify-center items-center h-96'>
					<Loader />
				</div>
			) : (
				<div className='flex justify-center items-center h-96'>
					<div>
						<h1 className='text-3xl font-semibold text-gray-600'>
							No Task Found
						</h1>
						<ShowAttTaskStatusBtn projectId={projectId} />
					</div>
				</div>
			)}
		</div>
	);
}

export default KanbanBoard2;
