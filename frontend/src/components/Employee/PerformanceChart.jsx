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
  { week: "Week 1", score: 0 },
  { week: "Week 2", score: 0 },
  { week: "Week 3", score: 0 },
  { week: "Week 4", score: 0 },
];
const PerformanceChart = () => {
  return (
    <div>
      <div className="bg-base-100 p-4 rounded-xl h-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Weekly Performance Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            {/* Grid */}
            <CartesianGrid strokeDasharray="4 4" opacity={0.4} />

            {/* X Axis */}
            <XAxis dataKey="week" />

            {/* Y Axis */}
            <YAxis domain={[0, 5]} />

            {/* Tooltip & Legend */}
            <Tooltip />
            <Legend />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{
                r: 4,
                stroke: "#8b5cf6",
                strokeWidth: 2,
                fill: "#ffffff",
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PerformanceChart;
