'use client';

import React, { useState,useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { app, firestore } from '@/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';


const questions = [
    {
        question: 'What is machine learning?',
        options: [
            'A subset of artificial intelligence',
            'A programming language',
            'A type of computer hardware',
            'A networking protocol',
        ],
        answer: 'A subset of artificial intelligence',
    },
    {
        question: 'What is a neural network?',
        options: [
            'A type of programming language',
            'A method for organizing data',
            'A type of computer hardware',
            'A model inspired by the human brain',
        ],
        answer: 'A model inspired by the human brain',
    },
    {
        question: 'What is supervised learning?',
        options: [
            'A learning process without guidance',
            'A learning process with feedback',
            'A learning process with pre-labeled data',
            'A learning process with no data',
        ],
        answer: 'A learning process with pre-labeled data',
    },
    {
        question: 'What is unsupervised learning?',
        options: [
            'A learning process without guidance',
            'A learning process with feedback',
            'A learning process with pre-labeled data',
            'A learning process with no data',
        ],
        answer: 'A learning process without guidance',
    },
    {
        question: 'What is reinforcement learning?',
        options: [
            'A learning process without guidance',
            'A learning process with feedback',
            'A learning process with pre-labeled data',
            'A learning process with no data',
        ],
        answer: 'A learning process with feedback',
    },
    {
        question: 'What is the purpose of training a machine learning model?',
        options: [
            'To provide input data',
            'To evaluate the model',
            'To adjust model parameters',
            'To visualize the data',
        ],
        answer: 'To adjust model parameters',
    },
    {
        question: 'What is overfitting in machine learning?',
        options: [
            'When the model performs well on training data but poorly on new data',
            'When the model performs poorly on both training and new data',
            'When the model has too few parameters',
            'When the model has too many parameters',
        ],
        answer: 'When the model performs well on training data but poorly on new data',
    },
    {
        question: 'What is underfitting in machine learning?',
        options: [
            'When the model performs well on training data but poorly on new data',
            'When the model performs poorly on both training and new data',
            'When the model has too few parameters',
            'When the model has too many parameters',
        ],
        answer: 'When the model performs poorly on both training and new data',
    },
    {
        question: 'What is a classification task in machine learning?',
        options: [
            'Predicting a continuous value',
            'Predicting a category or label',
            'Predicting a probability',
            'Predicting a trend over time',
        ],
        answer: 'Predicting a category or label',
    },
    {
        question: 'What is a regression task in machine learning?',
        options: [
            'Predicting a continuous value',
            'Predicting a category or label',
            'Predicting a probability',
            'Predicting a trend over time',
        ],
        answer: 'Predicting a continuous value',
    },
];


const page= () => {
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId('');
            }
        });

        return unsubscribe;
    }, []);

    const handleCheckboxChange = (optionIndex: number, questionIndex: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = `${optionIndex}`; // Convert optionIndex to string
        setAnswers(updatedAnswers);
    };

    const calculateScore = () => {
        let currentScore = 0;
        questions.forEach((question, index) => {
            if (answers[index] === `${question.options.indexOf(question.answer)}`) {
                currentScore++;
            }
        });
        setScore(currentScore);
        setShowResult(true);

        if (userId) {
            updateTestResultInFirestore(currentScore);
        } else {
            console.error('No user is currently signed in.');
        }
    };

    const updateTestResultInFirestore = async (score: number) => {
        try {
            const testResultRef = doc(firestore, 'testresults', userId);
            await updateDoc(testResultRef, { 'AI/ML': score });
            console.log('Test result updated in Firestore successfully!');
        } catch (error) {
            console.error('Error updating test result in Firestore:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">AI/ML Test</h1>
            {questions.map((question, index) => (
                <div key={index} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center">
                                <Checkbox
                                    id={`${index}-${optionIndex}`}
                                    checked={answers[index] === `${optionIndex}`}
                                    onCheckedChange={() => handleCheckboxChange(optionIndex, index)}
                                    className="mr-2"
                                />
                                <label htmlFor={`${index}-${optionIndex}`} className="text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {showResult ? (
                <div className="mt-8 text-center">
                    <p className="text-2xl font-semibold mb-2">Your score: {score} out of {questions.length}</p>
                    <p className="text-xl font-semibold">Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
                </div>
            ) : (
                <div className="text-center">
                    <Button onClick={calculateScore} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Submit
                    </Button>
                </div>
            )}
        </div>
    );
};

export default page;