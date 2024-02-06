import React from 'react';
import { MdOutlineKeyboardVoice } from 'react-icons/md'; 
import { useNavigate, useParams } from 'react-router-dom';
import RealTimeAnalysis from '../../component/RealTimeAnalysis/RealTimeAnalysis';

export default function Record() {
  const navigate = useNavigate();
  const { Id } = useParams();

  const handleCaptureConversation = async () => {
    try {
      // Request access to the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Do something with the stream, for example, log it to the console
      console.log('Microphone access granted:', stream);

      // Generate a random UUID using crypto.randomUUID
      const randomUuid = crypto.randomUUID();

      // Navigate to the "record/randomId" page with the generated UUID
      navigate(`/record/${randomUuid}`);
    } catch (error) {
      // Handle errors, for example, log them to the console
      console.error('Error accessing microphone:', error);
    }
  };

  return (
    <div className=''>
      {Id ? (
        <RealTimeAnalysis />
      ) : (
        <button
          type="button"
          className="btn bg-light bg-gradient btn-lg text-uppercase rounded-pill d-flex justify-content-center align-items-center"
          onClick={handleCaptureConversation}
        >
          <MdOutlineKeyboardVoice className='me-2'/>
          Capture Conversation
        </button>
      )}
    </div>
  );
}
