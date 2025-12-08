
'use client';
import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

interface GaugeProps {
  value: number;
  label?: string;
  size?: number;
  className?: string;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  label,
  size = 120,
  className,
}) => {
  const data = [
    { name: 'value', value: value },
    { name: 'rest', value: 100 - value },
  ];

  const color =
    value > 80 ? 'hsl(var(--chart-1))' : value > 60 ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-5))';

  return (
    <div
      style={{ width: size, height: size * 0.8 }}
      className={`relative flex flex-col items-center ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="100%"
            paddingAngle={2}
            cy="100%"
            cornerRadius={10}
          >
            <Cell fill={color} />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
          <Tooltip
            contentStyle={{
              fontSize: '12px',
              borderRadius: '0.5rem',
              border: '1px solid hsl(var(--border))',
              background: 'hsl(var(--background))'
            }}
            formatter={(val: number) => [`${val}%`, 'Score']}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 text-center">
        <div className="text-2xl font-bold text-foreground -mb-1">
          {value}%
        </div>
        {label && (
          <div className="text-xs text-muted-foreground">{label}</div>
        )}
      </div>
    </div>
  );
};
