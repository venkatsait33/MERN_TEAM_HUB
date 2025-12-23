import PerformanceChart from "./PerformanceChart";
import PerformanceCard from "./PerformanceCard";
import PerformanceBannerCards from "./PerformanceBanarCards";

const data = [
  { date: "Mar 1", rating: 0, tasks: 0 },
  { date: "Mar 2", rating: 0, tasks: 0 },
  { date: "Mar 3", rating: 0, tasks: 0 },
  { date: "Mar 4", rating: 0, tasks: 0 },
  { date: "Mar 5", rating: 0, tasks: 0 },
  { date: "Mar 6", rating: 0, tasks: 0 },
  { date: "Mar 7", rating: 0, tasks: 0 },
  { date: "Mar 8", rating: 0, tasks: 0 },
  { date: "Mar 9", rating: 0, tasks: 0 },
  { date: "Mar 10", rating: 0, tasks: 0 },
  { date: "Mar 11", rating: 0, tasks: 0 },
  { date: "Mar 12", rating: 0, tasks: 0 },
  { date: "Mar 13", rating: 0, tasks: 0 },
  { date: "Mar 14", rating: 0, tasks: 0 },
  { date: "Mar 15", rating: 0, tasks: 0 },
];
const DailyPerformance = () => {
  return (
    <div>
      <div className=" flex flex-col gap-3">
        <div>
          <PerformanceBannerCards />
        </div>
        <div className="p-4">
          <PerformanceChart data={data} title="Daily Performance Trend" />
        </div>
        <div className="flex flex-col gap-3 shadow-md rounded-md p-4 bg-base-100">
          <h2 className="text-xl font-semibold">Recently Daily Performance</h2>
          <div className="flex flex-col gap-3">
            <PerformanceCard date="Nov 14" />
            <PerformanceCard date="Nov 13" />
            <PerformanceCard date="Nov 12" />
            <PerformanceCard date="Nov 11" />
            <PerformanceCard date="Nov 10" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DailyPerformance;
