const Scoreboard = ({ totalScore, highScore, selectedMode }) => {
  return (
    <div className='border border-red-700 grid grid-cols-3 text-center font-medium text-3xl px-10'>
      <div>Your score:</div>
      {totalScore < 0 ? (
        <div className='text-green-500'>0</div>
      ) : (
        <div className='text-green-500'>{totalScore}</div>
      )}
      {selectedMode === 'easy' && (
        <div className='text-pink-900'>(Hi-Score: {highScore})</div>
      )}
    </div>
  );
};

export default Scoreboard;
