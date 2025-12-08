'use client';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { PlusCircle, List, LayoutGrid } from 'lucide-react';
import { useDrives } from '@/hooks/useDrives';
import { DriveCard } from './_components/drive-card';
import ZLoader from '@/components/ui/loader';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function DrivesPage() {
  const { drives, loading, error } = useDrives('demo-college');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrives = useMemo(() => {
    if (!searchQuery) return drives;
    return drives.filter(
      (drive) =>
        drive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drive.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [drives, searchQuery]);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Placement Drives
              </CardTitle>
              <CardDescription>
                Manage all on-campus, off-campus, and virtual hiring events.
              </CardDescription>
            </div>
            <Button className="gap-2 w-full md:w-auto">
              <PlusCircle size={16} />
              Create Drive
            </Button>
          </div>
          <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 transform -translate-y-1/2" />
            <Input
              placeholder="Search drives by name or company..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">
              Active & Upcoming Drives ({filteredDrives.length})
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant={layout === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setLayout('grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={layout === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setLayout('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <ZLoader />
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-red-50 text-red-700 rounded-lg border border-red-200">
                <h3 className="font-semibold text-lg">Error Loading Drives</h3>
                <p className="mt-1">{error.message}</p>
            </div>
          ) : filteredDrives.length > 0 ? (
            <div
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredDrives.map((drive) => (
                <DriveCard key={drive.id} drive={drive} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
              <h3 className="font-semibold text-lg">No Active Drives</h3>
              <p className="text-slate-500 mt-1">
                Click "Create Drive" to start a new placement event.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
