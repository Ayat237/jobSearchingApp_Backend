import express from 'express'
import connectionDB from './DB/connectionDB.js'
import { golbalResponse } from './src/middleware/error-handling.middleware.js'
import userRouter from './src/modules/user/user.routes.js'
import companyRouter from './src/modules/company/company.routes.js'
import jobRouter from './src/modules/job/job.routes.js'
import { errorClass } from './utils/error-class.utils.js'

const app = express()
const port = 5000

//db connection
connectionDB()

// base url 
app.use(express.json())
app.use('/user', userRouter);
app.use('/job', jobRouter);
// app.use('/application', applicationRouter);
app.use('/company', companyRouter);
app.use('/*', (req, res, next) => {
    return next (new errorClass(`Invalid URL : ${req.originalUrl}`,404))
})

// golbal error handler response
app.use(golbalResponse);

// start the server
app.listen(port, () => console.log(`app listening on port ${port}!`))
