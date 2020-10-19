import React from 'react'

export default function Loader() {
    return (
        <div
          id="loader"
          className="row align-items-center"
          style={{ height: "100vh" }}>
          <div className="mx-auto text-center">
            <div
              className="spinner-border text-info"
              style={{ width: "5rem", height: "5rem" }}
              role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
    )
}
