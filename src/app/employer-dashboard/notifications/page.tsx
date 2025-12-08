'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, UserPlus, MessageSquare, Star, Calendar, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const mockNotifications = [
  {
    id: 'n1',
    icon: <UserPlus className="w-5 h-5 text-blue-500" />,
    title: 'New Applicant for Frontend Developer',
    description: 'Anjali Sharma has applied for your Frontend Developer role.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'n2',
    icon: <MessageSquare className="w-5 h-5 text-green-500" />,
    title: 'New Message from Priya Patel',
    description: 'Regarding the UX/UI Designer role: "Can you please share more details about the team structure?"',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 'n3',
    icon: <Star className="w-5 h-5 text-amber-500" />,
    title: 'Candidate Shortlisted',
    description: 'Rohan Verma has been moved to the "Assessment" stage by your team.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'n4',
    icon: <Calendar className="w-5 h-5 text-purple-500" />,
    title: 'Interview Scheduled',
    description: 'An interview has been scheduled with Anjali Sharma for Friday at 2 PM.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'n5',
    icon: <FileText className="w-5 h-5 text-slate-500" />,
    title: 'Weekly Report Ready',
    description: 'Your weekly hiring analytics report is ready for download.',
    time: '2 days ago',
    read: true,
  },
];

export default function EmployerNotificationsPage() {
    const { toast } = useToast();
    const [notifications, setNotifications] = useState(mockNotifications);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        toast({
            title: "Notifications Marked as Read",
            description: "All notifications have been marked as read.",
        });
    }

    const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Bell /> Notifications
              </CardTitle>
              <CardDescription className="mt-1">
                Your recent activity and alerts from the platform.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                Mark all as read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
            {notifications.length > 0 ? (
                <div className="space-y-4">
                    {notifications.map(notification => (
                        <div key={notification.id} className={cn(
                            "flex items-start gap-4 p-4 rounded-lg border transition-colors",
                            notification.read ? "bg-white" : "bg-primary/5 border-primary/20"
                        )}>
                            <div className="w-8 h-8 flex-shrink-0 mt-1">{notification.icon}</div>
                            <div className="flex-1">
                                <p className="font-semibold">{notification.title}</p>
                                <p className="text-sm text-muted-foreground">{notification.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 flex-shrink-0" aria-label="Unread"></div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <Bell className="w-12 h-12 mx-auto mb-4"/>
                    <h3 className="font-semibold text-lg">No Notifications Yet</h3>
                    <p className="text-sm">Your recent activity will appear here.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
