
"use client";
import { AI_MODELS } from "@/lib/aiModels";
import { AIModel } from "@/types/ai";

interface ModelSelectorProps {
    selectedModel: string;
    setSelectedModel: (modelId: string) => void;
}

export default function ModelSelector({ selectedModel, setSelectedModel }: ModelSelectorProps) {
  const models = AI_MODELS.filter(m => m.type === 'chat' || m.type === 'vision');
    
  return (
    <div className="w-full bg-white p-3 border rounded-lg shadow-sm">
      <label className="text-sm font-semibold text-slate-700">
        AI Model
      </label>

      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="mt-2 w-full border p-2 rounded-md bg-slate-50"
      >
        {models.map((m: AIModel) => (
          <option key={m.id} value={m.id}>
            {m.label} ({m.provider})
          </option>
        ))}
      </select>
    </div>
  );
}
