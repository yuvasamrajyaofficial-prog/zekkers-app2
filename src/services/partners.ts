
'use client';
import { PlaceHolderImages } from "@/lib/placeholder-images";

const getImageUrl = (id: string) => PlaceHolderImages.find(p => p.id === id)?.imageUrl || '';

export type PartnerType = 'College' | 'University' | 'NGO' | 'Training Institute';
export type PartnershipStatus = 'Not Connected' | 'Pending' | 'Connected';

export interface Partner {
    id: string;
    name: string;
    logo: string;
    banner?: string;
    type: PartnerType;
    location: string;
    kycStatus: 'verified' | 'pending' | 'rejected';
    studentCount: number;
    placementRate: number;
    avgPackage: number;
    topPrograms: string[];
    contact: {
        email: string;
        phone: string;
        tpoName: string;
    };
    partnershipStatus: PartnershipStatus;
}

export const MOCK_PARTNERS: Partner[] = [
    {
        id: 'p-1',
        name: 'National Institute of Technology, Delhi',
        logo: getImageUrl('logo'),
        banner: getImageUrl('hero'),
        type: 'University',
        location: 'Delhi, India',
        kycStatus: 'verified',
        studentCount: 8500,
        placementRate: 92,
        avgPackage: 12.5,
        topPrograms: ['Computer Science', 'Electronics', 'Mechanical'],
        contact: { email: 'tpo@nitd.ac.in', phone: '+91-11-27891234', tpoName: 'Dr. Ramesh Kumar' },
        partnershipStatus: 'Connected',
    },
    {
        id: 'p-2',
        name: 'Pune College of Engineering',
        logo: getImageUrl('company1'),
        banner: getImageUrl('yuvahome'),
        type: 'College',
        location: 'Pune, India',
        kycStatus: 'verified',
        studentCount: 5200,
        placementRate: 88,
        avgPackage: 9.8,
        topPrograms: ['IT', 'Civil Engineering', 'Automobile'],
        contact: { email: 'placement@pcoer.com', phone: '+91-20-26543210', tpoName: 'Mrs. Sunita Patil' },
        partnershipStatus: 'Pending',
    },
    {
        id: 'p-3',
        name: 'Yuva Skilling Foundation',
        logo: getImageUrl('company2'),
        banner: getImageUrl('yuvaapp'),
        type: 'NGO',
        location: 'Mumbai, India',
        kycStatus: 'verified',
        studentCount: 1200,
        placementRate: 75,
        avgPackage: 3.5,
        topPrograms: ['Retail Management', 'Basic IT Skills', 'Hospitality'],
        contact: { email: 'contact@yuvasf.org', phone: '+91-22-24567890', tpoName: 'Mr. Anand Verma' },
        partnershipStatus: 'Not Connected',
    },
    {
        id: 'p-4',
        name: 'Global Tech Training Institute',
        logo: getImageUrl('company3'),
        banner: getImageUrl('employerdash'),
        type: 'Training Institute',
        location: 'Remote',
        kycStatus: 'pending',
        studentCount: 3000,
        placementRate: 95,
        avgPackage: 15.0,
        topPrograms: ['Cloud & DevOps', 'Cybersecurity', 'Data Science'],
        contact: { email: 'admissions@gtti.com', phone: '+1-800-555-0199', tpoName: 'Sarah Johnson' },
        partnershipStatus: 'Not Connected',
    }
];
