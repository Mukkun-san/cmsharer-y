import React from 'react'
import styles from './styles.module.css'
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div class="container text-center w-100 pt-5 mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class={styles.errorTemplate}>
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <br />
                        <div class="error-details">
                            Sorry, Requested page not found!
                </div>
                        <br />
                        <div class={styles.errorActions}>
                            <Link to="/" class="btn btn-dark btn-lg mr-3"><span class="glyphicon glyphicon-home"></span>
                        Take Me Home </Link>
                            <Link to="/contact" class="btn btn-warning btn-lg ml-3">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
