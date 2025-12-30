import { X } from "lucide-react";

const RaiseRequestForAttendance = () => {
  return (
    <div>
      <div className=" modal-action flex flex-col w-full">
        <form method="dialog" className="">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-center">Raise Request</h3>
            <button className="btn btn-sm btn-circle  ">
              <X />
            </button>
          </div>
          <fieldset className="fieldset">
            <label className="label">Employee Name</label>
            <input type="text" className="input" />
            <label className="label">Employee ID</label>
            <input type="text" className="input" />
            <select defaultValue="Reasons" className="select">
              <option disabled={true}>Select the reasons provided below</option>
              <option>Network Error</option>
              <option>Site is not Responded</option>
              <option>Missed ClockIn time due to technical issues</option>
              <option>Missed ClockOut time due to technical issues</option>
            </select>
            <label className="label">Reason</label>
            <textarea rows={5} cols={20} className="textarea" />
            <button className="btn btn-outline">Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
export default RaiseRequestForAttendance;
