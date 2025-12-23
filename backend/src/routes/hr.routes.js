import express from "express"
import upload from "../utils/multer.js";
import { createHr, hrLogin, logOut } from "../controllers/hr.controller.js"
import { createEmployee, deleteEmployee, getAllEmployees, updateEmployeeStatus, uploadEmployeesExcel } from "../controllers/employee.controller.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { getAttendanceByDate, getAttendanceDates, uploadAttendance } from "../controllers/attendanc.controller.js";

const routes = express.Router()

// routes.get("/hr", (req, res) => {
//     res.send("Hello HR")
// })

routes.post('/hr/register', createHr)
routes.post('/hr/login', hrLogin)

//HR-Employee routes

// create employee using form
routes.post('/hr/create/employee', isAuthenticated,
    createEmployee
)
// get all employees
routes.get('/employees', isAuthenticated, getAllEmployees)
// delete employee
routes.delete("/hr/employee/:id", isAuthenticated, deleteEmployee);
// update employee status to active or inactive
routes.patch("/hr/employee/status/:id", isAuthenticated, updateEmployeeStatus);
// upload employees excel for create more number of employees
routes.post('/upload/employees', isAuthenticated, upload.single("file"), uploadEmployeesExcel)

//HR-Attendance routes

//upload the attendance by using excel
routes.post("/upload/attendance", isAuthenticated, upload.single("file"), uploadAttendance);
// get all attendance dates
routes.get("/attendance/dates", isAuthenticated, getAttendanceDates);
// get attendance by date
routes.get("/attendance/by-date/:date", isAuthenticated, getAttendanceByDate);


routes.get('/logout', logOut)
export default routes