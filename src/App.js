import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  const handlePlay = () => {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synthesis.speak(utterance);
  };

  const handleSpeak = () => {
    const recognition = new window.webkitSpeechRecognition() || window.SpeechRecognition;
    const recognitionInstance = new recognition();

    recognitionInstance.onresult = (event) => {
      const { transcript } = event.results[0][0];
      setOutput(transcript);
      setText(transcript);
    };

    recognitionInstance.onerror = (event) => {
      setOutput('Error: ' + event.error);
    };

    recognitionInstance.start();
  };

  return (
    <div className="container mt-5">
      <div className="form-group mt-5">
        <label htmlFor="title">Speech Recognition</label>
        <textarea
          id="text"
          className="form-control"
          rows="10"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button id="play" className="btn btn-warning mr-2" onClick={handlePlay}>
        Play
      </button>
      <button id="speak" className="btn btn-danger mr-2" onClick={handleSpeak}>
        Speak
      </button>
      <div className="mt-3">
        <p id="output">{output}</p>
      </div>
    </div>
  );
}

export default App;