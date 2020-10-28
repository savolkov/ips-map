import React, { ChangeEvent, useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import './SpeechRecognition.css';
import { CancellationDetails, CancellationReason, ResultReason } from 'microsoft-cognitiveservices-speech-sdk';

type KeyStateType = {
    key: string;
    endpoint: string;
}

export default function SpeechRecognition() {
  const [keyState, setKeyState] = useState<KeyStateType>({ key: '', endpoint: '' });

  const fileInput = React.createRef<HTMLInputElement>();

  const handleKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setKeyState((prevState) => ({ ...prevState, key: event.target.value }));
  };
  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setKeyState((prevState) => ({ ...prevState, endpoint: event.target.value }));
  };

  const handleSubmitClick = () => {
    if (!fileInput.current?.files || fileInput.current?.files.length === 0) return;
    const file = fileInput.current.files[0];
    const speechConfig = sdk.SpeechConfig.fromSubscription(keyState.endpoint, keyState.key);
    const audioConfig = sdk.AudioConfig.fromWavFileInput(file);
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
      switch (result.reason) {
        case ResultReason.RecognizedSpeech:
          console.log(`RECOGNIZED: Text=${result.text}`);
          break;
        case ResultReason.NoMatch:
          console.log('NOMATCH: Speech could not be recognized.');
          break;
        case ResultReason.Canceled:
          const cancellation = CancellationDetails.fromResult(result);
          console.log(`CANCELED: Reason=${cancellation.reason}`);

          if (cancellation.reason === CancellationReason.Error) {
            console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
            console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
            console.log('CANCELED: Did you update the subscription info?');
          }
          break;
      }
    });
  };
  return (
    <div>
      Key:
      <input type="text" className="srText" value={keyState.key} onChange={handleKeyChange} />
      URL:
      <input type="text" className="srText" value={keyState.endpoint} onChange={handleUrlChange} />
      <input type="file" ref={fileInput} />
      <button
        type="button"
        onClick={handleSubmitClick}
      >
        Submit
      </button>
    </div>
  );
}
