import React from 'react'
import { MdOutlineKeyboardVoice } from "react-icons/md";


export default function Record() {
  return (
    <div className=''>
      <button type="button" className="btn bg-light bg-gradient btn-lg text-uppercase rounded-pill d-flex justify-content-center align-items-center">
        <MdOutlineKeyboardVoice  className='me-2'/>
        Capture Conversation
      </button>
    </div>
  )
}
