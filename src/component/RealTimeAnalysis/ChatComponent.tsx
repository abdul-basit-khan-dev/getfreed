import React, { useState } from 'react';
import axios from 'axios';

type Message = {
  role: string;
  content: string;
};

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_MY_CHATGPT_API_KEY || '');


  console.log(apiKey, 'apiKey')

  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input },
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

      // Extracting data in the desired format
      const data = response.data.choices[0].message.content;
      console.log(response, 'response')
      console.log(data, 'data')

      const [subjactive, objective, assessmentPlan, patientInstruction, summary, time] = data.split('\n');


      // Update the conversation history with the extracted data
      setMessages([
        ...messages,
        { role: 'assistant', content: subjactive },
        { role: 'assistant', content: objective },
        { role: 'assistant', content: assessmentPlan },
        { role: 'assistant', content: patientInstruction },
        { role: 'assistant', content: summary },
        { role: 'assistant', content: time },
      ]);

      console.log(messages, 'messages')


      // Clear the input field
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='chat-container'>
      <div>
        {messages.map((message, index) => (
          <div className={`message-container ${message.role}`} key={index}>
            {message.content}
          </div>
        ))}
      </div>
      <div className='input-container'>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;

