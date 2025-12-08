
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IntegrationCard = ({ logo, name, category, status, onConnect }: { logo: string, name: string, category: string, status: 'Connected' | 'Not Connected', onConnect: () => void }) => (
    <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl font-bold">{logo}</div>
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">{category}</p>
                </div>
            </div>
            <Button onClick={onConnect} variant={status === 'Connected' ? 'outline' : 'default'} size="sm">
                {status === 'Connected' ? 'Manage' : 'Connect'}
            </Button>
        </CardContent>
    </Card>
);

export default function SsoPage() {
    const { toast } = useToast();

    const handleConnect = (provider: string) => {
        toast({
            title: `Connecting ${provider} (Mock)`,
            description: "This would initiate the OAuth flow or SAML setup.",
        });
    };

  return (
     <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock /> Single Sign-On (SSO)</CardTitle>
            <CardDescription>Allow your team to log in using your organization's identity provider.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <IntegrationCard logo="G" name="Google Workspace" category="SSO" status="Not Connected" onConnect={() => handleConnect('Google')} />
                <IntegrationCard logo="M" name="Microsoft Azure AD" category="SSO" status="Not Connected" onConnect={() => handleConnect('Microsoft')} />
                <IntegrationCard logo="O" name="Okta" category="SSO" status="Not Connected" onConnect={() => handleConnect('Okta')} />
                <IntegrationCard logo="S" name="Custom SAML 2.0" category="SSO" status="Not Connected" onConnect={() => handleConnect('SAML')} />
            </div>
        </CardContent>
    </Card>
  );
}
