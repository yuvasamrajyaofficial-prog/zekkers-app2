
export type AIProvider = "gemini" | "openai" | "anthropic" | "deepseek" | "groq" | "meta";

export interface AIModel {
  id: string;
  label: string;
  provider: AIProvider;
  contextLength: number;
  type: "chat" | "vision" | "code" | "embedding";
}
