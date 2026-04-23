import 'dotenv/config' ///manage environment variables from .env file
import express from 'express'
import cors from 'cors' // get information from another domian
import { jobsRouter } from './Routes/jobRoutes.js'

const app = express();
const PORT = 8000;

app.use(express.json())//parses incoming request from the client

app.use(cors())//is a way to authorize any data from being sent if the Client side request the data

export default app

//http://localhost:8000/api/test
app.get('/api/test', (req, res) => {
    res.json({message: "hello world!"})
})

//http://localhost:8000/api/jobs
app.use('/api/jobs', jobsRouter); 

app.listen(PORT, () => console.log(`Port running on: ${PORT}`)); //this is only logging
//add catch block