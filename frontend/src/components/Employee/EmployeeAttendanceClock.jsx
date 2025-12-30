import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  Calendar,
  Clock1,
  Clock10,
  Clock5,
  SquareArrowRight,
} from "lucide-react";
import MotionDiv from "../../utils/MotionDiv";
import { useEmployeeTime } from "../../context/employeeTimeContext";
import RaiseRequestForAttendance from "./RaiseRequestForAttendance";

const EmployeeAttendanceClock = () => {
  const {
    clockInTime,
    clockOutTime,
    workingTime,
    handleClockIn,
    handleClockOut,
    formattedDate,
    time,
    formatTime,
  } = useEmployeeTime();

  const formatDuration = (ms = 0) => {
    if (!ms || ms < 0) return "00h 00m 00s";

    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <MotionDiv delay={0.1}>
        <div>
          <h1 className="text-2xl font-semibold lg:text-4xl">
            Clock In / Clock Out
          </h1>
          <span className="label">Track Your Daily Working Hours</span>
        </div>
      </MotionDiv>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 p-4">
        {/* Clock Card */}
        <MotionDiv delay={0.2}>
          <div className="flex flex-col gap-4">
            <div className="flex bg-blue-400/90 flex-col border-2 shadow-xl p-4 rounded-lg h-[50%]  justify-center items-center mx-auto gap-8 w-full">
              <div className="flex justify-between w-full">
                <div>
                  <p className="font-semibold text-2xl">Current Time & Date</p>
                  <span className="label">{formattedDate}</span>
                </div>
                <div className=" btn btn-outline  btn-circle">
                  {" "}
                  <Clock1 size={28} className=" text-base-300" />
                </div>
              </div>

              <div className="text-4xl font-bold text-center">
                {time.toLocaleTimeString("en-US")}
              </div>
              <p>
                {clockInTime && !clockOutTime
                  ? "Working"
                  : clockOutTime
                  ? "Completed"
                  : "Not Started"}
              </p>

              <div className="flex justify-between w-full">
                <button
                  className="btn btn-outline"
                  onClick={handleClockIn}
                  disabled={!!clockInTime}
                >
                  <ArrowRightFromLine /> Clock In
                </button>

                <button
                  className="btn btn-outline"
                  onClick={handleClockOut}
                  disabled={!clockInTime || !!clockOutTime}
                >
                  <ArrowLeftToLine /> Clock Out
                </button>
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Raise Request For Attendance Query
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <RaiseRequestForAttendance />
                </div>
              </dialog>
            </div>
          </div>
        </MotionDiv>

        {/* Summary */}
        <MotionDiv delay={0.2}>
          <div className="flex flex-col gap-6 shadow-lg p-4 rounded-lg">
            <p>Today's Summary</p>
            <div className="flex items-center gap-3 shadow-md  rounded-xl bg-base-100 p-2">
              <div className=" btn btn-circle  text-green-600 bg-green-100">
                <ArrowRightFromLine />
              </div>
              <div>
                <p>Clock In</p>
                <span className=" font-semibold text-xl">
                  {formatTime(clockInTime)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shadow-md rounded-xl bg-base-100 p-2">
              <div className=" btn btn-circle  text-red-600 bg-red-100">
                <ArrowLeftToLine />
              </div>
              <div>
                <p>Clock Out</p>
                <span className=" font-semibold text-xl">
                  {formatTime(clockOutTime)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shadow-md rounded-xl bg-base-100 p-2">
              <div className=" btn btn-circle  text-blue-600 bg-blue-100">
                <Clock10 />
              </div>
              <div>
                <p>Working Hours</p>
                <span className=" font-semibold text-xl">
                  {formatDuration(workingTime)}
                </span>
              </div>
            </div>
            <div className="shadow-md bg-orange-100/50 text-orange-400 p-2 rounded">
              <span className="font-bold text-xl">Status</span>
              <p>
                {clockInTime && !clockOutTime
                  ? "Working"
                  : clockOutTime
                  ? "Completed"
                  : "Not Started"}
              </p>
            </div>{" "}
          </div>
          <div className="flex gap-3 flex-col shadow-lg p-4 rounded-lg">
            <h1 className="text-2xl font-semibold">Working Hours Policy</h1>

            <div className="flex gap-3 items-center">
              <Calendar className="text-blue-400" />
              <div>
                <p className="font-medium">Standard Hours</p>
                <span>9:00 AM - 6:00 PM (9 hours)</span>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <Clock5 className="text-green-400" />
              <div>
                <p className="font-medium">Grace Period</p>
                <span>9:00 AM - 9:05 AM</span>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <ArrowRightFromLine className="text-red-400" />
              <div>
                <p className="font-medium">Late Login</p>
                <span>After 9:05 AM</span>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <SquareArrowRight className="text-red-400" />
              <div>
                <p className="font-medium">Early Logout</p>
                <span>Before 6:00 PM</span>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default EmployeeAttendanceClock;
