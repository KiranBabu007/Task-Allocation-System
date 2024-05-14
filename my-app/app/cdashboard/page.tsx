'use client'

import React, { useState, useEffect } from 'react';
import { firestore } from '@/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const CompanyProfilePage = () => {
    const [companyDetails, setCompanyDetails] = useState({
        name: '',
        industry: '',
        founded: '',
        headquarters: '',
        website: '',
        description: '',
        isPublic: true,
    });

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;
                const currentUserId = currentUser ? currentUser.uid : null;

                if (currentUserId) {
                    const companyDocRef = doc(firestore, 'companies', currentUserId);
                    const companySnapshot = await getDoc(companyDocRef);

                    if (companySnapshot.exists()) {
                        const companyData = companySnapshot.data();
                        setCompanyDetails(companyData);
                    } else {
                        console.log('No company data found for the current user.');
                    }
                } else {
                    console.error('No user is currently signed in.');
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchCompanyData();
    }, []);

    const handleChange = (e:any) => {
        setCompanyDetails({ ...companyDetails, [e.target.name]: e.target.value });
    };

    const resetDetails = () => {
        setCompanyDetails({
            name: '',
            industry: '',
            founded: '',
            headquarters: '',
            website: '',
            description: '',
            isPublic: true,
        });
    };

    const handleSave = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            const currentUserId = currentUser ? currentUser.uid : null;

            if (!currentUserId) {
                console.error('No user is currently signed in.');
                return;
            }

            const companyDocRef = doc(firestore, 'companies', currentUserId);
            await setDoc(companyDocRef, companyDetails);

            console.log('Company data saved successfully!');
        } catch (error) {
            console.error('Error saving company data:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-[100%] max-w-4xl">
                <CardHeader className="relative">
                    <div className="bg-blue-500 h-48 rounded-t-lg"></div>
                    <Avatar className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        {/* No image rendering */}
                    </Avatar>
                </CardHeader>
                <CardContent className="mt-16">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Label htmlFor="name" className="text-right w-32 mr-4">
                                Company Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={companyDetails.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="industry" className="text-right w-32 mr-4">
                                Industry
                            </Label>
                            <Input
                                id="industry"
                                name="industry"
                                value={companyDetails.industry}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="founded" className="text-right w-32 mr-4">
                                Founded
                            </Label>
                            <Input
                                id="founded"
                                name="founded"
                                value={companyDetails.founded}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="headquarters" className="text-right w-32 mr-4">
                                Headquarters
                            </Label>
                            <Input
                                id="headquarters"
                                name="headquarters"
                                value={companyDetails.headquarters}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="website" className="text-right w-32 mr-4">
                                Website
                            </Label>
                            <Input
                                id="website"
                                name="website"
                                value={companyDetails.website}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-start">
                            <Label htmlFor="description" className="text-right w-32 mr-4 mt-2">
                                Description
                            </Label>
                            <textarea
                                id="description"
                                name="description"
                                value={companyDetails.description}
                                onChange={handleChange}
                                className="flex-1 rounded-md border-input border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button onClick={resetDetails}>Reset</Button>
                    <Button variant="outline" onClick={handleSave}>
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CompanyProfilePage;