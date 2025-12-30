import { Calendar } from "lucide-react";
import DailyPerformance from "./Performace_tabs/DailyPerformance";
import Last8Weeks from "./Performace_tabs/Last8Weeks";
import MonthlyPerformance from "./Performace_tabs/MonthlyPerformance";
import MotionDiv from "../../utils/MotionDiv";

const MyPerformancePage = () => {
  return (
    <div className="  p-6 ">
      <div className="flex flex-col gap-6">
        <MotionDiv delay={0.1}>
          <div>
            <h1 className="text-2xl font-semibold">My Performance</h1>
            <span className="label">
              Track your performance across daily, weekly, and monthly periods
            </span>
          </div>
        </MotionDiv>
        <MotionDiv delay={0.2}>
          <div className="flex items-center gap-5 shadow-md border-blue-200 border-2 rounded-md p-4">
            <div className=" btn bg-blue-100 p-6 rounded-md">
              <Calendar size={32} className=" text-blue-500 " />
            </div>
            <div className=" flex flex-col gap-2">
              <h2 className=" text-xl font-semibold">
                Current Performance Period
              </h2>
              <p className="">
                <span className=" font-semibold">Period:</span>{" "}
                <span className="label">24th Nov to 23rd Dec (28 days)</span>
              </p>
              <span className=" text-blue-500 font-semibold">
                Your performance is tracked from the 24th of last month to the
                23rd of the current month
              </span>
            </div>
          </div>
        </MotionDiv>
        <MotionDiv delay={0.3}>
          {/* name of each tab group should be unique */}
          <div className="tabs tabs-box p-4 bg-base-100 shadow-md rounded-xl">
            <input
              type="radio"
              name="my_tabs_6"
              className="tab 
               checked:tab-active 
              checked:bg-gradient-to-r 
             checked:from-blue-500 
             checked:to-cyan-500 
               checked:text-white 
               transition-all duration-300"
              aria-label="Daily Performance"
              defaultChecked
            />
            <div className="tab-content p-3 mt-4">
              <DailyPerformance />
            </div>

            <input
              type="radio"
              name="my_tabs_6"
              className="tab 
      checked:tab-active 
      checked:bg-gradient-to-r 
      checked:from-blue-500 
      checked:to-cyan-500 
      checked:text-white 
      transition-all duration-300"
              aria-label="Last 8 Weeks"
            />
            <div className="tab-content mt-4 p-3">
              <Last8Weeks />
            </div>

            <input
              type="radio"
              name="my_tabs_6"
              className="tab 
      checked:tab-active 
      checked:bg-gradient-to-r 
      checked:from-blue-500 
      checked:to-cyan-500 
      checked:text-white 
      transition-all duration-300"
              aria-label="Monthly"
            />
            <div className="tab-content mt-4 p-3">
              <MonthlyPerformance />
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};
export default MyPerformancePage;
