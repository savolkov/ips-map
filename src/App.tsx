import React from 'react';
import './App.css';
import IPsMap from './components/IPsMap/IPsMap';
import SpeechRecognition from './components/SpeechRecognition/SpeechRecognition';

function App() {
  return (
    <div className="App">
      <h3>Find Wiki editors by IP!</h3>
      <IPsMap />
      <SpeechRecognition />
    </div>
  );
}

export default App;
