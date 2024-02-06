import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import './RealTimeAnalysis.css'
import { HiOutlineMicrophone } from "react-icons/hi";
import { IoPlaySharp } from "react-icons/io5";
import { IoMdPause } from "react-icons/io";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export default function RealTimeAnalysis() {
  const [transcription, setTranscription] = useState('');
  const apiKey = process.env.REACT_APP_MY_CHATGPT_API_KEY
  const chatgptApiKey =  process.env.REACT_APP_CHATGPT_BASE_API_KEY
  const [isLoading, setIsLoading] = useState(false);
  const recorderControls = useAudioRecorder();

  const addAudioElement = async (blob: any) => {
    const formData = new FormData();
    formData.append('file', blob, 'audio.mp3');
    formData.append('model', 'whisper-1');

    try {
      const voiceResponse = await axios.post(`${chatgptApiKey}/audio/transcriptions`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (voiceResponse.status === 200) {
        let text = voiceResponse.data.text
        let finalFormat = `Act like "The AI Medical Scribe for Clinicians"
        without including Patient and doctor name.

        Use this conversion
        "${text}"

        just return response of below points

        History of Present Illness: in Ordered list
        Objective: in Ordered list and sub unordered list
        Assessment & Plan: in Ordered list and sub unordered list
        Patient Instructions: in application using format including Dear Patient Best regards,[Provider's Name] by 
        Summary: of the provided information`

        const response = await axios.post(
          `${chatgptApiKey}/chat/completions`,
          {
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: finalFormat },
            ],
            model: 'gpt-3.5-turbo',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.choices[0].message.content;
          setTranscription(data);
        }
        setIsLoading(false)
        recorderControls.recordingBlob = undefined
      }

    } catch (error) {
      console.error('Error transcribing audio:', error);
      setIsLoading(false)
    }
  };

  const stopRecording = async (event: any) => {
    event.preventDefault();
    setIsLoading(true)

    await recorderControls.stopRecording();
  };

  const startRecording = (event: any) => {
    recorderControls.startRecording();
  };


  useEffect(() => {
    if (!recorderControls.recordingBlob) return;

    addAudioElement(recorderControls.recordingBlob);
  }, [recorderControls.recordingBlob])

  if (isLoading) {
    return (
      <div>
        <h6>Generating response, Please wait </h6>
        <div className="loading-screen m-auto">
          <div className="bars-container">
            <div className="bar bar-1"></div>
            <div className="bar bar-2"></div>
            <div className="bar bar-3"></div>
            <div className="bar bar-4"></div>
            <div className="bar bar-5"></div>
            <div className="bar bar-6"></div>
            <div className="bar bar-7"></div>
            <div className="bar bar-8"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='text-center'>
      {!recorderControls.isRecording && (
      <div className="paused-section">
        <h1>Paused</h1>
        <p>Press End Visit to generate your note, or play to continue.</p>
        <div className="listing-btn-section d-grid gap-2 d-md-flex justify-content-center">
          <button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => startRecording(event)}
              type="button"
              className="height-50 fs-6 text btn bg-light bg-gradient btn-lg text-uppercase rounded-pill d-flex justify-content-center align-items-center"
          >
            <HiOutlineMicrophone className='mx-2'/>
            END VISIT
          </button>
          <button className="btn bg-light bg-gradient rounded-pill px-4" type="button" onClick={(event: React.MouseEvent<HTMLButtonElement>) => startRecording(event)}><IoMdPause /></button>
        </div>
      </div>
      )}
      {recorderControls.isRecording && (
        <div className="listing-section">
          <h1>Listening</h1>
          <p>Keep this screen open while speaking to your patient.</p>
          <div className="listing-btn-section d-grid gap-2 d-md-flex justify-content-center">
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => stopRecording(event)}
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
            <button className="btn bg-light bg-gradient rounded-pill px-4" type="button" onClick={(event: React.MouseEvent<HTMLButtonElement>) => stopRecording(event)}><IoPlaySharp /></button>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center my-2">
        <AudioRecorder
          onRecordingComplete={(blob) => {
            console.log('recording complete')
          }}
          classes={{
            AudioRecorderClass: 'recorder',
            AudioRecorderTimerClass: 'content',
            AudioRecorderStatusClass: 'content status',
            AudioRecorderStartSaveClass: 'display-none',
            AudioRecorderPauseResumeClass: 'display-none',
            AudioRecorderDiscardClass: 'display-none',
          }}
          recorderControls={recorderControls}
          showVisualizer={true}
        />
      </div>
    </div>
  )
}
