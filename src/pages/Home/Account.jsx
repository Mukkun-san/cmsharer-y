import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function Account({ user }) {
    let history = useHistory();

    useEffect(() => {
        if (!user.wc) {
            history.push("/")
        }
    })
    return (
        <div>
            <div className="card text-center w-75 bg-light mx-auto mt-5 pt-5">
                <div className="card-header">
                    <h1>Account Details</h1>
                </div>
                <div className="card-body d-flex justify-content-center">
                    <h5 className="card-title"></h5>
                    <p className="card-text">

                    </p>
                    <div class="card" style={{ width: "18rem" }}>
                        <div className="mt-5 d-flex justify-content-center">
                            <img class="card-img-top w-25 " style={{ width: "18rem" }} src={user.nt.JJ} alt="" />
                        </div>

                        <div class="card-body">
                            <h5 class="card-title">{user.nt.Ad}</h5>
                            <p class="card-text">{user.nt.Wt}</p>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-muted">

                </div>
            </div>
        </div>
    )
}
