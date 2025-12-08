
'use client';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, UserPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface AICandidateFinderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICandidateFinder: React.FC<AICandidateFinderProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg lg:max-w-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="text-primary" /> AI Candidate Finder
          </SheetTitle>
          <SheetDescription>
            Describe your ideal candidate and let our AI find the best matches
            from the Zekkers talent pool.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-skills">Skills Needed (comma-separated)</Label>
            <Input id="ai-skills" placeholder="e.g., React, Node.js, Python" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ai-exp">Experience (in years)</Label>
            <Input id="ai-exp" type="number" placeholder="e.g., 3" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ai-keywords">
              Keywords (optional, from resume or profile)
            </Label>
            <Textarea
              id="ai-keywords"
              placeholder="e.g., 'led a team', 'fintech project', 'open-source contributor'"
              rows={3}
            />
          </div>
          
           <Button className="w-full gap-2">
              <Sparkles size={16} /> Find Candidates
            </Button>
        </div>

        <Separator />
        
        <div className="py-6">
            <h3 className="font-semibold mb-4">Recommended Candidates</h3>
            <div className="space-y-3">
                {/* Mocked results */}
                <div className="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                        <p className="font-bold">Ananya Rao</p>
                        <p className="text-sm text-muted-foreground">AI Match: 94%</p>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2"><UserPlus size={14}/> Invite to Apply</Button>
                </div>
                 <div className="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                        <p className="font-bold">Sameer Khan</p>
                        <p className="text-sm text-muted-foreground">AI Match: 91%</p>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2"><UserPlus size={14}/> Invite to Apply</Button>
                </div>
            </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
