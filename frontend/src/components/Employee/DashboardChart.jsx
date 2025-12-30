import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Present", value: 14 },
  { name: "Absent", value: 6 }, // example
];

const COLORS = ["#10b981", "#e5e7eb"];
const DashboardChart = () => {
  return (
    <div>
      <div className="bg-base-100 rounded-xl p-4 shadow-lg h-[400px] w-full">
        <h2 className="text-xl font-semibold mb-4">Monthly Attendance</h2>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            {/* Center Label */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-base-content text-sm font-semibold"
            >
              Present : 14
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default DashboardChart;
