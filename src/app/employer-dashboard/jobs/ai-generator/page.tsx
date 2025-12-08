
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Save, Download, Trash2, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateJobPost } from '@/ai/flows/ai-job-post-generator';

type JDInput = {
  role: string;
  level: string;
  skills: string; // comma separated
  location: string;
  responsibilities: string;
  qualifications: string;
  perks: string;
  tone: string; // e.g., Professional, Casual, Brief
  companyIntro: string;
};

type GeneratedJD = {
  id: string;
  jd: string;
  createdAt: string;
  inputs: JDInput;
};

const LS_KEY = 'zk:ai_jd_history_v1';

// Helper functions moved outside component to avoid re-declaration
function genId() { return Math.random().toString(36).slice(2,9); }

function loadHistory(): GeneratedJD[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GeneratedJD[];
  } catch (e) {
    return [];
  }
}

function saveHistory(items: GeneratedJD[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save history to localStorage", e);
  }
}

export default function AIJDGeneratorFull() {
  const [inputs, setInputs] = useState<JDInput>({
    role: 'Senior Frontend Engineer',
    level: 'Mid-Senior',
    skills: 'React, TypeScript, Next.js, TailwindCSS',
    location: 'Bengaluru, India',
    responsibilities: 'Build and maintain web applications, mentor juniors, collaborate with product.',
    qualifications: '3+ years of frontend experience, strong JS fundamentals, good communication.',
    perks: 'Competitive salary, health insurance, remote flexibility.',
    tone: 'Professional',
    companyIntro: 'ZekkTech builds modern web products used by millions.'
  });
  
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedJD[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load history from localStorage only on the client side
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    // Save history to localStorage whenever it changes
    saveHistory(history);
  }, [history]);

  async function handleGenerate() {
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const keywords = `${inputs.level}, ${inputs.skills}, ${inputs.location}, ${inputs.companyIntro}, ${inputs.perks}`;
      const response = await generateJobPost({ title: inputs.role, keywords });
      const fullJD = `${response.description}\n\n**Required Skills:**\n- ${response.skills.join('\n- ')}\n\n**Qualifications:**\n- ${response.qualifications.join('\n- ')}`;

      setResult(fullJD);
      const item: GeneratedJD = { id: genId(), jd: fullJD, createdAt: new Date().toISOString(), inputs };
      setHistory(prev => [item, ...prev].slice(0, 50));
      toast({ title: "Job Description Generated Successfully" });

    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Generation failed');
      toast({ variant: "destructive", title: "Generation Failed", description: e.message });
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    toast({ title: "Copied to clipboard" });
  }

  function handleSaveTemplate() {
    if (!result) return;
    toast({ title: "Saved as template (mock)" });
  }

  function handleExportPDF() {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${inputs.role.replace(/\s+/g, '_')}_JD.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleUseHistory(item: GeneratedJD) {
    setResult(item.jd);
    setInputs(item.inputs);
  }

  function handleDeleteHistory(id: string) {
    if (!confirm('Delete this saved JD?')) return;
    setHistory(prev => prev.filter(h => h.id !== id));
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Job Description Generator</h1>
          <p className="text-slate-500 mt-1">Generate professional, role-tuned job descriptions using AI. Use the template, refine, then copy or save as a template.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSaveTemplate} className="gap-2"><Save size={16} /> Save Template</Button>
          <Button onClick={handleExportPDF} variant="outline" className="gap-2"><Download size={16} /> Export</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
                <Label>Role</Label>
                <Input value={inputs.role} onChange={e => setInputs({ ...inputs, role: e.target.value })} />
            </div>
            <div className="space-y-2">
                <Label>Level</Label>
                <Input value={inputs.level} onChange={e => setInputs({ ...inputs, level: e.target.value })} />
            </div>
             <div className="space-y-2">
                <Label>Location</Label>
                <Input value={inputs.location} onChange={e => setInputs({ ...inputs, location: e.target.value })} />
            </div>
            <div className="space-y-2">
                <Label>Skills (comma separated)</Label>
                <Input value={inputs.skills} onChange={e => setInputs({ ...inputs, skills: e.target.value })} />
            </div>
            <div className="space-y-2">
                <Label>Company Introduction</Label>
                <Textarea value={inputs.companyIntro} onChange={e => setInputs({ ...inputs, companyIntro: e.target.value })} />
            </div>
            <div className="space-y-2">
                <Label>Responsibilities</Label>
                <Textarea value={inputs.responsibilities} onChange={e => setInputs({ ...inputs, responsibilities: e.target.value })} />
            </div>
             <div className="space-y-2">
                <Label>Qualifications</Label>
                <Textarea value={inputs.qualifications} onChange={e => setInputs({ ...inputs, qualifications: e.target.value })} />
            </div>
             <div className="space-y-2">
                <Label>Perks & Benefits</Label>
                <Textarea value={inputs.perks} onChange={e => setInputs({ ...inputs, perks: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={inputs.tone} onValueChange={v => setInputs({ ...inputs, tone: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Brief">Brief</SelectItem>
                  <SelectItem value="Inclusive">Inclusive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex gap-2">
              <Button onClick={handleGenerate} disabled={loading} variant="default"><Sparkles size={16} className="mr-2"/>{loading ? 'Generating...' : 'Generate JD'}</Button>
              <Button onClick={() => { setInputs({ role: '', level: '', skills: '', location: '', responsibilities: '', qualifications: '', perks: '', tone: 'Professional', companyIntro: '' }); setResult(null); }} variant="outline">Reset</Button>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>Generated JD</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={handleCopy} size="icon" variant="ghost"><Copy size={16} /></Button>
                  <Button onClick={handleExportPDF} size="icon" variant="ghost"><Download size={16} /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-3 min-h-[160px] p-3 bg-slate-50 rounded-lg border">
                {loading && <div className="text-slate-500">Generating... please wait.</div>}
                {!loading && result && <pre className="whitespace-pre-wrap text-sm">{result}</pre>}
                {!loading && !result && <div className="text-slate-400">No JD generated yet. Fill inputs and click Generate.</div>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle>History</CardTitle>
                <Button onClick={() => { if (confirm('Clear history?')) setHistory([]); }} variant="ghost" size="sm" className="text-destructive hover:text-destructive">Clear</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-auto">
                {history.length === 0 && <div className="text-sm text-slate-400">No previous JDs</div>}
                {history.map(h => (
                  <motion.div key={h.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 border rounded flex items-start gap-3">
                    <div className="flex-1">
                      <div className="font-medium">{h.inputs.role} <span className="text-xs text-slate-400">• {new Date(h.createdAt).toLocaleString()}</span></div>
                      <div className="text-xs text-slate-500 line-clamp-3 mt-1">{h.jd}</div>
                      <div className="mt-2 flex gap-2">
                        <Button onClick={() => handleUseHistory(h)} size="sm" variant="outline">Use</Button>
                        <Button onClick={() => { navigator.clipboard.writeText(h.jd); alert('Copied'); }} size="sm" variant="outline">Copy</Button>
                        <Button onClick={() => handleDeleteHistory(h.id)} size="sm" variant="destructive" className="gap-2"><Trash2 size={14} /> Delete</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
