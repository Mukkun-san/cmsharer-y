import React from "react";

export default function Contact() {
  return (
    <div>
      <div className="card text-center w-75 bg-light mx-auto mt-5 mb-5 pt-5">
        <div className="card-header">
          <h1>Contact</h1>
        </div>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">
            <strong>
              <li>Contact Us</li>
            </strong>
            <li>This our email contact : cmsharer@gmail.com</li>
            <li>
              <strong>Reporting file</strong>
            </li>
            <strong>
              Please note that we deal only with messages that meet the
              following requirements:
            </strong>
            <li>Explain which copyrighted material is affected.</li>
            <li>Please provide the exact and complete to the url link.</li>
            <li>
              If it a case of files with illegal contents, please describe the
              contents briefly in two or three points.
            </li>
            <li>Please write to us only in english</li>
            <li>
              Please provide the file URL when filing a DMCA complain: e.g:
              https://cmsharer.com/drive/xxxxxx
            </li>
            <li>
              Written notice should be sent to our designated agent as follows:
              - via email: cmsharer.com@gmail.com
            </li>
          </p>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    </div>
  );
}
