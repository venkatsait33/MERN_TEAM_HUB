import Hr from "../models/Hr.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const createHr = async (req, res) => {

    try {
        const { name, email, password, designation, department } = req.body
        if (!name || !email || !password || !designation || !department) {
            return res.status(400).send({ message: "All fields are required" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newHr = new Hr({ name, email, password: hashedPassword, designation, department })

        await newHr.save()
        res.status(201).send({ message: "Hr created successfully", success: true, data: newHr })
    } catch (error) {
        console.log(error);
    }
}

export const getHr = async (req, res) => {
    try {
        const hr = await Hr.findById(req.params.id)
        res.status(200).send({ message: "Hr fetched successfully", success: true, data: hr })
    } catch (error) {
        console.log(error);
    }
}

export const hrLogin = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ message: "All fields are required" })
        }
        const hr = await Hr.findOne({ email })
        if (!hr) {
            return res.status(400).send({ message: "User does not exist" })
        }
        const isPasswordMatched = await bcrypt.compare(password, hr.password)
        if (!isPasswordMatched) {
            return res.status(400).send({ message: "Invalid credentials" })
        }
        const tokenData = {
            _id: hr._id,
            email: hr.email,
            role: hr.role,
            name: hr.name,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" })
        return res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,            // true only if using https
                maxAge: 24 * 60 * 60 * 1000
            })
            .json({ message: "Login successful", success: true, data: hr, token })
    } catch (error) {
        console.log(error);
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).json({ message: "Logout successful", success: true })
    } catch (error) {
        console.log(error);
    }
}

