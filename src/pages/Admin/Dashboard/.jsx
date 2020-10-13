import React from 'react'

function dashboardCard(icon, title, count) {
    return (
        <div className="card text-center p-4 btn btn-light">
            <div className="card-content">
                <img style={{ opacity: 0.7 }} src={"https://img.icons8.com/material-outlined/65/000000/" + icon} alt="" />
                <span className="card-title"><h3 className="mt-3">{title}</h3></span>
                <h4>{count}</h4>
            </div>
        </div>
    )
}

export { dashboardCard }