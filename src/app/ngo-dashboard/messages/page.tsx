
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
  ChevronLeft,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser } from '@/firebase';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

const getImage = (id: string): string | undefined => {
  if (!id) return undefined;
  const img = PlaceHolderImages.find(p => p.id === id);
  return img ? img.imageUrl : undefined;
};

const mockConversations = [
  {
    id: 1,
    name: 'Riya Sharma (Participant)',
    avatar: getImage('avatar1'),
    context: 'Digital Literacy, Mumbai',
    lastMessage: "Thank you for the update on the job fair!",
    timestamp: '10:45 AM',
    unread: 1,
    online: true,
    type: 'participant' as const,
    program: 'Digital Literacy',
    cohort: 'DL-Mumbai-Q3',
  },
  {
    id: 2,
    name: 'DL-Mumbai-Q3 Group',
    avatar: '',
    context: 'Digital Literacy Program',
    lastMessage: 'Trainer: Reminder, class starts at 10 AM tomorrow.',
    timestamp: '9:30 AM',
    unread: 3,
    online: false,
    type: 'group' as const,
  },
  {
    id: 3,
    name: 'ZekkTech HR',
    avatar: getImage('logo'),
    context: 'Employer Partner',
    lastMessage: 'We have 5 new openings for data entry roles.',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
    type: 'employer' as const,
  },
  {
    id: 4,
    name: 'Zekkers System',
    avatar: getImage('logo'),
    context: 'System Alerts',
    lastMessage: 'CSR Report for Q3 has been generated.',
    timestamp: '5d ago',
    unread: 0,
    online: false,
    type: 'system' as const,
  },
];

const mockMessages: { [key: string]: any[] } = {
  '1': [
    { from: 'user', text: "Hi Riya, just a reminder about the upcoming assessment on Friday.", time: "10:30 AM" },
    { from: 'participant', text: "Thank you for the update on the job fair!", time: "10:45 AM" },
  ],
  '2': [
    { from: 'Trainer', text: "Reminder, class starts at 10 AM tomorrow.", time: "9:30 AM" },
    { from: 'user', text: "Thanks for the reminder!", time: "9:32 AM" },
  ],
  '3': [
     { from: 'employer', text: 'We have 5 new openings for data entry roles.', time: "Yesterday" },
  ],
  '4': [
      { from: 'system', text: 'Welcome to Zekkers! This is where you will receive all important notifications.', time: "5d ago" },
      { from: 'system', text: 'CSR Report for Q3 has been generated.', time: "5d ago" },
  ]
};

type Conversation = typeof mockConversations[0];


const ConversationItem = ({ conv, active, onClick }: { conv: Conversation, active: boolean, onClick: () => void }) => (
  <div
    onClick={onClick}
    className={`p-3 flex items-start gap-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-primary/10' : 'hover:bg-slate-50'}`}
  >
    <Avatar className="w-12 h-12 border-2 border-white">
      {conv.avatar && <AvatarImage src={conv.avatar} alt={conv.name} />}
      <AvatarFallback>{conv.name.slice(0, 2)}</AvatarFallback>
      {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
    </Avatar>
    <div className="flex-1 overflow-hidden">
      <div className="flex justify-between items-start">
        <p className="font-bold text-sm truncate">{conv.name}</p>
        <p className="text-xs text-slate-400 shrink-0">{conv.timestamp}</p>
      </div>
      <p className="text-xs text-slate-500 font-medium truncate">{conv.context}</p>
      <div className="flex justify-between items-end mt-1">
        <p className="text-xs text-slate-500 truncate pr-2">{conv.lastMessage}</p>
        {conv.unread > 0 && (
          <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center shrink-0">{conv.unread}</Badge>
        )}
      </div>
    </div>
  </div>
);

const ParticipantQuickView = ({ conversation }: { conversation: Conversation | undefined }) => {
    if (!conversation || conversation.type !== 'participant') {
        return (
            <div className="h-full flex items-center justify-center text-sm text-slate-400 p-4 text-center">
                Select a participant conversation to see their details.
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b text-center">
                <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-md">
                    {conversation.avatar && <AvatarImage src={conversation.avatar} alt={conversation.name} />}
                    <AvatarFallback className="text-2xl">{conversation.name.slice(0,2)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg mt-2">{conversation.name}</h3>
                <p className="text-sm text-muted-foreground">Participant</p>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
                <div>
                    <Label className="text-xs font-semibold text-slate-400">Program</Label>
                    <p className="text-sm font-medium">{conversation.program}</p>
                </div>
                 <div>
                    <Label className="text-xs font-semibold text-slate-400">Cohort</Label>
                    <p className="text-sm font-medium">{conversation.cohort}</p>
                </div>
                 <Separator />
                <Button className="w-full gap-2"><User size={16} /> View Full Profile</Button>
            </div>
        </div>
    )
}

export default function NgoMessagesPage() {
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
    };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-slate-50 border-t overflow-hidden">
      {/* Inbox Panel */}
       <aside className={cn(
        "w-full md:w-1/3 lg:w-1/4 h-full border-r flex-col",
        activeConversationId ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search messages..." className="pl-9 h-9" />
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
                        {activeConversation.avatar && <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />}
                        <AvatarFallback>{activeConversation.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">{activeConversation.name}</p>
                        <p className="text-xs text-slate-500">{activeConversation.context}</p>
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
                    {messages.map((msg: any, index: number) => {
                      const senderIsUser = msg.from === 'user';
                      const avatarSrc = senderIsUser ? user?.photoURL : activeConversation?.avatar;
                      const fallback = senderIsUser 
                        ? (user?.displayName?.charAt(0) || 'U') 
                        : (activeConversation?.name?.slice(0,1) || '?');

                      return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex gap-3 ${senderIsUser ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <Avatar className="w-8 h-8">
                                {avatarSrc && <AvatarImage src={avatarSrc} />}
                                <AvatarFallback>{fallback}</AvatarFallback>
                            </Avatar>
                            <div className={`max-w-md p-3 rounded-2xl ${senderIsUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-white border rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-xs mt-1 ${senderIsUser ? 'text-primary-foreground/70' : 'text-slate-400'}`}>{msg.time}</p>
                            </div>
                        </motion.div>
                      );
                    })}
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

      {/* Right Panel */}
       <aside className="hidden lg:block w-1/4 h-full border-l bg-slate-50/50">
           <ParticipantQuickView conversation={activeConversation} />
       </aside>
    </div>
  );
}
