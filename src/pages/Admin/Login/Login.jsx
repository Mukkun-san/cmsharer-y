import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Login() {
    let history = useHistory();

    const [email, setEmail] = useState(window.sessionStorage.getItem("adminEmail") || "")
    const [password, setPassword] = useState(window.sessionStorage.getItem("adminPassword") || "")
    const [error, setError] = useState(null)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        if (!authorized) {
            axios.post('https://cm-sharer.herokuapp.com/api/v1/admin/login', { email, password }).then((result) => {
                if (result.data.authorized) {
                    history.push("/admin/dashboard")
                }
                console.log(result);
            }).catch((err) => {
                console.log(err)
            });
        } else {
            history.push("/admin/dashboard")
        }
    }, [authorized])

    async function Login() {
        let res = await axios.post('https://cm-sharer.herokuapp.com/api/v1/admin/login', { email, password })
        console.log(res.data);
        setError(res.data.error)
        setAuthorized(res.data.authorized)
        if (authorized) {
            window.sessionStorage.setItem("adminEmail", email);
            window.sessionStorage.setItem("adminPassword", password);
        }
    }
    return (
        <div>
            <div className="card w-50 bg-light mx-auto mt-5 pt-5">
                <div className="card-header">
                    <h1 className="text-center">Admin Login</h1>
                </div>
                <div className=" d-flex justify-content-center">
                    <div className="card-body col-6">
                        <form onSubmit={e => { e.preventDefault(); Login() }}>
                            <div className="form-group">
                                <label >Email</label>
                                <input required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <small id="emailHelp" className="form-text text-muted"></small>
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            {error ?
                                <p className=" alert-danger badge-danger text-center p-2">{error}</p>
                                : null}
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary" >Submit</button>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="card-footer text-muted">

                </div>
            </div>
        </div >
    )
}
