import React from 'react'
import './Newsletter.css'

export default function Newsletter() {
  return (
    <div className="mn-container">
    <div className="newsletter">
      {/* <i className="icon fa fa-envelope-o" style={{ fontSize: 34 }} /> */}
      <h1 className="title">Newsletter</h1>
      <div className="txt-holder">
        {/* <p className="txt-primary">Subscribe to our Newsletter</p> */}
        <p className="txt-secondary">
        Be the first to get notified of the latest offer!!
        </p>
      </div>
      <form action="#">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          className="form-control"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  </div>
  )
}
