import React,{useState} from 'react'
import './RealTimeAnalysis.css'
import { HiOutlineMicrophone } from "react-icons/hi";
import { IoPlaySharp } from "react-icons/io5";
import { IoMdPause } from "react-icons/io";
import ChatComponent from './ChatComponent';


export default function RealTimeAnalysis() {
  const [isShow,setIsShow] = useState(false);
  const showHide = () => {
    setIsShow(!isShow)
  }
  return (
    <div className='text-center'>
      <ChatComponent/>
      {isShow ? (<div className="paused-section">
        <h1>Paused</h1>
        <p>Press End Visit to generate your note, or play to continue.</p>
        <div className="listing-btn-section d-grid gap-2 d-md-flex justify-content-center">
          <button
              onClick={()=>showHide()}
              type="button"
              className="height-50 fs-6 text btn bg-light bg-gradient btn-lg text-uppercase rounded-pill d-flex justify-content-center align-items-center"
          >
            <HiOutlineMicrophone className='mx-2'/>
            END VISIT
          </button>
          <button className="btn bg-light bg-gradient rounded-pill px-4" type="button" onClick={()=>showHide()}><IoMdPause /></button>
        </div>
      </div>):(
        <div className="listing-section">
        <h1>Listening</h1>
        <p>Keep this screen open while speaking to your patient.</p>
        <div className="listing-btn-section d-grid gap-2 d-md-flex justify-content-center">
          <button
              onClick={()=>showHide()}
              type="button"
              className="height-50 fs-6 text btn bg-light bg-gradient btn-lg text-uppercase rounded-pill d-flex justify-content-center align-items-center"
          >
            <div className="object ms-3 me-4">
              <div className="outline">
              </div>
              <div className="outline" id="delayed">
              </div>
              <div className="button">
              </div>
              <div className="button" id="circlein">
                <HiOutlineMicrophone />
              </div>
            </div>
            END VISIT
          </button>
          <button className="btn bg-light bg-gradient rounded-pill px-4" type="button" onClick={()=>showHide()}><IoPlaySharp /></button>
        </div>
      </div>
      )}
    </div>
  )
}
