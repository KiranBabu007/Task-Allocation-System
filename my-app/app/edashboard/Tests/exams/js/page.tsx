'use client';

import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { app, firestore } from '@/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

const questions = [
    {
        question: 'What is the output of console.log(2 + 3) in JavaScript?',
        options: ['5', '23', '6', 'undefined'],
        answer: '5',
    },
    {
        question: 'Which keyword is used to declare variables in JavaScript?',
        options: ['var', 'let', 'const', 'variable'],
        answer: 'var',
    },
    {
        question: 'What is the result of typeof null in JavaScript?',
        options: ['object', 'null', 'undefined', 'string'],
        answer: 'object',
    },
    {
        question: 'What does the "===" operator do in JavaScript?',
        options: ['Strict equality comparison', 'Type conversion', 'Assignment', 'Non-strict equality comparison'],
        answer: 'Strict equality comparison',
    },
    {
        question: 'Which function is used to print something in the console in JavaScript?',
        options: ['console.log()', 'print()', 'log()', 'printLine()'],
        answer: 'console.log()',
    },
    {
        question: 'What is the output of console.log(5 == "5") in JavaScript?',
        options: ['true', 'false', 'undefined', 'NaN'],
        answer: 'true',
    },
    {
        question: 'What does the "&&" operator do in JavaScript?',
        options: ['Logical AND', 'Logical OR', 'Logical NOT', 'Assignment'],
        answer: 'Logical AND',
    },
    {
        question: 'What is the purpose of the "let" keyword in JavaScript?',
        options: ['To declare block-scoped variables', 'To declare global variables', 'To declare constant variables', 'To declare function-scoped variables'],
        answer: 'To declare block-scoped variables',
    },
    {
        question: 'What is the output of console.log(typeof NaN) in JavaScript?',
        options: ['number', 'NaN', 'undefined', 'string'],
        answer: 'number',
    },
    {
        question: 'Which function is used to convert a string to an integer in JavaScript?',
        options: ['parseInt()', 'parseFloat()', 'String()', 'Number()'],
        answer: 'parseInt()',
    },
    {
        question: 'What is the purpose of the "++" operator in JavaScript?',
        options: ['Increment', 'Decrement', 'Addition', 'Subtraction'],
        answer: 'Increment',
    },
    {
        question: 'What is the output of console.log(typeof []) in JavaScript?',
        options: ['object', 'array', 'undefined', 'string'],
        answer: 'object',
    },
    {
        question: 'Which function is used to add elements to the end of an array in JavaScript?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        answer: 'push()',
    },
    {
        question: 'What is the purpose of the "this" keyword in JavaScript?',
        options: ['To refer to the current object', 'To declare a variable', 'To create a new object', 'To access a superclass method'],
        answer: 'To refer to the current object',
    },
];

const page = () => {
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
            await updateDoc(testResultRef, { 'JavaScript': score });
            console.log('Test result updated in Firestore successfully!');
        } catch (error) {
            console.error('Error updating test result in Firestore:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Javascript Test</h1>
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