import { Calendar, CircleCheck, Clock, StarIcon, Wallet } from "lucide-react";
import MotionDiv from "../../utils/MotionDiv";
import { useEmployeeTime } from "../../context/employeeTimeContext";
import DashboardChart from "./DashboardChart";
import PerformanceChart from "./PerformanceChart";

const EmployeeDashboard = () => {
  const { clockInTime, clockOutTime, formatTime } = useEmployeeTime();
  return (
    <div className=" flex flex-col gap-3 p-4 ">
      <MotionDiv delay={0.1}>
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, User Name!</h1>
          <span className="label">
            Here's Your overview for today and this month{" "}
          </span>
        </div>
      </MotionDiv>
      <MotionDiv delay={0.2}>
        <div className="flex flex-col gap-3 bg-gradient-to-r from-indigo-100 to-cyan-300 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className=" text-2xl font-bold">Today's Status</h1>
              <p>Thursday, December 11, 2025</p>
            </div>
            <div className="">
              <div className=" btn btn-circle btn-lg bg-transparent btn-outline  p-3">
                <Clock size={32} />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3">
            <div className=" border-2 rounded-lg p-2 bg-gradient-to-r from-indigo-200 w-full ">
              <p>Login Time</p>
              <span> {formatTime(clockInTime)}</span>
            </div>
            <div className=" border-2 rounded-lg p-2 bg-gradient-to-r from-indigo-200 w-full ">
              <p>Logout Time</p>
              <span> {formatTime(clockOutTime)}</span>
            </div>
          </div>

          <div className=" border-2 rounded-lg p-2 bg-gradient-to-r from-indigo-200 w-full ">
            <p className="text-base">Status</p>
            <h1 className=" text-2xl font-semibold">
              {clockInTime && !clockOutTime
                ? "Working"
                : clockOutTime
                ? "Completed"
                : "Not Started"}
            </h1>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4  justify-between p-4">
          <div className="  p-4 rounded-xl shadow-2xl flex justify-between items-center gap-3 lg:w-[250px] hover:scale-105 transform transition-all duration-300 ">
            <div>
              <p className="">Present Days</p>
              <span className=" font-semibold text-xl">10</span>
            </div>
            <div className=" btn bg-green-500 p-2  hover:scale-105 hover:rotate-10 transform transition-all duration-300">
              <CircleCheck size={30} />
            </div>
          </div>
          <div className="  p-4 rounded-xl shadow-2xl flex justify-between items-center gap-3 lg:w-[250px] hover:scale-105 transform transition-all duration-300  ">
            <div>
              <p>Absent Days</p>
              <span className=" font-semibold text-xl">0</span>
            </div>
            <div className=" btn bg-orange-500 p-2   hover:scale-105 hover:rotate-10 transform transition-all duration-300">
              <Calendar size={30} />
            </div>
          </div>
          <div className="  p-4 rounded-xl shadow-2xl flex justify-between items-center gap-3 lg:w-[250px] hover:scale-105 transform transition-all duration-300 ">
            <div>
              <p>Performance Score</p>
              <span className=" font-semibold text-xl">0/5</span>
            </div>
            <div className=" btn bg-purple-500 p-2   hover:scale-105 hover:rotate-10 transform transition-all duration-300">
              <StarIcon size={30} />
            </div>
          </div>
          <div className="  p-4 rounded-xl shadow-2xl flex justify-between items-center gap-3 lg:w-[250px] hover:scale-105 transform transition-all duration-300 ">
            <div>
              <p>Month Earning</p>
              <span className=" font-semibold text-xl">₹00000</span>
            </div>
            <div className=" btn bg-violet-500 p-2   hover:scale-105 hover:rotate-10 transform transition-all duration-300">
              <Wallet size={30} />
            </div>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv delay={0.4}>
        <div className="flex max-sm:flex-col md:justify-between w-full items-center gap-3">
          <div className="w-full">
            <DashboardChart />
          </div>
          <div className="w-full">
            <PerformanceChart />
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default EmployeeDashboard;
