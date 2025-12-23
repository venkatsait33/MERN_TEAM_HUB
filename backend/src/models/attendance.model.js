import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: 'string',
    },
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    hrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HR",
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Leave", "Half-day"],
        required: true,
    },
    loginTime: {
        type: String, // e.g. "09:30 AM"
    },
    logoutTime: {
        type: String, // e.g. "06:00 PM"
    },
    // workHours: {
    //     type: Number, // e.g. 8.5
    // },
    remarks: {
        type: String,
    },
}, { timestamps: true });


const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
