import express from 'express'
import { getAllJobs } from '../controllers/jobsControllers.js'
import { createJob } from '../controllers/jobsControllers.js'
import { updateJob } from '../controllers/jobsControllers.js'
import { deleteJob } from '../controllers/jobsControllers.js'


export const jobsRouter = express.Router()

jobsRouter.get('/', getAllJobs)
jobsRouter.post('/', createJob)
jobsRouter.patch('/:id', updateJob)
jobsRouter.delete('/:id', deleteJob)