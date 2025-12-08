
'use client';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProfileData } from '@/services/profile';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Download } from 'lucide-react';

const placementStatusStyles: { [key: string]: string } = {
    Placed: 'bg-green-100 text-green-700 border-green-200',
    'In Process': 'bg-amber-100 text-amber-700 border-amber-200',
    'Not Placed': 'bg-slate-100 text-slate-600 border-slate-200',
    Interned: 'bg-blue-100 text-blue-700 border-blue-200',
};

export const StudentCard = ({ student }: { student: ProfileData }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}
            className="bg-white p-4 rounded-xl border flex flex-col"
        >
            <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                    {student.avatarUrl && <AvatarImage src={student.avatarUrl} alt={student.name || 'Student avatar'} />}
                    <AvatarFallback>{student.name?.charAt(0) || student.email?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-800">{student.name}</h3>
                        {student.verified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{student.department}</p>
                    <p className="text-xs text-muted-foreground">Batch {student.batch}</p>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                 <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-slate-500">Profile</span>
                        <span className="font-bold text-primary">{student.profileCompletion}%</span>
                    </div>
                    <Progress value={student.profileCompletion || 0} className="h-1.5" />
                </div>
                <div className="flex justify-between items-center text-xs">
                     <span className="font-semibold text-slate-500">Resume Score</span>
                     <span className="font-bold text-primary">{student.resumeScore}%</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex-1">
                <Badge className={`${placementStatusStyles[student.placementStatus || 'Not Placed']} capitalize`}>{student.placementStatus || 'Not Placed'}</Badge>
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
                 <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Download className="w-4 h-4" />
                 </Button>
                <Button variant="outline" size="sm">View Profile</Button>
            </div>
        </motion.div>
    )
}
