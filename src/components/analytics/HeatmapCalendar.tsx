import React from 'react';
import { format, startOfYear, endOfYear, eachDayOfInterval, getDay, getWeek } from 'date-fns';

interface HeatmapCalendarProps {
  data: Array<{ date: string; count: number }>;
}

export const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({ data }) => {
  const currentYear = new Date().getFullYear();
  const yearStart = startOfYear(new Date(currentYear, 0, 1));
  const yearEnd = endOfYear(new Date(currentYear, 11, 31));
  const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd });

  // Create a map for quick lookup
  const dataMap = new Map(data.map(d => [d.date, d.count]));

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-black-10';
    if (count <= 2) return 'bg-success-20';
    if (count <= 4) return 'bg-success-40';
    if (count <= 6) return 'bg-success-60';
    return 'bg-success-80';
  };

  const getTooltipText = (date: Date, count: number) => {
    return `${format(date, 'MMM d, yyyy')}: ${count} tasks completed`;
  };

  // Group days by week
  const weeks = [];
  let currentWeek = [];
  
  allDays.forEach((day, index) => {
    const dayOfWeek = getDay(day);
    
    if (index === 0) {
      // Add empty cells for the first week if it doesn't start on Sunday
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null);
      }
    }
    
    currentWeek.push(day);
    
    if (dayOfWeek === 6 || index === allDays.length - 1) {
      // End of week or end of year
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  return (
    <div className="space-y-4">
      {/* Month labels */}
      <div className="flex justify-between text-caption-11-reg font-caption-11-reg text-black-60">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
          <span key={month}>{month}</span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex gap-1 overflow-x-auto">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => {
              if (!day) {
                return <div key={`empty-${dayIndex}`} className="w-3 h-3" />;
              }

              const dateStr = format(day, 'yyyy-MM-dd');
              const count = dataMap.get(dateStr) || 0;
              const intensity = getIntensity(count);

              return (
                <div
                  key={dateStr}
                  className={`w-3 h-3 rounded-sm border border-black-100 ${intensity} cursor-pointer transition-all duration-200 hover:scale-110`}
                  title={getTooltipText(day, count)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-caption-10-reg font-caption-10-reg text-black-60">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-black-10 rounded-sm border border-black-100" />
          <div className="w-3 h-3 bg-success-20 rounded-sm border border-black-100" />
          <div className="w-3 h-3 bg-success-40 rounded-sm border border-black-100" />
          <div className="w-3 h-3 bg-success-60 rounded-sm border border-black-100" />
          <div className="w-3 h-3 bg-success-80 rounded-sm border border-black-100" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};