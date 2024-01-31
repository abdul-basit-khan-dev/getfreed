import React from 'react'
import './Navbar.css'
import { MdOutlineFeedback } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar p-1 bg-primary">
        <div className="container-fluid px-4">
          <a className="navbar-brand text-light" href='/'>Speak With Doctor</a>
          <div className="d-flex text-light fs-5">
            <MdOutlineFeedback  role="button" className='me-4'/>
            <FaRegCircleUser  role="button" className='me-2'/>
          </div>
        </div>
      </nav>
    </div>
  )
}
