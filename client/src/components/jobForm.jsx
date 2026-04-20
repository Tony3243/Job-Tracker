import React from 'react'
import { createJob } from '../api/jobApi.js'

//passed in setJobs and jobs as props to access the setterfunction in main
export default function JobForm({setJobs, jobs}) {
    const [dataForm, setDataForm] = React.useState(
        {
        companyName: "",
        jobTitle: "",
        applicationStatus: 'Applied',
        applicationDate: "",
        notes: ""
    })

    const [add, setAdd] = React.useState(false)

    const handleChange = (e) => { //this function handles all the changes(typing) in the input field
    //e.target.name specifies which column is the client is currently editing
    setDataForm((oldInfo) => {
        return {
            ...oldInfo,
            [e.target.name]: e.target.value
        }
        } )
    }

    //this function handles updating our jobs list with newly created Jobs
    const handleSubmit = async(e) => {
        e.preventDefault()//prevents page from refreshing
        try {
            const newJob = await createJob(dataForm) //sends imformation to the backend and it saves data into the database
            setJobs([...jobs, newJob]) //calls setJobs to create a new job with our existing jobs
            setDataForm({ //resets the form wants user is done creating a job,
                companyName: "",
                jobTitle: "",
                applicationDate: "",
                applicationStatus: "Applied",
                notes: ""
            })
            setAdd(false)
        } catch(err) {
            console.error(`${err}`)
            alert("Something went wrong, try again later")
        }
    }

    //handler function; so if the add button is clicked, the form will appear
    const handleToggle = () => {
        setAdd(!add)
    }
    return (
        <main className='createdJob'>
            <button onClick={handleToggle}>Add Job</button>
            { add && (<form id="myForm" onSubmit={handleSubmit} className='form'>
                <input type="text" 
                        placeholder='Company Name'
                        name="companyName"
                        value={dataForm.companyName}
                        onChange={handleChange}
                        required
                />
                <input type="text"
                        placeholder="Job Title"
                        name="jobTitle"
                        value={dataForm.jobTitle}
                        onChange={handleChange}
                        required
                />
                <select name="applicationStatus"
                        value={dataForm.applicationStatus}  
                        onChange={handleChange}>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <input type="date"
                        placeholder='date'
                        name='applicationDate'
                        value={dataForm.applicationDate}
                        onChange={handleChange}
                        required
                />
                <input type="text"
                        placeholder='thoughts'
                        name='notes'
                        value={dataForm.notes}
                        onChange={handleChange}
                        required
                />
                <button type='submit'>Add</button>
            </form>)}
        </main>
    )
}