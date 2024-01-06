const ModeSelector = ({ easyMode, hardMode, selectedMode }) => {
  return (
    <div className='flex bg-pink-200 border-4 border-red-400 rounded-full py-2 items-center justify-center uppercase font-medium w-[90%] mt-2 mx-auto'>
      <div className='text-2xl mr-3'>Mode : </div>
      <button
        onClick={easyMode}
        className={`${
          selectedMode === 'easy' ? 'bg-green-700' : 'bg-gray-300'
        } text-white h-full inline-flex items-center mx-2 px-3 py-2`}
      >
        Easy
      </button>
      <button
        onClick={hardMode}
        className={`${
          selectedMode === 'hard' ? 'bg-green-700' : 'bg-gray-300'
        } text-white h-full inline-flex items-center mx-2 px-3 py-2`}
      >
        Hard
      </button>
    </div>
  );
};

export default ModeSelector;
