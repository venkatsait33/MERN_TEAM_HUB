import xlsx from "xlsx";
import Attendance from "../models/attendance.model.js";
import Employee from "../models/employee.model.js";
import fs from "fs";
import path from "path";
import transporter from "../utils/nodeMailer.js";
import dotenv from "dotenv";
dotenv.config();

// export const markAttendance = async (req, res) => {
//     try {
//         const { employeeId, status, date, remarks } = req.body;
//         const hrId = req.user._id; // assuming HR is logged in

//         if (!req.user || req.user.role !== "hr") {
//             return res.status(403).json({ message: "Only hr can mark attendance.", success: false });
//         }
//         const existingRecord = await Attendance.findOne({ employeeId, date });
//         if (existingRecord) {
//             return res.status(400).json({ message: "Attendance already marked for this date." });
//         }

//         const attendance = await Attendance.create({
//             employeeId,
//             hrId,
//             date,
//             status,
//             remarks
//         });

//         res.status(201).json({
//             success: true,
//             message: "Attendance marked successfully",
//             data: attendance
//         });

//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

export const uploadAttendance = async (req, res) => {
  let file;
  try {
    const hrId = req.user._id;
    file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read Excel
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
      raw: false,
    });

    if (!sheetData.length) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // Convert Excel date properly for each row
    // Some Excel files have date as serial numbers (e.g., 45567)
    const parseExcelDate = (excelDate) => {
      if (!excelDate) return null;

      // checking if already a date string like '2025-10-15'
      if (!isNaN(Date.parse(excelDate))) {
        return new Date(excelDate);
      }

      // Case 2: It's a number (Excel serial date)
      if (!isNaN(excelDate)) {
        const jsDate = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
        return jsDate;
      }

      return null;
    };

    // Extract all employeeIds from Excel
    const presentEmployeeIds = sheetData.map((row) =>
      String(row.employeeId).trim()
    );

    // Get date from first row and convert it properly
    const dateFromSheet = parseExcelDate(sheetData[0]?.date);

    if (!dateFromSheet || isNaN(dateFromSheet)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing date in Excel sheet" });
    }

    const allEmployees = await Employee.find({}, "employeeId");

    const results = [];

    for (const emp of allEmployees) {
      const empId = emp.employeeId;
      const employee = await Employee.findOne({ employeeId: empId });

      const status = presentEmployeeIds.includes(empId) ? "Present" : "Absent";

      const existingRecord = await Attendance.findOne({
        employeeId: empId,
        date: dateFromSheet,
      });

      if (!existingRecord) {
        const record = new Attendance({
          hrId,
          employee_id: employee?._id,
          employeeId: empId,
          date: dateFromSheet,
          status,
        });
        await record.save();
        results.push(record);

        await Employee.findOneAndUpdate(
          { employeeId: empId },
          { $addToSet: { attendance: record._id } }
        );
      } else {
        existingRecord.status = status;
        await existingRecord.save();
        results.push(existingRecord);
      }
      if (status === "Absent" && employee?.officialEmail) {
        try {
          const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: employee.officialEmail,
            subject: "Attendance Notification - You were marked Absent",
            html: `
              <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <h2 style="color: #e63946;">Attendance Alert</h2>
                <p>Dear <strong>${employee.fullName}</strong>,</p>
                <p>This is to inform you that you were marked <strong style="color: red;">Absent</strong> on <strong>${dateFromSheet.toDateString()}</strong>.</p>
                <p>If this is incorrect, please contact your HR department immediately.</p>
                <br />
                <p>Best Regards,</p>
                <p><strong>HR Department</strong></p>
              </div>
            `,
          };

          // Send mail asynchronously (don’t block main process)
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.error(
                `Failed to send absence email to ${employee.officialEmail}:`,
                err
              );
            } else {
              console.log(`Absent email sent to ${employee.officialEmail}`);
            }
          });
        } catch (mailError) {
          console.error("Error sending absent notification:", mailError);
        }
      }
    }

    return res.status(200).json({
      message: "Attendance processed successfully",
      dateUsed: dateFromSheet,
      results,
    });
  } catch (error) {
    console.error("Attendance Upload Error:", error);
    res.status(500).json({
      message: "Error uploading attendance",
      error: error.message,
    });
  } finally {
    if (file?.path) {
      try {
        fs.unlinkSync(path.resolve(file.path));
        console.log("Temporary file deleted:", file.path);
      } catch (err) {
        console.error("Error deleting file:", err);
      }
    }
  }
};

// export const getAttendanceDates = async (req, res) => {
//     try {
//         const hrId = req.user._id;

//         const dates = await Attendance.aggregate([
//             { $match: { hrId } },  //match it give all the matched data with reference to hrId from attendance collection
//             {
//                 $group: {
//                     _id: "$date",
//                     totalRecords: { $sum: 1 }
//                 }
//             }, // group it will group all the data with reference to date and count the total records in attendance collection
//             { $sort: { _id: -1 } } // filter using latest id created.
//         ]);

//         res.status(200).json({
//             message: "Attendance dates fetched successfully",
//             data: dates
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching attendance dates", error });
//     }
// };

// export const getAttendanceByDate = async (req, res) => {
//     try {
//         const { date } = req.params;
//         const hrId = req.user._id;

//         const selectedDate = new Date(date);
//         const start = new Date(selectedDate.setHours(0, 0, 0, 0));
//         const end = new Date(selectedDate.setHours(23, 59, 59, 999));

//         const records = await Attendance.find({
//             hrId,
//             date: { $gte: start, $lte: end },
//         }).populate("employee_id", "fullName department employeeId");

//         res.status(200).json({
//             message: "Attendance for the date fetched successfully",
//             data: records,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching attendance data", error });
//     }
// };

export const getAttendanceDates = async (req, res) => {
  try {
    const hrId = req.user._id;

    const dates = await Attendance.aggregate([
      {
        $match: {
          $or: [
            { hrId }, // Attendance assigned to HR
            { hrId: { $exists: false } }, // Attendance without hrId
            { hrId: null }, // Attendance where hrId is explicitly null
          ],
        },
      },
      {
        $group: {
          _id: "$date",
          totalRecords: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.status(200).json({
      message: "Attendance dates fetched successfully",
      data: dates,
    });
  } catch (error) {
    console.error("Error fetching attendance dates:", error);
    res.status(500).json({ message: "Error fetching attendance dates", error });
  }
};

export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const hrId = req.user?._id;

    const selectedDate = new Date(date);
    const start = new Date(selectedDate.setHours(0, 0, 0, 0));
    const end = new Date(selectedDate.setHours(23, 59, 59, 999));

    const query = {
      date: { $gte: start, $lte: end },
    };
    // here it check if htId is present in the attendance collection
    if (hrId) {
      query.$or = [{ hrId }, { hrId: null }];
    }

    const records = await Attendance.find(query).populate(
      "employee_id",
      "fullName department employeeId"
    );

    res.status(200).json({
      message: "Attendance for the date fetched successfully",
      data: records,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data", error });
  }
};

//Employee Attendance

export const getEmployeeAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // Use population (if attendance references stored)
    const employee = await Employee.findOne({ _id: id }).populate("attendance");

    // //  Directly fetch from attendance table (if not referenced)
    // const attendanceRecords = await Attendance.find({ employee_Id: id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Attendance fetched successfully",
      data: employee.attendance,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const markLogin = async (req, res) => {
  try {
    const employee_Id = req.employee._id;
    const today = new Date().toISOString().split("T")[0];
    const now = new Date();

    // Find existing record for today
    let attendance = await Attendance.findOne({
      employee_id: employee_Id,
      date: today,
    });
    const employee = await Employee.findOne({ _id: employee_Id }).populate(
      "attendance"
    );

    const hour = now.getHours();
    const minute = now.getMinutes();

    if (hour === 10 && minute <= 30) {
      if (attendance) {
        // Update loginTime in existing record
        attendance.loginTime = now.toLocaleTimeString();
        attendance.status = "Present";
        await attendance.save();
      } else {
        // Create new attendance record
        attendance = await Attendance.create({
          employee_id: employee_Id,
          employeeId: employee.employeeId,
          date: today,
          loginTime: now.toLocaleTimeString(),
          status: "Present",
        });
        // add attendance record to employee
        await Employee.findOneAndUpdate(
          { employeeId: employee.employeeId },
          { $addToSet: { attendance: attendance._id } }
        );
      }
      return res
        .status(200)
        .json({ message: "Login marked successfully", data: attendance });
    }

    res
      .status(400)
      .json({ message: "You can only mark login between 9:00 AM and 9:15 AM" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const markLogout = async (req, res) => {
  try {
    const employeeId = req.employee._id;
    const today = new Date().toISOString().split("T")[0];
    const now = new Date();

    const attendance = await Attendance.findOne({
      employee_id: employeeId,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({ message: "You haven’t marked login yet." });
    }

    if (attendance.logoutTime) {
      return res.status(400).json({ message: "Logout already marked." });
    }

    const hour = now.getHours();
    const minute = now.getMinutes();

    if (hour === 10 && minute <= 15) {
      attendance.logoutTime = now.toLocaleTimeString();
      await attendance.save();
      return res
        .status(200)
        .json({ message: "Logout marked successfully", data: attendance });
    }

    res.status(400).json({
      message: "You can only mark logout between 6:00 PM and 6:15 PM",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// export const getEmployeeAttendanceDates = async (req, res) => {
//   try {
//     const employee_Id = req.params; // ✅ from employee auth middleware

//     if (!employee_Id) {
//       return res.status(400).json({ message: "Employee ID is required" });
//     }

//     // Fetch unique attendance dates for this employee
//     const dates = await Attendance.aggregate([
//       {
//         $match: { employee_id: employee_Id }
//       },
//       {
//         $group: {
//           _id: "$date",
//           totalRecords: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: -1 } }
//     ]);

//     if (dates.length === 0) {
//       return res.status(200).json({
//         message: "No attendance records found.",
//         data: []
//       });
//     }

//     res.status(200).json({
//       message: "Employee attendance dates fetched successfully",
//       data: dates.map(item => ({
//         date: item._id,
//         totalRecords: item.totalRecords
//       }))
//     });
//   } catch (error) {
//     console.error("Error fetching employee attendance dates:", error);
//     res.status(500).json({
//       message: "Error fetching employee attendance dates",
//       error: error.message
//     });
//   }
// };

// export const getAttendanceByDateForEmployee = async (req, res) => {
//     try {
//         const { date } = req.params;
//         const employeeId = req.user._id;

//         const selectedDate = new Date(date);
//         const start = new Date(selectedDate.setHours(0, 0, 0, 0));
//         const end = new Date(selectedDate.setHours(23, 59, 59, 999));

//         const records = await Attendance.find({
//             employee_id: employeeId,
//             date: { $gte: start, $lte: end },
//         }).populate("employee_id", "fullName department employeeId");

//         res.status(200).json({
//             message: "Employee attendance for the date fetched successfully",
//             data: records,
//         });
//     } catch (error) {
//         console.error("Error fetching employee attendance data:", error);
//         res.status(500).json({ message: "Error fetching employee attendance data", error });
//     }
// };
