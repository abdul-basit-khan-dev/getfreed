import axios from 'axios';
const apiKey = process.env.REACT_APP_MY_CHATGPT_API_KEY
const chatgptApiKey =  process.env.REACT_APP_CHATGPT_BASE_API_KEY


export const  addAudioElement = async (blob: any) => {
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

      return response
    }

  } catch (error) {
    console.error('Error transcribing audio:', error);
    return error
  }
};

