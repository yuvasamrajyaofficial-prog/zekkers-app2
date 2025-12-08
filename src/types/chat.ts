
export interface SourceItem {
    // Define the SourceItem structure later
    title: string;
    url: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
  model?: string;
  sources?: SourceItem[];
  images?: string[];
}

export interface ChatThread {
  id: string;
  title: string;
  model: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}
