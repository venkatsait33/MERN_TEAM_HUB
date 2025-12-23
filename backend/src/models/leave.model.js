import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
        },
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        hrId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hr",
        },
        leaveType: {
            type: String,
            enum: ["Sick Leave", "Casual Leave", "Paid Leave", "Unpaid Leave", "Other"],
            required: true,
        },
        fromDate: {
            type: Date,
            required: true,
        },
        toDate: {
            type: Date,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
        remarks: {
            type: String,
        },
    },
    { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
