import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";
import transporter from "../utils/nodeMailer.js";

export const applyLeave = async (req, res) => {
    try {
        const { employeeId, leaveType, fromDate, toDate, reason } = req.body;
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const leave = new Leave({
            employeeId,
            employee_id: employee._id,
            leaveType,
            fromDate,
            toDate,
            reason,
            hrId: employee.hrId,
        });
        await leave.save();

        // Optional: Add leave reference to Employee document
        await Employee.findByIdAndUpdate(employee._id, { $push: { leave: leave._id } });

        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: employee.officialEmail,
        //     subject: 'Leave Application',
        //     html: `<h1>Leave Application</h1> <p>You have applied for a leave from ${fromDate} to ${toDate} for ${leaveType}.</p>
        //     <p>Reason: ${reason}</p>`
        // }

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: employee.officialEmail,
            subject: "Leave Application Submitted",
            html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #007BFF; text-align: center;">Leave Application Submitted</h2>

        <p>Dear <strong>${employee.fullName || "Employee"}</strong>,</p>

        <p>Your leave application has been received successfully. Here are the details:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Leave Type:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${leaveType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>From Date:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${fromDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>To Date:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${toDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Reason:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${reason}</td>
          </tr>
        </table>

        <p>Your request will be reviewed by the HR department. You will be notified once the status is updated.</p>

        <p style="margin-top: 30px;">Best Regards,<br>
        <strong>HR Department</strong><br>
        <span style="color: #555;">[Your Company Name]</span></p>
      </div>
    </div>
  `
        };


        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "Leave applied successfully", leave, success: true });
    } catch (error) {
        res.status(500).json({ message: "Error applying leave", error: error.message });
    }
}

export const getLeaves = async (req, res) => {
    try {
        const { employee_id } = req.params
        const leaves = await Leave.find({ employee_id }).populate('employee_id');
        res.status(200).json({ leaves, message: "Leaves fetched successfully", success: true });

    } catch (error) {
        res.status(500).json({ message: "Error fetching leaves", error: error.message });
    }
}

export const deleteLeave = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the leave document
        const leave = await Leave.findByIdAndDelete(id);
        if (!leave) {
            return res.status(404).json({ message: "Leave not found" });
        }

        // Remove reference from Employee document
        await Employee.updateOne(
            { _id: leave.employee_id }, // Assuming leave model stores employee_id as ObjectId reference
            { $pull: { leave: leave._id } }
        );

        res.status(200).json({
            message: "Leave deleted successfully and reference removed from employee",
            leave,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting leave",
            error: error.message,
        });
    }
};

export const getAllLeaves = async (req, res) => {
    try {

        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({ message: "Only hr can access to view all leaves", success: false });
        }
        const leaves = await Leave.find()
            .populate("employee_id", "fullName department employeeId")
            .sort({ createdAt: -1 });
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leaves", error: error.message });
    }
};

export const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remarks } = req.body;

        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({ message: "Only hr can change the status of leaves", success: false });
        }

        const leave = await Leave.findByIdAndUpdate(
            id,
            { status, remarks },
            { new: true }
        );
        const employee = await Employee.findOne({ employeeId: leave.employeeId });
        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: employee.officialEmail,
        //     subject: 'Leave Application Status Updated',
        //     html: `<h1>Leave Application Status Changed </h1> <p>You have applied for a leave from ${leave.fromDate} to ${leave.toDate} for ${leave.leaveType}.</p>
        //     <p>Reason: ${leave.reason}</p> </br>
        //     <p>Status: ${status}</p> </br>
        //     <p>Best Regards from HR Dept</p>
        //     `
        // }

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: employee.officialEmail,
            subject: "Leave Application Status Updated",
            html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #007BFF; text-align: center;">Leave Application Status Update</h2>

        <p>Dear <strong>${employee.fullName || "Employee"}</strong>,</p>

        <p>Your leave application has been reviewed. Below are the details:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Leave Type:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${leave.leaveType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>From:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${leave.fromDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>To:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${leave.toDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Reason:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${leave.reason}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Status:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; color: ${status === "Approved"
                    ? "green"
                    : status === "Rejected"
                        ? "red"
                        : "#ff9800"
                };">${status}</td>
          </tr>
        </table>

        <p>For more details, please log in to your employee portal.</p>

        <p style="margin-top: 30px;">Best Regards,<br>
        <strong>HR Department</strong><br>
        <span style="color: #555;">[Your Company Name]</span></p>
      </div>
    </div>
  `
        };


        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: `Leave ${status}`, leave });
    } catch (error) {
        res.status(500).json({ message: "Error updating leave", error: error.message });
    }
};
