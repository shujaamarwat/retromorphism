import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface VirtuaProgressChartProps {
  data: Array<{ name: string; domain: string; xp: number; level: number }>;
}

export const VirtuaProgressChart: React.FC<VirtuaProgressChartProps> = ({ data }) => {
  const COLORS = [
    '#FFDD00', // Primary
    '#0082FF', // Secondary  
    '#22C55E', // Success
    '#F59E0B', // Warning
    '#EF4444', // Error
    '#06B6D4', // Info
    '#8B5CF6', // Purple
    '#F97316', // Orange
  ];

  const chartData = data.map((virtua, index) => ({
    name: virtua.name,
    value: virtua.xp,
    level: virtua.level,
    domain: virtua.domain,
    color: COLORS[index % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white-100 p-3 rounded-xl border-2 border-black-100 shadow-lg">
          <p className="text-text-12-med font-text-12-med text-black-100 mb-1">
            {data.name}
          </p>
          <p className="text-caption-11-reg font-caption-11-reg text-black-60">
            Domain: {data.domain}
          </p>
          <p className="text-caption-11-reg font-caption-11-reg text-black-60">
            Level: {data.level}
          </p>
          <p className="text-caption-11-reg font-caption-11-reg text-primarysolid-60">
            XP: {data.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-black-100"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-caption-11-reg font-caption-11-reg text-black-60">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-text-14-reg font-text-14-reg text-black-60">
          No Virtua data available
        </p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="#001428"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};