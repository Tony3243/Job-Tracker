import React from 'react'
import {getAllJobs} from "./api/jobApi"
import JobCard from './components/jobCard.jsx'
import JobForm from './components/jobForm.jsx'
import Filtering from './components/filteringJobs.jsx'


function Main() {
    const [jobs, setJobs] = React.useState([])

    const [loading, setLoading] = React.useState(true)

    const [error, setError] = React.useState(null)

    const [filtering, setFiltering] = React.useState("All")

    React.useEffect(() => {
        if(error) {
            const timer = setTimeout(() => setError(null), 5000);
            return (() => clearTimeout(timer))
        }
    }, [error])

    React.useEffect(() => {
        async function fetchingdata() {
            try {
                const data = await getAllJobs()
                setJobs(data.jobs);
                setLoading(false);
                //setError(null)
            } catch(err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchingdata()
    }, [])
    //filter the jobs based on applicationStatus
    const filterData = filtering === "All" ? jobs : jobs.filter(specific => specific.application_status === filtering)
    //consolelog(filterData)
    //prseenting the jobs based on the status
    const mappingStatus = filterData.map(columns => 
        <JobCard key={columns.id} title={columns} jobs={jobs} setJobs={setJobs}/>
    )
    return (
        <div>
            {loading &&(<div className="loading">Loading...</div>)}
            {error && (<div className="error-message">
                {error}
                <button onClick={(() => setError(null))}>Dismiss</button>
            </div>)}
            <JobForm setJobs={setJobs} jobs={jobs}/> <Filtering filtering={filtering} setFiltering={setFiltering}/>
            <div className='jobList'>{mappingStatus}</div>
        </div>
    )
}
export default Main