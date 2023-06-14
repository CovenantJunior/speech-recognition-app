import React, { useState } from 'react';

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './App.css'
const App = () => {
  const [text, setText] = useState('');
  // const [output, setOutput] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handlePlay = () => {

    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(transcript);
    synthesis.speak(utterance);
  };

  const handleSpeak = () => {
    resetTranscript()
    SpeechRecognition.startListening({
      continuous: true,
    });
    setText(transcript)

  };
  const handleStop = () => {

    SpeechRecognition.stopListening();

  };
  return (
    <div className="container mt-5">
      <div className="form-group mt-5">
        <label htmlFor="title">Speech Recognition</label>
        <textarea
          id="text"
          className="form-control"
          rows="10"
          value={transcript}
        ></textarea>
      </div>
      <button id="play" className="btn btn-warning mr-2" onClick={handlePlay}>
        Play
      </button>
      <button id='stop' onClick={handleStop} className='btn btn-success mr-2'>
        Stop
      </button>
      <button id="speak" className="btn btn-danger mr-2" onClick={handleSpeak}>
        Speak
      </button>
      {/* <div className="mt-3">
        <p id="output">{output}</p>
      </div> */}
    </div>

  );
}

export default App;