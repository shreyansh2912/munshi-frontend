'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useTheme } from 'next-themes';

const data = [
  { name: 'Mon', revenue: 4000, expenses: 2400 },
  { name: 'Tue', revenue: 3000, expenses: 1398 },
  { name: 'Wed', revenue: 9800, expenses: 2000 },
  { name: 'Thu', revenue: 3908, expenses: 2780 },
  { name: 'Fri', revenue: 4800, expenses: 1890 },
  { name: 'Sat', revenue: 3800, expenses: 2390 },
  { name: 'Sun', revenue: 4300, expenses: 3490 },
];

export const RevenueChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const strokeColor = isDark ? '#52525b' : '#718096';
  const gridColor = isDark ? '#27272a' : '#E2E8F0';
  const mainColor = isDark ? '#e4e4e7' : '#2C3E66';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={mainColor} stopOpacity={isDark ? 0.3 : 0.2}/>
            <stop offset="95%" stopColor={mainColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: strokeColor, fontSize: 12}} />
        <YAxis axisLine={false} tickLine={false} tick={{fill: strokeColor, fontSize: 12}} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: isDark ? '#09090b' : '#fff', 
            borderRadius: '8px', 
            border: isDark ? '1px solid #27272a' : 'none', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            color: isDark ? '#f4f4f5' : '#2C3E66'
          }}
          itemStyle={{ color: isDark ? '#e4e4e7' : '#2C3E66', fontFamily: 'Sora' }}
        />
        <Area type="monotone" dataKey="revenue" stroke={mainColor} strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const ExpenseBarChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const barColor = isDark ? '#3f3f46' : '#E8DCC4';

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <Bar dataKey="expenses" fill={barColor} radius={[4, 4, 0, 0]} />
        <Tooltip 
            cursor={{fill: 'transparent'}} 
            contentStyle={{ 
                borderRadius: '8px',
                backgroundColor: isDark ? '#09090b' : '#fff',
                border: isDark ? '1px solid #27272a' : 'none',
                color: isDark ? '#f4f4f5' : '#000'
            }} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
