import express from "express";
import { applyLeave, deleteLeave, getAllLeaves, getLeaves, updateLeaveStatus } from "../controllers/leave.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const routes = express.Router();

routes.post('/apply', applyLeave);
routes.get('/get/:employee_id', getLeaves);
routes.delete('/delete/:id', deleteLeave);

routes.get('/all', isAuthenticated, getAllLeaves);
routes.put('/update/:id', isAuthenticated, updateLeaveStatus);

export default routes;