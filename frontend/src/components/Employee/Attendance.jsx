import { Calendar, CircleCheckBig, CircleMinus } from "lucide-react";
import React from "react";
import MotionDiv from "../../utils/MotionDiv";

const Attendance = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <MotionDiv delay={0.1}>
          <div>
            <h1 className=" text-3xl font-semibold">My Attendance</h1>
            <span className=" label">
              View your attendance history and statistics
            </span>
          </div>
        </MotionDiv>
        <MotionDiv delay={0.2}>
          <div className=" grid grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex justify-evenly items-center gap-2 shadow-md p-2 rounded-md w-[150px]">
              <Calendar />
              <div>
                <p>Total</p>
                <span className=" font-semibold">10</span>
              </div>
            </div>
            <div className="flex justify-evenly items-center gap-2 shadow-md p-2 rounded-md w-[150px]">
              <Calendar />
              <div>
                <p>Present</p>
                <span className=" font-semibold">9</span>
              </div>
            </div>
            <div className="flex justify-evenly items-center gap-2 shadow-md p-2 rounded-md w-[150px]">
              <Calendar />
              <div>
                <p>Late</p>
                <span className=" font-semibold">0</span>
              </div>
            </div>
            <div className="flex justify-evenly items-center gap-2 shadow-md p-2 rounded-md w-[150px]">
              <Calendar />
              <div>
                <p>Half Day</p>
                <span className=" font-semibold">1</span>
              </div>
            </div>
            <div className="flex justify-evenly items-center gap-2 shadow-md p-2 rounded-md w-[150px]">
              <Calendar />
              <div>
                <p>Leave</p>
                <span className=" font-semibold">0</span>
              </div>
            </div>
            <div className="flex justify-evenly items-center gap-2 shadow-md p-2 rounded-md w-[150px]">
              <Calendar />
              <div>
                <p>Absent</p>
                <span className=" font-semibold">0</span>
              </div>
            </div>
          </div>
        </MotionDiv>
        <MotionDiv delay={0.3}>
          <div className="flex gap-3 flex-col shadow-md rounded-md p-4">
            <p className=" font-semibold text-2xl">Attendance Percentage</p>
            <div className="flex items-center gap-3">
              <progress
                className="progress progress-success "
                value="90"
                max="100"
              ></progress>
              <span>90%</span>
            </div>
          </div>
        </MotionDiv>
        <MotionDiv delay={0.4}>
          <div className="flex gap-3 flex-col shadow-md rounded-md p-4">
            <p className=" font-semibold text-2xl">Attendance History</p>
            <div className="flex gap-3 flex-col">
              <div className="flex justify-between items-center shadow-sm rounded-md p-4">
                <div className=" flex space-x-4 items-center">
                  <CircleCheckBig className=" text-success" />
                  <div>
                    <p className="font-semibold">Thursday, December 11, 2025</p>
                    <span>09:00:00 - 18:00:00</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <p className=" badge badge-success font-semibold ">PRESENT</p>
                  <span className="label ">Full Day Present - </span>
                  <span className="label">Time Condition Meet </span>
                </div>
              </div>
              <div className="flex justify-between items-center shadow-sm rounded-md p-4">
                <div className=" flex space-x-4 items-center">
                  <Calendar className=" " />
                  <div>
                    <p className="font-semibold">Sunday, December 07, 2025</p>
                    <span>Weekend - Not Counted</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <p className=" badge badge-ghost font-semibold">WEEKEND</p>
                </div>
              </div>
              <div className="flex justify-between items-center shadow-sm rounded-md p-4">
                <div className=" flex space-x-4 items-center">
                  <CircleMinus className=" text-amber-300" />
                  <div>
                    <p className="font-semibold">Thursday, December 05, 2025</p>
                    <span>09:00:00 - 13:00:00</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <p className=" badge badge-warning font-semibold">HALF-DAY</p>
                  <span className="label">Logout - </span>
                  <span className="label">HALF_DAY </span>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Attendance;
