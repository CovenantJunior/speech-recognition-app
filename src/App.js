import React, { useState } from 'react';

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './App.css'
const App = () => {

  const { transcript, resetTranscript } = useSpeechRecognition();
  const [text, setText] = useState('')
  const [isListening, setListening] = useState(false)

  const handlePlay = () => {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synthesis.speak(utterance);
  };

  const handleSpeak = () => {
    resetTranscript()
    setListening(true)
    SpeechRecognition.startListening({
      continuous: true,
    });

  };
  const handleStop = () => {
    SpeechRecognition.stopListening();
    setListening(false)
    setText(transcript)
  };
  return (
    <div className="container mt-5">
      <div className="form-group mt-5">
        <label htmlFor="title">Speech Recognition</label>
        {isListening ? <textarea
          id="text"
          className="form-control"
          rows="10"
          value={transcript}
        ></textarea> : <textarea
          id="text"
          className="form-control"
          rows="10"
          value={text}
          onChange={(event) => {
            setText(event.target.value)
          }}
        ></textarea>}

      </div>
      <button id="play" className="btn btn-success mr-2" onClick={handlePlay}>
        Play
      </button>
      <button id='stop' onClick={handleStop} className='btn btn-danger mr-2'>
        Stop
      </button>
      <button id="speak" className="btn btn-warning  mr-2" onClick={handleSpeak}>
        Speak
      </button>
      {/* <div className="mt-3">
        <p id="output">{output}</p>
      </div> */}
    </div>

  );
}

export default App;