const PerformanceCard = ({ date }) => {
  return (
    <div>
      <div className=" flex justify-between bg-base-200 items-center w-full shadow-md rounded-md hover:bg-base-300 p-5">
        <div>
          <p className=" font-semibold">{date}</p>
          <span>0 tasks completed</span>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <p>Rating</p>
            <span className=" text-blue-700 text-xl font-semibold ">0/10</span>
          </div>
          <div>
            <p>Attendance </p>
            <span className="text-green-700 text-xl font-semibold ">0%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PerformanceCard;
