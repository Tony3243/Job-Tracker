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
        async function fetchingdata() {
            try {
                const data = await getAllJobs()
                setJobs(data.jobs);
                setLoading(false);
                setError(null)
            } catch(err) {
                setError("The data could not be retrieved")
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
            {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : null}
            <JobForm setJobs={setJobs} jobs={jobs}/> <Filtering filtering={filtering} setFiltering={setFiltering}/>
            <div className='jobList'>{mappingStatus}</div>
        </div>
    )
}
export default Main