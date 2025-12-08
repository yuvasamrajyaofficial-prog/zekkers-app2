
'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';

export function StudentFiltersBar() {
    // This is a placeholder for now. We will wire up state management later.
    const [searchQuery, setSearchQuery] = useState('');
    const [department, setDepartment] = useState('all');
    const [batch, setBatch] = useState('all');

    const handleReset = () => {
        setSearchQuery('');
        setDepartment('all');
        setBatch('all');
    }

    return (
        <Card className="mb-6">
            <CardHeader className="p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search by name, roll no, email..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                        <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Aerospace Engineering">Aerospace Engineering</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={batch} onValueChange={setBatch}>
                    <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="All Batches" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Batches</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex-grow" />
                <Button variant="ghost" onClick={handleReset} className="text-muted-foreground hidden md:flex">
                    <X className="w-4 h-4 mr-2" />
                    Reset
                </Button>
                 <Button className="w-full md:w-auto">Apply</Button>
            </CardHeader>
        </Card>
    )
}
