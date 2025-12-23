import PerformanceBannerCards from "./PerformanceBanarCards";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  { date: "Jan", behavior: 3, rating: 4, task: 80 },
  { date: "Feb", behavior: 4, rating: 3, task: 70 },
  { date: "Mar", behavior: 2, rating: 4, task: 60 },
  { date: "Apr", behavior: 3, rating: 5, task: 90 },
  { date: "May", behavior: 4, rating: 4, task: 85 },
  { date: "Jun", behavior: 5, rating: 5, task: 95 },
];

const MonthlyPerformance = () => {
  return (
    <div>
      <div>
        <div className=" flex flex-col gap-3">
          <div>
            <PerformanceBannerCards />
          </div>
          <div>
            <div className="bg-base-100 p-4 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Monthly Performance Overview
              </h2>

              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

                  <XAxis dataKey="date" />

                  {/* Left Y Axis → Ratings (1–5) */}
                  <YAxis yAxisId="left" domain={[0, 5]} />

                  {/* Right Y Axis → Task % */}
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />

                  <Tooltip />
                  <Legend />

                  {/* Behavior */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="behavior"
                    name="Behavior"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />

                  {/* Rating */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="rating"
                    name="Rating"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />

                  {/* Task Percentage */}
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="task"
                    name="Task %"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MonthlyPerformance;
