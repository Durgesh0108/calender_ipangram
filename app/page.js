"use client";
import React, { useState } from "react";
import moment from "moment-timezone";

const date = Date.now().toLocaleString();
export default function Home() {
	const [startDate, setStartDate] = useState(
		moment().startOf("week").add(1, "days")
	);
	const [endDate, setEndDate] = useState(
		moment().endOf("week").subtract(1, "days")
	);
	const [selectedTimezone, setSelectedTimezone] = useState("Asia/India");

	const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	// const timesOfDay = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM to 11 PM

	const timesOfDay = Array.from({ length: 48 }, (_, i) => i * 0.5).slice(
		16,
		-1
	);

	// const newTimesofday = timesOfDay.slice(16); // Remove the first element (0 minutes)

	const handlePrevWeek = () => {
		setStartDate(startDate.clone().subtract(1, "week"));
		setEndDate(endDate.clone().subtract(1, "week"));
	};

	const handleNextWeek = () => {
		setStartDate(startDate.clone().add(1, "week"));
		setEndDate(endDate.clone().add(1, "week"));
	};

	const handleTimezoneChange = (e) => {
		setSelectedTimezone(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let res = await fetch("http://localhost:3000/api/task", {
			method: "POST",
			body: JSON.stringify({
				name: "Task1",
				date: "21-02-2024",
				time: "8:00 AM",
			}),
		});
		res = await res.json();
	};

	const renderWeeklySchedule = () => {
		return (
			<table className="">
				<tbody className="flex flex-col gap-8">
					{daysOfWeek.map((day, index) => (
						<tr
							key={index}
							className="flex justify-between bg-slate p-4 gap-4 border-2 border-slate-600"
						>
							<td
								key={index}
								className="w-1/6 bg-slate-600 text-center text-white"
							>
								{/* {startDate.clone().add(index + 1, "days")} */}
								{day}
							</td>
							<td className="flex flex-wrap gap-4 w-5/6">
								{timesOfDay.map((time, index) => (
									<div key={index} className="flex">
										<td key={index}>
											<input
												type="checkbox"
												id={`${day}-${time}`}
												name={`${day}-${time}`}
											/>
										</td>
										<td>
											{moment()
												.startOf("day")
												.add(time, "hours")
												.tz(selectedTimezone)
												.format("h:mm A")}
										</td>
									</div>
								))}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className="schedule-container flex flex-col gap-4 p-4 bg-slate-200 min-h-screen">
			<div className="schedule flex justify-between bg-slate-400 p-3 rounded-lg">
				<button onClick={handlePrevWeek}>Previous Week</button>
				<div>
					Week of {startDate.format("MMMM D, YYYY")} to{" "}
					{endDate.format("MMMM D, YYYY")}
				</div>
				<button onClick={handleNextWeek}>Next Week</button>
			</div>
			<div className="timezone-select  bg-slate-400 p-3 rounded-lg flex gap-2 ">
				<label htmlFor="timezone">Select Timezone:</label>
				<select
					id="timezone"
					className="w-9/12"
					value={selectedTimezone}
					onChange={handleTimezoneChange}
				>
					<option value="UTC">UTC</option>
					<option value="America/New_York">America/New_York</option>
					<option value="Asia/India">India</option>
				</select>
				<button
					onClick={() => handleSubmit()}
					className="bg-white text-black px-2 rounded-lg"
				>
					Save Changes
				</button>
			</div>
			<div id="weeklySchedule" className="bg-slate-400 p-3 rounded-lg ">
				{renderWeeklySchedule()}
			</div>
		</div>
	);
}
