'use client';
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code2, BookOpen, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function APIDocs() {
    const { toast } = useToast();

    const handleDownload = () => {
        toast({
            title: "Download Initiated (Mock)",
            description: "The Postman collection would be downloaded here.",
        });
    };

    return (
        <div className="p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center gap-3">
                        <Code2 className="text-primary"/> Developer & API Documentation
                    </CardTitle>
                    <CardDescription>
                        Integrate with Zekkers using our REST API, webhooks, and SDKs.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Getting Started */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">Getting Started</h2>
                        <div className="p-6 border rounded-lg bg-slate-50">
                            <p className="font-semibold">Your API Key</p>
                            <p className="text-sm text-muted-foreground mt-1 mb-3">Use this key in the Authorization header of your requests.</p>
                            <div className="flex items-center gap-2 p-2 bg-white border rounded-md">
                                <code className="text-sm text-muted-foreground">prod_sk_...xxxxxx</code>
                                <Button variant="outline" size="sm">Copy Key</Button>
                            </div>
                        </div>
                    </section>

                    {/* Example Request */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">Example: Fetching Jobs</h2>
                        <p className="text-sm text-muted-foreground mb-2">Here is an example of how to fetch a list of your active job postings.</p>
                        <div className="p-4 bg-slate-800 text-slate-100 rounded-lg">
                            <pre><code>
{`curl "https://api.zekkers.com/v1/jobs" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                            </code></pre>
                        </div>
                    </section>

                    {/* Resources */}
                     <section>
                        <h2 className="text-xl font-bold mb-4">Resources</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button variant="outline" size="lg" className="justify-start p-4 h-auto gap-3 text-left">
                                <BookOpen className="w-6 h-6 text-primary"/>
                                <div>
                                    <p className="font-semibold">Full API Reference</p>
                                    <p className="text-xs text-muted-foreground font-normal">Explore all endpoints and models.</p>
                                </div>
                            </Button>
                             <Button variant="outline" size="lg" className="justify-start p-4 h-auto gap-3 text-left" onClick={handleDownload}>
                                <Download className="w-6 h-6 text-primary"/>
                                 <div>
                                    <p className="font-semibold">Download Postman Collection</p>
                                    <p className="text-xs text-muted-foreground font-normal">Start making requests in minutes.</p>
                                </div>
                            </Button>
                        </div>
                    </section>

                </CardContent>
            </Card>
        </div>
    );
}
