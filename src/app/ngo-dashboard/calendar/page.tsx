
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar as CalendarIcon,
  PlusCircle,
  View,
  List,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';

type CalendarView = 'day' | 'week' | 'month';

const mockEvents = [
  { date: new Date(), title: 'Digital Literacy Session', type: 'class' },
  { date: addDays(new Date(), 2), title: 'Retail Skills Workshop', type: 'workshop'},
  { date: addDays(new Date(), 5), title: 'IT Support Assessment', type: 'assessment'},
];

const eventColors: { [key: string]: string } = {
    class: 'bg-blue-500',
    workshop: 'bg-amber-500',
    assessment: 'bg-green-500',
};

export default function TrainingCalendarPage() {
  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
    }
  };
  
  const EventIndicator = ({ date }: { date: Date }) => {
    const eventsOnDay = mockEvents.filter(e => format(e.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    if (eventsOnDay.length === 0) return null;

    return (
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
        {eventsOnDay.slice(0,3).map(event => (
            <div key={event.title} className={`w-1.5 h-1.5 rounded-full ${eventColors[event.type]}`}></div>
        ))}
      </div>
    );
  };


  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <CalendarIcon className="text-primary" /> Training Calendar
              </CardTitle>
              <CardDescription>
                Plan, run, and monitor all training activities and events.
              </CardDescription>
            </div>
            <Button className="gap-2">
              <PlusCircle size={16} /> Create Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setCurrentDate(addDays(currentDate, -1))}><ChevronLeft/></Button>
                <h2 className="text-xl font-bold text-center w-48">{format(currentDate, 'MMMM yyyy')}</h2>
                <Button variant="outline" size="icon" onClick={() => setCurrentDate(addDays(currentDate, 1))}><ChevronRight/></Button>
            </div>
             <div className="flex items-center gap-2">
                <Select value={view} onValueChange={(v) => setView(v as CalendarView)}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                    </SelectContent>
                </Select>
             </div>
          </div>
          
          <div className="border rounded-lg p-2">
            <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(d) => handleDateChange(d)}
                className="w-full"
                components={{
                    DayContent: ({ date }) => (
                    <div className="relative w-full h-full">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {format(date, 'd')}
                        </span>
                        <EventIndicator date={date} />
                    </div>
                    ),
                }}
                 classNames={{
                    months: 'w-full',
                    month: 'w-full space-y-4',
                    table: 'w-full border-collapse',
                    head_row: 'flex w-full',
                    head_cell: 'flex-1 text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                    row: 'flex w-full mt-2',
                    cell: 'flex-1 h-24 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md',
                    day: 'w-full h-full p-2 justify-start items-start',
                }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
