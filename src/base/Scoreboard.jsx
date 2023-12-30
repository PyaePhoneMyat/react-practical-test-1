const Scoreboard = ({ totalScore }) => {
  return (
    <div className="grid grid-cols-3 text-center font-medium text-3xl px-10">
      <div>Your score:</div>
      <div className="text-green-500">{totalScore}</div>
      <div className="text-pink-900">(Hi-Score: 0)</div>
    </div>
  );
};

export default Scoreboard;
