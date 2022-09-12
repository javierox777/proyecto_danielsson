import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import userRouter from './routesMongo/users/user'

dotenv.config()

const app = express()

//setting
app.set("port", process.env.PORT || 3000)


//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


//routes
app.use('/api/user', userRouter )




export default app