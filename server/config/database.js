import { Pool } from 'pg' //allows my node/express to access my PostgreSQL databases



export const pool = new Pool({ //creates/exports a pool that acts like a connection manager to my data in 
// supabase where I created my Jobs table
    connectionString: process.env.DATABASE_URL, //datbase_url is in my .env file
    ssl: {rejectUnauthorized: false}
})