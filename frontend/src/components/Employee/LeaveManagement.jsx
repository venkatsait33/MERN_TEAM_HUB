import { Calendar, File } from "lucide-react";
import React from "react";
import MotionDiv from "../../utils/MotionDiv";

const LeaveManagement = () => {
  return (
    <div className="  p-4 ">
      <div className="flex flex-col gap-4">
        <MotionDiv delay={0.1}>
          <div>
            <h1 className="text-2xl font-semibold">Request Leave</h1>
            <span className="label">
              Submit your leave requests and track their status
            </span>
          </div>
        </MotionDiv>
        <MotionDiv delay={0.2}>
          <div className=" shadow-md rounded-md p-4 w-[50%]">
            <div className="flex items-center space-x-4">
              <div className=" btn btn-md p-3 bg-blue-300">
                <Calendar size={28} className=" text-base" />
              </div>
              <span className=" text-xl font-semibold">
                Submit Leave Request
              </span>
            </div>
            <div>
              <form>
                <fieldset className="fieldset">
                  <label className="label">
                    From Date <span>*</span>
                  </label>
                  <input type="date" className="input w-full" placeholder="" />
                  <label className="label">
                    To Date <span>*</span>
                  </label>
                  <input type="date" className="input  w-full" placeholder="" />
                  <label className="label">
                    Reason <span>*</span>
                  </label>
                  <textarea
                    cols={30}
                    className="textarea  w-full"
                    placeholder="Enter reason for leave Request"
                  />

                  <button className="btn btn-neutral mt-4">
                    <File /> <span>Submit Leave Request</span>
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </MotionDiv>
        <MotionDiv delay={0.3}>
          <div className=" shadow-md rounded-md p-4 ">
            <h1 className="text-2xl font-semibold">My Leave Requests</h1>

            <span className="label">No Leaves Applied </span>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default LeaveManagement;
