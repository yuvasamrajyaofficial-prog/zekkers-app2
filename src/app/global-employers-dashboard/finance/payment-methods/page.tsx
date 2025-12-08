
'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  PlusCircle,
  Trash2,
  Mail,
  MoreHorizontal,
  Star,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// --- Types ---
type PaymentMethod = {
  id: string;
  type: 'Visa' | 'Mastercard' | 'Amex';
  last4: string;
  expiry: string;
  isDefault: boolean;
};

type BillingContact = {
  id: string;
  name: string;
  email: string;
};

// --- Mock Data ---
const mockPaymentMethods: PaymentMethod[] = [
  { id: 'pm-1', type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
  { id: 'pm-2', type: 'Mastercard', last4: '5555', expiry: '08/25', isDefault: false },
];

const mockBillingContacts: BillingContact[] = [
  { id: 'bc-1', name: 'Admin', email: 'billing@globalcorp.com' },
  { id: 'bc-2', name: 'John Doe', email: 'john.doe@globalcorp.com' },
];

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Main Component ---
export default function PaymentMethodsPage() {
    const { toast } = useToast();
    const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
    const [billingContacts, setBillingContacts] = useState(mockBillingContacts);

    const handleAction = (action: string) => {
        toast({ title: `${action} (Mock)`, description: `This would open a modal to ${action.toLowerCase()}.` });
    };

    const handleDelete = (type: 'method' | 'contact', id: string) => {
        if(confirm('Are you sure you want to remove this item?')) {
            if (type === 'method') {
                setPaymentMethods(prev => prev.filter(p => p.id !== id));
            } else {
                setBillingContacts(prev => prev.filter(c => c.id !== id));
            }
            toast({ title: "Item Removed", variant: "destructive" });
        }
    };
    
    const handleSetDefault = (id: string) => {
        setPaymentMethods(prev => prev.map(p => ({ ...p, isDefault: p.id === id })));
        toast({ title: "Default Payment Method Updated" });
    }

    return (
        <div className="p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3"><CreditCard/>Payment Methods</CardTitle>
                    <CardDescription>Manage company payment methods and billing contacts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                        {/* Saved Payment Methods */}
                        <motion.div variants={itemVariants}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
                                <Button size="sm" onClick={() => handleAction('Add New Payment Method')}><PlusCircle size={16} className="mr-2"/>Add Method</Button>
                            </div>
                             <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Card</TableHead>
                                            <TableHead>Expires</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paymentMethods.map(method => (
                                            <TableRow key={method.id}>
                                                <TableCell>
                                                    <div className="font-medium flex items-center gap-2">
                                                        {method.type} ending in {method.last4}
                                                        {method.isDefault && <Badge variant="default" className="gap-1.5"><Star size={12}/>Default</Badge>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{method.expiry}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            {!method.isDefault && <DropdownMenuItem onClick={() => handleSetDefault(method.id)}>Set as Default</DropdownMenuItem>}
                                                            <DropdownMenuItem onClick={() => handleDelete('method', method.id)} className="text-destructive">Remove</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </motion.div>

                        {/* Billing Contacts */}
                         <motion.div variants={itemVariants}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Billing Contacts</h3>
                                <Button size="sm" variant="outline" onClick={() => handleAction('Add Billing Contact')}><PlusCircle size={16} className="mr-2"/>Add Contact</Button>
                            </div>
                             <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                         {billingContacts.map(contact => (
                                            <TableRow key={contact.id}>
                                                <TableCell className="font-medium">{contact.name}</TableCell>
                                                <TableCell>{contact.email}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete('contact', contact.id)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </motion.div>

                    </motion.div>
                </CardContent>
            </Card>
        </div>
    );
}
