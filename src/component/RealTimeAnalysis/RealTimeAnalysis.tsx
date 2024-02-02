import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import axios from 'axios';

export default function RealTimeAnalysis() {
  const [transcription, setTranscription] = useState('');
  const apiKey = process.env.REACT_APP_MY_CHATGPT_API_KEY
  const chatgptApiKey =  process.env.REACT_APP_CHATGPT_BASE_API_KEY

  const recorderControls = useAudioRecorder();

  const addAudioElement = async (blob: any) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;

    const formData = new FormData();
    formData.append('file', blob, 'audio.mp3');
    formData.append('model', 'whisper-1');
    formData.append('model', 'whisper-1');

    try {
      const response = await axios.post(`${chatgptApiKey}/audio/transcriptions`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (response.status === 200) {
        setTranscription(response.data.text);
      }

    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  };


  return (
    <div className='text-center'>
      <h6>Click and start recording now!</h6>
      <div className='d-flex justify-content-center'>
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
        />
      </div>
      <div className="border border-2 mt-3 w-100 rounded-2 p-2">
        {transcription && transcription}
      </div>
    </div>
  );
}
