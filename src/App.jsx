import "./App.css";
import { createContext, useEffect, useState } from "react";
import { MoleSlot } from "./components";
import StartButton from "./base/StartButton";
import Scoreboard from "./base/Scoreboard";
import Timeboard from "./base/Timeboard";
import ModeSelector from "./base/ModeSelector";

export const ScoreContext = createContext({
  totalScore: 0,
  gainPoints: () => {},
});

function App() {
  const scores = [3, 2, 3, 2, 3, 2, 3, 2, 3];

  const [started, setStarted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [selectedMode, setSelectedMode] = useState("easy");

  const gameTime = selectedMode === "easy" ? 3 : 60;

  const [gameDuration, setGameDuration] = useState(gameTime);

  const startGame = () => {
    setStarted(true);
    setGameDuration(gameTime);
  };

  const gainPoints = (points) => {
    setTotalScore((prevTotalScore) => {
      const newTotalScore = prevTotalScore + points;
      if (newTotalScore > highScore) {
        setHighScore(newTotalScore);
      }
      return newTotalScore;
    });
  };

  useEffect(() => {
    let intervalId;

    if (started) {
      setTotalScore(0);
      intervalId = setInterval(() => {
        setGameDuration((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(intervalId);
            setStarted(false);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [started]);

  const changeMode = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <>
      <ScoreContext.Provider
        value={{
          totalScore: totalScore,
          gainPoints: gainPoints,
        }}
      >
        <ModeSelector changeMode={changeMode} selectedMode={selectedMode} />
        <div className="Game__Interfaces pt-5 grid grid-cols-4 text-center">
          <div className="col-span-1">{!started && <StartButton show={started} handleClick={startGame} />}</div>
          <div className="col-span-2">
            {<Scoreboard totalScore={totalScore} highScore={highScore} selectedMode={selectedMode} />}
          </div>
          <div className="col-span-1">{started && <Timeboard time={gameDuration} />}</div>
        </div>
        <div className="Game__Area">
          {started && (
            <div className="max-w-md grid grid-cols-3 grid-rows-3 gap-4 mt-20 mx-5 sm:mx-auto">
              {scores.map((s, i) => (
                <MoleSlot
                  key={i}
                  score={s}
                  started={started}
                  selectedMode={selectedMode}
                  setGameDuration={setGameDuration}
                />
              ))}
            </div>
          )}
        </div>
      </ScoreContext.Provider>
    </>
  );
}

export default App;
