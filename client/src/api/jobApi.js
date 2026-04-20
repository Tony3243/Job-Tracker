//this file uses axiso to get all our api calls functioning to the backend.
//each function has it;s own operator for our CRUD app(get, delete, patch, post)
import axios from "axios"

const baseURL = "http://localhost:8000/api"

export const getAllJobs = async() => {
    try{
        const response = await axios.get(`${baseURL}/jobs`)
        return response.data
    } catch(err) {
        console.log(`Getting Error: ${err}`)
        throw err
    }
}

export const createJob = async(jobData) => {
    try{
        const response = await axios.post(`${baseURL}/jobs`, jobData)
        return response.data
    }catch(err) {
        console.log(`Creating Error: ${err}`)
        throw err
    }
}

export const updateJob = async(id, jobData) => {
    try{
        const response = await axios.patch(`${baseURL}/jobs/${id}`, jobData)
        return response.data
    }catch(err) {
        console.log(`Patch Error: ${err}`)
        throw err
    }
}

export const deleteJob = async(id) => {
    try{
        const response = await axios.delete(`${baseURL}/jobs/${id}`)
        return response.data
    }catch(err) {
        console.log(`Deleting Error: ${err}`)
        throw err
    }
}