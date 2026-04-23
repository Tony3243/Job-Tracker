import request from 'supertest'
import app from "../server.js"

//using Jest to operate unit testing for successful operations
describe("Jobs API", () => {

    describe("GET/API/Jobs", () => {
        test("Should recieve a status of 200 and be an array", async () => {
            const response = await request(app).get("/api/jobs");
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.jobs).toBe(true))
        })
        test("Check if each object in Array has the right properties", async () => {
            const response = await request(app).get("/api/jobs");
            const arrayOfJobs = response.body.jobs;
            const properties = arrayOfJobs.forEach((element) => {
                element.id && element.company_name && element.job_title && element.application_status && element.application_date && element.notes ? true : false;
            })
            expect(properties).toBe(true)
        })
    })

})