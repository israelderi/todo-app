import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    text : String,
    type: String
});

const task = mongoose.model('task', taskSchema);

export default task;