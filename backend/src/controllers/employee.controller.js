import Employee from "../models/employee.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import Attendance from "../models/attendance.model.js";
import Leave from "../models/leave.model.js";
import xlsx from "xlsx";
import transporter from "../utils/nodeMailer.js";

export const createEmployee = async (req, res) => {
    try {

        const {
            employeeId,
            fullName,
            officialEmail,
            personalEmail,
            dateOfBirth,
            dateOfJoining,
            designation,
            department,
            mobileNo,
            maritalStatus,
            address,
            bloodGroup,
            bankDetails,
            createdBy,
        } = req.body;

        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({ message: "Only hr can create employees", success: false });
        }
        const hashedPassword = await bcrypt.hash("user@123", 10);
        const employee = new Employee({
            employeeId,
            fullName,
            officialEmail,
            personalEmail,
            dateOfBirth,
            dateOfJoining,
            password: hashedPassword,
            designation,
            department,
            mobileNo,
            maritalStatus,
            address,
            bloodGroup,
            bankDetails,
            createdBy: req.user._id,
        });

        await employee.save();

        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: officialEmail,
        //     subject: 'Employee Account Created',
        //     html: `<h1>Employee Account Created</h1> <p>Your account has been created with the following credentials:</p>
        //     <p>Employee ID: ${employeeId}</p>
        //     <p>Full Name: ${fullName}</p>
        //     <p>Official Email: ${officialEmail}</p>
        //     <p>Password: user@123 </p> 
        //     <p>This is default Password</p>
        //     <p>Please login to the system using these credentials.</p>
        //     <p>You can login to site using Official Email and Password</p>
        //     <p>After Login into portal and Change Your Account Password </p>
        //     <p>Best Regards from HR Dept</p> 
        //     `
        // }

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: officialEmail,
            subject: "Your Employee Account Has Been Created",
            html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #007BFF; text-align: center;">Welcome to the Priacc Innovations!</h2>
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>We’re excited to inform you that your employee account has been successfully created. Below are your login details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Employee ID:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${employeeId}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Official Email:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${officialEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Default Password:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">user@123</td>
          </tr>
        </table>

        <p><strong>Important:</strong> Please log in using your official email and the default password. For your security, change your password immediately after logging in.</p>

        <p>Login Portal: <a href="https://your-company-login-url.com" style="color: #007BFF;">Click here to log in</a></p>

        <p>We’re glad to have you on board! If you have any questions, feel free to reach out to the HR department.</p>

        <p style="margin-top: 30px;">Best Regards,<br>
        <strong>HR Department</strong><br>
        <span style="color: #555;">[Your Company Name]</span></p>
      </div>
    </div>
  `
        };


        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: "Employee registered successfully",
            employee,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        }
        )
        console.log(error);
    }
}

export const employeeLogin = async (req, res) => {
    try {
        const { officialEmail, password } = req.body;

        const employee = await Employee.findOne({ officialEmail })

        if (!employee) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // const isMatch = password === employee.password; // if you use bcrypt, replace this with bcrypt.compare()

        // if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });


        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,            // true only if using https
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            message: "Employee logged in successfully",
            employee,
            token,
        })
    }
    catch (error) {
        console.log(error);
    }

}

export const getAllEmployees = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({ message: "Only hr can View the employees", success: false });
        }
        const employees = await Employee.find().select("-password");
        res.status(200).json(employees);
    } catch (error) {

        res.status(500).json({
            error: error.message,
            success: false,
        })
        console.log(error);
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id).select("-password");
        res.status(200).json({
            success: true,
            employee,
            message: "Employee fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        })
        console.log(error);
    }
}

export const updateEmployeeProfile = async (req, res) => {
    try {

        const employeeId = req.employee?._id;
        const { address, dateOfBirth, bankDetails } = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);

        const updateData = {};

        // Allow only permitted fields
        if (address) updateData.address = address;
        if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
        if (bankDetails) {
            updateData.bankDetails = {
                accountHolderName: bankDetails.accountHolderName,
                bankName: bankDetails.bankName,
                accountNumber: bankDetails.accountNumber,
                ifscCode: bankDetails.ifscCode,
            };
        }
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // if (cloudResponse) {
        //     // Replace image with raw just in case
        //     const imageUrl = cloudResponse.secure_url
        //     updateData.image = imageUrl;  // use this to render or download
        // }
        updateData.image = cloudResponse.secure_url

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            { $set: updateData },
            { new: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile updated successfully",
            employee: updatedEmployee,
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        })
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({ message: "Only hr can delete employees", success: false });
        }
        const { id } = req.params;
        const employee = await Employee.findById({ _id: id });
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false,
            })
        }
        await Attendance.deleteMany({ employee_id: employee._id });
        await Leave.deleteMany({ _id: { $in: employee.leave } });

        // Delete employee
        await Employee.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });


    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        })
    }
}

export const updateEmployeeStatus = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({ message: "Only hr can delete employees", success: false });
        }
        const { id } = req.params;
        const { status } = req.body;

        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({ message: "Only hr can delete employees", success: false });
        }

        if (!["Active", "Inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value. Must be 'Active' or 'Inactive'.",
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.status(200).json({
            success: true,
            message: `Employee status updated to ${status}`,
            employee,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating employee status",
            error: error.message,
        });
    }
};

export const changeEmployeePassword = async (req, res) => {
    try {
        const employeeId = req.employee?._id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Please provide both old and new passwords." });
        }

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, employee.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid old password" });
        }
        if (oldPassword === newPassword) {
            res.status(400).json({ message: "New password cannot be the same as the old password" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        employee.password = hashedPassword;
        await employee.save();

        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: employee.officialEmail,
        //     subject: 'Password Change Successfully',
        //     html: `<h1>Password Changed Successfully</h1> 
        //     <p>Your password has been changed successfully.</p>
        //     `
        // }

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: employee.officialEmail,
            subject: "Password Changed Successfully",
            html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #007BFF; text-align: center;">Password Updated Successfully</h2>

        <p>Dear <strong>${employee.fullName || "Employee"}</strong>,</p>

        <p>This is to inform you that your account password has been changed successfully.</p>
        <p>If you did not make this change, please contact the HR department immediately.</p>

        <p style="margin-top: 30px;">Best Regards,<br>
        <strong>HR Department</strong><br>
        <span style="color: #555;">Priacc Innvoations</span></p>
      </div>
    </div>
  `
        };


        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Password changed successfully.",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

export const uploadEmployeesExcel = async (req, res) => {
    try {
        const file = req.file;

        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({ message: "Only HR can create employees", success: false });
        }

        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Read Excel
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false });

        if (!data.length) {
            return res.status(400).json({ success: false, message: "Excel file is empty" });
        }

        const employeesToInsert = [];

        for (const row of data) {
            const existingEmployee = await Employee.findOne({ employeeId: row.employeeId });
            if (existingEmployee) {
                console.log(`Employee ${row.employeeId} already exists, skipping...`);
                continue; // Skip duplicates
            }

            const hashedPassword = await bcrypt.hash(row.password || "user@123", 10);

            employeesToInsert.push({
                employeeId: row.employeeId,
                fullName: row.fullName,
                officialEmail: row.officialEmail,
                personalEmail: row.personalEmail,
                password: hashedPassword,
                dateOfBirth: new Date(row.dateOfBirth),
                dateOfJoining: new Date(row.dateOfJoining),
                designation: row.designation,
                department: row.department,
                mobileNo: row.mobileNo,
                maritalStatus: row.maritalStatus || "Single",
                address: row.address,
                bloodGroup: row.bloodGroup,
                bankDetails: {
                    accountHolderName: row.accountHolderName,
                    bankName: row.bankName,
                    accountNumber: row.accountNumber,
                    ifscCode: row.ifscCode,
                },
                createdBy: req.user?._id,
            });
        }

        if (employeesToInsert.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No new employees to upload (duplicates found).",
            });
        }

        await Employee.insertMany(employeesToInsert);

        res.status(200).json({
            success: true,
            message: `${employeesToInsert.length} employees uploaded successfully`,
        });
    } catch (error) {
        console.error("Error uploading employees:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

