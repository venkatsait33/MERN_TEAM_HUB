import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    fullName: String,
    officialEmail: { type: String, required: true, unique: true },
    personalEmail: { type: String, required: true, unique: true },
    password: {
        type: String,
    },
    dateOfBirth: {
        type: 'date',
        required: true,
    },
    dateOfJoining: {
        type: 'date',
        required: true,
    },
    designation: {
        type: 'string',
        required: true,
    },
    department: {
        type: 'string',
        required: true,
    },
    mobileNo: String,
    maritalStatus: {
        type: 'string',
        enum: ['Single', 'Married'],
        default: 'Single'
    },
    address: String,
    bloodGroup: String,
    bankDetails: {
        accountHolderName: String,
        bankName: String,
        accountNumber: String,
        ifscCode: String
    },
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
    payslips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payslip" }],
    leave: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leave"
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "HR" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    role: { type: String, default: "Employee" },
    image:{type: String}
}, {
    timestamps: true
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
