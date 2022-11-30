import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: {
        type: [String],
    },
});

const user = mongoose.model('user', userSchema);

export default user;