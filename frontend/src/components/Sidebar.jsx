import {
  Calendar,
  ClipboardCheck,
  LayoutGrid,
  NotebookTabs,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Sidebar = ({ activeMenu, setActiveMenu, setIsSidebarOpen }) => {
  const menuItems = [
    { icon: <LayoutGrid />, title: "Dashboard" },
    { icon: <ClipboardCheck />, title: "Clock In/Out" },
    { icon: <Calendar />, title: "Attendance" },
    { icon: <TrendingUp />, title: "My Performance" },
    { icon: <NotebookTabs />, title: "Request Leave" },
    { icon: <ClipboardCheck />, title: "My Payslips" },
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item);

    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="h-full bg-base-200 shadow-lg p-3 rounded-lg">
      <motion.div
        className="flex flex-col gap-4 max-sm:ml-2 max-sm:mt-16 max-sm:mb-2 p-3 rounded-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="mb-4 text-xl font-bold" variants={itemVariants}>
          Employee
        </motion.h2>

        {menuItems.map((item, i) => (
          <motion.button
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-2 rounded text-left transition ${
              activeMenu === item.title
                ? "bg-blue-500/70 text-base font-semibold"
                : "bg-transparent text-base hover:bg-blue-500"
            }`}
            onClick={() => handleMenuClick(item.title)}
          >
            <div className="flex items-center justify-between">
              <span className="flex gap-2 items-center">
                {item.icon}
                {item.title}
              </span>

              <span
                className={`${
                  activeMenu === item.title
                    ? "badge badge-xs badge-primary bg-base-100"
                    : ""
                }`}
              />
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default Sidebar;
