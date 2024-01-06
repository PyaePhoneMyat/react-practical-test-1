import { useState, useEffect, useContext, useRef } from "react";
import { ScoreContext } from "../App";
import Mole from "../assets/mole.png";
import MoleAudio from "../assets/splash.wav";
import HitAudio from "../assets/hit.wav";

const MoleSlot = ({ score, selectedMode, setGameDuration }) => {
  const moleActiveTime = 1500;
  const penaltyPoints = -5;

  const { gainPoints } = useContext(ScoreContext);
  const [showX, setShowX] = useState(false);

  const moleAudioRef = useRef();
  const hitAudioRef = useRef();

  useEffect(() => {
    let timer1, timer2;

    const showXAfterRandomInterval = () => {
      const randomInterval = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000; // Random interval between 3 to 10 seconds
      timer1 = setTimeout(() => {
        setShowX(true);

        timer2 = setTimeout(() => {
          setShowX(false);

          showXAfterRandomInterval();
        }, moleActiveTime);
      }, randomInterval);
    };

    showXAfterRandomInterval();
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const playSound = () => {
    if (showX) {
      if (moleAudioRef.current) {
        moleAudioRef.current.currentTime = 0;
        moleAudioRef.current.play();
      }
    } else if (!showX) {
      if (hitAudioRef.current) {
        hitAudioRef.current.currentTime = 0;
        hitAudioRef.current.play();
      }
    }
  };

  const updatePoints = () => {
    if (showX) {
      gainPoints(score);
    } else {
      selectedMode === "easy" ? gainPoints(penaltyPoints) : setGameDuration(0);
    }
  };

  const handleClick = () => {
    setShowX(false);
    playSound();
    updatePoints();
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        showX ? "active:bg-green-400" : "active:bg-red-400"
      } aspect-square max-w-40 border-2 border-amber-900 cursor-pointer relative active:scale-110 transition duration-200 group`}
    >
      {showX && (
        <div
          className={`p-5 select-none absolute w-full h-full inset-0 flex items-center justify-center text-4xl font-bold`}
        >
          <img src={Mole} className="w-full h-full object-contain group-active:animate-ping" draggable={false} />
        </div>
      )}
      <audio ref={moleAudioRef} src={MoleAudio} />
      <audio ref={hitAudioRef} src={HitAudio} />
    </button>
  );
};

export default MoleSlot;
