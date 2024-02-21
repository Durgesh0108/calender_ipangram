import mongoose from "mongoose";

const timeZoneTask = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
});

const TaskTime = mongoose.models.Task || mongoose.model("TaskTime", timeZoneTask);

export default TaskTime;
