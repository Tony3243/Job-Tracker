# Job-Tracker

A full-stack application used to manage Jobs. Features include adding a new job, updating, deleting and filtering created jobs based on application status

**Teach Stack**
- Frontend: React, Vite
- Backend: node.js + Express
- Database: PostgrSQL(supabase)

**Installation**

**Prerequisites**
- Install node.js
- create supabase account

**Installation Steps**

1. Clone the Repository:
```bash
git clone: https://github.com/Tony3243/Job-Tracker
cd job-tracker
```

2. Install Server Dependencies
```bash
cd server
npm install
```

3. Install Client Dependencies:
```bash
cd ../client
npm install
```

4. Set up Environment Varaibles:
create an `env.` folder in the `server` Folder

5. Create Database: 
Create a `jobs` table in supabase

6. Run the application:
Server:
```bash
cd server
node server.js
```
Client: 
```bash
cd ../client
npm run dev
 ```

7. Open http://localhost:8000/api/jobs

## Features

- ✅ Create a Job Application using a form
- ✅ Get All jobs
- ✅ Filter all jobs based on their application status
- ✅ Delete Job
- ✅ Update Job
- ✅ error handling
- ✅ loading states for updating, deleting, filtering

## Design Decisions 

- Used supabase instead of local PostreSQL: To encourage simple deployment and scalability
- Insisted on using regular css instead of tailwind: to capatilize on project learning and more access to styling
- Implmented snake-case to my columns in Javascript: to respect supabase customs
- Created tests in jest: to maximize function monitoring
- Used port 8000: to access service without root permissions

## Future Improvments 

- add user authentication
- instill darkmode
- apply deadline columns to maximize user awarness

## Running Test 
```bash
cd server
npm test
```