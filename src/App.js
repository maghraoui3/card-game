import React, { useState, useEffect, useRef } from 'react';
import './app.css';
import logo from './media/logo.png';
import option1 from './media/menu-components/Untitled-1.png';
import option2 from './media/menu-components/Untitled-2.png';
import option3 from './media/menu-components/Untitled-3.png';
import arrowBack from './media/arrow_back.png';
import NormalGame from './components/NormalGamee';
import soundTrack from './media/Dj-Snake-Tounsi.mp3';

function App() {
  const [gameType, setGameType] = useState('');
  const [audioMuted, setAudioMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    if (!audioMuted) {
      audio.play().catch((error) => {
        console.error('Audio playback error:', error);
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioMuted]);

  const handleAudioToggle = () => {
    setAudioMuted(!audioMuted);
  };

  return (
    <div className="App">
      <button onClick={handleAudioToggle} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '1', color: 'white', backgroundColor: 'transparent', cursor: 'pointer' }}>
        {audioMuted ? 'Unmute' : 'Mute'}
      </button>

      {gameType === '' ? (
        <div className='HomePage'>
          <img style={{ width: '350px' }} src={logo} alt={'logo'} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className='homePage-btn'><img onClick={() => { setGameType('normal'); setAudioMuted(false); }} src={option1} alt='' /></div>
            <div className='homePage-btn'><img onClick={() => { setGameType('+18'); setAudioMuted(false); }} src={option2} alt='' /></div>
            <div className='homePage-btn'><img onClick={() => { setGameType('kouktel'); setAudioMuted(false); }} src={option3} alt='' /></div>
          </div>
        </div>
      ) : (
        <div>
          <div onClick={() => setGameType('')} style={{ backgroundColor: 'red', borderRadius: '1000px', position: 'absolute', top: '10px', left: '10px', zIndex: '1', padding: '10px 10px 0px 10px', boxShadow: '3px 2px 30px 10px black', cursor: 'pointer' }}><img src={arrowBack} style={{ width: '30px' }} alt="arrow back" /></div>
          {gameType === 'normal' ? <NormalGame gameType="normal" /> : gameType === '+18' ? <NormalGame gameType="+18" /> : <NormalGame gameType="kouktel" />}
        </div>
      )}

      <audio ref={audioRef} id="background-audio" loop>
        <source src={soundTrack} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
