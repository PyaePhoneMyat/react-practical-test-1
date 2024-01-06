const Timeboard = ({ time }) => {
  return (
    <h2 className="text-center font-medium text-lg flex items-center">
      Time remaining: <span className="text-2xl text-yellow-500 mx-5">{time}</span>
    </h2>
  );
};

export default Timeboard;
