import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './src/db/db.js'
import hrRoutes from './src/routes/hr.routes.js'
import employeeRoutes from './src/routes/employee.routes.js'
import leaveRoutes from './src/routes/leave.routes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
))

// Routes

app.use('/api/v1/auth', hrRoutes)
app.use('/api/v1/', employeeRoutes)
app.use('/api/v1/leave', leaveRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})

app.get('/', (req, res) => {
    res.send('Hello World')
})
