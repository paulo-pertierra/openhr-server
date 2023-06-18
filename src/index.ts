import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()

import { configureMiddlewares } from "./middlewares/appconfig"
configureMiddlewares(app)

import { configureRoutes } from "./routes/routesconfig"
configureRoutes(app)



app.use('*', (req, res)=> res.json({error: 'Not Found.', status: 404}).status(404))

app.listen(5000, ()=> {
  console.log(`HRNode is running at http://localhost:5000. Running in ${ process.env.HR_ENVIRONMENT || 'unspecified'} mode.`)
})