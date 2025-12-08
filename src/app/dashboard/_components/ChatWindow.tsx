

"use client";

import { useState } from "react";
import ModelSelector from "./ModelSelector";
import { ChatMessage } from "@/types/chat";

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gemini-1.5-pro");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      createdAt: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ input, model }),
      });

      const data = await res.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.output,
        model,
        createdAt: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
       const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I couldn't get a response from the AI. Please check the console.",
        model,
        createdAt: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error("Error calling chat API:", error);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ModelSelector selectedModel={model} setSelectedModel={setModel} />

      <div className="flex-1 overflow-y-auto mt-4 bg-white border rounded p-4 space-y-4">
        {messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-slate-400">
                Start a conversation by typing below.
            </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`p-3 rounded-lg ${m.role === "user" ? "bg-indigo-50" : "bg-green-50"}`}>
            <strong className="capitalize">{m.role}</strong>
            <p className="whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {loading && (
            <div className="p-3 rounded-md bg-slate-50">
                <strong>Assistant</strong>
                <p className="animate-pulse">Thinking...</p>
            </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 border p-2 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask anything…"
          disabled={loading}
        />
        <button onClick={sendMessage} className="px-4 bg-indigo-600 text-white rounded-md disabled:bg-indigo-300" disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
