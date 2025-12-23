import express from 'express'
import { changeEmployeePassword, employeeLogin, getEmployeeById, updateEmployeeProfile } from '../controllers/employee.controller.js'
import { getEmployeeAttendance,  markLogin, markLogout } from '../controllers/attendanc.controller.js'

import multer from "multer";
import { isEmployeeAuthenticated } from '../middleware/isEmployeeAuthenticated.js';

const routes = express.Router();

// Multer config for profile image upload
const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");

routes.post('/login', employeeLogin)
routes.get('/:id', getEmployeeById)
routes.put('/update-profile', isEmployeeAuthenticated, singleUpload, updateEmployeeProfile)
routes.post('/employee/change-password', isEmployeeAuthenticated, changeEmployeePassword)


routes.get("/attendance/:id", getEmployeeAttendance);
// routes.get("/attendance/dates/:id", getEmployeeAttendanceDates);
routes.post('/attendance/markLogin', isEmployeeAuthenticated, markLogin);
routes.post('/attendance/markLogout', isEmployeeAuthenticated, markLogout);
// routes.get('/attendance/dates/:employee_Id', isEmployeeAuthenticated,getEmployeeAttendanceDates )

export default routes;