const StartButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className="bg-green-400 text-dark py-2 px-6 rounded-full inline-block">
      Start
    </button>
  );
};

export default StartButton;
