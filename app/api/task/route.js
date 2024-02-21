// export async function POST(req, param) {
// 	const task = await db;
// }

// import dbConnect from "../../utils/dbConnect";
// import Task from "../../models/Task";

import dbConnect from "@/lib/db";
import TaskTime from "@/model/timeZoneTask";

export async function POST(req, res) {
	// if (req.method === "POST") {
	const { name, date, time } = req.body;
	console.log("req:", req.body);

	await dbConnect();

	try {
		const newTask = new TaskTime({
			// name: "Task1",
			// date: "21/02/2024",
			// time: "8:00 Am",
			name,
			date,
			time,
		});
		await newTask.save();
		console.log(newTask);
		// return res.status(200).json({ success: true, data: newTask });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
	// } else {
	// 	return res
	// 		.status(405)
	// 		.json({ success: false, message: "Method Not Allowed" });
	// }
}
