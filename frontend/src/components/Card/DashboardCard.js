import React, { Fragment } from "react";
import "./Dashboard/style.css";

const DashboardCard = ({ information, count, isCustomer, title }) => {
  console.log(isCustomer);
  return (
    <Fragment>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5 mb-5">
        <div className="flex items-center p-8 bg-white shadow rounded-lg dashboard-card-bg ">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg
              width="50px"
              height="50px"
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M21.2505 5.77V9C21.2505 11.1146 20.5427 11.899 18.6312 12.0068C18.3555 12.0223 18.1305 11.7961 18.1305 11.52V10.38C18.1305 7.26 16.7405 5.87 13.6205 5.87H12.4805C12.2043 5.87 11.9781 5.64494 11.9937 5.36924C12.1014 3.45773 12.8859 2.75 15.0005 2.75H18.2305C20.5205 2.75 21.2505 3.48 21.2505 5.77Z"
                  fill="#2b82ee"></path>{" "}
                <path
                  d="M16.6291 10.3811V13.6211C16.6291 15.9011 15.8991 16.6311 13.6191 16.6311H10.3791C8.09914 16.6311 7.36914 15.9011 7.36914 13.6211V10.3811C7.36914 8.10109 8.09914 7.37109 10.3791 7.37109H13.6191C15.8991 7.37109 16.6291 8.10109 16.6291 10.3811Z"
                  fill="#2b82ee"></path>{" "}
                <path
                  d="M11.52 18.1305C11.7961 18.1305 12.0223 18.3555 12.0068 18.6312C11.899 20.5427 11.1146 21.2505 9 21.2505H5.77C3.48 21.2505 2.75 20.5205 2.75 18.2305V15.0005C2.75 12.8859 3.45773 12.1014 5.36924 11.9937C5.64494 11.9781 5.87 12.2043 5.87 12.4805V13.6205C5.87 16.7405 7.26 18.1305 10.38 18.1305H11.52Z"
                  fill="#2b82ee"></path>{" "}
              </g>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {" "}
              {count?.id ? count?.id : 0}
            </span>
            <span className="block text-gray-500"> Total Inoices </span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg dashboard-card-bg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M2.70911 17.0202L4.44911 13.5402C4.92911 12.5702 4.92911 11.4402 4.44911 10.4702L2.70911 6.98022C1.21911 4.00022 4.42911 0.850218 7.37911 2.41022L8.91911 3.23022C9.13911 3.34022 9.30911 3.52022 9.39911 3.74022L15.0891 16.3902C15.3191 16.9102 15.1091 17.5202 14.6091 17.7802L7.36911 21.5902C4.42911 23.1502 1.21911 20.0002 2.70911 17.0202Z"
                  fill="#31d39d"></path>{" "}
                <path
                  opacity="0.4"
                  d="M16.3093 15.6L12.5793 7.31996C12.1593 6.38996 13.1593 5.44996 14.0593 5.92996L19.8293 8.96996C22.2793 10.26 22.2793 13.76 19.8293 15.05L17.7893 16.12C17.2393 16.4 16.5693 16.17 16.3093 15.6Z"
                  fill="#31d39d"></path>{" "}
              </g>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {" "}
              {information?.total_amount ? information?.total_amount : 0}
            </span>
            <span className="block text-gray-500">Total Amount</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg dashboard-card-bg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg
              width="45px"
              height="45px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.4"
                  d="M17.9496 7.7101L17.8096 7.6301L16.4196 6.8301L13.5496 5.1701C12.6696 4.6601 11.3296 4.6601 10.4496 5.1701L7.57961 6.8301L6.18961 7.6401L6.00961 7.7401C4.21961 8.9401 4.09961 9.1601 4.09961 11.0901V15.7001C4.09961 17.6301 4.21961 17.8501 6.04961 19.0801L10.4496 21.6201C10.8896 21.8801 11.4396 22.0001 11.9996 22.0001C12.5496 22.0001 13.1096 21.8801 13.5496 21.6201L17.9896 19.0501C19.7796 17.8501 19.8996 17.6301 19.8996 15.7001V11.0901C19.8996 9.1601 19.7796 8.9401 17.9496 7.7101Z"
                  fill="#fb3f32"></path>{" "}
                <path
                  d="M6.18945 7.64L7.57945 6.83L10.3195 5.25L10.4495 5.17C11.3295 4.66 12.6695 4.66 13.5495 5.17L13.6795 5.25L16.4195 6.83L17.8095 7.63V5.49C17.8095 3.24 16.5695 2 14.3195 2H9.66945C7.41945 2 6.18945 3.24 6.18945 5.49V7.64Z"
                  fill="#fb3f32"></path>{" "}
                <path
                  d="M14.8397 13.34L14.2197 14.1C14.1197 14.21 14.0497 14.43 14.0597 14.58L14.1197 15.56C14.1597 16.16 13.7297 16.47 13.1697 16.25L12.2597 15.89C12.1197 15.84 11.8797 15.84 11.7397 15.89L10.8297 16.25C10.2697 16.47 9.83975 16.16 9.87975 15.56L9.93975 14.58C9.94975 14.43 9.87975 14.21 9.77975 14.1L9.15975 13.34C8.76975 12.88 8.93975 12.37 9.51975 12.22L10.4697 11.98C10.6197 11.94 10.7997 11.8 10.8797 11.67L11.4097 10.85C11.7397 10.34 12.2597 10.34 12.5897 10.85L13.1197 11.67C13.1997 11.8 13.3797 11.94 13.5297 11.98L14.4797 12.22C15.0597 12.37 15.2297 12.88 14.8397 13.34Z"
                  fill="#fb3f32"></path>{" "}
              </g>
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">
              {information?.profit ? information?.profit : 0}
            </span>

            <span className="block text-gray-500">Total Profit </span>
          </div>
        </div>

        {!isCustomer ? (
          <div className="flex items-center p-8 bg-white shadow rounded-lg dashboard-card-bg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-violet-600 bg-violet-100 rounded-full mr-6">
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21.9707 12C21.9707 15.31 19.2807 18 15.9707 18C14.4307 18 13.0307 17.42 11.9707 16.46C13.2007 15.37 13.9707 13.77 13.9707 12C13.9707 10.23 13.2007 8.63 11.9707 7.54C13.0307 6.58 14.4307 6 15.9707 6C19.2807 6 21.9707 8.69 21.9707 12Z"
                    fill="#7c3aed"></path>{" "}
                  <path
                    opacity="0.4"
                    d="M13.9707 12C13.9707 13.77 13.2007 15.37 11.9707 16.46C10.9107 17.42 9.5107 18 7.9707 18C4.6607 18 1.9707 15.31 1.9707 12C1.9707 8.69 4.6607 6 7.9707 6C9.5107 6 10.9107 6.58 11.9707 7.54C13.2007 8.63 13.9707 10.23 13.9707 12Z"
                    fill="#7c3aed"></path>{" "}
                </g>
              </svg>
            </div>
            <div>
              <span className="inline-block text-2xl font-bold">
                {information?.paid_amount ? information?.paid_amount : 0}
              </span>

              <span className="block text-gray-500">Total Paid Amount </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center p-8 bg-white shadow rounded-lg dashboard-card-bg">
            <div>
              <span className="block text-2xl font-bold">
                {" "}
                {information?.paid_amount ? information?.paid_amount : 0}
              </span>
              <span className="block text-gray-500">Paid Amount</span>
            </div>
            <div className="ml-auto">
              <span className="block text-2xl font-bold">
                {" "}
                {information?.due_amount ? information?.due_amount : 0}
              </span>
              <span className="block text-gray-500">Due Amount</span>
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default DashboardCard;
