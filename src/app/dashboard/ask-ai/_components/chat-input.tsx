
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings2, Bot, Sparkles, Send, Loader } from 'lucide-react';

interface ChatInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onQuery: () => void;
  loading: boolean;
}

export function ChatInput({ prompt, setPrompt, onQuery, loading }: ChatInputProps) {
  return (
    <div className="relative">
      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
      <Input
        placeholder="Ask AI, generate code, or search your documents..."
        className="pl-12 pr-28 h-14 text-base rounded-full"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onQuery()}
        disabled={loading}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings2 size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">AI Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Configure the AI model and its parameters.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="model">Model</Label>
                  <Select defaultValue="gemini-1.5-pro">
                    <SelectTrigger id="model" className="col-span-2 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                      <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="temp">Temperature</Label>
                  <Slider id="temp" defaultValue={[0.5]} max={1} step={0.1} className="col-span-2" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button size="icon" className="rounded-full h-11 w-11" onClick={onQuery} disabled={loading}>
          {loading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
        </Button>
      </div>
    </div>
  );
}
