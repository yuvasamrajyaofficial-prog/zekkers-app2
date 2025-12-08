
'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, Palette } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function BrandingPage() {
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
            description: "Your branding settings have been updated.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette /> Branding & Appearance</CardTitle>
                <CardDescription>
                    Customize your NGO's public-facing brand assets and portal theme.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Logo & Banner</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg flex flex-col items-center gap-2">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                                {logoPreview ? <Image src={logoPreview} alt="logo" width={96} height={96} className="object-cover" /> : <UploadCloud className="text-slate-400"/>}
                            </div>
                            <Input type="file" className="text-xs" onChange={(e) => handleFileChange(e, setLogoPreview)}/>
                        </div>
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <div className="flex justify-end">
                    <Button onClick={handleSave}>Save Branding</Button>
                </div>
            </CardContent>
        </Card>
    );
}
