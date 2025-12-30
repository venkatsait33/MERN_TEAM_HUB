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

const PerformanceChart = ({ data, title }) => {
  return (
    <div className="bg-base-100 rounded-xl p-4 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis dataKey="date" />
          <YAxis domain={[0, 4]} />

          <Tooltip />
          <Legend />

          {/* Tasks Line */}
          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
