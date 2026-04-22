import React from 'react'
import {updateJob, deleteJob} from '../api/jobApi.js'

export default function JobCard({title, setJobs, jobs}) {
    const [editId, setEditId] = React.useState(null)//which job is being edited
    const [editForm, setEditForm] = React.useState({})//edit/delete that specific job
    const [eraseId, setEraseId] = React.useState(null)//which job is being deleted
    const [update, setUpdate] = React.useState(false)//update indication
    const [isDeleted, setIsDeleted] = React.useState(false)//deleting indication
    const [error, setIsError] = React.useState(false)

    const dialogRef = React.useRef(null) //initialize a ref to interact with the form DOM element when updating
    const deleteRef = React.useRef(null) // ref for deleting

    //auto clear error that uses setTimeout to make it appear for five seconds
    React.useEffect(() => {
        if(error) {
            const timer = setTimeout(() => setIsError(null), 5000);
            return (() => clearTimeout(timer))
        }
    }, [error])


    //handles which column is currently being edited in our modal
    function editHandlerClick(job) {
        setEditId(job.id);
        setEditForm({
            companyName: job.company_name || "",
            jobTitle: job.job_title || "",
            applicationStatus: job.application_status || "",
            applicationDate: job.application_date || "",
            notes: job.notes || ""
        })
        dialogRef.current.showModal()//call the built-in modal method on form
    }
    
    //handles submitting our changes and what happens after
    const handleEditSubmit = async(e) => {
        e.preventDefault();
        setUpdate(true)
        try {
            const editing = await updateJob(editId, editForm)
            // console.log("editing response:", editing)      // what comes back from backend
            // console.log("editForm being sent:", editForm)  // what we're sending
            // console.log("editId:", editId)    
             //update Job list
            setJobs(prev => prev.map(element => element.id === editId ? editing : element))
            //clears editing state
            setEditId(null)
            setEditForm({})
            dialogRef.current.close()
        }catch(err) {
            setIsError(err.message)
            console.error(`error: ${err}`)
        } finally {
            setUpdate(false)
        }
    }
    
    //handles updating our info 
    const handleChange = (e) => {
        setEditForm(prevInfo => { 
            return {
                ...prevInfo, [e.target.name]: e.target.value
            }
        })
    }

//deletes current id
   const deleteHandlerClick = async(e) => {
        setIsDeleted(true)
        try{
            const deleting = await deleteJob(eraseId);
            setJobs(prev => prev.filter(element => element.id !== eraseId));
            setEraseId(null)
            deleteRef.current.close();
        }catch(err) {
            setIsError(err.message)
            console.error(`error: ${err}`)
        } finally {
            setIsDeleted(false)
        }
   }

    return (
            <div key={title.id} className="jobCard">
                <h3>{title.company_name}</h3>
                <h5>Role: {title.job_title}</h5>
                <h5>Status: {title.application_status}</h5>
                <h5>Application Date: {title.application_date}</h5>
                <h5>Notes: {title.notes}</h5>
                <button onClick={() => editHandlerClick(title)}>Edit</button>
                    <dialog ref={dialogRef}>
                        <form onSubmit={handleEditSubmit}>
                            {error && (
                            <div className="error-message">{error}
                                <button onClick={() => setIsError(null)}>Dismiss</button>
                            </div>)}
                            <input name="companyName" value={editForm.companyName} onChange={handleChange}></input>
                            <input name="jobTitle" value={editForm.jobTitle} onChange={handleChange}></input>
                            <select name="applicationStatus" value={editForm.applicationStatus} onChange={handleChange}>
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                            <input type="date" name="applicationDate" value={editForm.applicationDate} onChange={handleChange}></input>
                            <input name="notes" value={editForm.notes} onChange={handleChange}></input>
                            <button type="submit" disabled={update}>{update ? "Updating..." : "Save"}</button> <button type="button" onClick={() => dialogRef.current.close()}>Close</button>
                        </form>
                    </dialog>
                    <button onClick={() => {setEraseId(title.id); deleteRef.current.showModal()}}>Delete</button>
                    <dialog ref={deleteRef}>
                        <h6>Are you sure you want to Delete</h6>
                        <button type="button" onClick={deleteHandlerClick} disabled={isDeleted}>{isDeleted ? "Deleting..." : "Yes"}</button> <button type="button" onClick={() => deleteRef.current.close()}>No</button>
                    </dialog>
            </div>
            
    )
}