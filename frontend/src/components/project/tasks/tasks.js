import { Navigate } from "react-router-dom";
import PageTitle from "../../page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Table } from "antd";
// import AddTask from "./Addtask";
import UpdateBtn from "../../Buttons/UpdateBtn";
import { loadAllProjectTasks } from "../../../redux/rtk/features/projectManagement/project/projectTask/projectTask";
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
    key: "name",
    render: ({ name }) => name.toUpperCase(),
  },
  {
    id: 3,
    title: "Action",
    dataIndex: "id",
    key: "action",
    render: (id) => (
      <div className="flex justify-start">
        <UpdateBtn path={`/admin/task/update/${id}`} />
      </div>
    ),
  },
];
const Task = (props) => {
  const dispatch = useDispatch();
  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const { loading, list } = useSelector((state) => state.projectTask);
  const [columnsToShow, setColumnsToShow] = useState([]);

  useEffect(() => {
    dispatch(loadAllProjectTasks());
  }, []);
  useEffect(() => {
    setColumnsToShow(columns);
  }, []);

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <div>
      <PageTitle title="Back" />
      {/* <AddTask list={list} loading={loading} /> */}
      <Table
        scroll={{ x: true }}
        loading={loading}
        pagination={{
          defaultPageSize: 20,
        }}
        columns={columnsToShow}
        dataSource={list}
      />
    </div>
  );
};

export default Task;
