import { pool } from '../config/database.js' 


//this function gets all the jobs
export async function getAllJobs(req, res) {
    try {
        const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC'); //get all columns from jobs with created_at being first
        console.log('responded:', result) //my console checks
        res.json({
            message: 'Database connected',
            jobs: result.rows
        })
    } catch(err) {
            res.status(500).json({error: err.message})
            console.log(`error: ${err}`)
        }   
}

export async function createJob(req, res) {
    const {companyName, jobTitle, applicationStatus, applicationDate, notes} = req.body;
    const validStatus = ['Applied', "Rejected", "Interviewing", "Offer"];
    if(!companyName || !jobTitle || !applicationStatus || !applicationDate || !notes) {
        return res.status(400).json({
            error: "Missing Field",
            recieved: `${req.body}`
        })
    }
    if(!validStatus.includes(applicationStatus)) {
            return res.status(400).json({error: "Invalid Input"})
    }

    try {
        const query = (
            `INSERT INTO jobs (company_name, job_title, application_status, application_date, notes)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *`
        )
        const insertingData = await pool.query(query, [companyName, jobTitle, applicationStatus, applicationDate, notes])
        res.status(201).json(insertingData.rows[0])
    } catch(err) {
        res.status(500).json({error: `Experiencing error: ${err}`})
        console.log(`error: ${err}`)
    }
}

export async function updateJob(req, res) {
    const id = req.params.id;
    const { companyName, jobTitle, applicationStatus, applicationDate, notes} = req.body;
    if(!id) {
        return res.status(400).json({error: "Invalid id"})
    }
    try {
        const updatingQuery = (
            `UPDATE jobs 
             SET company_name = $1, job_title = $2, application_status = $3, application_date = $4, notes = $5, created_at = NOW()
             WHERE id = $6
             RETURNING *`
        )
        const changingData = await pool.query(updatingQuery, [companyName, jobTitle, applicationStatus, applicationDate, notes, id])
        if(changingData.rows.length === 0) {
            return res.status(404).json({error: 'Job doesn\'t exist'})
        }
        res.status(200).json(changingData.rows[0])
    } catch(err) {
        res.status(500).json({error: `${err}`})
        console.log(`error: ${err}`)
    }
}

export async function deleteJob(req, res) {
    const id = req.params.id;
    try {
        const deleteQuery = (
            `DELETE FROM jobs
            WHERE ID = $1
            RETURNING *`
        )
        const deleting = await pool.query(deleteQuery, [id])
        if(deleting.rows.length === 0) {
            return res.status(404).json({error: "No job to delete"})
        }
        res.status(200).json(deleting.rows[0])
    } catch(err) {
        res.status(500).json({error: `${err}`})
        console.log(`error: ${err}`)
    }
}