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
  const gameTime = 30;
  const [started, setStarted] = useState(false);
  const [gameDuration, setGameDuration] = useState(gameTime);

  const [totalScore, setTotalScore] = useState(0);
  const scores = [3, 2, 3, 2, 3, 2, 3, 2, 3];

  const startGame = () => setStarted(true);

  useEffect(() => {
    let intervalId;

    if (started) {
      setTotalScore(0);
      intervalId = setInterval(() => {
        setGameDuration((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [started]);

  return (
    <>
      <ScoreContext.Provider
        value={{
          totalScore: totalScore,
          gainPoints: setTotalScore,
        }}
      >
        <ModeSelector />
        <div className="Game__Interfaces pt-5 flex items-center justify-evenly">
          {!started && <StartButton handleClick={startGame} />}
          <Scoreboard totalScore={totalScore} />
          <Timeboard time={gameDuration} />
        </div>
        <div className="Game__Area">
          {started && (
            <div className="max-w-md grid grid-cols-3 grid-rows-3 gap-4 mt-20 mx-5 sm:mx-auto">
              {scores.map((s, i) => (
                <MoleSlot key={i} score={s} />
              ))}
            </div>
          )}
        </div>
      </ScoreContext.Provider>
    </>
  );
}

export default App;
