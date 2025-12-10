'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, Palette, Star, FileText } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

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

export default function EmployerBranding() {
    const { toast } = useToast();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = e.target.files?.[0];
        if (file) {
            setter(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        toast({
            title: "Branding Saved",
            description: "Your company's branding has been updated.",
        });
    };

    return (
        <div className="p-4 md:p-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl font-bold text-slate-800">Employer Branding</h1>
                    <p className="text-slate-500 mt-1">Manage your career page, logos, banners, and social proof.</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><Palette /> Visual Identity</CardTitle>
                            <CardDescription>Upload your logo, banner, and set your brand colors.</CardDescription>
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
                            <div className="space-y-2">
                                <Label>Brand Colors</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="primary-color" className="text-xs">Primary</Label>
                                        <Input id="primary-color" type="color" defaultValue="#3740FF" className="h-12 p-1" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="accent-color" className="text-xs">Accent</Label>
                                        <Input id="accent-color" type="color" defaultValue="#06B6D4" className="h-12 p-1" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><FileText /> Company Story</CardTitle>
                            <CardDescription>Tell your story to attract the right talent.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="mission">Mission & Values</Label>
                                <Textarea id="mission" placeholder="What drives your company? What are your core values?" rows={4} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="perks">Perks & Benefits</Label>
                                <Textarea id="perks" placeholder="List key benefits like health insurance, remote work, learning budgets, etc." rows={4} />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                
                 <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><Star /> Social Proof</CardTitle>
                            <CardDescription>Showcase testimonials and awards to build trust.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed">
                                <h3 className="font-semibold text-lg">Coming Soon</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    A section to manage employee testimonials and company awards will be available here.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-end">
                    <Button size="lg" onClick={handleSave}>Save Branding Changes</Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
