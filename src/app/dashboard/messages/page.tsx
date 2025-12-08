
'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  Paperclip,
  Send,
  Sparkles,
  Phone,
  MoreVertical,
  Video,
  FileText,
  User,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Users,
  ChevronLeft
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';


const getImage = (id: string): string | undefined => {
  if (!id) return undefined;
  const img = PlaceHolderImages.find(p => p.id === id);
  return img ? img.imageUrl : undefined;
};

const mockConversations = [
  {
    id: 1,
    name: 'Innovate Inc.',
    logo: getImage('company1'),
    jobTitle: 'Frontend Developer',
    lastMessage: "Great, we've scheduled the interview for Friday at 2 PM. Please confirm.",
    timestamp: '10:45 AM',
    unread: 1,
    online: true,
  },
  {
    id: 2,
    name: 'Creative Solutions',
    logo: getImage('company2'),
    jobTitle: 'UX/UI Designer',
    lastMessage: 'Can you please share your portfolio link?',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'DataDriven Co.',
    logo: getImage('company3'),
    jobTitle: 'Data Analyst (Intern)',
    lastMessage: "Thanks for applying! We're reviewing your profile and will get back to you soon.",
    timestamp: '3d ago',
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: 'Zekkers System',
    logo: getImage('logo'),
    jobTitle: 'Welcome to Zekkers!',
    lastMessage: 'Your application for Backend Engineer at TechCorp was viewed.',
    timestamp: '5d ago',
    unread: 0,
    online: false,
    isSystem: true,
  },
];

const mockMessages = {
  1: [
    { from: 'recruiter', text: "Hi there, thanks for your interest in the Frontend Developer role. Your profile looks impressive.", time: "10:30 AM" },
    { from: 'user', text: "Thank you! I'm very excited about the opportunity.", time: "10:32 AM" },
    { from: 'recruiter', text: "We'd like to schedule a technical interview. Are you available this Friday?", time: "10:40 AM" },
    { from: 'recruiter', text: "Great, we've scheduled the interview for Friday at 2 PM. Please confirm.", time: "10:45 AM" },
  ],
  2: [
    { from: 'recruiter', text: "Hello! We've reviewed your application for the UX/UI Designer position.", time: "Yesterday, 9:00 AM" },
    { from: 'user', text: "That's great to hear! Looking forward to the next steps.", time: "Yesterday, 9:05 AM" },
    { from: 'recruiter', text: 'Can you please share your portfolio link?', time: 'Yesterday, 9:10 AM' },
  ],
  3: [
     { from: 'recruiter', text: "Thanks for applying! We're reviewing your profile and will get back to you soon.", time: "3d ago" },
  ],
  4: [
      { from: 'recruiter', text: 'Welcome to Zekkers! This is where you will receive all important notifications.', time: "5d ago" },
      { from: 'recruiter', text: 'Your application for Backend Engineer at TechCorp was viewed.', time: "5d ago" },
  ]
};

const ConversationItem = ({ conv, active, onClick }: { conv: any, active: boolean, onClick: () => void }) => (
  <div
    onClick={onClick}
    className={`p-3 flex items-start gap-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-primary/10' : 'hover:bg-slate-50'}`}
  >
    <Avatar className="w-12 h-12 border-2 border-white">
      <AvatarImage src={conv.logo} alt={conv.company} />
      <AvatarFallback>{conv.name.slice(0, 2)}</AvatarFallback>
      {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
    </Avatar>
    <div className="flex-1 overflow-hidden">
      <div className="flex justify-between items-start">
        <p className="font-bold text-sm truncate">{conv.name}</p>
        <p className="text-xs text-slate-400 shrink-0">{conv.timestamp}</p>
      </div>
      <p className="text-xs text-slate-500 font-medium truncate">{conv.jobTitle}</p>
      <div className="flex justify-between items-end mt-1">
        <p className="text-xs text-slate-500 truncate pr-2">{conv.lastMessage}</p>
        {conv.unread > 0 && (
          <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center shrink-0">{conv.unread}</Badge>
        )}
      </div>
    </div>
  </div>
);

export default function MessagesPage() {
    const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
    const { user } = useUser();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeConversation = useMemo(() => {
        return mockConversations.find(c => c.id === activeConversationId);
    }, [activeConversationId]);

    const messages = useMemo(() => {
        if (!activeConversationId) return [];
        return (mockMessages as any)[activeConversationId] || [];
    }, [activeConversationId]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleConversationSelect = (id: number) => {
        setActiveConversationId(id);
    }

  return (
    <div className="h-[calc(100vh-65px)] flex bg-white border-t overflow-hidden">
      {/* Inbox Panel */}
      <aside className={cn(
        "w-full md:w-1/3 lg:w-1/4 h-full border-r flex-col",
        activeConversationId ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search..." className="pl-9 h-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {mockConversations.map(conv => (
                <ConversationItem key={conv.id} conv={conv} active={conv.id === activeConversationId} onClick={() => handleConversationSelect(conv.id)} />
            ))}
        </div>
      </aside>

      {/* Chat Panel */}
      <main className={cn(
        "flex-1 h-full flex-col",
        activeConversationId ? "flex" : "hidden md:flex"
      )}>
        {!activeConversation ? (
            <div className="flex-1 flex items-center justify-center text-slate-500">
                Select a conversation to start messaging.
            </div>
        ) : (
            <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setActiveConversationId(null)}>
                        <ChevronLeft className="w-5 h-5"/>
                    </Button>
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={activeConversation.logo} alt={activeConversation.name} />
                        <AvatarFallback>{activeConversation.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">{activeConversation.name}</p>
                        <p className="text-xs text-slate-500">{activeConversation.jobTitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Phone className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon"><Video className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                <div className="space-y-6">
                    {messages.map((msg: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex gap-3 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={msg.from === 'user' ? user?.photoURL ?? undefined : activeConversation.logo} />
                                <AvatarFallback>{msg.from === 'user' ? (user?.displayName?.charAt(0) || 'U') : activeConversation.name.slice(0,1)}</AvatarFallback>
                            </Avatar>
                            <div className={`max-w-md p-3 rounded-2xl ${msg.from === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-white border rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.from === 'user' ? 'text-primary-foreground/70' : 'text-slate-400'}`}>{msg.time}</p>
                            </div>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
                <div className="relative">
                    <Input placeholder="Type your message..." className="pr-24 h-12 rounded-full pl-12" />
                     <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                            <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full text-amber-500">
                            <Sparkles className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Button size="icon" className="rounded-full w-9 h-9">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
            </>
        )}
      </main>
      
      {/* Right Panel - Hidden on smaller screens */}
      <aside className="hidden lg:block w-1/4 h-full border-l bg-white">
        <div className="h-full flex flex-col p-4">
            <h3 className="font-semibold text-lg text-center mb-4">Job Details</h3>
            <p className="text-sm text-center text-muted-foreground">Details about the job opportunity will appear here.</p>
        </div>
      </aside>
    </div>
  );
}
