
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Layers, TrendingUp, Users } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

interface DeptAnalytics {
  id: string;
  department: string;
  totalStudents: number;
  avgProgress: number;
  topGoals: string[];
  skillGaps: { name: string; count: number }[];
  roadmapActivity: { month: string; value: number }[];
}

const mockDepts: DeptAnalytics[] = [
  {
    id: 'dept1',
    department: 'Computer Science Engineering',
    totalStudents: 420,
    avgProgress: 71,
    topGoals: ['Full Stack Developer', 'Data Scientist', 'AI Engineer'],
    skillGaps: [
      { name: 'DSA', count: 90 },
      { name: 'ML Foundations', count: 70 },
      { name: 'Cloud DevOps', count: 45 },
    ],
    roadmapActivity: [
      { month: 'Jan', value: 80 },
      { month: 'Feb', value: 120 },
      { month: 'Mar', value: 160 },
      { month: 'Apr', value: 140 },
    ],
  },
  {
    id: 'dept2',
    department: 'Mechanical Engineering',
    totalStudents: 380,
    avgProgress: 56,
    topGoals: ['Automobile Engineer', 'Production Engineer', 'Industrial Designer'],
    skillGaps: [
      { name: 'CAD Expertise', count: 80 },
      { name: 'Manufacturing Tech', count: 60 },
      { name: 'Simulation Tools', count: 40 },
    ],
    roadmapActivity: [
      { month: 'Jan', value: 40 },
      { month: 'Feb', value: 70 },
      { month: 'Mar', value: 110 },
      { month: 'Apr', value: 130 },
    ],
  },
  {
    id: 'dept3',
    department: 'Electronics & Communication',
    totalStudents: 350,
    avgProgress: 62,
    topGoals: ['Embedded Systems Dev', 'VLSI Design Engineer', 'Telecom Engineer'],
    skillGaps: [
      { name: 'VHDL/Verilog', count: 110 },
      { name: 'PCB Design', count: 85 },
      { name: 'Signal Processing', count: 50 },
    ],
    roadmapActivity: [
      { month: 'Jan', value: 60 },
      { month: 'Feb', value: 90 },
      { month: 'Mar', value: 100 },
      { month: 'Apr', value: 150 },
    ],
  },
];

const StatCard: React.FC<{ icon:React.ReactNode; label:string; value:string|number; iconClass?: string }> = ({ icon, label, value, iconClass }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            {React.cloneElement(icon as React.ReactElement, { className: `w-4 h-4 text-muted-foreground ${iconClass}` })}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

export default function DepartmentAIAnalytics() {
  const [depts, setDepts] = useState(mockDepts);
  const [selected, setSelected] = useState<DeptAnalytics | null>(null);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Department-wise AI Roadmap Analytics</CardTitle>
          <CardDescription className="max-w-2xl">
            Get AI-generated insights for each department — skill gaps, roadmap progress, career goals, and monthly learning activity.
            This helps colleges plan training programs, workshops, faculty interventions, and placement readiness.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {depts.map((d) => (
                <motion.div
                    key={d.id}
                    whileHover={{ y: -5 }}
                    className="h-full"
                >
                    <Card
                        className="cursor-pointer h-full flex flex-col"
                        onClick={() => setSelected(d)}
                    >
                        <CardHeader>
                            <CardTitle className="text-lg">{d.department}</CardTitle>
                            <CardDescription>{d.totalStudents} students</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-end">
                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                <TrendingUp className="w-4 h-4" /> Avg Roadmap Progress: <span className="font-semibold">{d.avgProgress}%</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                ))}
            </div>
        </CardContent>
      </Card>
      
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
            {selected && (
                <>
                <SheetHeader>
                    <SheetTitle className="text-2xl">{selected.department}</SheetTitle>
                    <SheetDescription>Department Analytics Overview</SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-8">
                    {/* Key Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard icon={<Users />} label="Total Students" value={selected.totalStudents} />
                        <StatCard icon={<BarChart2 />} label="Avg Progress" value={`${selected.avgProgress}%`} />
                        <StatCard icon={<Layers />} label="Top Goals" value={selected.topGoals.length} />
                    </div>

                    {/* Top Goals */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Top Student Goals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {selected.topGoals.map((g, i) => (
                                    <Badge key={i} variant="secondary">{g}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skill Gaps */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Department Skill Gaps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={selected.skillGaps}>
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                  contentStyle={{
                                    background: "hsl(var(--background))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius-lg)",
                                  }}
                                />
                                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Monthly Roadmap Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Monthly Roadmap Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={selected.roadmapActivity}>
                                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                  contentStyle={{
                                    background: "hsl(var(--background))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius-lg)",
                                  }}
                                />
                                <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                </>
            )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
