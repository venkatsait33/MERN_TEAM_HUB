import mongoose from "mongoose";

const HrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "hr"
    }
}, {
    timestamps: true
})

const Hr = mongoose.model("Hr", HrSchema);
export default Hr;