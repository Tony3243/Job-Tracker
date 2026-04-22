//this file uses axiso to get all our api calls functioning to the backend.
//each function has it;s own operator for our CRUD app(get, delete, patch, post)
import axios from "axios"

const baseURL = "http://localhost:8000/api"

export const getAllJobs = async() => {
    try{
        const response = await axios.get(`${baseURL}/jobs`)
        return response.data
    } catch(err) {
        if(err.response?.status === 500) {
            console.error(err)
            throw new Error("Server Error. Please try again.")
        }
        throw new Error("Failed to load Jobs due to server. Please try again.")
    }
}

export const createJob = async(jobData) => {
    try{
        const response = await axios.post(`${baseURL}/jobs`, jobData)
        return response.data
    }catch(err) {
        if(err.response?.status === 400) {
            throw new Error("Invalid inputs. Please try again.")
        } else if (err.response?.status === 500) {
            throw new Error("Server Error. Please try again.")
        } else if (err.response?.status === "ERR_NETWORK") {
            throw new Error("Please connect to the network.")
        } else {
            throw new Error("Failed to create job. Please try again.")
        }
    }
}

export const updateJob = async(id, jobData) => {
    try{
        const response = await axios.patch(`${baseURL}/jobs/${id}`, jobData)
        return response.data
    }catch(err) {
        if(err.response?.status === 400) {
            throw new Error("Invalid inputs. Please try again.")
        } else if (err.response?.status === 500) {
            throw new Error("Server Error. Please try again.")
        } else if (err.code === "ERR_NETWORK") {
            throw new Error("Please connect to the network.")
        } else {
            throw new Error("Failed to create job. Please try again.")
        }
    }
}

export const deleteJob = async(id) => {
    try{
        const response = await axios.delete(`${baseURL}/jobs/${id}`)
        return response.data
    }catch(err) {
       if(err.response?.status === 404) {
        throw new Error("Job not Found. I may have been deleted")
       } else if (err.response?.status === 500) {
        throw new Error("Server Error. Unable to delete Job")
       } else {
        throw new Error("Failed to delete Job")
       }
    }
}