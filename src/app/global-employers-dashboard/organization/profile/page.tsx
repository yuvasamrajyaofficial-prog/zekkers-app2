
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, Building, Palette } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function CompanyProfilePage() {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = e.target.files?.[0];
        if (file) {
            setter(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = () => {
        toast({
            title: "Changes Saved (Mock)",
            description: "Your company profile has been updated.",
        });
    };

  return (
    <div className="p-4 md:p-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold text-slate-800">Company Profile</h1>
                <p className="text-slate-500 mt-1">Manage your organization's identity, branding, and public presence.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Building /> Organization Details</CardTitle>
                        <CardDescription>This information is used for verification and internal records.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="company-name">Company Name</Label>
                                <Input id="company-name" defaultValue="GlobalCorp Inc." />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="legal-name">Legal Business Name</Label>
                                <Input id="legal-name" defaultValue="GlobalCorp Solutions GmbH" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="industry">Industry</Label>
                                <Select defaultValue="technology"><SelectTrigger id="industry"><SelectValue /></SelectTrigger><SelectContent>
                                    <SelectItem value="technology">Software & IT</SelectItem>
                                    <SelectItem value="finance">Finance</SelectItem>
                                </SelectContent></Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="website">Website URL</Label>
                                <Input id="website" defaultValue="https://globalcorp.example.com" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Palette /> Public Branding</CardTitle>
                        <CardDescription>This is what candidates see on your public profile and job posts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Company Logo</Label>
                                <div className="p-4 border rounded-lg flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                                        {logoPreview ? <Image src={logoPreview} alt="logo" width={96} height={96} className="object-cover" /> : <UploadCloud className="text-slate-400"/>}
                                    </div>
                                    <Input type="file" className="text-xs" onChange={(e) => handleFileChange(e, setLogoPreview)}/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Company Banner</Label>
                                <div className="p-4 border rounded-lg flex flex-col items-center gap-2">
                                    <div className="w-full h-24 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                                        {bannerPreview ? <Image src={bannerPreview} alt="banner" width={300} height={96} className="object-cover w-full h-full" /> : <UploadCloud className="text-slate-400"/>}
                                    </div>
                                    <Input type="file" className="text-xs" onChange={(e) => handleFileChange(e, setBannerPreview)} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="description">Company Description</Label>
                            <Textarea id="description" placeholder="A short, compelling description of your company..." rows={4} />
                        </div>
                         <div className="space-y-1.5">
                            <Label htmlFor="mission">Mission / Values</Label>
                            <Textarea id="mission" placeholder="What drives your company? What are your core values?" rows={3} />
                        </div>
                         <div className="space-y-1.5">
                            <Label htmlFor="perks">Perks & Benefits</Label>
                            <Textarea id="perks" placeholder="List key benefits like health insurance, remote work, learning budgets, etc." rows={3} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-end">
                <Button size="lg" onClick={handleSaveChanges}>Save All Changes</Button>
            </motion.div>

        </motion.div>
    </div>
  )
}
