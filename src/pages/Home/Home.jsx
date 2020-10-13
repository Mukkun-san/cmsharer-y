import React, { useState, useEffect } from 'react'
import * as styles from './styles.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

export default function Home({ handleAuthClick, user }) {
    let history = useHistory();
    useEffect(() => {
        if (user && user.wc) {
            history.push("/account")
        }
    }, [user])
    return (
        <div className={`${styles.home}`}>
            <div className={`card text-center mt-5 p-4 pt-5 pb-5 pr-5 pl-4 ${styles.welcomeCard}`}>
                <div className="card-content">
                    <h3>WELCOME TO <b>CM Sharer</b>!</h3>
                    <br />
                    <p>Just Login to your google account to use our service.</p>
                    <div className="d-flex justify-content-center d-inline" onClick={() => { handleAuthClick() }}>
                        <div className="w-auto pr-5 pl-5 d-flex btn btn-light">
                            <img style={{ height: "2.5rem" }} alt='' src="https://img.icons8.com/plasticine/100/000000/google-logo.png" />
                            <p className="ml-4 mt-2" >Login With Google</p>
                        </div>
                    </div>

                    <img className="img-fluid w-50" src="https://cdn.dribbble.com/users/1279501/screenshots/4922374/illustration.png" alt="" srcSet="" />
                    <br />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum sapien lectus, id cursus elit venenatis mattis. Nullam vestibulum dolor mauris, nec ullamcorper augue commodo sit amet. Aliquam erat volutpat.</p>
                </div>
            </div>
        </div>
    )
}
