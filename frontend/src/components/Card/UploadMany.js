import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./card.css";

const UploadMany = ({ urlPath }) => {
	const [loader, setLoader] = useState(false);
	const [file, setFile] = useState();

	const fileReader = new FileReader();

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	const csvFileToArray = (string) => {
		const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
		const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

		const array = csvRows.map((i) => {
			const values = i.split(",");
			const obj = csvHeader.reduce((object, header, index) => {
				object[header] = values[index];
				return object;
			}, {});
			return obj;
		});
		// array -> array of objects

		// post request to backend using axios

		const resp = axios.post(`${urlPath}?query=createmany`, array);
		resp
			.then((d) => {
				if (d.statusText === "OK") {
					setLoader(false);
					toast.success("Uploaded Success");
				}
			})
			.catch((err) => {
				console.log(err, "err");
				toast.error("error in uploading ");
				setLoader(false);
			});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		setLoader(true);

		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				csvFileToArray(text);
			};

			fileReader.readAsText(file);
		}
	};

	return (
		<div className='text-center mt-2'>
			{!file && (
				<p className='text-center mb-2' style={{ color: "red" }}>
					Please select a CSV file for uploading
				</p>
			)}
			<form className='form-group'>
				<input
					required={true}
					className='text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          mt-4 file:mt-0 file:ml-4
          mb-4 file:mb-0 file:ml-4'
					type='file'
					id='csvFileInput'
					accept='.csv'
					onChange={handleOnChange}
				/>

				<br />
				<button
					className='mt-2 bg-blue-500 text-white font-bold py-2 px-4 trounded disabled:opacity-50'
					disabled={!file}
					type='submit'
					onClick={handleOnSubmit}>
					Import From CSV
				</button>
			</form>
		</div>
	);
};

export default UploadMany;
