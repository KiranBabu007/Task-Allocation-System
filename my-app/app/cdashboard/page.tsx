'use client'

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const CompanyProfilePage = () => {
    const [companyDetails, setCompanyDetails] = useState({
        name: 'Acme Corporation',
        industry: 'Technology',
        founded: '1985',
        headquarters: 'San Francisco, CA, USA',
        website: 'https://acme.com',
        description: 'Acme Corporation is a leading technology company focused on developing innovative software solutions.',
        isPublic: true,
    });

    const handleChange = (e:any) => {
        setCompanyDetails({ ...companyDetails, [e.target.name]: e.target.value });
    };

    const resetDetails = () => {
        setCompanyDetails({
            name: 'Acme Corporation',
            industry: 'Technology',
            founded: '1985',
            headquarters: 'San Francisco, CA, USA',
            website: 'https://acme.com',
            description: 'Acme Corporation is a leading technology company focused on developing innovative software solutions.',
            isPublic: true,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-[100%] max-w-4xl">
                <CardHeader className="relative">
                    <div className="bg-blue-500 h-48 rounded-t-lg"></div>
                    <Avatar className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <AvatarImage src="/company-logo.png" alt="Company Logo" />
                        <AvatarFallback>AC</AvatarFallback>
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
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label>Public Profile</Label>
                            <Switch
                                id="public"
                                checked={companyDetails.isPublic}
                                onCheckedChange={(checked:boolean) =>
                                    setCompanyDetails({ ...companyDetails, isPublic: checked })
                                }
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button onClick={resetDetails}>Reset</Button>
                    <Button variant="outline">Save</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CompanyProfilePage;