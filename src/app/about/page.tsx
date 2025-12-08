'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  const router = useRouter();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="mb-4 gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">About Zekkers</CardTitle>
          <p className="pt-2 text-slate-600">
            Our story, our mission, and the team driving the future of career
            development.
          </p>
        </CardHeader>
        <CardContent>
          <section className="mt-2">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="mt-2 text-slate-700">
              To connect students and employers with trusted opportunities across
              government, private, and international sectors, empowering smart
              seekers to build AI-powered futures with confidence and clarity.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Our Values</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border">
                <h3 className="font-semibold">Trust</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Building a secure and verified ecosystem is our top priority.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border">
                <h3 className="font-semibold">Innovation</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Leveraging AI to create smarter, more efficient career pathways.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border">
                <h3 className="font-semibold">Accessibility</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Providing equal access to opportunities for everyone, everywhere.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 text-center">
            <h2 className="text-2xl font-semibold">Join Our Team</h2>
            <p className="mt-2 text-slate-700">
              We're always looking for passionate people to join us on our mission.
            </p>
            <Button className="mt-4">View Open Positions</Button>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
