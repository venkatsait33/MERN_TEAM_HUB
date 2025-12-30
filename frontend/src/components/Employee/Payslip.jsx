import { FileText } from "lucide-react";
import MotionDiv from "../../utils/MotionDiv";

const Payslip = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <MotionDiv delay={0.1}>
          <div>
            <h1 className=" text-2xl font-semibold">My Payslips</h1>
            <span className="label">Download your monthly salary payslips</span>
          </div>
        </MotionDiv>
        <MotionDiv delay={0.2}>
          <div className=" flex justify-center items-center mx-auto flex-col shadow-md rounded-md p-4 w-full h-[300px]">
            <div>
              <FileText size={44} className="text-gray-400" />
            </div>
            <p>No Payslips found for your account.</p>
            <p className=" text-warning">
              * If there is any wrong in payslip, FeelFree to contact HR *
            </p>
          </div>
        </MotionDiv>
        <MotionDiv delay={0.3}>
          <div className="flex items-center space-x-6 shadow-md rounded-md p-4">
            <div>
              <FileText size={40} className="" />
            </div>
            <div className="flex flex-col gap-3">
              <p className=" text-xl font-semibold">About Payslips</p>
              <span>Payslips are generated every month by HR</span>
              <span>They include salary, deductions and net pay</span>
              <span className=" text-info">
                FOr missing payslips, Please contact HR
              </span>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Payslip;
