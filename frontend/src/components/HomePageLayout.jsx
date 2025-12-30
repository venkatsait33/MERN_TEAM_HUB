import { useEffect, useState } from "react";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import EmployeeAttendanceClock from "./Employee/EmployeeAttendanceClock";
import Attendance from "./Employee/Attendance";
import LeaveManagement from "./Employee/LeaveManagement";
import { Menu, SquareX } from "lucide-react";
import Sidebar from "./Sidebar";
import Payslip from "./Employee/Payslip";
import MyPerformancePage from "./Employee/MyPerformancePage";

const HomePageLayout = () => {
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(() => {
    return localStorage.getItem("activeMenu") || "Dashboard";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("activeMenu", activeMenu);
  }, [activeMenu]);

  const renderActiveComponent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <EmployeeDashboard />;
      case "Clock In/Out":
        return <EmployeeAttendanceClock />;
      case "Attendance":
        return <Attendance />;
      case "My Performance":
        return <MyPerformancePage />;
      case "Request Leave":
        return <LeaveManagement />;
      case "My Payslips":
        return <Payslip />;

      default:
        return <EmployeeDashboard />;
    }
  };
  return (
    <div>
      {" "}
      <div className="flex mt-[65px]  w-full mx-auto h-full">
        <div className="p-1 md:flex-1 ">
          <div className="">
            {isSidebarOpen ? (
              <>
                <div className="absolute z-50 transition-transform duration-300 transform top-16 left-40 md:hidden">
                  <button
                    className="p-2 text-white btn bg-blue-600 rounded"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <SquareX size={24} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="absolute z-50 top-16 left-2 md:hidden">
                  <button
                    className="p-2 text-white bg-blue-600 rounded"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu size={24} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div
            className={`fixed z-10 max-sm:top-16 left-0  max-sm:bg-base-300  h-full max-sm:w-[200px] shadow-md transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                 md:translate-x-0 lg:w-[20%]   `}
          >
            <Sidebar
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        </div>
        <div className="relative md:flex-3 lg:flex-4 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : (
            <>{renderActiveComponent()}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageLayout;
