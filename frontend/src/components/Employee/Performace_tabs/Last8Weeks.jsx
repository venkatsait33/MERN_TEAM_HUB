import PerformanceBannerCards from "./PerformanceBanarCards";
import PerformanceChart from "./PerformanceChart";

const data = [
  { date: "Week 1", rating: 0, tasks: 0 },
  { date: "Week 2", rating: 0, tasks: 0 },
  { date: "Week 3", rating: 0, tasks: 0 },
  { date: "Week 4", rating: 0, tasks: 0 },
  { date: "Week 5", rating: 0, tasks: 0 },
];
const Last8Weeks = () => {
  return (
    <div>
      <div className=" flex flex-col gap-3">
        <div>
          <PerformanceBannerCards />
        </div>
        <div>
          <PerformanceChart data={data} title="Last 8 Weeks Performance" />
        </div>
      </div>
    </div>
  );
};
export default Last8Weeks;
