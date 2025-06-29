import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

interface ProgressChartProps {
  data: Array<{ date: string; completed?: number; total?: number; xp?: number }>;
  type?: 'tasks' | 'xp';
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, type = 'tasks' }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white-100 p-3 rounded-xl border-2 border-black-100 shadow-lg">
          <p className="text-text-12-med font-text-12-med text-black-100 mb-1">
            {formatDate(label)}
          </p>
          {type === 'tasks' ? (
            <>
              <p className="text-caption-11-reg font-caption-11-reg text-success-60">
                Completed: {payload[0]?.value || 0}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Total: {payload[1]?.value || 0}
              </p>
            </>
          ) : (
            <p className="text-caption-11-reg font-caption-11-reg text-primarysolid-60">
              XP: {payload[0]?.value || 0}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (type === 'xp') {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#6B7280"
            fontSize={10}
          />
          <YAxis stroke="#6B7280" fontSize={10} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="xp"
            stroke="#FFDD00"
            fill="#FFDD00"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDate}
          stroke="#6B7280"
          fontSize={10}
        />
        <YAxis stroke="#6B7280" fontSize={10} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="completed" fill="#22C55E" radius={[2, 2, 0, 0]} />
        <Bar dataKey="total" fill="#E5E7EB" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};