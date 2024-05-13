'use client'

import React, { useState } from 'react';
import {app,firestore,storage} from '@/firebaseConfig'
import {
    Label
} from '@/components/ui/label'
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"





const Page = () => {
    const [employee, setEmployee] = useState({
        name: 'John Doe',
        position: 'Software Engineer',
        department: 'Engineering',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        startDate: '2022-01-01',
    });

    const handleChange = (e: any) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const resetDetails = () => {
        setEmployee({
            name: 'John Doe',
            position: 'Software Engineer',
            department: 'Engineering',
            email: 'john.doe@example.com',
            phoneNumber: '+1234567890',
            startDate: '2022-01-01',
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-[100%] bg-gradient-to-br from-blue-500 to-purple-500">
                <CardHeader className="relative">

                    <div className="bg-blue-500 h-32 rounded-t-lg">
                        <Avatar >
                            <AvatarImage src="/profile-picture.jpg" alt="User Profile" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </div>
                </CardHeader>
                <CardContent className="mt-16">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="name" className="text-right  m-4">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="position" className=" m-4">
                                Position
                            </Label>
                            <Input
                                id="position"
                                name="position"
                                value={employee.position}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="department" className=" m-4">
                                Department
                            </Label>
                            <Input
                                id="department"
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="email" className="  m-4">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={employee.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="phoneNumber" className="  m-4">
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={employee.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="startDate" className=" m-4">
                                Start Date
                            </Label>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={employee.startDate}
                                onChange={handleChange}
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

export default Page;