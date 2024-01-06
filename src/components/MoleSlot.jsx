import { useState, useEffect, useContext, useRef } from 'react';
import { ScoreContext } from '../App';
import Mole from '../assets/mole.png';
import MoleAudio from '../assets/splash.wav';
import HitAudio from '../assets/hit.wav';

const MoleSlot = ({ score, selectedMode, setGameDuration }) => {
  const moleActiveTime = 1500;
  const penaltyPoints = 5;

  const { gainPoints } = useContext(ScoreContext);
  const [showX, setShowX] = useState(false);
  const [clicked, setClicked] = useState(false);

  const moleAudioRef = useRef();
  const hitAudioRef = useRef();

  useEffect(() => {
    const showXAfterRandomInterval = () => {
      const randomInterval =
        Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000; // Random interval between 3 to 10 seconds
      setTimeout(() => {
        setShowX(true);
        setClicked(false);

        setTimeout(() => {
          setShowX(false);

          showXAfterRandomInterval();
        }, moleActiveTime);
      }, randomInterval);
    };

    showXAfterRandomInterval();
    return () => {
      clearTimeout();
    };
  }, []);

  const playSound = () => {
    if (showX && !clicked) {
      gainPoints(score);
      setClicked(true);
      if (moleAudioRef.current) {
        moleAudioRef.current.currentTime = 0;
        moleAudioRef.current.play();
      }
    } else if (!showX) {
      setClicked(true);
      selectedMode === 'easy' ? gainPoints(-penaltyPoints) : setGameDuration(0);
      if (hitAudioRef.current) {
        hitAudioRef.current.currentTime = 0;
        hitAudioRef.current.play();
      }
    }
  };

  return (
    <button
      onClick={() => {
        playSound();
      }}
      className={`${
        showX ? 'active:bg-green-400' : 'active:bg-red-400'
      } aspect-square max-w-40 border-2 border-amber-900 cursor-pointer relative active:scale-110 transition duration-200 group`}
    >
      {!clicked && showX && (
        <div
          className={`p-5 select-none absolute w-full h-full inset-0 flex items-center justify-center text-4xl font-bold`}
        >
          <img
            src={Mole}
            className='w-full h-full object-contain group-active:animate-ping'
            draggable={false}
          />
        </div>
      )}
      <audio ref={moleAudioRef} src={MoleAudio} />
      <audio ref={hitAudioRef} src={HitAudio} />
    </button>
  );
};

export default MoleSlot;
