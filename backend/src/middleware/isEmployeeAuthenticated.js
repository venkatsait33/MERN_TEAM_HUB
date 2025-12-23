import jwt from "jsonwebtoken";
import Employee from "../models/employee.model.js";

export const isEmployeeAuthenticated = async (req, res, next) => {
    try {
        let token;

        if (req.cookies?.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Employee.findById(decoded.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        req.employee = employee; // attach employee to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
