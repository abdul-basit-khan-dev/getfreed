import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import NotesList from "../NotesList/NotesList";

export default function Notes() {
  return (
    <>
    <div>
      <Link to="/record" className="btn btn-outline-primary w-100 d-flex justify-content-center align-items-center text-uppercase">
        <FaPlus className='me-2'/>
        Start a Visit
      </Link>
    </div>
    <div>
      <NotesList/>
    </div>
    </>
  )
}
