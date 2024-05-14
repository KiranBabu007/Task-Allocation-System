'use client'

import React, { useState, useEffect } from 'react';
import { app, firestore, storage } from '@/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getDownloadURL, ref } from "firebase/storage";
import ChatBot from '@/components/ui/ChatBot';
const Page = () => {
    const [employee, setEmployee] = useState({
        name: '',
        position: '',
        department: '',
        email: '',
        phoneNumber: '',
        startDate: ''
    });

    const [profileImageUrl, setProfileImageUrl] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
            if (user) {
                const currentUserId = user.uid;
                fetchProfileImage(currentUserId);
                fetchEmployeeData(currentUserId);
            } else {
                setEmployee({
                    name: '',
                    position: '',
                    department: '',
                    email: '',
                    phoneNumber: '',
                    startDate: ''
                });
                setProfileImageUrl('');
            }
        });

        return unsubscribe;
    }, []);

    const fetchProfileImage = async (currentUserId) => {
        try {
            const imageRef = ref(storage, `files/${currentUserId}.jpg`);
            const imageUrl = await getDownloadURL(imageRef);
            setProfileImageUrl(imageUrl);
        } catch (error) {
            console.error('Error fetching profile image:', error);
        }
    };

    const fetchEmployeeData = async (currentUserId) => {
        try {
            const employeeDocRef = doc(firestore, 'employees', currentUserId);
            const employeeSnapshot = await getDoc(employeeDocRef);

            if (employeeSnapshot.exists()) {
                const employeeData = employeeSnapshot.data();
                setEmployee(employeeData);
            } else {
                console.log('No employee data found for the current user.');
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const resetDetails = () => {
        setEmployee({
            name: '',
            position: '',
            department: '',
            email: '',
            phoneNumber: '',
            startDate: '',
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

            const employeeDocRef = doc(firestore, 'employees', currentUserId);
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
                    <div className="bg-blue-500 h-32 rounded-lg relative">
                        <div className='h-full w-32 absolute z-10'>
                            <Avatar className='h-20 w-20'>
                                {profileImageUrl ? (
                                    <AvatarImage className='object-cover h-20 w-20 m-5' src={profileImageUrl} alt="User Profile" />
                                ) : (
                                    <></>
                                )}
                            </Avatar>
                        </div>
                        <div
                            className="absolute inset-0 bg-cover bg-center rounded-lg"
                            style={{
                                backgroundImage: "url('./profile.png')"
                            }}
                        />
                    </div>
                </CardHeader>
                <CardContent className="mt-8">
                    <div className="space-y-4 flex flex-col items-start ">
                        <div className="flex items-center justify-between  ">
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
                        <div className="flex items-center gap-5 ">
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
            <ChatBot />
        </div>
    );
};

export default Page;