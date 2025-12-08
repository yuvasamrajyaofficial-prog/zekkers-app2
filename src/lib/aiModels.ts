
import { AIModel } from "@/types/ai";

export const AI_MODELS: AIModel[] = [
  {
    id: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    provider: "gemini",
    contextLength: 1000000,
    type: "chat"
  },
  {
    id: "gpt-4o-mini",
    label: "GPT-4o mini",
    provider: "openai",
    contextLength: 128000,
    type: "chat"
  },
  {
    id: "gpt-4o",
    label: "GPT-4o",
    provider: "openai",
    contextLength: 200000,
    type: "vision"
  },
  {
    id: "claude-3-opus",
    label: "Claude 3 Opus",
    provider: "anthropic",
    contextLength: 200000,
    type: "chat"
  },
  {
    id: "deepseek-v3",
    label: "DeepSeek V3",
    provider: "deepseek",
    contextLength: 128000,
    type: "chat"
  },
  {
    id: "llama-3.1-70b",
    label: "Llama 3.1 (70B)",
    provider: "meta",
    contextLength: 128000,
    type: "chat"
  },
  {
    id: "groq-mixtral",
    label: "Groq Mixtral",
    provider: "groq",
    contextLength: 32000,
    type: "chat"
  },
  {
    id: "text-embedding-3-small",
    label: "Embedding Model",
    provider: "openai",
    contextLength: 8192,
    type: "embedding"
  }
];
