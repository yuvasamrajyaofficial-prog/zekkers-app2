
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { Job, JobCategory, JobType } from '@/types/job';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { generateJobPost } from '@/ai/flows/ai-job-post-generator';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function AdminCreateJobPage() {
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();

  const [jobDetails, setJobDetails] = useState<Partial<Job>>({
    title: '',
    company: '',
    location: '',
    category: 'private',
    country: 'India',
    type: 'onsite',
    status: 'draft',
    skills: [],
    qualifications: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTitle, setAiTitle] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: keyof Job, value: string) => {
    setJobDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleTagInputChange = (
    field: 'skills' | 'qualifications',
    value: string
  ) => {
    const values = value.split(',').map((s) => s.trim()).filter(Boolean);
    setJobDetails((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const handleAiGenerate = async () => {
    if (!aiTitle) {
      toast({ variant: 'destructive', title: "Job Title is required for AI generation."});
      return;
    }
    setIsAiLoading(true);
    try {
      const result = await generateJobPost({ title: aiTitle, keywords: aiKeywords });
      setJobDetails(prev => ({
        ...prev,
        title: aiTitle,
        description: result.description,
        skills: result.skills,
        qualifications: result.qualifications,
      }));
      setIsAiModalOpen(false);
      toast({ title: "AI Generation Successful", description: "Job details have been populated." });
    } catch (error: any) {
      toast({ variant: 'destructive', title: "AI Generation Failed", description: error.message });
    } finally {
      setIsAiLoading(false);
    }
  }

  const handleSubmit = () => {
    if (!firestore) {
      toast({
        variant: 'destructive',
        title: 'Firestore not available',
        description: 'Please check your Firebase connection.',
      });
      return;
    }
    setIsLoading(true);

    addDocumentNonBlocking(collection(firestore, 'jobs'), {
      ...jobDetails,
      postedAt: serverTimestamp(),
      status: 'published',
    });

    toast({
      title: 'Job Created Successfully',
      description: `${jobDetails.title} has been published.`,
    });

    router.push('/admin-dashboard/jobs');
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ChevronLeft size={16} />
          Back to Jobs
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create a New Job</CardTitle>
              <CardDescription>
                Fill out the details below or use AI to generate a draft.
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setIsAiModalOpen(true)} className="gap-2">
              <Sparkles size={16} />
              AI Generate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={jobDetails.title}
                onChange={handleInputChange}
                placeholder="e.g., Frontend Developer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={jobDetails.company}
                onChange={handleInputChange}
                placeholder="e.g., ZekkTech"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={jobDetails.location}
                onChange={handleInputChange}
                placeholder="e.g., Bengaluru"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={jobDetails.country}
                onChange={handleInputChange}
                placeholder="e.g., India"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={jobDetails.category}
                onValueChange={(v) =>
                  handleSelectChange('category', v as JobCategory)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type">Job Type</Label>
              <Select
                value={jobDetails.type}
                onValueChange={(v) => handleSelectChange('type', v as JobType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="wfh">Work From Home</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceMin">Min Experience (Years)</Label>
              <Input
                id="experienceMin"
                type="number"
                value={jobDetails.experienceMin || ''}
                onChange={(e) =>
                  setJobDetails((p) => ({
                    ...p,
                    experienceMin: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceMax">Max Experience (Years)</Label>
              <Input
                id="experienceMax"
                type="number"
                value={jobDetails.experienceMax || ''}
                onChange={(e) =>
                  setJobDetails((p) => ({
                    ...p,
                    experienceMax: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={jobDetails.description}
              onChange={handleInputChange}
              rows={8}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills-input"
              value={jobDetails.skills?.join(', ')}
              onChange={(e) => handleTagInputChange('skills', e.target.value)}
              placeholder="Comma-separated, e.g., React, Node.js, SQL"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {jobDetails.skills?.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualifications">Qualifications</Label>
            <Input
              id="qualifications-input"
              value={jobDetails.qualifications?.join(', ')}
              onChange={(e) =>
                handleTagInputChange('qualifications', e.target.value)
              }
              placeholder="Comma-separated, e.g., B.Tech, M.Sc in CS"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {jobDetails.qualifications?.map((q) => (
                <Badge key={q} variant="secondary">
                  {q}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => router.push('/admin-dashboard/jobs')}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Publish Job'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Job Post with AI</DialogTitle>
            <DialogDescription>
              Provide a job title and some keywords, and we'll generate the rest.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ai-title">Job Title</Label>
              <Input id="ai-title" value={aiTitle} onChange={(e) => setAiTitle(e.target.value)} placeholder="e.g., Senior Python Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ai-keywords">Keywords</Label>
              <Input id="ai-keywords" value={aiKeywords} onChange={(e) => setAiKeywords(e.target.value)} placeholder="e.g., Django, FinTech, Bengaluru, 5+ years" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAiModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAiGenerate} disabled={isAiLoading}>
              {isAiLoading ? 'Generating...' : 'Generate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
