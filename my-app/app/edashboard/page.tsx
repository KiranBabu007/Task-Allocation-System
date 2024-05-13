'use client'

import React, { useState, useEffect } from 'react';
import { app, firestore, storage } from '@/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getDownloadURL, listAll, ref } from "firebase/storage";

const Page = () => {
    const [employee, setEmployee] = useState({
        name: 'John Doe',
        position: 'Software Engineer',
        department: 'Engineering',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        startDate: '2022-01-01',
    });

    const [profileImageUrl, setProfileImageUrl] = useState('');

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const storageRef = ref(storage, 'files');
                const result = await listAll(storageRef);
                const imageRef = result.items[0]; // Assuming there is at least one image

                if (imageRef) {
                    const imageUrl = await getDownloadURL(imageRef);
                    setProfileImageUrl(imageUrl);
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        fetchProfileImage();
    }, []);

    const handleChange = (e:any) => {
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

    const handleSave = async () => {
        try {
            // Get the current user ID
            const auth = getAuth();
            const currentUser = auth.currentUser;
            const currentUserId = currentUser ? currentUser.uid : null;

            if (!currentUserId) {
                console.error('No user is currently signed in.');
                return;
            }

            // Create a reference to the document with the current user ID
            const employeeDocRef = doc(firestore, 'employees', currentUserId);

            // Update the document with the employee data
            await setDoc(employeeDocRef, employee);

            console.log('Employee data saved successfully!');
        } catch (error) {
            console.error('Error saving employee data:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-[100%] ">
                <CardHeader className="relative">
                    <div className="bg-blue-500 h-32 rounded-t-lg">
                        
                        <Avatar className='h-20 w-20'>
                            {profileImageUrl ? (
                                <AvatarImage  src={profileImageUrl} alt="User Profile"  />
                            ) : (
                                <div className="bg-gray-300 rounded-full h-24 w-24 flex items-center justify-center">
                                    <span className="text-gray-600 text-xl">JD</span>
                                </div>
                            )}
                        </Avatar>
                    </div>
                </CardHeader>
                <CardContent className="mt-8">
                    <div className="space-y-4">
                        <div className="flex items-center ">
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
                        <div className="flex items-center ">
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
                        <div className="flex items-center ">
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
                    <Button variant="outline" onClick={handleSave}>
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Page;