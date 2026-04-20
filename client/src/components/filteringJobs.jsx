import React from 'react'

export default function Filtering({filtering, setFiltering}) {
    return (
        <div>
            <p>Filter Status:</p>
            <select value={filtering} onChange={(e) => setFiltering(e.target.value)}> {/* onCHANGE is called to change the value of filtering to the clients response/changes on the browser*/}
                <option value="All">All</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
            </select>
        </div>
    )
}